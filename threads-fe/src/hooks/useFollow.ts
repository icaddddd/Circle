import { IUser } from "@/interfaces/user";
import { API } from "@/lib/api";
import { AUTH_CHECK } from "@/stores/rootReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useFollow() {
  const [follow, setFollow] = useState<IUser[]>();
  const dispatch = useDispatch();

  async function getSuggested() {
    try {
      const response = await API.get("/users");
      // console.log('response random map', response);
      
      setFollow(response.data);
    //   dispatch(AUTH_CHECK(response.data));
    } catch (error) {
      console.log("gagal mengambil data suggested", error);
    }
  }

  useEffect(() => {
    getSuggested();
  }, []);
  return { follow, getSuggested };
}
