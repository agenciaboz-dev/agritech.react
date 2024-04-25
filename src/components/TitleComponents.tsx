import { Box, Button, SxProps, useMediaQuery } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"

interface TitleComponentsProps {
    title: string
    button?: boolean
    textButton?: string
    location?: string
    style?: React.CSSProperties | undefined
    styleButton?: boolean
    variant?: boolean
    click?: React.MouseEventHandler<HTMLButtonElement> | undefined
    submit?: boolean
    disabled?: boolean
}

export const TitleComponents: React.FC<TitleComponentsProps> = ({
    submit,
    title,
    button,
    textButton,
    click,
    style,
    variant,
    disabled,
    styleButton,
}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ ...style, fontWeight: title === "Responsáveis" ? "bold" : "normal" }}>{title}</p>
                {button && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            bgcolor: styleButton ? colors.secondary : colors.button,
                            textTransform: "none",
                            borderRadius: "5vw",
                        }}
                        onClick={click}
                        type={submit ? "submit" : "button"}
                        disabled={disabled}
                    >
                        {textButton ? textButton : "Adicionar"}
                    </Button>
                )}
            </Box>
            {!variant && <hr style={{ color: "#88A486" }} />}
        </Box>
    )
}
