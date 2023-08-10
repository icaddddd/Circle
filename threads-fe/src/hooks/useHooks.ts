import { IThreadCard } from "@/interfaces/interface"
import { API } from "@/lib/api"
import { useEffect, useState } from "react"

export function useHooks(){
    const [Threads, setThreads] = useState<IThreadCard[]>()  

  async function fetchData(){
      try {
          const response = await API.get("/thread")
          setThreads(response.data)
          console.log("API data :", response.data)
      } catch (error){
          console.error("Error fetching threads!")
      }
  }

  useEffect(() => {
      fetchData()
  }, [])


  const [formData, setFormData] = useState({
    content: '',
    image: '',
  })

  const fetchCreatePost = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
        const response = await API.post('/thread', formData)
        fetchData()
        console.log('error', response.data)
    } catch (error){
        console.error('Error create!', error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target

    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }))
  }

  return { Threads, formData, fetchData, setThreads, fetchCreatePost, handleChange}



  
}