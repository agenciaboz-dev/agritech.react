import { Box, Button, Icon, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import { useNavigationList } from "../../../hooks/useNavigationList"
import { BottomNavigation } from "../../../components/BottomNavigation"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import { useNavigate } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"

interface PanelUserProps {
    user: User
}

export const PanelUser: React.FC<PanelUserProps> = ({ user }) => {
    const bottomMenu = useNavigationList()
    const io = useIo()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const menu = useMenuDrawer()
    const { listUsers } = useUsers()

    useEffect(() => {
        io.on("user:disconnect", () => {
            setUser(null)
            console.log(user)
            snackbar({ severity: "info", text: "Desconectado!" })
        })

        return () => {
            io.off("user:disconnect")
        }
    }, [])

    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: "4vw" }}>
            <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0 4vw" }}>
                <Box
                    sx={{
                        flexDirection: "row",
                        paddingBottom: "2vw",
                        alignItems: "center",
                        paddingTop: " 0vw",
                        gap: "1vw",
                    }}
                >
                    <img src={drone} style={{ width: "10vw" }} />
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: "5vw",
                            fontFamily: "MalgunGothic2",
                            fontWeight: "bold",
                        }}
                    >
                        Painel
                    </p>
                </Box>
                <Box style={{ flexDirection: "row", gap: "4vw" }}>
                    <SearchIcon sx={{ color: "#fff" }} />
                    <NotificationsNoneIcon sx={{ color: "#fff" }} />
                    <PersonOutlineIcon
                        sx={{ color: "#fff" }}
                        onClick={() => {
                            menu.toggle()
                        }}
                    />
                </Box>
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: colors.primary,
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
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>Início</p>
                </Box>
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        flex: 1,
                        gap: "10vw",
                    }}
                >
                    <Box sx={{ gap: "2vw" }}>
                        <p
                            style={{
                                color: colors.text.black,
                                fontSize: "4.5vw",
                                fontFamily: "MalgunGothic2",
                                textAlign: "left",
                            }}
                        >
                            Aguardando o desenvolvimento...
                        </p>
                    </Box>

                    <Box sx={{ flexDirection: "row" }}>
                        <BottomNavigation section={bottomMenu.admin} external />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
