import { API } from "@/lib/api";
import { SET_THREAD_LIKE } from "@/stores/rootReducer";
import { RootState } from "@/stores/slices/rootState";
import { useDispatch, useSelector } from "react-redux";

export function useLike() {
    const dispatch = useDispatch()
    const threads = useSelector((state: RootState) => state.thread.threads)

    async function handlePostLike(id: number, isLiked: boolean) {
        console.log("ini id", id)
        console.log("ini isLiked", isLiked)
        try {
            if (!isLiked){
                const response = await API.post("/like", {thread_id: id})
                dispatch(SET_THREAD_LIKE({id: id, isLiked: isLiked}))
                console.log("berhasil like", response.data)
            } else {
                const response = await API.delete(`/like/${id}`)
                dispatch(SET_THREAD_LIKE({id: id, isLiked: isLiked}))
                console.log("berhasil unlike", response.data)
            }
        } catch (error) {
            console.log("failed update like", error)
        }
    }

    return {handlePostLike, threads}
}