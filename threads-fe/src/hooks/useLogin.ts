// import { API, setAuthToken } from "@/lib/api"
// import { FormEvent } from "react"
// import { useNavigate } from "react-router-dom"

// const navigate = useNavigate()

// const submitHandleValidate = async (e:FormEvent) => {
//   e.preventDefault()
//   try {
//     const response = await API.post("/login", Validate)
//     dispatchEvent(AUTH_LOGIN(response.data))
//     localStorage.setItem("token", response.data.token)
//     setAuthToken(localStorage.token)
//     navigate("/")
//   } catch(error) {
//     console.log("error submit data", error)
//   }
// }

// export default submitHandleValidate