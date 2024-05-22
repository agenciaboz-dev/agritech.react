import { Box, IconButton, useMediaQuery } from "@mui/material"
import React, { useEffect } from "react"
import { ActionIcon, Group, Menu } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Call } from "../../definitions/call"
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
    const { removeCallApprove } = useCall()
    const io = useIo()

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
        <Box
            sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            // onClick={() => navigate(call?.approved ? `/adm/producer/${call.producerId}/${call?.talhao?.tillageId}` : "")}
        >
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                        {new Date(Number(call?.forecast)).toLocaleDateString("pt-br")}
                    </p>
                </Box>
                <p style={{ fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: "600" }}>
                    {call?.approved
                        ? `Chamado aberto para ${call?.producer?.user?.name}`
                        : `Chamado pendente para ${call?.producer?.user?.name}`}
                </p>
                <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray", flexDirection: "column" }}>
                    {call?.talhao?.name} -{" "}
                    {call?.approved
                        ? `Utilizando #Kit ${call.kit?.name}`
                        : account.user?.isAdmin
                        ? "Selecione um kit"
                        : "Aguardando aprovação"}
                </p>
            </Box>
            {!review ? (
                <Group gap={0} justify="flex-end">
                    <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots
                                    style={{ width: isMobile ? "7vw" : "2vw", height: isMobile ? "7vw" : "2vw" }}
                                    stroke={2}
                                />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => {
                                    navigate(`/adm/producer/${call?.producerId}/${call?.talhao?.tillageId}`)
                                }}
                            >
                                Ver Fazenda
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    navigate(`/adm/profile/${call?.producer?.user?.id}`)
                                }}
                            >
                                Ver Cliente
                            </Menu.Item>
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
                <IconButton onClick={() => navigate(account.user?.isAdmin ? `/adm/calls/${call?.id}` : `/call/${call?.id}`)}>
                    <IoIosArrowForward style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "5vw" : "2vw" }} />
                </IconButton>
            )}
        </Box>
    ) : (
        <Box
            sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 1 }}
            onClick={() => navigate(`/producer/tillage/${call?.talhao?.tillageId}`)}
        >
            <Box sx={{ flexDirection: "column", justifyContent: "space-between", width: 0.9 }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: isMobile ? "2vw" : "1vw", width: 0.9 }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                        {" "}
                        {new Date(Number(call?.open)).toLocaleDateString("pt-br")} -{" "}
                        {new Date(Number(call?.open)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>

                <p
                    style={{
                        fontSize: isMobile ? "1rem" : "1.2rem",
                        fontWeight: "600",
                        width: "100%",
                        // maxWidth: "90%", // Defina a largura máxima em vez de largura
                        textOverflow: "ellipsis", // Adicione reticências ao texto que ultrapassa o limite de largura
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                >
                    Chamado aberto para {call?.talhao?.tillage?.name}
                </p>

                <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                    {call?.approved
                        ? `Previsão: ${new Date(Number(call.forecast)).toLocaleDateString("pt-br")}`
                        : "Aguardando aprovação "}
                </p>
            </Box>

            <Box sx={{ width: 0.1 }}>
                <IconButton onClick={() => navigate(`/producer/calls/${call?.id}`)}>
                    <IoIosArrowForward style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "5vw" : "2vw" }} />
                </IconButton>
            </Box>
        </Box>
    )
}
