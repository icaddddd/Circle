import { IThreadCard } from "@/interfaces/thread";
import { API } from "@/lib/api";
import { GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/slices/rootState";
import { useDispatch, useSelector } from "react-redux";

export function useLike() {
    const dispatch = useDispatch()
    const threads = useSelector((state: RootState) => state.thread)

    function updateThreadsWithLike(
        thread_id: number | undefined,
        threads: IThreadCard[]
    ) {
        return new Promise((resolve, reject) => {
            const updatedThreads: IThreadCard[] = []

            threads.forEach((thread) => {
                let likes_count = thread.likes_count ?? 0

                if (thread.is_liked) {
                    likes_count = likes_count - 1
                } else {
                    likes_count = likes_count + 1
                }

                if (thread.id === thread_id) {
                    updatedThreads.push({
                        ...thread,
                        is_liked: !thread.is_liked,
                        likes_count: likes_count
                    })
                } else {
                    updatedThreads.push(thread)
                }

                if (updatedThreads.length === 0) {
                    reject(new Error("data kosong"))
                }

                resolve(updatedThreads)
            })
        })
    }

    async function handlePostLike(
        thread_id: number | undefined,
        is_liked: boolean | undefined
    ) {
        try {
            if (!is_liked){
                const response = await API.post("/like", {thread_id: thread_id})
                console.log("berhasil like", response.data)
            } else {
                const response = await API.delete(`/like/${thread_id}`)
                console.log("berhasil unlike", response.data)
            }
            const newThreads = await updateThreadsWithLike(thread_id, threads)
            dispatch(GET_THREADS(newThreads))
        } catch (error) {
            console.log("failed update like", error)
        }
    }

    return {handlePostLike}
}