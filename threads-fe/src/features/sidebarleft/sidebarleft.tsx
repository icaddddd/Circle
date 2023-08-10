import { Icon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiUserFollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <>
        <Box padding={5} position={"fixed"}>
          <Text fontSize={50} color={"green"} fontWeight={"bold"}>Circle</Text>
          <Box my={5}>
            <Link to={"/home"}>
              <Text fontSize={25} my={3}><Icon as={AiFillHome} mr={3}></Icon>Home</Text>
            </Link>
            <Text fontSize={25} my={3}><Icon as={AiOutlineSearch} mr={3}></Icon>Search</Text>
            <Text fontSize={25} my={3}><Icon as={RiUserFollowFill} mr={3}></Icon>Follows</Text>
            <Text fontSize={25} my={3}><Icon as={CgProfile} mr={3}></Icon>Profile</Text>
            <Button width={"200px"} colorScheme="green">Create Post</Button>
          </Box>
        </Box>
        </>
    )
}