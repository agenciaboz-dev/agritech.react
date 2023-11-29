import { Box, Button } from "@mui/material"
import React from "react"
import { ContentKit } from "./ContentKit"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import SaveIcon from "../../../assets/icons/floppy_disk.svg"


interface ViewKitProps {
    
}

export const ViewKit: React.FC<ViewKitProps> = ({}) => {
    return (<Box
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
                <p style={{ color: colors.text.white, fontSize: "4vw", fontFamily: "MalgunGothic2", fontWeight:"bold" }}>
                    Kit 1#
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
                            width: "45%",
                            color: colors.text.black,
                        }}
                    >
                        <img src={SaveIcon} style={{ width: "5vw" }} />
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
                <Box sx={{ overflowX: "hidden", overflowY: "auto", height: "88%", p: "0 2vw", }}>
                    <ContentKit />
                </Box>
            </Box>
        </Box>
    </Box>)
}
