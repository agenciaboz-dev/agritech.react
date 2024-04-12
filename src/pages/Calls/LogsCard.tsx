import { Box, IconButton, useMediaQuery } from "@mui/material"
import React, { useEffect } from "react"
import { ActionIcon, Group, Menu } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Call } from "../../definitions/call"
import { useKits } from "../../hooks/useKits"
import { useUsers } from "../../hooks/useUsers"
import { userInfo } from "os"
import { useIo } from "../../hooks/useIo"
import { useCall } from "../../hooks/useCall"

interface LogsCardProps {
    review?: boolean
    call?: Call
    variant?: boolean
}

export const LogsCard: React.FC<LogsCardProps> = ({ review, call, variant }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const account = useUser()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const { user } = useUser()
    const { removeCallApprove } = useCall()
    const io = useIo()
    const producerSelected = listUsers?.find((item) => item.producer?.id === call?.producerId)
    const kitSelected = listKits.find((item) => item.id === call?.kitId)

    const tillageSelected = producerSelected?.producer?.tillage?.find((item) => item.id === call?.tillageId)

    const cancelCall = (call: Call) => {
        io.emit("call:cancel", call)
        console.log({ cancel: call })
    }

    useEffect(() => {
        io.on("call:cancel:success", (call: Call) => {
            removeCallApprove(call)
        })
    }, [])

    return !variant ? (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                        {new Date(Number(call?.forecast)).toLocaleDateString("pt-br")}
                    </p>
                </Box>
                <p style={{ fontSize: isMobile ? "3.5vw" : "1.2rem", fontWeight: "600" }}>
                    {call?.approved ? `Chamado aberto para ${producerSelected?.name}` : `Chamado pendente para ${producerSelected?.name}`}
                </p>
                <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray", flexDirection: "column" }}>
                    {call?.talhao?.name} - {call?.approved ? `Utilizando #Kit ${kitSelected?.name}` : "Selecione um kit"}
                </p>
            </Box>
            {!review ? (
                <Group gap={0} justify="flex-end">
                    <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: isMobile ? "7vw" : "2vw", height: isMobile ? "7vw" : "2vw" }} stroke={2} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                color="red"
                                onClick={() => {
                                    call && cancelCall(call)
                                }}
                            >
                                Cancelar
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            ) : (
                <IconButton
                    onClick={() => navigate(account.user?.isAdmin ? `/adm/calls/${call?.id}` : `/call/${call?.id}/laudos`)}
                    // onClick={() => navigate(account.user?.isAdmin ? `/adm/call/${user?.id}/report` : `/call/1/report`)}
                >
                    <IoIosArrowForward style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "5vw" : "2vw" }} />
                </IconButton>
            )}
        </Box>
    ) : (
        <Box
            sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            onClick={() => navigate(`/producer/tillage/${call?.talhao?.tillageId}`)}
        >
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                        {" "}
                        {new Date(Number(call?.open)).toLocaleDateString("pt-br")} - {new Date(Number(call?.open)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>

                <p style={{ fontSize: isMobile ? "3vw" : "1.2rem", fontWeight: "600" }}>Chamado aberto para {call?.talhao?.tillage?.name}</p>

                <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                    {call?.approved ? `Previsão: ${new Date(Number(call.forecast)).toLocaleDateString("pt-br")}` : "Aguardando aprovação "}
                </p>
            </Box>

            <IconButton
                onClick={() => navigate(`/producer/calls/${call?.id}`)}
                // onClick={() => navigate(account.user?.isAdmin ? `/adm/call/${user?.id}/report` : `/call/1/report`)}
            >
                <IoIosArrowForward style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "5vw" : "2vw" }} />
            </IconButton>
        </Box>
    )
}
