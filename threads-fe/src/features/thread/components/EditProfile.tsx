import { useEditProfile } from "@/hooks/useEditProfile";
import { RootState } from "@/stores/types/rootState";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsImages } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const { handlePostEditProfile, handleChangeEditProfile } = useEditProfile();
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
          width={"800px"}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form
              onSubmit={handlePostEditProfile}
              encType="multipart/form-data"
            >
              <Stack spacing={4}>
                <Input hidden value={auth.id}/>
                <FormControl id="fullname" isRequired>
                  <Input
                    type="fullname"
                    placeholder="Fullname"
                    name="fullname"
                    onChange={handleChangeEditProfile}
                  />
                </FormControl>
                <FormControl id="username" isRequired>
                  <Input
                    type="username"
                    placeholder="Username"
                    name="username"
                    onChange={handleChangeEditProfile}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <Input
                    type="description"
                    placeholder="Description"
                    name="description"
                    onChange={handleChangeEditProfile}
                  />
                </FormControl>
                <FormControl id="picture" isRequired>
                  <Input
                    name="picture"
                    onChange={handleChangeEditProfile}
                    mt={2}
                    type="file"
                    border={"none"}
                    display={"none"}
                    id="input-picture"
                  />
                  <label htmlFor="input-picture">
                    <Icon as={BsImages} fontSize={20} cursor={"pointer"} />
                  </label>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                  >
                    Edit Profile
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
