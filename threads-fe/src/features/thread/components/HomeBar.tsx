// import { useHooks } from "@/hooks/useHooks";
import { Box, Button, Card, FormControl, FormLabel, Icon, Input } from "@chakra-ui/react";
import { ThreadCard } from ".";
import { BsImages } from "react-icons/bs";
import { useThreads } from "@/hooks/useThreads";


export default function HomeBar() {
    const {handlePost, handleChange, threads} = useThreads()

return(
    <><Card margin={2} padding={5}>
        <FormLabel fontSize={30} fontWeight={"bold"}>Home</FormLabel>
        <form onSubmit={handlePost} encType="multipart/form-data">
            <FormControl>
                <Box display={"flex"} gap={3}>
                    <Input name="content" onChange={handleChange} type='text' placeholder="what's on ur mind?" />
                    <Box mt={3}>
                        <Input name="image" onChange={handleChange} mt={2} type='file' border={"none"} display={"none"} id="input-image" />
                        <label htmlFor="input-image">
                            <Icon as={BsImages} fontSize={20} cursor={"pointer"} />
                        </label>
                    </Box>
                </Box>
                <Button type="submit" borderRadius={20} width={"20%"} value={"Post"} colorScheme="green" color={"white"} px={15} float={"right"} mt={2}>Submit</Button>
            </FormControl>
        </form>
    </Card>
            {threads?.map((item, index) => {
                return (
                    <ThreadCard key={index} content={item.content} image={item.image} user={item.user} posted_at={item.posted_at} likes_count={item.likes_count} replies_count={item.replies_count} is_liked={item.is_liked} id={item.id} />
                );
            })}
        </>
)

}
