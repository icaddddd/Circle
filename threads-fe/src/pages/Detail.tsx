import { useState } from "react";
import { useParams } from "react-router-dom";
import datafake from "../utils/fakedata/datafake.json"
import { Avatar, Box, Card, Text, Image, Button, Icon } from "@chakra-ui/react";
import { StarIcon, ChatIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle } from "react-icons/ai";

export function Detail() {
    const {id} = useParams()
    const [data, _] = useState(datafake)
    const element = data.find((el) => el.id === Number(id))

    return element ? (
        <>
        <Card display={"flex"} gap={1} p={5} my={7}>
                    
                    <Box>
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Avatar src={element.author_picture} mr={3}/>
                            <Text fontWeight={"bold"}>{element.author_full_name}</Text>
                            <Text ml={2} fontWeight={"light"}>@{element.author_username} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Text>
                            <Text ml={2}>{element.posted_at}</Text>
                        </Box>    
                        <Box mt={5}>
                            <Text>{element.content}</Text>
                            <Image my={5} borderRadius={30} src={element.image}></Image>
                        </Box>
                        <Box display={"flex"} gap={5}>
                            <Box>
                                
                                <Button> <StarIcon /> {element.likes_count} likes</Button>
                            </Box>
                            <Box>
                                
                                <Button ml={2} colorScheme="teal"><ChatIcon />{element.replies_count} replies</Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>
        </>
    ) : (
        <h1>salah anjir</h1>
    )

 }
    


