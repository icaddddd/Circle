import {Box, Card, Icon, Text} from "@chakra-ui/react"
import { AiFillGithub, AiFillLinkedin, AiFillFacebook, AiFillInstagram } from "react-icons/ai"

export default function PoweredBy(){
    return(
    <>
    <Card margin={2} padding={3} >
    <Box display={"flex"}>
            <Text mr={2}>
                Developed by Sjaaf Rhisjad
            </Text>
            |
            <Icon fontSize={20} as={AiFillGithub} ml={2} />
            <Icon fontSize={20} as={AiFillLinkedin} ml={2} />
            <Icon fontSize={20} as={AiFillFacebook} ml={2} />
            <Icon fontSize={20} as={AiFillInstagram} ml={2} />
    </Box>
    <Box display={"flex"}>
                <Text fontSize={12} mr={2}>Powered by Dumbways Indonesia</Text>
                <Text fontSize={12}>|</Text>
                <Text fontSize={12} ml={2}>#1 Coding Bootcamp</Text>
    </Box>
    </Card>
    </>
    )
}