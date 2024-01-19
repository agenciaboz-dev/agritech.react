import { Box } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"
import { IoIosArrowForward } from "react-icons/io"
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
}

export const OpenCallBox: React.FC<OpenCallBoxProps> = ({ data, click, callStatus, call, user }) => {
    const { tillageid } = useParams()
    return !call?.approved && callStatus ? (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: "6vw",
                borderRadius: "5vw",
                gap: "3vw",
                height: "45%",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ gap: "3vw" }}>
                <p style={{ fontSize: "4.5vw", fontWeight: "600" }}>Aguardando aprovação</p>
                {user && user.producer ? (
                    <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>
                        Agora seu chamado será analisado por nossa equipe e em breve te retornaremos um feedback de aprovado
                        ou reprovado.
                    </p>
                ) : user && user.isAdmin ? (
                    <>
                        <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>
                            Este chamado está em análise nesse momento. Faça alguma ação para que o cliente possa ter
                            feedback.
                        </p>
                        <p
                            style={{ fontSize: "3.2vw", textAlign: "end", width: "100%", color: colors.primary }}
                            onClick={click}
                        >
                            {" "}
                            {user?.isAdmin ? "Aprovar Chamado" : data.buttonTitle}
                        </p>
                    </>
                ) : (
                    <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>Este chamado está em análise nesse momento.</p>
                )}
            </Box>
        </Box>
    ) : (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: "6vw",
                borderRadius: "5vw",
                gap: "3vw",
                height: "45%",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ gap: "3vw" }}>
                <p style={{ fontSize: "4.5vw", fontWeight: "600" }}>{data.title}</p>
                <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>
                    {" "}
                    Abra um chamado para que nossa equipe encaminhe-se até o local da Lavoura {tillageid}#, o prazo mínimo do
                    chamado é de de 48 horas segundo o contrato vigente.
                </p>
            </Box>
            <p style={{ fontSize: "3.2vw", textAlign: "end", width: "100%", color: colors.primary }} onClick={click}>
                {data.buttonTitle}
            </p>
        </Box>
    )
}
export const ProgressCall: React.FC<OpenCallBoxProps> = ({ data, click, call, user }) => {
    const { listKits } = useKits()

    const kitSelected = listKits.find((item) => item.id === call?.kitId)

    return (
        <Box
            sx={{
                bgcolor: "rgba(136, 164, 134, 0.29)",
                p: "4vw",
                borderRadius: "5vw",
                gap: "1vw",
                height: "53%",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ gap: "1vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "4.5vw", fontWeight: "600" }}>Chamado Aberto</p>

                    <IoIosArrowForward sx={{ color: colors.button }} onClick={click} />
                </Box>
                <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>
                    {" "}
                    {user?.producer
                        ? `Seu chamado foi aprovado. Para que nossa equipe encaminhe-se até o local Lavoura ${call?.tillageId}#, o prazo mínimo do chamado é de 48 horas, segundo o contrato vigente.`
                        : "A equipe pode iniciar o chamado a qualquer momento. Siga as etapas."}
                </p>
            </Box>
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: "8vw" }}>
                    {new Date().getHours()}:{new Date().getMinutes()}
                </p>
            </Box>
            <Box sx={{ flexDirection: "row", height: "25%", gap: "2vw" }}>
                <Box sx={{ border: "1px solid gray", width: "50%", borderRadius: "2vw", height: "100%", p: "2vw" }}>
                    <p style={{ fontSize: "3vw" }}>Kit selecionado:</p>
                    <p style={{ fontSize: "3vw" }}>{kitSelected?.name}</p>
                </Box>
                <Box sx={{ border: "1px solid gray", width: "50%", borderRadius: "2vw", height: "100%", p: "2vw" }}>
                    <p style={{ fontSize: "3vw" }}>Chamado aberto em:</p>
                    <p style={{ fontSize: "3vw" }}>{call?.open && dateFrontend(call?.open)}</p>
                </Box>
            </Box>
        </Box>
    )
}
