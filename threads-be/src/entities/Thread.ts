import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({ name: "threads"})
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date

    @Column()
    content: string

    @Column()
    image: string

    @Column()
    liked_count: string

    @Column()
    replies_count: string

    @Column()
    is_liked: boolean
    
    @ManyToOne(() => User, (user) => user.threads)
    user:User[]

}
