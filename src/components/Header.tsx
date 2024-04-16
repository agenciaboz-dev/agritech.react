import { Avatar, Badge, Box, IconButton, Paper, SxProps, useMediaQuery } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useHeader } from "../hooks/useHeader"
import { useMenuDrawer } from "../hooks/useMenuDrawer"
// import { useNotifications } from "../hooks/useNotifications"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useNavigate } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import Logo from "../assets/logo/Avatar.png"
import drone from "../assets/logo/droneIcon.png"
import { useNotificationDrawer } from "../hooks/useNotificationDrawer"
import { useUser } from "../hooks/useUser"
import { useScrollIntoView } from "@mantine/hooks"
import { useNotification } from "../hooks/useNotifications"

interface HeaderProps {
    back?: boolean
    location?: string
    style?: SxProps
}

export const Header: React.FC<HeaderProps> = ({ back, location, style }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const menuDrawer = useMenuDrawer()
    const notificationDrawer = useNotificationDrawer()
    const navigate = useNavigate()
    const { user } = useUser()
    const { listNotifications, recents } = useNotification()

    const iconStyle: SxProps = {
        width: isMobile ? "7vw" : "2vw",
        height: "auto",
        color: "#fff",
    }

    return (
        <Paper
            elevation={0}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                padding: isMobile ? "4vw" : "1vw",
                fontSize: isMobile ? "5vw" : "1.5rem",
                fontWeight: "bold",
                background: "transparent",
                borderRadius: 0,
                position: "fixed",
                top: 0,
                ...style,
            }}
        >
            <Box sx={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton color="primary" onClick={() => (!back ? menuDrawer.toggle() : navigate(`${location}`))}>
                    {!back ? <img src={drone} style={{ width: 40 }} /> : <KeyboardBackspaceIcon sx={iconStyle} />}
                </IconButton>
                <p style={{ color: "#fff" }}>{header.title}</p>
            </Box>
            {/* <IconButton color="primary" onClick={notifications.toggle}> */}
            <Box style={{ flexDirection: "row", gap: "4vw", alignItems: "center" }}>
                <Badge badgeContent={recents?.length} color="success">
                    {" "}
                    <NotificationsNoneIcon
                        sx={{
                            color: "#fff",
                            width: isMobile ? "8vw" : "2vw",
                            height: isMobile ? "8vw" : "2vw",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            notificationDrawer.toggle()
                            console.log("tem qe abrir")
                        }}
                    />
                </Badge>
                <Avatar
                    src={user?.image}
                    style={{ color: "#fff", width: isMobile ? "8vw" : "2vw", height: isMobile ? "8vw" : "2vw" }}
                    onClick={() => {
                        menuDrawer.toggle()
                        console.log("abriu")
                    }}
                />
            </Box>
        </Paper>
    )
}
