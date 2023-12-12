import { Box, IconButton, Paper, SxProps } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useHeader } from "../hooks/useHeader"
import { useMenuDrawer } from "../hooks/useMenuDrawer"
// import { useNotifications } from "../hooks/useNotifications"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useNavigate } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import Logo from "../assets/logo/Avatar.png"

import drone from "../assets/logo/droneIcon.png"

interface HeaderProps {
    back?: boolean
    location?: string
    style?: SxProps
}

export const Header: React.FC<HeaderProps> = ({ back, location, style }) => {
    const header = useHeader()
    // const notifications = useNotifications()
    const menuDrawer = useMenuDrawer()
    const navigate = useNavigate()

    const iconStyle: SxProps = {
        width: "7vw",
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
                padding: "4vw",
                fontSize: "5vw",
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
            <Box style={{ flexDirection: "row", gap: "4vw" }}>
                <SearchIcon sx={{ color: "#fff" }} />
                <NotificationsNoneIcon sx={{ color: "#fff" }} />
                <img
                    src={Logo}
                    style={{ color: "#fff", width:"6vw",height:"6vw" }}
                    onClick={() => {
                        menuDrawer.toggle()
                        console.log("menu abriu")
                    }}
                />
            </Box>
        </Paper>
    )
}
