import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Card, Text, Image, Button, Icon } from "@chakra-ui/react";
import { StarIcon, ChatIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { IThreadCard } from "@/interfaces/interface";
import { API } from "@/lib/api";


export function Detail() {
    const {id} = useParams()

    const [Threads, setThreads] = useState<IThreadCard[]>()  

    async function fetchData(){
        try {
            const response = await API.get("/thread",{
              headers: {
                Authorization: `Bearer ${localStorage.token}`
              }
            })
            setThreads(response.data)
            console.log("API data :", response.data)
        } catch (error){
            console.error("Error fetching threads!")
        }
    }
  
    useEffect(() => {
        fetchData()
    }, [])


    const element = Threads?.find((el) => el.id == Number(id) )

    const [showImage, setShowImage] = useState<boolean>(true)

    return element ? (
        <>
        <Card margin={2} padding={5}>
                    
                    <Box>
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Avatar src={element.user.picture} mr={3}/>
                            <Text fontWeight={"bold"}>{element.user.fullname}</Text>
                            <Text ml={2} fontWeight={"light"}>@{element.user.username} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Text>
                            <Text ml={2}>{element.posted_at}</Text>
                        </Box>    
                        <Box mt={5}>
                            <Text>{element.content}</Text>
                            {showImage && (
                            <Image my={5} borderRadius={30} src={element.image} onError={() => setShowImage(false)}></Image>
                            )}
                        </Box>
                        <Box display={"flex"} gap={5} mt={5}>
                            <Box>
                                
                                <Button width={'120px'} colorScheme="pink"> <StarIcon mr={3} /> {element.likes_count} likes</Button>
                            </Box>
                            <Box>
                                
                                <Button width={'120px'} ml={2} colorScheme="green"><ChatIcon mr={3} />{element.replies_count} replies</Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>
        </>
    ) : (
        <h1></h1>
    )

 }
    


