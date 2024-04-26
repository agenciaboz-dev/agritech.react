import { Avatar, Box, useMediaQuery } from "@mui/material"
import React from "react"
import GalleryIcon from "../../../assets/icons/addphoto.svg"
import { ModalGallery } from "../../../pages/Producer/ModalGallery"

interface GalleryProps {
    id: number
    images: { id: number; name: string; file: File; url: string }[]
    open: () => void
}

export const Gallery: React.FC<GalleryProps> = ({ id, images, open }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: isMobile ? "3vw" : "1vw", height: "100%", pt: isMobile ? "5vw" : "1vw" }}>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", pt: isMobile ? "2vw" : 0 }}>
                <p>Galeria</p>

                <img src={GalleryIcon} alt="" style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "4.9vw" : "2vw" }} onClick={open} />
            </Box>
            <Box sx={{ flexDirection: "row", gap: "2vw", overflowX: "auto", height: "80%" }}>
                {images.map((item, index) => (
                    <Avatar
                        key={index}
                        variant="rounded"
                        src={item.url}
                        sx={{ width: isMobile ? "20vw" : "10vw", height: isMobile ? "20vw" : "10vw" }}
                    />
                ))}
            </Box>
        </Box>
    )
}
