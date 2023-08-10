import { useHooks } from "@/hooks/useHooks";
import { Button, Card, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ThreadCard } from ".";


export default function HomeBar() {

    const {Threads, formData, handleChange, fetchCreatePost} = useHooks()

return(
    <Card margin={2} padding={5}>
    <form onSubmit={fetchCreatePost}>
        <FormControl>
            <FormLabel fontSize={30} fontWeight={"bold"}>Home</FormLabel>
              <Input name="content" onChange={handleChange} value={formData.content} type='text' placeholder="what's on ur mind?" />
              <Input name="image" onChange={handleChange} value={formData.image} mt={2} type='text' placeholder="input ur pict here!" />
              <Button type="submit" borderRadius={20} width={"20%"} colorScheme="green" color={"white"} px={15} float={"right"} mt={2}>Submit</Button>           
        </FormControl>
    </form>


    {Threads?.map((item, index) => {
        return (
            <ThreadCard key={index} content={item.content} image={item.image} user={item.user} posted_at={""} likes_count={item.likes_count} replies_count={item.replies_count} is_liked={item.is_liked} id={item.id} />
        )
    })}
    </Card>
)

}
