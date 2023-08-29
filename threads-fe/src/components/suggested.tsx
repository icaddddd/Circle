import { useFollow } from "@/hooks/useFollow"
import { IFollow } from "@/interfaces/follow"
import { API } from "@/lib/api"
import { SET_FOLLOW } from "@/stores/rootReducer"
import {Box, Button, Card, Text} from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { useDispatch } from "react-redux"

export default function SuggestedFollow(props: IFollow){

    const dispatch = useDispatch()

    const {follow} = useFollow()

    async function handleFollow(
        id: number,
        followedUserId: number,
        isFollowed: boolean
      ) {
        try {
          console.log("inifllwediduser", followedUserId)
          if (!isFollowed) {
            await API.post(`/follow`, {
              followed_user_id: followedUserId,
            });
            dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
            
          } else {
            await API.delete(`/follow/${followedUserId}`);
            dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
            
          }
        } catch (err) {
          console.log(err);
        }
      }
    return(
        <>
        
        <Card  margin={2} padding={3} gap={2}>
        <Text fontWeight={"bold"}>Suggested For You</Text>
        {follow?.map((item, index) => {
            return (
            
        <Box key={index} display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
                <Image borderRadius={"full"} height={"45px"} width={"45px"} objectFit={"cover"} src={item.picture} />
                <Box ml={4}>
                    <Text fontSize={15}>{item.fullname}</Text>
                    <Text fontSize={12} fontWeight={"light"}>@{item.username}</Text>
                </Box>
            </Box>
            <Box>
                <Button onClick={() =>
                handleFollow(item.id, props.user_id, props.is_followed)
              } width={"100px"} borderRadius={15}>{props.is_followed ? "Unfollow" : "Follow"}</Button>
            </Box>
        </Box>
       
            ) 
        })}
            </Card>
    
        </>
    )
}