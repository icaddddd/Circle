import { useThreads } from "@/hooks/useThreads";
import { RootState } from "@/stores/types/rootState";
import { Icon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiUserFollowFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { handleLogout } = useThreads();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Box padding={5} position={"fixed"}>
        <Text fontSize={50} color={"green"} fontWeight={"bold"}>
          Circle
        </Text>
        <Box my={3}>
          <Link to={"/home"}>
            <Box display={"flex"} alignItems={"center"}>
              <Icon as={AiFillHome} mr={3}></Icon>
              <Text fontSize={20} my={3}>
                Home
              </Text>
            </Box>
          </Link>
          <Box display={"flex"} alignItems={"center"}>
            <Icon as={AiOutlineSearch} mr={3}></Icon>
            <Text fontSize={20} my={3}>
              Search
            </Text>
          </Box>
          <Link to={"/Follows"}>
            <Box display={"flex"} alignItems={"center"}>
              <Icon as={RiUserFollowFill} mr={3}></Icon>
              <Text fontSize={20} my={3}>
                Follows
              </Text>
            </Box>
          </Link>
          <Link to={`/userprofile/${auth.id}`}>
            <Box display={"flex"} alignItems={"center"}>
              <Icon as={CgProfile} mr={3}></Icon>
              <Text fontSize={20} my={3}>
                Profile
              </Text>
            </Box>
          </Link>
          <Button width={"200px"} colorScheme="green">
            Create Post
          </Button>
          <Box
            display={"flex"}
            alignItems={"center"}
            onClick={handleLogout}
            cursor={"pointer"}
          >
            <Icon as={BiLogOut} mr={3}></Icon>
            <Text fontSize={20} my={3}>
              Logout
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
