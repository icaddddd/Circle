import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Like } from "typeorm"
import { User } from "./User"
import { Reply } from "./Reply"
import { Likes } from "./Likes"

@Entity({ name: "threads"})
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date

    @Column()
    content: string

    @Column()
    image: string
    
    @ManyToOne(() => User, (user) => user.threads)
    user:User

    @OneToMany(() => Likes, (like) => like.thread)
    like:Likes[]

    @OneToMany(() => Reply, (reply) => reply.thread)
    reply: Reply[]

}
