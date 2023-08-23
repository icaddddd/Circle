export interface IUser {
    id: number,
    picture: string,
    fullname: string,
    username: string,
    password?: string,
    email: string,
    description: string
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