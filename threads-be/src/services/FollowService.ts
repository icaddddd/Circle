import { Not, Repository } from "typeorm";
import { Follow } from "../entities/Follow";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { log } from "console";
import { isDate } from "date-fns";
import { Response } from "express";

class FollowsService {
  private readonly followRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);

  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findRandom(reqQuery?: any, res?: Response): Promise<any> {
    try {
      const loginSession = res.locals.loginSession.user.id;
      console.log("loginSession", loginSession);

      const limit = parseInt(reqQuery.limit ?? 0);

      const followedUserIds = (
        await this.followRepository
          .createQueryBuilder("follows")
          .select("follows.followedId", "followedId")
          .where("follows.follower = :id", { id: loginSession })
          .getRawMany()
      ).map((row) => row.followedId);

      const users = await this.userRepository
        .createQueryBuilder("users")
        .select()
        .where("users.id != :id", { id: loginSession })
        .andWhere("users.id NOT IN (:...userIds)", {
          userIds: followedUserIds,
        })
        .orderBy("RANDOM()")
        .take(limit)
        .getMany();

      console.log("random", users);

      const newUser = users?.map((follow) => ({
        id: follow.id,
        user_id: follow.id,
        username: follow.username,
        fullname: follow.fullname,
        email: follow.email,
        picture: follow.picture,
        description: follow.description,
        is_followed: false,
      }));
      console.log("random map", newUser);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async find(
    loginSession: any,
    queryType?: string,
    queryLimit?: number
  ): Promise<any> {
    try {
      let follows: Follow[];

      if (queryType === "followings") {
        follows = await this.followRepository.find({
          take: queryLimit,
          where: {
            follower: {
              id: loginSession.user.id,
            },
          },
          relations: ["followed", "follower"],
        });

        return follows.map((follow) => ({
          id: follow.id,
          user_id: follow.followed.id,
          username: follow.followed.username,
          fullname: follow.followed.fullname,
          email: follow.followed.email,
          picture: follow.followed.picture,
          description: follow.followed.description,
          is_followed: true,
        }));
      } else if (queryType === "followers") {
        follows = await this.followRepository.find({
          take: queryLimit,
          where: {
            followed: {
              id: loginSession.user.id,
            },
          },
          relations: ["followed", "follower"],
        });

        return await Promise.all(
          follows.map(async (follow) => {
            const isFollowed = await this.followRepository.count({
              where: {
                follower: {
                  id: loginSession.user.id,
                },
                followed: {
                  id: follow.follower.id,
                },
              },
            });

            return {
              id: follow.id,
              user_id: follow.follower.id,
              username: follow.follower.username,
              fullname: follow.follower.fullname,
              email: follow.follower.email,
              picture: follow.follower.picture,
              description: follow.follower.description,
              is_followed: isFollowed > 0,
            };
          })
        );
      }

      return {
        message: `please specify valid query "type" (followers/followings)`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const isFollowExist = await this.followRepository.count({
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: reqBody.followed_user_id,
          },
        },
      });

      if (isFollowExist > 0) {
        throw new Error("you already follow this user");
      }

      if (reqBody.followed_user_id === loginSession.user.id) {
        throw new Error("you can not follow yourself");
      }

      const isUserExist = await this.userRepository.count({
        where: {
          id: reqBody.followed_user_id,
        },
      });

      if (isUserExist <= 0) {
        throw new Error("this user does not exist");
      }

      const follow = this.followRepository.create({
        follower: {
          id: loginSession.user.id,
        },
        followed: {
          id: reqBody.followed_user_id,
        },
      });

      await this.followRepository.save(follow);

      return {
        message: "you follow this user",
        follow: follow,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(followedUserId: number, loginSession: any): Promise<any> {
    try {
      const follow = await this.followRepository.findOne({
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: followedUserId,
          },
        },
      });

      if (!follow) {
        throw new Error("you did not follow this user");
      }

      await this.followRepository.delete({
        id: follow.id,
      });

      return {
        message: "you unfoll this user",
        follow: follow,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new FollowsService();
