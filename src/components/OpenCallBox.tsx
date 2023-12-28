import { Box, IconButton } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"
import { IoIosArrowForward } from "react-icons/io"

interface OpenCallBoxProps {
    data: {
        title: string
        content: string
        buttonTitle?: string
        hour?: string
    }
    click: React.MouseEventHandler<HTMLParagraphElement> | undefined
}

export const OpenCallBox: React.FC<OpenCallBoxProps> = ({ data, click }) => {
    return (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: "6vw",
                borderRadius: "5vw",
                gap: "3vw",
                height: "45%",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    gap: "3vw",
                }}
            >
                <p style={{ fontSize: "4.5vw", fontWeight: "600" }}>{data.title}</p>
                <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>{data.content}</p>
            </Box>
            <p style={{ fontSize: "3.2vw", textAlign: "end", width: "100%", color: colors.primary }} onClick={click}>
                {data.buttonTitle}
            </p>
        </Box>
    )
}
export const ProgressCall: React.FC<OpenCallBoxProps> = ({ data, click }) => {
    return (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: "6vw",
                borderRadius: "5vw",
                gap: "3vw",
                height: "53%",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    gap: "3vw",
                }}
            >
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "4.5vw", fontWeight: "600" }}>{data.title}</p>

                    <IoIosArrowForward sx={{ color: colors.button }} onClick={click} />
                </Box>
                <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>{data.content}</p>
            </Box>
            <p style={{ fontSize: "8vw" }}>{data.hour}</p>
            <Box sx={{ flexDirection: "row", height: "28%", gap: "2vw" }}>
                <Box sx={{ border: "1px solid gray", width: "50%", borderRadius: "2vw", height: "100%", p: "2vw" }}>
                    <p style={{ fontSize: "3vw" }}>Kit selecionado</p>
                    <p style={{ fontSize: "3vw" }}>Kit #2</p>
                </Box>
                <Box sx={{ border: "1px solid gray", width: "50%", borderRadius: "2vw", height: "100%", p: "2vw" }}>
                    <p style={{ fontSize: "3vw" }}>Chamado aberto em:</p>
                    <p style={{ fontSize: "3vw" }}>12/05/2024</p>
                </Box>
            </Box>
        </Box>
    )
}
