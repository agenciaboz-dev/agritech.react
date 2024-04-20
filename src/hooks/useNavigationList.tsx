import GridViewIcon from "@mui/icons-material/GridView"
import GridPanel from "../assets/icons/view-grid.svg"
import User from "../assets/icons/user.svg"
import AddUser from "../assets/icons/add-user.svg"
import AddEmployee from "../assets/icons/add-database-script.svg"
import Timer from "../assets/icons/timer.svg"
import Alert from "../assets/icons/circle_alert.svg"
import { PiPlantLight } from "react-icons/pi"
import { CiCalendarDate, CiCircleAlert, CiGrid41, CiViewTable } from "react-icons/ci"
import { SlDocs } from "react-icons/sl"

import { SxProps, useMediaQuery } from "@mui/material"
import { useUser } from "./useUser"

export const useNavigationList = () => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const iconStyle: SxProps = { color: "#232323" }
    const { user } = useUser()

    const admin: NavigationMenu = {
        id: 1,
        title: "Administrador",
        //hidden: user?.adm == false,
        location: "/adm",
        icon: <img src={GridPanel} />,
        drawer: [
            {
                id: 1,
                title: "Meu Perfil",
                location: "/adm/profile",
                icon: (
                    <img
                        src={User}
                        style={{
                            padding: isMobile ? "0 1.5vw" : 0,
                            width: isMobile ? "7vw" : "2vw",
                            height: isMobile ? "auto" : "2vw",
                        }}
                    />
                ),
            },
            {
                id: 2,
                title: "Cadastrar Colaborador",
                location: "/adm/new_employee",
                icon: <img src={AddEmployee} style={{ width: isMobile ? "7vw" : "2vw" }} />,
            },
            {
                id: 3,
                title: "Cadastrar Cliente",
                location: "/adm/new_producer",
                icon: <img src={AddUser} style={{ width: isMobile ? "6vw" : "2vw" }} />,
            },

            {
                id: 5,
                title: "Relatórios",
                location: "/adm/reports",
                icon: (
                    <CiViewTable
                        style={{
                            width: isMobile ? "7vw" : "2vw",
                            height: isMobile ? "6vw" : "auto",
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    />
                ),
            },
        ],
        bottom: [
            {
                id: 1,
                title: "Painel",
                location: "/panel",
                icon: <CiGrid41 style={{ width: isMobile ? "6vw" : "2vw", height: isMobile ? "6vw" : "2vw" }} />,
            },

            {
                id: 2,
                title: "Calendário",
                location: "/calendar",
                icon: <CiCalendarDate style={{ width: isMobile ? "6vw" : "2vw", height: isMobile ? "6vw" : "2vw" }} />,
            },

            {
                id: 3,
                title: "Chamados",
                location: "/calls",
                icon: <CiCircleAlert style={{ width: isMobile ? "6vw" : "2vw", height: isMobile ? "6vw" : "2vw" }} />,
            },
            {
                id: 4,
                title: "Análises",
                location: "/reviews",
                icon: <SlDocs style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "6vw" : "5vw" }} />,
            },
        ],
    }

    const producer: NavigationMenu = {
        id: 2,
        title: "Cliente",
        location: "/producer",
        icon: <img src={GridPanel} alt="Logotipo do App" />,
        drawer: [
            {
                id: 1,
                title: "Meu Perfil",
                location: "/profile",
                icon: <img src={User} style={{ padding: "0 1.5vw", width: "7vw" }} />,
            },

            {
                id: 2,
                title: "Minhas Fazendas",
                location: "/producer/tillages",
                icon: <PiPlantLight style={{ width: "7vw", height: "6vw", paddingLeft: 0, paddingRight: 0 }} />,
            },
            {
                id: 3,
                title: "Cadastrar Fazenda",
                location: "/producer/new",
                icon: <img src={AddEmployee} style={{ width: "6vw" }} />,
            },
        ],
        bottom: [
            {
                id: 1,
                title: "Painel",
                location: "/",
                icon: <CiGrid41 style={{ width: "6vw", height: "6vw" }} />,
            },
            {
                id: 2,
                title: "Chamados",
                location: "/requests",
                icon: <CiCircleAlert style={{ width: "6vw", height: "6vw" }} />,
            },
        ],
    }

    const employee: NavigationMenu = {
        id: 3,
        title: "Colaborador",
        location: "/employee",
        drawer: [
            {
                id: 1,
                title: "Meu Perfil",
                location: "/profile",
                icon: <img src={User} style={{ padding: "0 1.5vw", width: "7vw" }} />,
            },
            {
                id: 2,
                title: "Cadastrar Cliente",
                location: "/employee/new_producer",
                icon: <img src={AddEmployee} style={{ width: "6vw" }} />,
            },
            {
                id: 3,
                title: "Abrir chamado",
                location: "/call/new",
                icon: <img src={AddUser} style={{ width: "6vw" }} />,
            },
        ],

        icon: <img src={GridPanel} />,
        bottom: [
            {
                id: 1,
                title: "Painel ",
                location: "/panel",
                icon: <CiGrid41 style={{ width: "6vw", height: "6vw" }} />,
            },

            // {
            //     id: 3,
            //     title: "Meu Calendário",
            //     location: user?.employee?.kits ? `/calendar/kit/${user?.employee?.kits[0].id}` : "/calendar",
            //     icon: <CiCalendarDate style={{ width: isMobile ? "6vw" : "2vw", height: isMobile ? "6vw" : "2vw" }} />,
            // },
            {
                id: 2,
                title: "Chamados",
                location: "/requests",
                icon: <CiCircleAlert style={{ width: "6vw", height: "6vw" }} />,
            },
        ],
    }
    const notifications: NavigationMenu = {
        id: 4,
        title: "Notificações",
        location: "/",
        drawer: [],

        icon: "",
        bottom: [],
    }

    return { admin, employee, producer, notifications }
}
