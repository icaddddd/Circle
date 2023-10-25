import Navbar from "@/features/sidebarleft/sidebarleft";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBarRight from "@/features/sidebarright/sidebarright";
import HomeBarProfile from "@/features/thread/components/HomeBarProfile";
import ProfileTengah from "@/features/thread/components/profileTengah";

export default function UserProfileOrang(){

    return (
        <>
    <Box display={"flex"}>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colSpan={1}>
            <Navbar/>
        </GridItem>
        <GridItem colSpan={3}>
          <ProfileTengah/>
        </GridItem>
        <GridItem colSpan={2}>
          <SideBarRight />
        </GridItem>
      </Grid>
    </Box>
    
    </>
    )
}