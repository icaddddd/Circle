import { IThreadCard } from "@/interfaces/interface"
import { API } from "@/lib/api"
import { useEffect, useState } from "react"

export function useHooks(){
    const [Threads, setThreads] = useState<IThreadCard[]>()  

  async function fetchData(){
      try {
          const response = await API.get("/thread",{
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
          })
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target

    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    })) 
  }

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

  return { Threads, formData, fetchData, setThreads, fetchCreatePost, handleChange}

}