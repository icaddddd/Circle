import { IUserEdit } from "@/interfaces/userEdit";
import { API } from "@/lib/api";
import { AUTH_CHECK, GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useEditProfile() {
  const threads = useSelector((state: RootState) => state.thread.threads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<IUserEdit>({
    description: "",
    fullname: "",
    picture: "",
    username: "",
  });

  async function getThreads() {
    const response = await API.get(`/thread`);
    dispatch(GET_THREADS(response.data));
  }

  async function handlePostEditProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", form.description);
      formData.append("fullname", form.fullname);
      formData.append("picture", form.picture as File);
      formData.append("username", form.username);

      const response = await API.patch(`/user/update/${auth.id}`, formData);
      console.log(response);
      dispatch(AUTH_CHECK(response.data));
      navigate("/home");
      getThreads();
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeEditProfile(event: ChangeEvent<HTMLInputElement>) {
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

  return {
    threads,
    getThreads,
    handleChangeEditProfile,
    handlePostEditProfile,
  };
}
