import { ChatIcon } from "@chakra-ui/icons"
import { AiFillCheckCircle } from "react-icons/ai"
import { BsFillSuitHeartFill } from "react-icons/bs"
import { Avatar, Box, Card, Image, Text } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { useState } from "react"
import { IThreadCard } from "@/interfaces/thread"
import { useLike } from "@/hooks/useLike"


export function ThreadCard(props: IThreadCard) {
  
    const {handlePostLike} = useLike()

    const [showImage, setShowImage] = useState<boolean>(true)


    return (
        <>
        
            <Card margin={2} padding={5}>
                    <Box>
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Avatar src={props.user?.picture} mr={3}/>
                            <Text fontWeight={"bold"}>{props.user?.fullname}</Text>
                            <Text ml={2} fontWeight={"light"}>@{props.user?.username} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Text>
                            <Text ml={2}>{props.posted_at}</Text>
                        </Box>    
                        
                        <Box mt={5}>
                            <Text>{props.content}</Text>
                            {showImage && (
                                <Image my={5} borderRadius={30} src={props.image} onError={() => setShowImage(false)}></Image>
                            )}
                        </Box>
                        <Box display={"flex"} gap={5} mt={5}>
                            <Box display={'flex'} alignItems={"center"}>
                                <Icon as={BsFillSuitHeartFill} mr={3} fontSize={20} color={props.is_liked ? "red" : "grey"} onClick={() => handlePostLike(props.id, props.is_liked)} cursor={"pointer"}/>
                                <Text>{props.likes_count} Likes</Text>
                            </Box>
                            <Link to={"/detail/" + props.id}>
                            <Box display={'flex'} alignItems={"center"}>
                                <ChatIcon fontSize={20} mr={3}/>
                                <Text>{props.replies_count} Replies</Text>
                            </Box>
                            </Link>
                        </Box>
                    </Box>
                </Card>
        </>
    )
}

export default ThreadCard