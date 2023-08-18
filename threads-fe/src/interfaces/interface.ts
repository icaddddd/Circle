export interface IUser {
    id: number,
    picture: string,
    fullname: string,
    username: string,
    password?: string,
    email: string,
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

export interface IUserRegister {
    email: string,
    username: string,
    fullname: string,
    password: string
}

export interface IUserLogin {
    email: string, 
    password: string
}