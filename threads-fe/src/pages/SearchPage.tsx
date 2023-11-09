import Navbar from "@/features/sidebarleft/sidebarleft";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBarRight from "@/features/sidebarright/sidebarright";
import Search from "@/features/thread/components/Search";

export default function SearchPage() {
  return (
    <>
      <Box display={"flex"}>
        <Grid templateColumns="repeat(6, 1fr)">
          <GridItem colSpan={1}>
            <Navbar />
          </GridItem>
          <GridItem colSpan={3}>
            <Search />
          </GridItem>
          <GridItem colSpan={2}>
            <SideBarRight />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
