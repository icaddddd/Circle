import { IUser } from "@/interfaces/user";
import { API } from "@/lib/api";
import { useEffect, useState } from "react";

export function useFollow() {
    const [follow, setFollow] = useState<IUser[]>()

    async function getSuggested() {
        try {
            const response = await API.get("/users")
            setFollow(response.data)

        } catch (error) {
            console.log("gagal mengambil data suggested", error)
        }
    }

    useEffect(() => {
        getSuggested()
    },[]) 
    return {follow, getSuggested}
}