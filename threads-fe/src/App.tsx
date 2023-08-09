import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Threads from "./pages/Threads"
import { Detail } from "./pages/Detail";

function App(){
    return(
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                <Route index element={<Threads />}></Route>
                <Route path="detail/:id" element={<Detail/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    )
}

export default App