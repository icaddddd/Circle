import { API } from "@/lib/api"
import { AUTH_LOGOUT, GET_THREADS } from "@/stores/rootReducer"
import { RootState } from "@/stores/slices/rootState"
import React, { FormEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export function useThreads(){
    const threads = useSelector((state: RootState) => state.thread)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [dataContent, setContent] = useState("")
    const [dataImage, setImage] = useState< File | null | Blob | string>(null)

    async function getThreads() {
      const response = await API.get(`/thread`)
      dispatch(GET_THREADS(response.data))
    }

    async function handlePost(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
  
      const formData = new FormData()
      formData.append("content", dataContent)
      
      if (dataImage) {
        formData.append("image", dataImage)
      }

      try {
        const response = await API.post("/thread", formData, { 
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        getThreads()
        console.log("berhasil menambahkan thread", response)
      } catch (error) {
        console.log("error post thread", error)
      }
      
    }

  useEffect(() => {
      getThreads()
  }, [])

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setContent(value)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0]
    setImage(selectedImage)
  }

  function handleLogout(){
    dispatch(AUTH_LOGOUT())
    navigate("/")
  }

  

  return { threads, getThreads, handleContentChange, handleImageChange , handlePost, handleLogout}

}