import Navbar from "@/features/sidebarleft/sidebarleft";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import HomeBar from "@/features/thread/components/HomeBar";
import SideBarRight from "@/features/sidebarright/sidebarright";

export default function Home(){

  

    return (
        <>
    <Box display={"flex"}>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colSpan={1}>
            <Navbar/>
        </GridItem>
        <GridItem colSpan={3}>
          <HomeBar/>
        </GridItem>
        <GridItem colSpan={2}>
          <SideBarRight />
        </GridItem>
      </Grid>
    </Box>
    
    </>
    )
}