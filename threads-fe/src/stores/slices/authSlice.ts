import { IUser } from "@/interfaces/user";
import { setAuthToken } from "@/lib/api";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState : IUser  = {
    id: 0,
    fullname: "",
    username: "",
    email: "",
    picture: "",
    description: "",
    followers_count: 0,
    followings_count: 0
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload
            console.log("ini datamu bro", action.payload)
            setAuthToken(payload.token)
            localStorage.setItem("token", payload.token)

            const user:IUser = {
                id: payload.user.id,
                fullname: payload.user.fullname,
                username: payload.user.username,
                email: payload.user.email,
                picture: payload.user.picture,
                description: payload.user.description,
                followers_count: payload.user.followers_count,
                followings_count: payload.user.followings_count
            }
            return user 
        },

        AUTH_CHECK: (_, action) => {
            const payload = action.payload
            // console.log("redux auth check:", payload)
            // localStorage.setItem("token", payload.token)
            // setAuthToken(payload.token)

            const user:IUser = {
                id: payload.id,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
                picture: payload.picture,
                description: payload.description,
                followers_count: payload.followers_count,
                followings_count: payload.followings_count
            }
            return user
        },

        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },

        AUTH_LOGOUT: () => {
            localStorage.removeItem("token")
            setAuthToken(null)
        },

    }
})
