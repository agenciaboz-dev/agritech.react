import React from "react"
import { Button } from "@mui/material"
import { colors } from "../style/colors"
import { useNavigate } from "react-router-dom"

interface ButtonComponentProps {
    title: string
    location: string
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, location }) => {
    const navigate = useNavigate()
    return (
        <Button
            variant="contained"
            sx={{
                padding: "3vw",
                borderColor: colors.button,
                width: "100%",
                backgroundColor: "#232323",
                borderRadius: "5vw",
                fontWeight: "800",
                textTransform: "none",
                fontSize: "4vw",
            }}
            onClick={() => navigate(location)}
        >
            {title}
        </Button>
    )
}
