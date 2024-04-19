import { Avatar, Box } from "@mui/material"
import React from "react"
import GalleryIcon from "../../../assets/icons/addphoto.svg"
import { ModalGallery } from "../../../pages/Producer/ModalGallery"

interface GalleryProps {
    id: number
    images: { id: number; name: string; file: File; url: string }[]
    open: () => void
}

export const Gallery: React.FC<GalleryProps> = ({ id, images, open }) => {
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: "3vw", height: "100%", pt: "5vw" }}>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", pt: "2vw" }}>
                <p>Galeria</p>

                <img src={GalleryIcon} alt="" style={{ width: "5vw", height: "4.9vw" }} onClick={open} />
            </Box>
            <Box sx={{ flexDirection: "row", gap: "2vw", overflowX: "auto", height: "80%" }}>
                {images.map((item, index) => (
                    <Avatar key={index} variant="rounded" src={item.url} sx={{ width: "20vw", height: "20vw" }} />
                ))}
            </Box>
        </Box>
    )
}
