import { ChatIcon, StarIcon } from "@chakra-ui/icons"
import { AiFillCheckCircle } from "react-icons/ai"
import { Avatar, Box, Button, Card, Image, Text } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { useState } from "react"
import { IThreadCard } from "@/interfaces/interface"


export function ThreadCard(props: IThreadCard) {
  

    const [like, setLike] = useState(props.likes_count || 0)
    const [isLiked, setIsLiked] = useState(props.is_liked || false) 

    const handleClick = () => {
        if (isLiked) {
            setLike(like + 1)
        } else {
            setLike(like - 1)
        }

        setIsLiked(!isLiked)
    }

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
                            <Image my={5} borderRadius={30} src={props.image}></Image>
                        </Box>
                        <Box display={"flex"} gap={5}>
                            <Box>
                                
                                <Button width={'120px'} ml={2} onClick={handleClick} colorScheme={isLiked ? "gray" : "pink"} > <StarIcon mr={3}/> {like} likes</Button>
                            </Box>
                            <Box>
                            <Link to={"detail/" + props.id}>
                                <Button width={'120px'} ml={2} colorScheme="green"><ChatIcon mr={3}/>{props.replies_count} replies</Button>
                            </Link>
                            </Box>
                        </Box>
                    </Box>
                </Card>
        </>
    )
}

export default ThreadCard