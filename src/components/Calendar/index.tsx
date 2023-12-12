import { Box, Button } from "@mui/material"
import React, { useEffect } from "react"
import { colors } from "../../style/colors"
import { Header } from "../Header"
import { useHeader } from "../../hooks/useHeader"
import { useLocation, useParams } from "react-router-dom"
import { useUsers } from "../../hooks/useUsers"
import { useOs } from "@mantine/hooks"

interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = ({}) => {
    const header = useHeader()

    const { userid } = useParams()
    const { listUsers } = useUsers()

    const findUser = listUsers?.find((user) => String(user.id) === userid)
    useEffect(() => {
        header.setTitle(findUser?.name || "")
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
                    flexDirection: "row",
                }}
            >
                <Header back location="../" />
            </Box>

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
                <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
                    <Button
                        variant="contained"
                        sx={{
                            fontSize: 17,
                            color: colors.text.white,
                            width: "100%",
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                        onClick={() => {}}
                    >
                        Próximo
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
