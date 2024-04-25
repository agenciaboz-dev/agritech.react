import React from "react"
import { Button, ButtonProps, SxProps, useMediaQuery } from "@mui/material"
import { colors } from "../style/colors"

interface ButtonAgritechProps {
    children: React.ReactNode
}

export const ButtonAgritech: React.FC<ButtonProps> = (props) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const button_style: SxProps = {
        padding: isMobile ? "3vw" : "1vw",

        fontWeight: "600",
        textTransform: "none",
        borderRadius: "10vw",
        height: isMobile ? "10vw" : "2vw",
    }
    return <Button {...props} sx={[props.sx, button_style]}></Button>
}
