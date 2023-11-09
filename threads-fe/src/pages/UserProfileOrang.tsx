import Navbar from "@/features/sidebarleft/sidebarleft";
import SideBarRight from "@/features/sidebarright/sidebarright";
import ProfileTengah from "@/features/thread/components/profileTengah";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function UserProfileOrang() {
  return (
    <Box display={"flex"}>
      <Grid templateColumns="repeat(6, 1fr)">
        <GridItem colSpan={1}>
          <Navbar />
        </GridItem>
        <GridItem colSpan={3}>
          <ProfileTengah />
        </GridItem>
        <GridItem colSpan={2}>
          <SideBarRight />
        </GridItem>
      </Grid>
    </Box>
  );
}
