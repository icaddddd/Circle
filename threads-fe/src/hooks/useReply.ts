import { IReplyPost } from "@/interfaces/reply";
import { IThreadCard } from "@/interfaces/thread";
import { API } from "@/lib/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useReply() {
    const [replies, setReplies] = useState<IThreadCard[]>()
    const [thread, setThread] = useState<IThreadCard>();

    const {id} = useParams()

    const [form, setForm] = useState<IReplyPost>({
        content: "",
        thread_id: +(id as string)
    })

    async function handlePostReply(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()

            const response = await API.post("/reply", form)
            console.log("berhasil menambahkan reply", response.data)
            getReplies()
        } catch (error) {
            console.log("gagal menambahkan reply", error)
        }
    }

    function handleChangeReply(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    async function getReplies() {
        try {
            const response = await API.get(`replies?thread_id=${id}`)
            setReplies(response.data)
            console.log("ini reply id")
        } catch (error) {
            console.log("gagal mengambil data reply id :", error)
        }
    }

    useEffect(() => {
        getReplies()
    }, [])

    return {
        replies, form, handleChangeReply, handlePostReply, thread
    }
}