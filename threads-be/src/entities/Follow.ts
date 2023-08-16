import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity({name: "follows"})
export class Follow{
    @PrimaryColumn()
    id: number

    @ManyToOne(() => User, (user) => user.follow)
    follower: number

    @ManyToOne(() => User, (user) => user.follow)
    followed: number
}