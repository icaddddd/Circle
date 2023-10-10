import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPages";
import SignupCard from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { CSSProperties, useEffect, useState } from "react";
import { API, setAuthToken } from "./lib/api";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { PropagateLoader } from "react-spinners";
import Follows from "./pages/Follow";

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function AuthCheck() {
    try {
      setAuthToken(localStorage.token);

      const response = await API.get("/check");
      dispatch(AUTH_CHECK(response.data.user));
      // console.log("test", response.data)
      setIsLoading(false);
    } catch (error) {
      dispatch(AUTH_ERROR());
      setIsLoading(false);
      navigate("/");
      console.log("error auth check");
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      AuthCheck();
    } else {
      setIsLoading(false);
      navigate("/");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <PropagateLoader color="green" cssOverride={override} />
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/register" element={<SignupCard />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/follows" element={<Follows />} />
        </Routes>
      )}
    </>
  );
}

export default App;
