import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity({name: "follows"})
export class Follow{
    @PrimaryColumn()
    id: number

    @ManyToOne(() => User, (user) => user.followers,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    follower: number

    @ManyToOne(() => User, (user) => user.followings, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    followed: number
}