import PoweredBy from "@/components/poweredby";
import ProfileKanan from "@/components/profile";
import SuggestedFollow from "@/components/suggested";
import { Box } from "@chakra-ui/react";

export function SideBarRight(){
    return(
        <>
        <Box>
        <ProfileKanan />
        <SuggestedFollow />
        <PoweredBy />
        </Box>
        </>
    )
}

export default SideBarRight