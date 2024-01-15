import { Box, Button, SxProps } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"

interface TitleComponentsProps {
    title: string
    button?: boolean
    textButton?: string
    location?: string
    style?: React.CSSProperties | undefined
    variant?: boolean
    click?: React.MouseEventHandler<HTMLButtonElement> | undefined
    submit?: boolean
}

export const TitleComponents: React.FC<TitleComponentsProps> = ({
    submit,
    title,
    button,
    textButton,
    click,
    style,
    variant,
}) => {
    return (
        <Box sx={{ gap: "2vw" }}>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ ...style, fontWeight: title === "Responsáveis" ? "bold" : "normal" }}>{title}</p>
                {button && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ bgcolor: colors.button, textTransform: "none", borderRadius: "5vw" }}
                        onClick={click}
                        type={submit ? "submit" : "button"}
                    >
                        {textButton ? textButton : "Adicionar"}
                    </Button>
                )}
            </Box>
            {!variant && <hr style={{ color: "#88A486" }} />}
        </Box>
    )
}
