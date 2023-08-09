import { ChatIcon, StarIcon } from "@chakra-ui/icons"
import { AiFillCheckCircle } from "react-icons/ai"
import { Avatar, Box, Button, Card, Image, Text } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react'
import { useState } from "react"
import { Link } from "react-router-dom"

// export interface User {
//     id?: number,
//     picture: string,
//     fullname: string,
//     username: string
// }

export interface ThreadCard {
    id?: number,
    author_full_name: string,
    author_picture: string,
    author_username: string,
    posted_at: string,
    content: string,
    image: string,
    likes_count: number,
    replies_count: number,
    is_liked: boolean,
}


export function ThreadCard(props: ThreadCard) {
    const [like, setLike] = useState(props.likes_count || 0)
    const [isLiked, setIsLiked] = useState(props.is_liked || false) 

    const handleClick = () => {
        if (isLiked) {
            setLike(like - 1)
        } else {
            setLike(like + 1)
        }

        setIsLiked(!isLiked)
    }

    return (
        <>
        
            <Card display={"flex"} gap={1} p={5} my={7}>
                    
                    <Box>
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Avatar src={props.author_picture} mr={3}/>
                            <Text fontWeight={"bold"}>{props.author_full_name}</Text>
                            <Text ml={2} fontWeight={"light"}>@{props.author_username} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Text>
                            <Text ml={2}>{props.posted_at}</Text>
                        </Box>    
                        
                        <Box mt={5}>
                            <Text>{props.content}</Text>
                            <Image my={5} borderRadius={30} src={props.image}></Image>
                        </Box>
                        <Box display={"flex"} gap={5}>
                            <Box>
                                
                                <Button onClick={handleClick} ml={2} colorScheme={isLiked ? "pink" : "gray"}> <StarIcon /> {like} likes</Button>
                            </Box>
                            <Box>
                            <Link to={"detail/" + props.id}>
                                <Button ml={2} colorScheme="teal"><ChatIcon />{props.replies_count} replies</Button>
                            </Link>
                            </Box>
                        </Box>
                    </Box>
                </Card>
        
        </>
    )
}

export default ThreadCard