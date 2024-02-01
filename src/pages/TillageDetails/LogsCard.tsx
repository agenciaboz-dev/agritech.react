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

interface LogsCardProps {
    review?: boolean
    call?: Call
    variant?: boolean
    talhao: number
}

export const LogsCard: React.FC<LogsCardProps> = ({ review, call, variant, talhao }) => {
    const navigate = useNavigate()
    const account = useUser()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const producerSelected = listUsers?.find((item) => item.producer?.id === call?.producerId)
    const kitSelected = listKits.find((item) => item.id === call?.kitId)

    const tillageSelected = producerSelected?.producer?.tillage?.find((item) => item.id === call?.tillageId)

    return (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>
                        {new Date(Number(call?.open)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>
                    {call?.approved
                        ? `Chamado aberto para ${tillageSelected?.name}`
                        : `Chamado pendente para ${tillageSelected?.name}`}
                </p>
                <p style={{ fontSize: "3vw", color: "gray", flexDirection: "column" }}>
                    Talhão {talhao} - {call?.approved ? `Utilizando #Kit ${kitSelected?.name}` : "Selecione um kit"}
                </p>
            </Box>

            <IconButton
                onClick={() => {}}
                // onClick={() => navigate(account.user?.isAdmin ? `/adm/call/${user?.id}/report` : `/call/1/report`)}
            >
                <IoIosArrowForward style={{ width: "5vw", height: "5vw" }} />
            </IconButton>
        </Box>
    )
}
