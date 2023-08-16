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


  @OneToMany(()=> Thread, (thread) => thread.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  threads:Thread[];
  like: Likes[]
  reply: Reply[]
  follow: Follow[]

}