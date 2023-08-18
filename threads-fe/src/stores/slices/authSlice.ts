import { IUser } from "@/interfaces/interface";
import { setAuthToken } from "@/lib/api";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState : IUser  = {
    id: 0,
    fullname: "",
    username: "",
    email: "",
    picture: "",
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
                picture: payload.user.picture
            }
            return user 
        },

        AUTH_CHECK: (_, action) => {
            const payload = action.payload
            console.log("redux auth check:", payload)
            // localStorage.setItem("token", payload.token)
            setAuthToken(payload.token)

            const user:IUser = {
                id: payload.id,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
                picture: payload.picture
            }
            return user
        },

        AUTH_ERROR: () => {},

        AUTH_LOGOUT: () => {},

    }
})
