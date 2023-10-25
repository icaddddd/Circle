import Navbar from "@/features/sidebarleft/sidebarleft";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBarRight from "@/features/sidebarright/sidebarright";
import EditProfile from "@/features/thread/components/EditProfile";

export default function profileEdit() {
  return (
    <>
      <Box display={"flex"}>
        <Grid templateColumns="repeat(6, 1fr)">
          <GridItem colSpan={1}>
            <Navbar />
          </GridItem>
          <GridItem colSpan={3}>
            <EditProfile />
          </GridItem>
          <GridItem colSpan={2}>
            <SideBarRight />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
