import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPages";
import SignupCard from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import { useEffect, useState } from "react";
// import { API, setAuthToken } from "./lib/api";


function App(){

    // const [isLoading, setIsLoading] = useState<boolean>(true)
    // const navigate = useNavigate()

    // async function authCheck() {
    //     try {
    //         setAuthToken(localStorage.token)
    //         setIsLoading(false)
    //     } catch (error) {
    //         localStorage.removeItem("token")
    //         setIsLoading(false)
    //         navigate("/login")
    //     }
    // }
    
    // useEffect(() => {
    //     if (localStorage.token) {
    //         authCheck()
    //     } else {
    //         setIsLoading(false)
    //     }
    // },[])

    return(
    <>
    {/* {isLoading ? null :  */}
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/detail/:id" element={<DetailPage/>} />
                <Route path="/register" element={<SignupCard/>} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    
    {/* } */}
    </>
    )
}

export default App