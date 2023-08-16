import Navbar from "@/features/sidebarleft/sidebarleft";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBarRight from "@/features/sidebarright/sidebarright";
import { Detail } from "@/features/thread/components/Detail";

export default function DetailPage(){

  

    return (
        <>
    <Box display={"flex"}>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem w='100%' colSpan={1}>
            <Navbar/>
        </GridItem>
        <GridItem w='100%' colSpan={3}>
          <Detail/>
        </GridItem>
        <GridItem w='100%' colSpan={2}>
          <SideBarRight />
          </GridItem>
        </Grid>
    </Box>
    
    </>
    )
}