import {Box, Button, Text} from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"

export default function SuggestedFollow(){
    return(
        <><Text fontWeight={"bold"}>Suggested For You</Text><Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
                <Image borderRadius={"full"} height={"45px"} width={"45px"} objectFit={"cover"} src="https://asset-2.tstatic.net/kupang/foto/bank/images/seperti-apa-potret-luna-maya-dalam-pemotretan-terbarunya-yuk-simak.jpg" />
                <Box ml={4}>
                    <Text fontSize={15}>Luna Maya</Text>
                    <Text fontSize={12} fontWeight={"light"}>@lunamaya_ajah</Text>
                </Box>
            </Box>
            <Box>
                <Button width={"100px"} borderRadius={15}>Follow</Button>
            </Box>
        </Box><Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
                <Image borderRadius={"full"} height={"45px"} width={"45px"} objectFit={"cover"} src="https://pict.sindonews.net/webp/480/pena/news/2023/08/07/186/1170127/dipuji-bak-ibu-pejabat-intip-5-potret-anggun-nagita-slavina-pakai-kebaya-rvx.webp" />
                <Box ml={4}>
                    <Text fontSize={15}>Nagita Slavina</Text>
                    <Text fontSize={12} fontWeight={"light"}>@nagita_ajah</Text>
                </Box>
            </Box>
                <Box>
                    <Button width={"100px"} borderRadius={15}>Follow</Button>
                </Box>
            </Box><Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"}>
                    <Image borderRadius={"full"} height={"45px"} width={"45px"} objectFit={"cover"} src="https://imgsrv2.voi.id/bGY-56HbvyoUO8sGClq8xo8itrUbWg3eMl5Fvr0ajk4/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy85NzQ2NC8yMDIxMTAyNTExMTctbWFpbi5jcm9wcGVkXzE2MzUxMzU0NDIuanBn.jpg" />
                    <Box ml={4}>
                        <Text fontSize={15}>Ayu Ting-Ting</Text>
                        <Text fontSize={12} fontWeight={"light"}>@ayutingting_ajah</Text>
                    </Box>
                </Box>
                <Box>
                    <Button width={"100px"} borderRadius={15}>Follow</Button>
                </Box>
            </Box><Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"}>
                    <Image borderRadius={"full"} height={"45px"} width={"45px"} objectFit={"cover"} src="https://asset.kompas.com/crops/PeKoWWgbxD_jeeep0EPXGhtmXEc=/108x131:972x708/750x500/data/photo/2023/02/13/63ea07beaadd2.jpg" />
                    <Box ml={4}>
                        <Text fontSize={15}>Nita Vior</Text>
                        <Text fontSize={12} fontWeight={"light"}>@vior_ajah</Text>
                    </Box>
                </Box>
                <Box>
                    <Button width={"100px"} borderRadius={15}>Follow</Button>
                </Box>
            </Box></>
    )
}