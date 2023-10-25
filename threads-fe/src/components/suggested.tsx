import { useFollow } from "@/hooks/useFollow";
import { IFollow } from "@/interfaces/follow";
import { API } from "@/lib/api";
import { GET_FOLLOWS, SET_FOLLOW } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { Box, Button, Card, Text, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

export default function SuggestedFollow(props: IFollow) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const follows = useSelector((state: RootState) => state.follow.follows);
  const { follow } = useFollow();

  console.log('suggest follow',follow);
  
  async function handleFollow(
    id: number,
    followedUserId: number,
    isFollowed: boolean
  ) {
    try {
      console.log("inifllwediduser", followedUserId);
      if (!isFollowed) {
        await API.post(`/follow`, {
          followed_user_id: followedUserId,
        });
        dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
      } else {
        await API.delete(`/follow/${followedUserId}`);
        dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
      }
      // const response = await API.get(`follows?type=${follows}`);
      // // console.log("ini response" , response)
      // dispatch(GET_FOLLOWS(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Card margin={2} padding={3} gap={2}>
        <Text fontWeight={"bold"}>Suggested For You</Text>
        {follow?.map((item) => {
          if (item.user_id === auth.id) {
            return null;
          } else {
            return (
              <Box
                key={item.id}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"}>
                  <Image
                    borderRadius={"full"}
                    height={"45px"}
                    width={"45px"}
                    objectFit={"cover"}
                    src={item.picture}
                  />
                  <Box ml={4}>
                    <Text fontSize={15}>{item.fullname}</Text>
                    <Text fontSize={12} fontWeight={"light"}>
                      @{item.username}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Button
                    onClick={() =>
                      handleFollow(
                        item.id,
                        item.user_id,
                        follows.some(
                          (follow) => follow.user_id === item.user_id
                        )
                      )
                    }
                    width={"100px"}
                    borderRadius={15}
                  >
                    {/* {follows.some((follow) => follow.user_id === item.user_id)
                      ? "Unfollow"
                      : "Follow"} */}
                    {item.is_followed ? "Unfollow" : "Follow"}
                  </Button>
                </Box>
              </Box>
            );
          }
        })}
      </Card>
    </>
  );
}
