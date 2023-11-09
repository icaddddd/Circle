import { IUser } from "@/interfaces/user";
import { API } from "@/lib/api";
import { useEffect, useState } from "react";

export function useFollow() {
  const [follow, setFollow] = useState<IUser[]>();

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
