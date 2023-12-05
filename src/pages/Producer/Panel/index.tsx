import { Box, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

interface PanelUserProps {
    user: User
}

export const PanelUser: React.FC<PanelUserProps> = ({ user }) => {
    const io = useIo()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const menu = useMenuDrawer()

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
                        padding: "2vw 5vw",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>Início</p>
                </Box>
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        height: "188vw",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        gap: "10vw",
                    }}
                >
                    <IconButton
                        sx={{
                            bgcolor: colors.button,
                            width: "12vw",
                            height: "12vw",
                            borderRadius: "10vw",
                            position: "absolute",
                            bottom: "26vw",
                            right: "8vw",
                        }}
                        onClick={() => navigate("/producer/new_tillage")}
                    >
                        <AddIcon fontSize="large" sx={{ color: "#fff" }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
