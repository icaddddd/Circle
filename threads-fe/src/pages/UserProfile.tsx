import Navbar from "@/features/sidebarleft/sidebarleft";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBarRight from "@/features/sidebarright/sidebarright";
import ProfileKanan from "@/components/profile";
import HomeBarProfile from "@/features/thread/components/HomeBarProfile";

export default function UserProfile(){

    return (
        <>
    <Box display={"flex"}>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colSpan={1}>
            <Navbar/>
        </GridItem>
        <GridItem colSpan={3}>
          <ProfileKanan/>
          <HomeBarProfile/>
        </GridItem>
        <GridItem colSpan={2}>
          <SideBarRight />
        </GridItem>
      </Grid>
    </Box>
    
    </>
    )
}