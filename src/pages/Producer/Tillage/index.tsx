import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"

interface TillageProps {}

export const Tillage: React.FC<TillageProps> = ({ }) => {
    const header = useHeader()
    useEffect(() => {
        // header.setTitle(`${title}`)
        header.setTitle("Adicionar Lavoura")
    })
    
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="../" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                    }}
                >
                    
                </Box>
            </Box>
        </Box>
    )
}
