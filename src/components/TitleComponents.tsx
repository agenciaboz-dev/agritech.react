import { Box, Button } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"

interface TitleComponentsProps {
    title: string
    button?: boolean
}

export const TitleComponents: React.FC<TitleComponentsProps> = ({ title, button }) => {
    return (
        <Box sx={{ gap: "2vw" }}>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "3.5vw", fontWeight: title === "Responsáveis" ? "bold" : "normal" }}>{title}</p>
                {button && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ bgcolor: colors.button, textTransform: "none", borderRadius: "5vw" }}
                    >
                        Adicionar
                    </Button>
                )}
            </Box>
            <hr style={{ color: "#88A486" }} />
        </Box>
    )
}
