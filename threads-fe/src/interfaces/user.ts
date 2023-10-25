export interface IUser {
    id: number,
    user_id: number,
    picture: string,
    fullname: string,
    username: string,
    password?: string,
    email: string,
    description: string,
    followers_count: number,
    followings_count: number,
    is_followed: boolean
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