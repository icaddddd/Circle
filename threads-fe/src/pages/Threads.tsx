import { useState } from "react"
import datafake from "../utils/fakedata/datafake.json"
import { ThreadCard } from "../features/thread"
import {Box} from "@chakra-ui/react"



function Home() {

  const [threads, _] = useState(datafake)

  return (
    <>
    <Box display={"flex"}>
      
      <Box justifyContent={"center"} width={"680px"} marginLeft={"1%"}>
        {threads.map((dummy, index) => {
            return <ThreadCard 
              key={index}
              id= {dummy.id}
              author_full_name={dummy.author_full_name}
              author_picture={dummy.author_picture}
              author_username={dummy.author_username}
              content={dummy.content}
              image={dummy.image}
              posted_at={dummy.posted_at}
              likes_count={dummy.likes_count}
              replies_count={dummy.replies_count}
              is_liked={dummy.is_liked}
              />
        })}
      </Box>
      
    </Box>
    </>
  )
}
export default Home

