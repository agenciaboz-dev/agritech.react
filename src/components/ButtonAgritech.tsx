import React from "react"
import { Button, ButtonProps, SxProps } from "@mui/material"
import { colors } from "../style/colors"

interface ButtonAgritechProps {
    children: React.ReactNode
}

export const ButtonAgritech: React.FC<ButtonProps> = (props) => {
    const button_style: SxProps = {
        padding: "3vw",

        fontWeight: "600",
        textTransform: "none",
        borderRadius: "10vw",
        height: "10vw",
    }
    return <Button {...props} sx={[props.sx, button_style]}></Button>
}
