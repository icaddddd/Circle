import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";
import { Follow } from "./Follow";
import { Reply } from "./Reply";
import { Likes } from "./Likes";

@Entity({name:"users"})
export class User {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  username: string;

  @Column({nullable: true})
  fullname: string;

  @Column({select: false})
  password: string;

  @Column()
  email: string;

  @Column({nullable: true})
  picture: string;

  @Column({nullable: true})
  description: string;

  @OneToMany(()=> Thread, (thread) => thread.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  threads:Thread[];

  @OneToMany(()=> Thread, (thread) => thread.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  likes:Likes[];

  @OneToMany(() => Follow, (follow) => follow.follower, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  followers: Follow[]

  @OneToMany(() => Follow, (follow) => follow.followed, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  followings: Follow[]

  @OneToMany(() => Reply, (reply) => reply.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  replies: Reply[]

}