import { Avatar, Box } from "@mui/material"
import React from "react"
import Lavoura1 from "../../../assets/lavoura.jpg"
import Lavoura2 from "../../../assets/lavoura2.jpg"
import Lavoura3 from "../../../assets/lavoura3.jpg"
import CameraIcon from "../../../assets/icons/camera.svg"
import GalleryIcon from "../../../assets/icons/addphoto.svg"

interface GalleryProps {
    id: number
}

export const Gallery: React.FC<GalleryProps> = ({ id }) => {
    const icon_Style = {
        width: "5vw",
        height: "5vw",
    }
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: "2vw" }}>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <p>Galeria {id}</p>
                <Box sx={{ alignItems: "center", flexDirection: "row", gap: "2vw", mr: "4vw" }}>
                    <img src={CameraIcon} alt="" style={{ width: "11vw", height: "11vw" }} onClick={() => {}} />
                    <img src={GalleryIcon} alt="" style={{ width: "5vw", height: "4.9vw" }} onClick={() => {}} />
                </Box>
            </Box>
            <Box sx={{ flexDirection: "row", gap: "2vw", overflowX: "auto" }}>
                <Avatar variant="rounded" src={Lavoura2} sx={{ width: "20vw", height: "20vw" }} />
                <Avatar variant="rounded" src={Lavoura3} sx={{ width: "20vw", height: "20vw" }} />
                <Avatar variant="rounded" src={Lavoura1} sx={{ width: "20vw", height: "20vw" }} />
                <Avatar variant="rounded" src={Lavoura2} sx={{ width: "20vw", height: "20vw" }} />
                <Avatar variant="rounded" src={Lavoura3} sx={{ width: "20vw", height: "20vw" }} />
            </Box>
        </Box>
    )
}
