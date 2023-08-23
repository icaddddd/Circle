import { IUser } from "./user";

export interface IThreadPost {
    content : string,
    image: Blob | MediaSource | string
}

export interface IThreadCard {
    id: number,
    user: IUser,
    posted_at: Date,
    content: string,
    image: string,
    likes_count: number,
    replies_count: number,
    is_liked: boolean,
}