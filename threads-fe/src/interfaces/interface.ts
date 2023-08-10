export interface IUser {
    id: number,
    picture: string,
    fullname: string,
    username: string
}

export interface IThreadCard {
    id: number,
    user: IUser,
    posted_at: string,
    content: string,
    image: string,
    likes_count: number,
    replies_count: number,
    is_liked: boolean,
}