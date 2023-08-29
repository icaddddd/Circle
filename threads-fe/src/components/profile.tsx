import {Box, Button, Card, CardBody, Heading, Icon, Stack, Text} from "@chakra-ui/react"
import { AiFillCheckCircle } from "react-icons/ai"
import { Image } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "@/stores/types/rootState"

export default function ProfileKanan(){

  const auth = useSelector((state: RootState) => state.auth)

    return(
      <Card margin={2} padding={1}>
        <CardBody>
      <Box display={"flex"} flexDirection={"column"}>
      <Image borderRadius={10}
        src="https://media.hitekno.com/thumbs/2022/07/31/90849-vonzy-brand-ambassador-onic-esports/730x480-img-90849-vonzy-brand-ambassador-onic-esports.jpg"
      />
      <Image height={"100px"} width={"100px"} objectFit={"cover"} mt={-16} ml={3} borderRadius={"50%"} border={"4px solid white"}
        src={auth.picture}
      />
      <Box width={"100%"} mt={-7}>
        <Button float={"right"}>Edit Profile</Button>
      </Box>
    </Box>
    <Stack mt='1' spacing='1'>
      <Heading size='md' mt={-3}>{auth.full_name} <Icon color={"blue.300"} as={AiFillCheckCircle} /></Heading>
      <Text fontWeight={"light"} fontSize={15}>@{auth.username} </Text>
      <Text>{auth.description}</Text>
      <Box display={"flex"} gap={5}>
        <Text color={"grey"}>{auth.followings_count} following</Text>  
        <Text color={"grey"}>{auth.followers_count} follower</Text>
      </Box>
    </Stack>
  </CardBody>
  </Card>
    )
}


