import {Box, Button, CardBody, Heading, Icon, Stack, Text} from "@chakra-ui/react"
import { AiFillCheckCircle } from "react-icons/ai"
import { Image } from "@chakra-ui/react"

export default function ProfileKanan(){
    return(
        <CardBody>
    <Box display={"flex"} flexDirection={"column"}>
      <Image borderRadius={10}
        src="https://media.hitekno.com/thumbs/2022/07/31/90849-vonzy-brand-ambassador-onic-esports/730x480-img-90849-vonzy-brand-ambassador-onic-esports.jpg"
      />
      <Image height={"100px"} width={"100px"} objectFit={"cover"} mt={-16} ml={3} borderRadius={"50%"} border={"4px solid white"}
        src="https://cdn1-production-images-kly.akamaized.net/m2N3geGCmRhtXCdw0ldjney-Vtk=/219x0:897x678/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4352409/original/032975700_1678352850-Snapinsta.app_1080_273106362_657167602095883_4688079940940013026_n.jpg"
      />
      <Box width={"100%"} mt={-7}>
        <Button float={"right"}>Edit Profile</Button>
      </Box>
    </Box>
    <Stack mt='1' spacing='1'>
      <Heading size='md' mt={-3}>Vonzyyy <Icon color={"blue.300"} as={AiFillCheckCircle} /></Heading>
      <Text fontWeight={"light"} fontSize={15}>@vonzy_ajah </Text>
      <Text>aku tuh lucu banget loh guyyssss yaa ampuuun</Text>
      <Box display={"flex"} gap={5}>
        <Text color={"grey"}>900k followers</Text>  
        <Text color={"grey"}>1.2k following</Text>
      </Box>
    </Stack>
  </CardBody>
    )
}


