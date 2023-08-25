import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Card, Text, Image, Button, Icon, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IThreadCard } from "@/interfaces/thread";
import { API } from "@/lib/api";
// import { BsImages } from "react-icons/bs";
import { useReply } from "@/hooks/useReply";
import moment from 'moment'


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

    const {replies, handleChangeReply, handlePostReply} = useReply()


    return element ? (
        <>
        <Card margin={2} padding={5}>
                    
                    <Box>
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Avatar src={element.user.picture} mr={3}/>
                            <Text fontWeight={"bold"}>{element.user.fullname}</Text>
                            <Text ml={2} fontWeight={"light"}>@{element.user.username} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Text>
                            <Text ml={2}>{moment(element.posted_at).startOf('minute').fromNow()}</Text>
                        </Box>    
                        <Box mt={5}>
                            <Text>{element.content}</Text>
                            {showImage && (
                            <Image my={5} borderRadius={30} src={element.image} onError={() => setShowImage(false)}></Image>
                            )}
                        </Box>
                    </Box>
                </Card>

                <Card margin={2} padding={5}>
    <form onSubmit={handlePostReply} encType="multipart/form-data">
        <FormControl>
            <FormLabel fontSize={30} fontWeight={"bold"}>Reply</FormLabel>
            <Box display={"flex"} gap={3}>
              <Input name="content" onChange={handleChangeReply} type='input' placeholder="what's on ur mind?" />
              {/* <Box mt={3}>
                <Input name="image" onChange={handleChangeReply} mt={2} type='file' border={"none"} display={"none"} id="input-image" />
                <label htmlFor="input-image">
                    <Icon as={BsImages} fontSize={20} cursor={"pointer"} />
                </label>
              </Box> */}
            </Box>
              <Button type="submit" borderRadius={20} width={"20%"} colorScheme="green" color={"white"} px={15} float={"right"} mt={2}>Submit</Button>
        </FormControl>
    </form>
    </Card>
                    
    <Box>
        {replies?.map((reply) => {
            return (
            <Card margin={2} padding={5}>
                 <Box>
                      <Box display={"flex"} gap={1} alignItems={"center"}>
                        <Avatar src={reply.user?.picture} mr={3}/>
                        <Text fontWeight={"bold"}>{reply.user?.fullname}</Text>
                         <Text ml={2} fontWeight={"light"}>@{reply.user?.username} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Text>
                         {/* <Text ml={2}>{moment(reply.posted_at).startOf('minute').fromNow()}</Text> */}
                     </Box>    
                        
                      <Box mt={5}>
                         <Text>{reply.content}</Text>
                            {showImage && (
                               <Image my={5} borderRadius={30} src={reply.image} onError={() => setShowImage(false)}></Image>
                            )}
                    </Box>
                  </Box>
              </Card>
           );
         })}
       </Box>
                

    
        </>
    ) : (
        <h1></h1>
    )

 }
    


