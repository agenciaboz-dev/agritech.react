import { Box, IconButton } from "@mui/material"
import React, { useEffect } from "react"
import { ActionIcon, Group, Menu } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Call } from "../../definitions/call"
import { useKits } from "../../hooks/useKits"
import { useUsers } from "../../hooks/useUsers"
import { io } from "socket.io-client"
import { useIo } from "../../hooks/useIo"

interface LogsCardProps {
    review?: boolean
    call?: Call
    variant?: boolean
    talhao: Talhao
    tillage?: Tillage
    setSelectedCall: (value: Call) => void
    user: User | null
}

export const LogsCard: React.FC<LogsCardProps> = ({ review, call, variant, talhao, tillage, setSelectedCall }) => {
    const io = useIo()
    const navigate = useNavigate()
    const { user } = useUser()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const kitSelected = listKits.find((item) => item.id === call?.kitId)
    // useEffect(() => {
    //     console.log({ Call: call })
    // }, [])

    const totalTrabalhado = call?.reports?.map((item) => Number(item.areaTrabalhada))
    const sumTotal = totalTrabalhado?.reduce((prev, current) => prev + current, 0) || 0

    useEffect(() => {
        if (listKits.length == 0) io.emit("kit:list")
    }, [])
    return (
        <Box
            sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            onClick={() => {
                if (user?.isAdmin) {
                    if (!call?.approved) {
                        navigate(`/adm/calls/talhao/${talhao.id}/${call?.id}`)
                        call && setSelectedCall(call)
                    } else {
                        navigate(`/adm/call/${call?.id}/laudos`)
                        // if (call?.reports && call.reports[0].stage === 1) {
                        //     console.log("sem relatorio")
                        //     navigate(`/adm/call/${call?.id}/stages/${call?.reports && call.reports[0].id}`)
                        //     call && setSelectedCall(call)
                        // } else {
                        //     navigate(`/adm/call/${call?.id}/report/${call?.reports && call.reports[0].id}`)
                        //     console.log("com relatorio")
                        //     call && setSelectedCall(call)
                        // }
                    }
                }
            }}
        >
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>
                        {new Date(Number(call?.open)).toLocaleDateString("pt-br")}-{" "}
                        {new Date(Number(call?.open)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>
                    {call?.approved && Number(call.talhao?.area) !== sumTotal
                        ? `Chamado Aberto`
                        : call?.approved && Number(call?.talhao?.area) >= sumTotal
                        ? `Chamado Finalizado`
                        : "Chamado Pendente"}
                </p>
                {user?.employee ? (
                    <p style={{ fontSize: "3vw", color: "gray", flexDirection: "column" }}>
                        {talhao.name} -{" "}
                        {call?.approved && Number(call.talhao?.area) !== sumTotal
                            ? `Utilizando #Kit ${kitSelected?.name}`
                            : call?.approved && Number(call?.talhao?.area) >= sumTotal
                            ? `Utilizado #Kit ${kitSelected?.name}`
                            : user?.isAdmin
                            ? "Selecione um kit"
                            : "Aguarde a seleção do kit"}
                    </p>
                ) : (
                    <p style={{ fontSize: "3vw", color: "gray", flexDirection: "column" }}>
                        {call?.approved && Number(call.talhao?.area) !== sumTotal
                            ? ` Previsão da visita: ${new Date(Number(call.forecast)).toLocaleDateString("pt-br")}`
                            : call?.approved && Number(call?.talhao?.area) >= sumTotal
                            ? ``
                            : user?.isAdmin
                            ? "Selecione um kit"
                            : "Aguarde a aprovação"}
                    </p>
                )}
            </Box>

            {user?.employee && (
                <IconButton
                    onClick={() => {
                        if (user?.isAdmin) {
                            if (!call?.approved) {
                                navigate(`/adm/calls/talhao/${talhao.id}/${call?.id}`)
                                call && setSelectedCall(call)
                            } else {
                                navigate(`/adm/call/${call?.id}/laudos`)
                                // if (call?.reports && call.reports[0].stage === 1) {
                                //     console.log("sem relatorio")
                                //     navigate(`/adm/call/${call?.id}/stages/${call?.reports && call.reports[0].id}`)
                                //     call && setSelectedCall(call)
                                // } else {
                                //     navigate(`/adm/call/${call?.id}/report/${call?.reports && call.reports[0].id}`)
                                //     console.log("com relatorio")
                                //     call && setSelectedCall(call)
                                // }
                            }
                        }
                    }}

                    // onClick={() => navigate(account.user?.isAdmin ? `/adm/call/${user?.id}/report` : `/call/1/report`)}
                >
                    <IoIosArrowForward style={{ width: "5vw", height: "5vw" }} />
                </IconButton>
            )}
        </Box>
    )
}
