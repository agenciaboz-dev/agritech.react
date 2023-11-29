import { Box, Button, Icon, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigationList } from "../../../hooks/useNavigationList"
import { BottomNavigation } from "../../../components/BottomNavigation"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import { useNavigate } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { CardUser } from "../../../components/CardUser"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    const bottomMenu = useNavigationList()
    const io = useIo()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const menu = useMenuDrawer()
    const { listUsers } = useUsers()
    const [listEmployee, setListEmployee] = useState<User[]>()
    const [listProducer, setListProducer] = useState<User[]>()

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

    useEffect(() => {
        setListEmployee(listUsers?.filter((users) => users.employee !== null))
        setListProducer(listUsers?.filter((users) => users.producer !== null))
        
    }, [listUsers])
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
                        padding: "1vw 3vw",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>
                        Configuração de Kits
                    </p>
                    <IconButton onClick={() => navigate("/settings-kit")}>
                        <ArrowForwardIosIcon sx={{ color: "#fff", width: "5vw" }} />
                    </IconButton>
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
                            Funcionários Fixados
                        </p>
                        <Box style={{ width: "100%" }}>
                            {listEmployee?.slice(0,3).map((user) => (
                                <CardUser user={user} key={user.id} location={`/profile/${user.id}`} />
                            ))}
                        </Box>
                        <Box
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 20,
                                paddingTop:"5vw"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: "50%",
                                    padding: "2.5vw",
                                    
                                    color: colors.text.white,
                                    fontWeight: "500",
                                    fontSize: "3vw",
                                    textTransform: "none",
                                    borderRadius: "10vw",
                                    height: "10vw",
                                }}
                            >
                                Cadastrar novo funcionário
                            </Button>
                            <Box
                                sx={{
                                    flexDirection: "row",
                                    width: "25%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "1vw",
                                }}
                            >
                                <p
                                    style={{
                                        color: colors.primary,
                                        fontSize: "3.5vw",
                                        fontFamily: "MalgunGothic2",
                                        fontWeight: "500",
                                    }}
                                    onClick={() => {}}
                                >
                                    Ver todos
                                </p>
                                <ArrowForwardIosIcon color="primary" sx={{ width: "2vw" }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ gap: "2vw" }}>
                        <p
                            style={{
                                color: colors.text.black,
                                fontSize: "4.5vw",
                                fontFamily: "MalgunGothic2",
                                textAlign: "left",
                            }}
                        >
                            Produtores Fixados
                        </p>
                        <Box style={{ width: "100%" }}>
                            {listProducer?.slice(0,3).map((user) => (
                                <CardUser user={user} key={user.id} location={`/profile/${user.id}`} />
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
                                    paddingTop:"5vw"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: "50%",
                                        padding: "2.5vw",
                                        color: colors.text.white,
                                        fontWeight: "500",
                                        fontSize: "3vw",
                                        textTransform: "none",
                                        borderRadius: "10vw",
                                        height: "10vw",
                                    }}
                                >
                                    Cadastrar novo produtor
                                </Button>
                                <Box
                                    sx={{
                                        flexDirection: "row",
                                        width: "30%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "1vw",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colors.primary,
                                            fontSize: "3.5vw",
                                            fontFamily: "MalgunGothic2",
                                            fontWeight: "500",
                                        }}
                                        onClick={() => {}}
                                    >
                                        Ver todos
                                    </p>

                                    <ArrowForwardIosIcon color="primary" sx={{ width: "2vw" }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* {Object.entries(user).map(([key, value]) => (
                    <Text key={key}>
                    {key}: {value}
                    </Text>
                ))} */}
                    <Box sx={{ flexDirection: "row" }}>
                        <BottomNavigation section={bottomMenu.admin} external />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
