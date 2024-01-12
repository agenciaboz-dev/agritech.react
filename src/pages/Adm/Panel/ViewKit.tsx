import { Box, Button } from "@mui/material"
import React, { useEffect } from "react"
import { ContentKit } from "./ContentKit"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import SaveIcon from "../../../assets/icons/floppy_disk.svg"
import { useParams } from "react-router-dom"
import { useKits } from "../../../hooks/useKits"

interface ViewKitProps {}

export const ViewKit: React.FC<ViewKitProps> = ({}) => {
    const { kitid } = useParams()
    const { listKits } = useKits()

    const kit = listKits.filter((item) => item.id === Number(kitid))
    useEffect(() => {
        console.log({ kit })
    }, [])
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
                    paddingBottom: "13vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="../" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: "5vw",
                        justifyContent: "space-between",
                        padding: "2vw 3vw",
                    }}
                >
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: "5vw",
                            fontFamily: "MalgunGothic2",
                            fontWeight: "bold",
                        }}
                    >
                        {kit !== null ? kit[0].name : "Kit"}
                    </p>

                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            alignItems: "center",
                            gap: "1vw",
                            backgroundColor: "#fff",
                            textTransform: "none",
                            borderRadius: "5vw",
                            fontSize: "3vw",
                            width: "40%",
                            color: colors.text.black,
                        }}
                        disabled
                    >
                        Salvar informações
                    </Button>
                </Box>
                <Box
                    style={{
                        padding: "6vw 4vw 0",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        height: "100%",
                        gap: "1vw",
                        overflowY: "hidden",
                    }}
                >
                    <Box sx={{ overflowX: "hidden", overflowY: "auto", height: "88%", p: "0 2vw" }}>
                        {/* <ContentKit /> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
