import React from "react"
import { Box, Card, MenuItem, SwipeableDrawer, SxProps, useMediaQuery } from "@mui/material"
import { useNavigationList } from "../hooks/useNavigationList"
import { useNavigate } from "react-router-dom"
import { useNotificationDrawer } from "../hooks/useNotificationDrawer"
import { colors } from "../style/colors"
import { IoIosArrowDown } from "react-icons/io"
import { useNotification } from "../hooks/useNotifications"
import { LogNotification } from "../pages/Notifications/LogNotification"
import { userInfo } from "os"
import { useUser } from "../hooks/useUser"

interface NotificationDrawerProps {}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigationItems = useNavigationList()
    const { user } = useUser()
    const notifications = navigationItems.notifications.drawer

    const navigate = useNavigate()

    const { open, setOpen } = useNotificationDrawer()
    const { listNotifications } = useNotification()

    const recents = user && listNotifications?.filter((item) => !item.viewed_by.includes(user.id))
    const sorted_list = recents?.sort((a, b) => Number(b.datetime) - Number(a.datetime))

    const menuItemStyle: SxProps = {
        fontSize: "3.8vw",
        fontFamily: "MalgunGothicBold",
        height: "fit-content",
        alignItems: "center",
        padding: "0 4vw",
        color: "#fff",
        gap: "5vw",
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <SwipeableDrawer
            disableSwipeToOpen
            onOpen={() => setOpen(true)}
            anchor={"right"}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    padding: isMobile ? "6vw 3vw" : "1vw",
                    width: isMobile ? "78vw" : "30vw",
                    height: "100%",
                    borderTopLeftRadius: isMobile ? "10vw" : "2vw",
                    borderBottomLeftRadius: isMobile ? "10vw" : "2vw",
                    overflowX: "hidden",
                    backgroundColor: "#232323",
                },
            }}
            // ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box sx={{ padding: isMobile ? "4vw 4vw 2vw" : "1vw" }}>
                <p
                    style={{
                        fontWeight: "800",
                        color: colors.text.white,
                        fontFamily: "MalgunGothicBold",
                        fontSize: isMobile ? "4.5vw" : "1.5rem",
                    }}
                >
                    {navigationItems.notifications.title} Recentes
                </p>
            </Box>
            <Box sx={{ overflowY: "auto", gap: "8vw", height: "90%", width: "100%" }}>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Box sx={{ flexDirection: "column", paddingTop: "2vw", gap: "1vw", width: "100%" }}>
                        {sorted_list?.map((item, index) => (
                            <LogNotification notification={item} drawer key={index} />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ padding: isMobile ? "4vw" : "1vw", flexDirection: "row", justifyContent: "flex-end" }}>
                <p
                    style={{
                        fontWeight: "800",
                        color: colors.text.white,
                        fontFamily: "MalgunGothicBold",
                        fontSize: isMobile ? "3.5vw" : "1.5rem",
                        alignSelf: "end",
                        marginRight: isMobile ? "5vw" : "1vw",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        navigate("/notifications/list")
                        setOpen(false)
                    }}
                >
                    Ver todas
                </p>
            </Box>
        </SwipeableDrawer>
    )
}
