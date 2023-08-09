import Navbar from "@/features/sidebarleft/sidebarleft";
import PoweredBy from "@/features/sidebarright/poweredby";
import ProfileKanan from "@/features/sidebarright/profile";
import SuggestedFollow from "@/features/sidebarright/suggested";
import { Box, Card } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Home(){
    return (
        <>
    <Box display={"flex"}>
      <Box position={"fixed"} width={"300px"} left={1}>
        <Navbar/>
      </Box>
      <Box justifyContent={"center"} width={"680px"} marginLeft={"21%"}>
        <Outlet/>
      </Box>
      <Box right={5} width={"300px"}>
          <Card width='sm' gap={4} p={1} mt={7} mb={2} mx={2}>
          <ProfileKanan/>
        </Card>
        <Card width='sm' gap={4} p={3} my={2} mx={2}>
          <SuggestedFollow/>
        </Card>
        <Card width='sm' gap={4} p={3} my={2} mx={2}>
          <PoweredBy/>
        </Card>
      </Box>
    </Box>
    </>
    )
}