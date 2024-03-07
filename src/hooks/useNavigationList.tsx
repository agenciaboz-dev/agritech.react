import ChatIcon from "@mui/icons-material/Chat"
import GridViewIcon from "@mui/icons-material/GridView"
import StorefrontIcon from "@mui/icons-material/Storefront"
import MultipleStopIcon from "@mui/icons-material/MultipleStop"
import BarChartIcon from "@mui/icons-material/BarChart"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import AppsIcon from "@mui/icons-material/Apps"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import GridPanel from "../assets/icons/view-grid.svg"
import Chats from "../assets/icons/chat-lines.svg"
import Calendar from "../assets/icons/calendar.svg"
import Analysis from "../assets/icons/page-search.svg"
import Statistics from "../assets/icons/stat-up.svg"
import User from "../assets/icons/user.svg"
import AddUser from "../assets/icons/add-user.svg"
import AddEmployee from "../assets/icons/add-database-script.svg"
import Pin from "../assets/icons/pin.svg"
import Timer from "../assets/icons/timer.svg"
import Receipt from "../assets/icons/receipt.svg"
import Alert from "../assets/icons/circle_alert.svg"
import Database from "../assets/icons/database.svg"
import { PiPlantLight } from "react-icons/pi"
import { CiViewTable } from "react-icons/ci"

// import CircumIcon from "@klarr-agency/circum-icons-react" // React

import { SxProps } from "@mui/material"
import { useUser } from "./useUser"
import { CardNotification } from "../components/CardNotification"

export const useNavigationList = () => {
    const { user } = useUser()

    const iconStyle: SxProps = { color: "#232323" }

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
                icon: <img src={User} style={{ padding: "0 1.5vw", width: "7vw" }} />,
            },
            {
                id: 2,
                title: "Cadastrar Colaborador",
                location: "/adm/new_employee",
                icon: <img src={AddEmployee} style={{ width: "6vw" }} />,
            },
            {
                id: 3,
                title: "Cadastrar Cliente",
                location: "/adm/new_producer",
                icon: <img src={AddUser} style={{ width: "6vw" }} />,
            },
            // {
            //     id: 4,
            //     title: "Fixados",
            //     location: "/adm/fixed",
            //     icon: <img src={Pin} style={{ width: "6vw" }} />,
            // },
            {
                id: 5,
                title: "Relatórios",
                location: "/adm/reports",
                icon: <CiViewTable style={{ width: "7vw", height: "6vw", paddingLeft: 0, paddingRight: 0 }} />,
            },
            {
                id: 6,
                title: "Histórico",
                location: "/adm/history",
                icon: <img src={Timer} style={{ width: "6vw" }} />,
            },
        ],
        bottom: [
            {
                id: 1,
                title: "Painel",
                location: "/",
                icon: <img src={GridPanel} alt="Logotipo do App" />,
            },

            {
                id: 2,
                title: "Calendário",
                location: "/calendar",
                icon: <img src={Calendar} alt="Logotipo do App" />,
            },

            {
                id: 3,
                title: "Chamados",
                location: "/calls",
                icon: <img src={Alert} alt="Logotipo do App" style={{ width: "6vw" }} />,
            },
            {
                id: 4,
                title: "Análises",
                location: "/reviews",
                icon: <img src={Analysis} alt="Logotipo do App" />,
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
            // {
            //     id: 4,
            //     title: "Fixados",
            //     location: "/producer/fixed",
            //     icon: <img src={Pin} style={{ width: "6vw" }} />,
            // },
        ],
        bottom: [
            {
                id: 1,
                title: "Painel",
                location: "/",
                icon: <GridViewIcon sx={iconStyle} />,
            },

            // {
            //     id: 2,
            //     title: "Transações",
            //     location: "/transactions",
            //     icon: <SwapHorizIcon sx={iconStyle} />,
            // },
            {
                id: 3,
                title: "Chamados",
                location: "/requests",
                icon: <img src={Alert} alt="Logotipo do App" style={{ width: "6vw" }} />,
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

            // {
            //     id: 5,
            //     title: "Fixados",
            //     location: "/employee/fixed",
            //     icon: <img src={Pin} style={{ width: "6vw" }} />,
            // },
        ],

        icon: <img src={GridPanel} />,
        bottom: [
            {
                id: 1,
                title: "Painel ",
                location: "/panel",
                icon: <GridViewIcon sx={iconStyle} />,
            },

            {
                id: 2,
                title: "Chamados",
                location: "/requests",
                icon: <img src={Alert} alt="Logotipo do App" style={{ width: "6vw" }} />,
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
