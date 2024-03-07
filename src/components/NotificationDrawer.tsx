import React from "react"
import { Box, Card, Drawer, MenuItem, SxProps } from "@mui/material"
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
    const navigationItems = useNavigationList()
    const { user } = useUser()
    const notifications = navigationItems.notifications.drawer

    const navigate = useNavigate()

    const { open, setOpen } = useNotificationDrawer()
    const { listNotifications } = useNotification()

    const recents = user && listNotifications?.filter((item) => !item.viewed_by.includes(user.id))

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
        <Drawer
            anchor={"right"}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    padding: "6vw 3vw",
                    width: "78vw",
                    height: "100%",
                    borderTopLeftRadius: "10vw",
                    borderBottomLeftRadius: "10vw",
                    overflowX: "hidden",
                    backgroundColor: "#232323",
                },
            }}
            // ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box sx={{ p: "4vw 4vw 2vw", flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "800", color: colors.text.white, fontFamily: "MalgunGothicBold", fontSize:"1.2rem" }}>
                    {navigationItems.notifications.title} Recentes
                </p>
            </Box>
            <Box sx={{ overflowY: "auto", gap: "8vw", height: "90%" }}>
                <Box>
                    <Box sx={{ flexDirection: "column", paddingTop: "2vw", gap: "vw" }}>
                        {recents?.map((item, index) => (
                            <LogNotification notification={item} drawer key={index} />
                        ))}
                    </Box>
                </Box>
            </Box>
            <p
                style={{
                    fontWeight: "800",
                    color: colors.text.white,
                    fontFamily: "MalgunGothicBold",
                    fontSize: "3.5vw",
                    alignSelf: "end",
                    marginRight: "5vw",
                }}
                onClick={() => {
                    navigate("/notifications/list")
                    setOpen(false)
                }}
            >
                Ver todas
            </p>
        </Drawer>
    )
}
