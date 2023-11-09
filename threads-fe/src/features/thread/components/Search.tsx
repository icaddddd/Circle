import { IFollow } from "@/interfaces/follow";
import { API } from "@/lib/api";
import { Box, Button, Input } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { FollowCard } from "./FollowCard";

export default function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IFollow[]>([]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataSearch = await API.get(`/search?q=${search}`);
    setSearchResult(dataSearch.data);
  };
  return (
    <>
      <center>
        <form onSubmit={handleSearch}>
          <Box display={"flex"} mt={5} padding={3} gap={3}>
            <Input onChange={(e) => setSearch(e.target.value)} />
            <Button type="submit">Search</Button>
          </Box>
        </form>
      </center>
      <Box padding={3}>
        {searchResult.map((item) => (
          <FollowCard
            key={item.id}
            id={item.id}
            user_id={item.user_id}
            username={item.username}
            fullname={item.fullname}
            description={item.description}
            picture={item.picture}
            is_followed={item.is_followed}
            email={item.email}
          />
        ))}
      </Box>
    </>
  );
}
