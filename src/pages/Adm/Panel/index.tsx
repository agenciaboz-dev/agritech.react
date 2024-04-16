import { Avatar, Badge, Box, Button, IconButton, Skeleton, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigationList } from "../../../hooks/useNavigationList"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import { useNavigate } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { CardUser } from "../../../components/CardUser"
import { useNotificationDrawer } from "../../../hooks/useNotificationDrawer"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { useNotification } from "../../../hooks/useNotifications"
import { useArray } from "burgos-array"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const io = useIo()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const skeletons = useArray().newArray(3)

    const menu = useMenuDrawer()
    const notificationDrawer = useNotificationDrawer()
    const { recents } = useNotification()
    const { listUsers } = useUsers()
    const [listEmployee, setListEmployee] = useState<User[]>()
    const [listProducer, setListProducer] = useState<User[]>()

    useEffect(() => {
        if (listUsers.length == 0) {
            io.emit("users:list")
        }

        io.on("user:disconnect", () => {
            setUser(null)
            console.log(user)
            snackbar({ severity: "info", text: "Desconectado!" })
        })

        return () => {
            io.off("user:disconnect")
        }
    }, [])

    useEffect(() => {
        console.log(listUsers)
        setListEmployee(listUsers?.filter((users) => users.employee !== null))
        setListProducer(listUsers?.filter((users) => users.producer !== null))
    }, [listUsers])

    return (
        <Box
            style={{
                flex: 1,
                backgroundColor: colors.button,
                paddingTop: isMobile ? "3vw" : "1vw",
                position: "relative",
                overflowY: isMobile ? "hidden" : "inherit",
            }}
        >
            <Box
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "3vw 4vw 2vw" : "0 1vw 1vw",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "1vw",
                    }}
                >
                    <img src={drone} style={{ width: isMobile ? "10vw" : "3vw" }} />
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: isMobile ? "5vw" : "1.5rem",
                            fontFamily: "MalgunGothic2",
                            fontWeight: "bold",
                        }}
                    >
                        Painel
                    </p>
                </Box>
                <Box style={{ flexDirection: "row", gap: "4vw" }}>
                    <Badge badgeContent={recents?.length} color="success">
                        <NotificationsNoneIcon
                            sx={{
                                color: "#fff",
                                width: isMobile ? "8vw" : "2vw",
                                height: isMobile ? "8vw" : "2vw",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                notificationDrawer.toggle()
                            }}
                        />
                    </Badge>
                    <Avatar
                        src={user.image}
                        style={{
                            color: "#fff",
                            width: isMobile ? "8vw" : "2vw",
                            height: isMobile ? "8vw" : "2vw",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            menu.toggle()
                            console.log("abriu")
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    p: "1vw 0",
                    flex: 1,
                    backgroundColor: colors.primary,
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",

                    height: "100%",
                }}
            >
                <Box
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: isMobile ? "2vw" : "1.5vw",
                        justifyContent: "space-between",
                        padding: isMobile ? "1vw 4vw 3vw" : "1vw 1vw 1.5vw",
                    }}
                >
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: isMobile ? "5vw" : "1.5rem",
                            fontFamily: "MalgunGothic2",
                        }}
                    >
                        Configuração de Kits
                    </p>
                    <IconButton onClick={() => navigate("/adm/settings-kit")}>
                        <ArrowForwardIosIcon sx={{ color: "#fff", width: "5vw" }} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        padding: isMobile ? "4vw" : "1vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        height: "83vh",
                        maxHeight: "100vh", // Defina uma altura máxima
                        overflowY: "auto", // Habilita a rolagem vertical quando o conteúdo excede a altura máxima
                        position: "relative",
                        paddingBottom: isMobile ? "10vh" : "20vh",
                        gap: isMobile ? "4vw" : "2vw",
                    }}
                >
                    {/* <Box sx={{ gap: isMobile ? "4vw" : "2vw", height: "100vw", overflow: "auto" }}> */}
                    <Box sx={{ gap: isMobile ? "2vw" : 0 }}>
                        <p
                            style={{
                                color: colors.text.black,
                                fontSize: isMobile ? "4.5vw" : "1.5rem",
                                fontFamily: "MalgunGothic2",
                                textAlign: "left",
                            }}
                        >
                            Colaboradores Fixados
                        </p>
                        <Box style={{ width: "100%", gap: "1vw" }}>
                            {listEmployee?.length !== 0
                                ? listEmployee
                                      ?.slice(0, 3)
                                      .map((user) => (
                                          <CardUser user={user} key={user.id} location={`/adm/calendar/${user.id}`} />
                                      ))
                                : skeletons.map((_, index) => (
                                      <Skeleton
                                          animation="wave"
                                          key={index}
                                          variant="rounded"
                                          sx={{ width: 1, height: "13.5vw" }}
                                      />
                                  ))}
                        </Box>
                        <Box
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 20,
                                padding: isMobile ? "2vw 0 0" : "2vw 1vw 0",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: isMobile ? "50%" : "fit-content",
                                    padding: isMobile ? "2.5vw" : "0.5vw 1vw",
                                    color: colors.text.white,
                                    fontWeight: "500",
                                    fontSize: isMobile ? "3vw" : "1.2rem",
                                    textTransform: "none",
                                    borderRadius: "10vw",
                                    height: isMobile ? "10vw" : "fit-content",
                                }}
                                onClick={() => navigate("/adm/new_employee")}
                            >
                                Cadastrar novo colaborador
                            </Button>
                            <Box
                                sx={{
                                    flexDirection: "row",
                                    width: isMobile ? "25%" : "fit-content",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "1vw",
                                }}
                            >
                                <p
                                    style={{
                                        color: colors.primary,
                                        fontSize: isMobile ? "3.5vw" : "1.2rem",
                                        fontFamily: "MalgunGothic2",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        navigate("/adm/employees")
                                    }}
                                >
                                    Ver todos
                                </p>
                                <ArrowForwardIosIcon color="primary" sx={{ width: "3vw", padding: 0 }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ gap: isMobile ? "2vw" : 0 }}>
                        <p
                            style={{
                                color: colors.text.black,
                                fontSize: isMobile ? "4.5vw" : "1.5rem",
                                fontFamily: "MalgunGothic2",
                                textAlign: "left",
                            }}
                        >
                            Clientes Fixados
                        </p>
                        <Box style={{ width: "100%", gap: "1vw" }}>
                            {listProducer?.length !== 0
                                ? listProducer
                                      ?.slice(0, 3)
                                      .map((user) => (
                                          <CardUser user={user} key={user.id} location={`/adm/profile/${user.id}`} />
                                      ))
                                : skeletons.map((_, index) => (
                                      <Skeleton
                                          animation="wave"
                                          key={index}
                                          variant="rounded"
                                          sx={{ width: 1, height: "13.5vw" }}
                                      />
                                  ))}
                        </Box>
                        <Box
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 20,
                            }}
                        >
                            <Box
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: isMobile ? "2vw 0 0" : "2vw 1vw 0",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: isMobile ? "50%" : "fit-content",
                                        padding: isMobile ? "2.5vw" : "0.5vw 1vw",
                                        color: colors.text.white,
                                        fontWeight: "500",
                                        fontSize: isMobile ? "3vw" : "1.2rem",
                                        textTransform: "none",
                                        borderRadius: "10vw",
                                        height: isMobile ? "10vw" : "fit-content",
                                    }}
                                    onClick={() => navigate("/adm/new_producer")}
                                >
                                    Cadastrar novo cliente
                                </Button>
                                <Box
                                    sx={{
                                        flexDirection: "row",
                                        width: isMobile ? "25%" : "fit-content",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "1vw",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colors.primary,
                                            fontSize: isMobile ? "3.5vw" : "1.2rem",
                                            fontFamily: "MalgunGothic2",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            navigate("/adm/producers")
                                        }}
                                    >
                                        Ver todos
                                    </p>
                                    <ArrowForwardIosIcon color="primary" sx={{ width: "3vw", padding: 0 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* </Box> */}
                </Box>
            </Box>
            <IconButton
                sx={{
                    bgcolor: colors.button,
                    width: isMobile ? "12vw" : "3vw",
                    height: isMobile ? "12vw" : "3vw",
                    borderRadius: "50%",
                    position: "sticky",
                    bottom: isMobile ? "10vh" : "13vh",
                    left: isMobile ? "85vw" : "95vw",
                }}
                onClick={() => navigate("/adm/call/new")}
            >
                <PostAddIcon fontSize="medium" sx={{ color: "#fff" }} />
            </IconButton>
        </Box>
    )
}
