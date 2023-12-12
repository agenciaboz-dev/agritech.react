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

// import CircumIcon from "@klarr-agency/circum-icons-react" // React

import { SxProps } from "@mui/material"
import { useUser } from "./useUser"

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
                title: "Cadastrar Funcionário",
                location: "/adm/new_employee",
                icon: <img src={AddEmployee} style={{ width: "6vw" }} />,
            },
            {
                id: 3,
                title: "Cadastrar Produtor",
                location: "/adm/new_producer",
                icon: <img src={AddUser} style={{ width: "6vw" }} />,
            },
            {
                id: 4,
                title: "Fixados",
                location: "/adm/fixed",
                icon: <img src={Pin} style={{ width: "6vw" }} />,
            },
            {
                id: 5,
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
                title: "Conversas",
                location: "/chats",
                icon: <img src={Chats} alt="Logotipo do App" />,
            },
            {
                id: 3,
                title: "Calendário",
                location: "/calendary",
                icon: <img src={Calendar} alt="Logotipo do App" />,
            },

            {
                id: 4,
                title: "Estatísticas",
                location: "/statistics",
                icon: <img src={Statistics} alt="Logotipo do App" />,
            },
            {
                id: 5,
                title: "Análises",
                location: "/reviews",
                icon: <img src={Analysis} alt="Logotipo do App" />,
            },
        ],
    }

    const producer: NavigationMenu = {
        id: 2,
        title: "Produtor",
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
                title: "Cadastrar Lavoura",
                location: "/producer/new_tillage",
                icon: <img src={AddEmployee} style={{ width: "6vw" }} />,
            },
            {
                id: 4,
                title: "Fixados",
                location: "/producer/fixed",
                icon: <img src={Pin} style={{ width: "6vw" }} />,
            },
        ],
        bottom: [
            {
                id: 1,
                title: "Painel",
                location: "/panel",
                icon: <GridViewIcon sx={iconStyle} />,
            },
            {
                id: 2,
                title: "Conversas",
                location: "/chats",
                icon: <ChatIcon sx={iconStyle} />,
            },
            {
                id: 3,
                title: "Transações",
                location: "/transactions",
                icon: <SwapHorizIcon sx={iconStyle} />,
            },
        ],
    }

    const employee: NavigationMenu = {
        id: 3,
        title: "Funcionário",
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
                title: "Cadastrar produtor",
                location: "/employee/new_producer",
                icon: <img src={AddEmployee} style={{ width: "6vw" }} />,
            },
            {
                id: 3,
                title: "Abrir chamado",
                location: "/employee/new_call",
                icon: <img src={AddUser} style={{ width: "6vw" }} />,
            },
            {
                id: 4,
                title: "Fixados",
                location: "/employee/fixed",
                icon: <img src={Pin} style={{ width: "6vw" }} />,
            },
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
                title: "Conversas",
                location: "/chats",
                icon: <ChatIcon sx={iconStyle} />,
            },
            {
                id: 3,
                title: "Solicitações",
                location: "/requests",
                icon: <StorefrontIcon sx={iconStyle} />,
            },
        ],
    }

    return { admin, employee, producer }
}
