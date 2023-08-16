import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity ({name: "likes"})

export class Likes {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    is_likes: boolean

    @ManyToOne(() => User, (user) => user.like)
    user: User

    @ManyToOne(() => Thread, (threads) => threads.like)
    thread: Thread
}