import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { Call } from "../definitions/call"
import { useKits } from "../hooks/useKits"
import { dateFrontend } from "../hooks/useFormattedDate"
import { useParams } from "react-router-dom"
import { ButtonAgritech } from "./ButtonAgritech"
interface OpenCallBoxProps {
    data: {
        title: string
        content?: string
        buttonTitle?: string
        hour?: string
    }
    click: React.MouseEventHandler<HTMLParagraphElement> | undefined
    callStatus?: boolean
    call?: Call
    tillage?: Tillage
    user: User | null
    talhao?: Talhao
    setSelectedCall: (value: Call | null) => void
}

export const OpenCallBox: React.FC<OpenCallBoxProps> = ({ data, click, callStatus, call, user, talhao, tillage }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return !call?.approved && callStatus ? (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: isMobile ? "6vw" : "1vw",
                borderRadius: isMobile ? "5vw" : "2vw",
                gap: isMobile ? "3vw" : "1vw",
                height: isMobile ? "45%" : "fit-content",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                {user && user.producer ? (
                    <Box>
                        <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "600" }}>Aguardando aprovação</p>
                        <p style={{ fontSize: isMobile ? "3.2vw" : "1rem", textAlign: "justify" }}>
                            Agora seu chamado será analisado por nossa equipe e em breve te retornaremos um feedback de aprovado ou reprovado.
                        </p>
                    </Box>
                ) : !user?.isAdmin ? (
                    <p style={{ fontSize: isMobile ? "3.2vw" : "1rem", textAlign: "justify" }}>Este chamado está em análise nesse momento.</p>
                ) : (
                    <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "600" }}>Chamado Aprovado</p>
                )}
            </Box>
        </Box>
    ) : (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: isMobile ? "4vw" : "1vw",
                borderRadius: isMobile ? "5vw" : "2vw",
                gap: isMobile ? "3vw" : "1vw",
                height: isMobile ? "25vh" : "fit-content",
                justifyContent: "space-between",
                marginTop: isMobile ? "2vw" : "1vw",
            }}
        >
            <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                <p style={{ fontSize: "1rem", fontWeight: "600" }}>{data.title}</p>
                <p style={{ fontSize: "0.8rem", textAlign: "justify" }}>
                    {" "}
                    Abra um chamado para que nossa equipe encaminhe-se até o local da fazenda {tillage?.name}, o prazo mínimo do chamado é de de 48
                    horas segundo o contrato vigente.
                </p>
            </Box>
            <p
                style={{
                    fontSize: "0.9rem",
                    textAlign: "end",
                    width: "100%",
                    color: colors.primary,
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
                onClick={click}
            >
                {data.buttonTitle}
            </p>
        </Box>
    )
}
export const ProgressCall: React.FC<OpenCallBoxProps> = ({ click, call, user, setSelectedCall, tillage }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { listKits } = useKits()
    const kitSelected = listKits.find((item) => item.id === call?.kitId)

    return (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: isMobile ? "4vw" : "1vw",
                borderRadius: isMobile ? "5vw" : "2vw",
                gap: "1vw",
                height: isMobile ? "53%" : "fit-content",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ gap: "1vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <IoIosArrowBack sx={{ color: colors.button }} onClick={() => setSelectedCall(null)} />
                    <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "600" }}>Chamado Aberto</p>

                    <IoIosArrowForward sx={{ color: colors.button }} onClick={click} />
                </Box>
                <p style={{ fontSize: isMobile ? "3.2vw" : "1rem", textAlign: "justify" }}>
                    {" "}
                    {user?.producer
                        ? `Seu chamado foi aprovado. Para que nossa equipe encaminhe-se até o local da fazenda, o prazo mínimo do chamado é de 48 horas, segundo o contrato vigente.`
                        : `Seu chamado foi aprovado. Para que nossa equipe encaminhe-se até o local da fazenda, o prazo mínimo do chamado é de 48 horas, segundo o contrato vigente.`}
                </p>
            </Box>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: isMobile ? "8vw" : "2rem" }}>{call && new Date(Number(call?.init)).toLocaleTimeString("pt-br")}</p>
            </Box>
            <Box sx={{ flexDirection: "row", height: isMobile ? "25%" : "fit-content", gap: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ border: "1px solid gray", width: "50%", borderRadius: "2vw", height: "100%", p: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>Kit selecionado:</p>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>{kitSelected?.name}</p>
                </Box>
                <Box
                    sx={{
                        border: "1px solid gray",
                        width: isMobile ? "50%" : "fit-content",
                        borderRadius: "2vw",
                        height: "100%",
                        p: isMobile ? "2vw" : "1vw",
                    }}
                >
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>Chamado aberto em:</p>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>{call?.open && new Date(Number(call.open)).toLocaleDateString("pt-br")}</p>
                </Box>
            </Box>
        </Box>
    )
}
export const LaudoCall: React.FC<OpenCallBoxProps> = ({ data, click, call, user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { listKits } = useKits()
    const kitSelected = listKits.find((item) => item.id === call?.kitId)

    return (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: isMobile ? "4vw" : "1vw",
                borderRadius: isMobile ? "5vw" : "2vw",
                gap: "1vw",
                height: isMobile ? "53%" : "fit-content",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ gap: "1vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "600" }}>Chamado em processo de finalização</p>

                    <IoIosArrowForward sx={{ color: colors.button }} onClick={click} />
                </Box>
                <p style={{ fontSize: isMobile ? "3.2vw" : "1rem", textAlign: "justify" }}>
                    {" "}
                    {user?.producer ? `Seu chamado está em processo de finalização. ` : `Este chamado está em processo de finalização. `}
                </p>
            </Box>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: isMobile ? "8vw" : "2rem" }}>{call?.open && new Date(Number(call.open)).toLocaleTimeString("pt-br")}</p>
            </Box>
            <Box sx={{ flexDirection: "row", height: isMobile ? "25%" : "fit-content", gap: isMobile ? "2vw" : "1vw" }}>
                <Box
                    sx={{
                        border: "1px solid gray",
                        width: isMobile ? "50%" : "fit-content",
                        borderRadius: "2vw",
                        height: "100%",
                        p: isMobile ? "2vw" : "1vw",
                    }}
                >
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>Kit selecionado:</p>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>{kitSelected?.name}</p>
                </Box>
                <Box sx={{ border: "1px solid gray", width: "50%", borderRadius: "2vw", height: "100%", p: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>Chamado aberto em:</p>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}> {call?.open && new Date(Number(call.open)).toLocaleDateString("pt-br")}</p>
                </Box>
            </Box>
        </Box>
    )
}
