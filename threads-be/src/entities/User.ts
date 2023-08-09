import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";

@Entity({name:"users"})
export class User {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  picture: string;


  @OneToMany(()=> Thread, (thread)=> thread.user,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  threads:Thread[];
}