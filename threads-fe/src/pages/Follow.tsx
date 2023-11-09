import Navbar from "@/features/sidebarleft/sidebarleft";
import SideBarRight from "@/features/sidebarright/sidebarright";
import { FollowCard } from "@/features/thread/components/FollowCard";
import { API } from "@/lib/api";
import { GET_FOLLOWS, SET_FOLLOW_STATE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import {
  Box,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Follows() {
  const dispatch = useDispatch();
  const followState = useSelector(
    (state: RootState) => state.follow.followState
  );
  const follows = useSelector((state: RootState) => state.follow.follows);

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    console.log("ini response", response);
    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    getFollowData();
  }, [followState]);

  return (
    <Box display={"flex"}>
      <Grid templateColumns="repeat(6, 1fr)">
        <GridItem w="100%" colSpan={1}>
          <Navbar />
        </GridItem>
        <GridItem w="100%" colSpan={3}>
          <Box display={"flex"} justifyContent={"center"}>
            <Tabs isFitted variant="enclosed" width="600px" marginTop={"20px"}>
              <TabList mb="1em">
                <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followers"))}>
                  Followers
                </Tab>
                <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followings"))}>
                  Followings
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {follows?.map((follow, index) => (
                    <FollowCard
                      key={index}
                      id={follow.id}
                      user_id={follow.user_id}
                      fullname={follow.fullname}
                      username={follow.username}
                      email={follow.email}
                      picture={follow.picture}
                      description={follow.description}
                      is_followed={follow.is_followed}
                    />
                  ))}
                </TabPanel>
                <TabPanel>
                  {follows?.map((follow, index) => (
                    <FollowCard
                      key={index}
                      id={follow.id}
                      user_id={follow.user_id}
                      fullname={follow.fullname}
                      username={follow.username}
                      email={follow.email}
                      picture={follow.picture}
                      description={follow.description}
                      is_followed={follow.is_followed}
                    />
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem w="100%" colSpan={2}>
          <SideBarRight />
        </GridItem>
      </Grid>
    </Box>
  );
}
