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
}

export const LogsCard: React.FC<LogsCardProps> = ({ review, call, variant }) => {
    const navigate = useNavigate()
    const account = useUser()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const producerSelected = listUsers?.find((item) => item.producer?.id === call?.producerId)
    const kitSelected = listKits.find((item) => item.id === call?.kitId)

    const tillageSelected = producerSelected?.producer?.tillage?.find((item) => item.id === call?.tillageId)

    return !variant ? (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>11:00 - 13:00</p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>
                    {call?.approved
                        ? `Chamado aberto para ${producerSelected?.name}`
                        : `Chamado pendente para ${producerSelected?.name}`}
                </p>
                <p style={{ fontSize: "3vw", color: "gray", flexDirection: "column" }}>
                    {tillageSelected?.name} - {call?.approved ? `Utilizando #Kit ${kitSelected?.name}` : "Selecione um kit"}
                </p>
            </Box>
            {!review ? (
                <Group gap={0} justify="flex-end">
                    <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: "7vw", height: "7vw" }} stroke={2} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>Ver responsável</Menu.Item>
                            <Menu.Item>Ver Produtor</Menu.Item>
                            <Menu.Item>Editar</Menu.Item>
                            <Menu.Item color="red">Excluir</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            ) : (
                <IconButton
                    onClick={() =>
                        navigate(
                            account.user?.isAdmin
                                ? `/adm/calls/${call?.id}`
                                : `/employee/producer/${call?.producerId}/${call?.tillageId}`
                        )
                    }
                    // onClick={() => navigate(account.user?.isAdmin ? `/adm/call/${user?.id}/report` : `/call/1/report`)}
                >
                    <IoIosArrowForward style={{ width: "5vw", height: "5vw" }} />
                </IconButton>
            )}
        </Box>
    ) : (
        <Box
            sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            onClick={() => navigate(`/producer/tillage/${tillageSelected?.id}`)}
        >
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>11:00 - 13:00</p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Chamado para {tillageSelected?.name}</p>
                <p style={{ fontSize: "3vw", color: "gray" }}>
                    {call?.approved ? `Utilizando #Kit ${kitSelected?.name}` : "Aguardando aprovação"}
                </p>
            </Box>

            {/* <IconButton
                onClick={() => navigate(`/producer/calls/${call?.id}`)}
                // onClick={() => navigate(account.user?.isAdmin ? `/adm/call/${user?.id}/report` : `/call/1/report`)}
            >
                <IoIosArrowForward style={{ width: "5vw", height: "5vw" }} />
            </IconButton> */}
        </Box>
    )
}
