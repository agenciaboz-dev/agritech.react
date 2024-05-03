import React, { useEffect } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Box, Button, useMediaQuery } from "@mui/material"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { LogNotification } from "./LogNotification"
import { useNotification } from "../../hooks/useNotifications"

interface NotificationsListProps {
    user: User
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const { listNotifications } = useNotification()
    const sortedList = listNotifications?.sort((a, b) => Number(b.datetime) - Number(a.datetime))

    useEffect(() => {
        header.setTitle("Notificações")
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflowY: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "1vw",
                    flexDirection: "row",
                    paddingBottom: isMobile ? "13vw" : "5vw",
                    flex: 1,
                }}
            >
                <Header back location={user.isAdmin ? "/adm" : user.producer !== null ? "/producer" : "/employee"} />
            </Box>
            <Box
                sx={{
                    justifyContent: "center",
                    flex: 1,
                    height: "100%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    padding: isMobile ? "1vw 0" : 0,
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: isMobile ? "5vw" : "1vw",
                        justifyContent: "space-between",
                        padding: isMobile ? "3vw" : "1vw",
                        overflowY: "hidden",
                    }}
                >
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: isMobile ? "5vw" : "2rem",
                            fontFamily: "MalgunGothic2",
                        }}
                    >
                        Notificações
                    </p>
                </Box>
                <Box
                    sx={{
                        padding: isMobile ? "3vw" : "1vw",
                        width: "100%",

                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        height: "100%",
                        mt: isMobile ? "1vw" : 0,
                        overflowY: "auto",
                    }}
                >
                    <Box
                        sx={{
                            height: "90%",
                            width: 1,
                            gap: isMobile ? "3vw" : "1vw",
                            overflowY: "auto",
                            // paddingBottom: "400vh",
                            paddingBottom: "40vh",
                        }}
                    >
                        {sortedList?.map((item) => (
                            <Box key={item.id}>
                                <LogNotification drawer={false} notification={item} key={item.id} />
                                {/* <hr /> */}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
