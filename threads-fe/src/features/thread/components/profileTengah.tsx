import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Icon,
  Stack,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
import { useParams } from "react-router-dom";
import { API } from "@/lib/api";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/user";
import { BsImages } from "react-icons/bs";
import { ThreadCard } from ".";
import { useThreads } from "@/hooks/useThreads";

export default function ProfileTengah() {
  // const auth = useSelector((state: RootState) => state.auth);
  const [data, setUserData] = useState<IUser>();
  const { handlePost, handleChange, threads } = useThreads();
  const id = useParams();

  async function fetchData() {
    const response = await API.get(`/userprofile/${id.id}`);
    console.log("userpro", response);
    setUserData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <Card margin={2} padding={1}>
        <CardBody>
          <Box display={"flex"} flexDirection={"column"}>
            <Image
              borderRadius={10}
              src="https://media.hitekno.com/thumbs/2022/07/31/90849-vonzy-brand-ambassador-onic-esports/730x480-img-90849-vonzy-brand-ambassador-onic-esports.jpg"
            />
            <Image
              height={"100px"}
              width={"100px"}
              objectFit={"cover"}
              mt={-16}
              ml={3}
              borderRadius={"50%"}
              border={"4px solid white"}
              src={data?.picture}
            />
          </Box>
          <Stack mt="1" spacing="1">
            <Heading size="md" mt={2}>
              {data?.fullname}{" "}
              <Icon color={"blue.300"} as={AiFillCheckCircle} />
            </Heading>
            <Text fontWeight={"light"} fontSize={15}>
              @{data?.username}{" "}
            </Text>
            <Text>{data?.description}</Text>
            {/* <Box display={"flex"} gap={5}>
            <Text color={"grey"}>{data?.followings_count} followers</Text>
            <Text color={"grey"}>{data?.followers_count} followings</Text>
          </Box> */}
          </Stack>
        </CardBody>
      </Card>

      {threads.map((item) => {
        if (item.user.id === data?.id) {
          return (
            <ThreadCard
              key={item.id}
              content={item.content}
              image={item.image}
              user={item.user}
              posted_at={item.posted_at}
              likes_count={item.likes_count}
              replies_count={item.replies_count}
              is_liked={item.is_liked}
              id={item.id}
            />
          );
        }
      })}
    </>
  );
}
