import ChatIcon from "@mui/icons-material/Chat"
import GridViewIcon from "@mui/icons-material/GridView"
import StorefrontIcon from "@mui/icons-material/Storefront"
import MultipleStopIcon from "@mui/icons-material/MultipleStop"
import BarChartIcon from "@mui/icons-material/BarChart"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import AppsIcon from "@mui/icons-material/Apps"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"
import PersonIcon from "@mui/icons-material/Person"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import GridPanel from "../assets/icons/view-grid.svg"
import Chats from "../assets/icons/chat-lines.svg"
import Calendar from "../assets/icons/calendar.svg"
import Analysis from "../assets/icons/page-search.svg"
import Statistics from "../assets/icons/stat-up.svg"

import CircumIcon from "@klarr-agency/circum-icons-react" // React

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
        navigation: [
            {
                id: 1,
                title: "Painel",
                location: "",
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
        navigation: [
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
        navigation: [
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
                title: "Solicitações",
                location: "/requests",
                icon: <StorefrontIcon sx={iconStyle} />,
            },
        ],
    }

    const settings: NavigationMenu = {
        id: 7,
        title: "Configurações",
        location: "/settings",
    }

    const profile: NavigationMenu = {
        id: 8,
        title: "Perfil",
        hidden: true,
        location: "/profile",
        navigation: [
            {
                id: 1,
                title: "Perfil",
                location: "/",
                icon: <AppsIcon />,
            },
            {
                id: 2,
                title: "Seja um Corretor",
                location: "/agent",
                icon: <MultipleStopIcon />,
            },
            {
                id: 3,
                title: "Meu Negócio",
                location: "/business",
                icon: <BarChartIcon />,
            },
            {
                id: 4,
                title: "Minha Transportadora",
                location: "/shipping",
                icon: <LocalShippingIcon />,
            },
        ],
    }

    return { admin, employee, profile, settings, producer }
}
