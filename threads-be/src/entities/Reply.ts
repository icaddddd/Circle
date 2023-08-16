import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({name: "replies"})
export class Reply{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.reply)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.reply)
    thread:Thread[]
}