import React from "react"
import { Button, useMediaQuery } from "@mui/material"
import { colors } from "../style/colors"
import { useNavigate } from "react-router-dom"

interface ButtonComponentProps {
    title: string
    location: string
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, location }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    return (
        <Button
            variant="contained"
            sx={{
                padding: isMobile ? "3vw" : "1vw",
                borderColor: colors.button,
                width: "100%",
                backgroundColor: "#232323",
                borderRadius: "10vw",
                fontWeight: "800",
                textTransform: "none",
                fontSize: isMobile ? "4vw" : "1.2vw",
            }}
            onClick={() => navigate(location)}
        >
            {title}
        </Button>
    )
}
