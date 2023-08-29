export interface IUser {
    id: number,
    picture: string,
    fullname: string,
    username: string,
    password?: string,
    email: string,
    description: string,
    followers_count: number,
    followings_count: number
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