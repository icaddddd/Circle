import { IThreadPost } from "@/interfaces/thread";
import { API } from "@/lib/api";
import { AUTH_LOGOUT, GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useThreads() {
  const threads = useSelector((state: RootState) => state.thread.threads);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });

  async function getThreads() {
    const response = await API.get(`/thread`);
    dispatch(GET_THREADS(response.data));
  }

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("image", form.image as File);

    const response = await API.post("/thread", formData);
    console.log("thread added successfully", response);
    getThreads();
  }

  useEffect(() => {
    getThreads();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  function handleLogout() {
    dispatch(AUTH_LOGOUT());
    navigate("/");
  }

  return { threads, getThreads, handleChange, handlePost, handleLogout };
}
