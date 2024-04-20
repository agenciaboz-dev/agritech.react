import { Box, IconButton } from "@mui/material"
import React, { useEffect } from "react"
import { ActionIcon, Group, Menu } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import { Call } from "../../../definitions/call"
import { useKits } from "../../../hooks/useKits"
import { useUsers } from "../../../hooks/useUsers"
import { Report } from "../../../definitions/report"

interface LogsReportProps {
    review?: boolean
    report?: Report
    variant?: boolean
}

export const LogsReport: React.FC<LogsReportProps> = ({ review, report, variant }) => {
    const navigate = useNavigate()
    const account = useUser()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const producerSelected = listUsers?.find((item) => item.producer?.id === report?.call?.producerId)

    return !variant ? (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>
                        {new Date(Number(report?.techReport?.date)).toLocaleDateString("pt-br")} -{" "}
                        {new Date(Number(report?.techReport?.finish)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>
                    {report?.call?.approved
                        ? `Relatório de ${producerSelected?.name}`
                        : `Relatório de ${producerSelected?.name}`}
                </p>
                <p style={{ fontSize: "3vw", color: "gray", flexDirection: "column" }}>
                    {report?.call?.talhao?.name} -{" "}
                    {report?.call?.approved ? `Utilizado #Kit ${report?.call?.kit?.name}` : "Ver Relatório"}
                </p>
            </Box>
            {!review ? (
                <Group gap={0} justify="flex-end">
                    <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: "8vw", height: "8vw" }} stroke={2} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => {
                                    navigate(`/adm/call/${report?.callId}/report/${report?.id}`)
                                }}
                            >
                                Ver Relatório
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    navigate(`/adm/profile/${report?.call?.producer?.user?.id}`)
                                }}
                            >
                                Ver Cliente
                            </Menu.Item>
                            {/* <Menu.Item>Editar</Menu.Item> */}
                            {/* <Menu.Item color="red">Excluir</Menu.Item> */}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            ) : (
                <IconButton
                    onClick={() =>
                        navigate(
                            account.user?.isAdmin
                                ? `/adm/call/${report?.call?.id}/report/${report?.id}`
                                : `/employee/call/${report?.call?.id}/report/${report?.id}`
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
            // onClick={() => navigate(`/producer/tillage/${tillageSelected?.id}`)}
        >
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>11:00 - 13:00</p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Chamado para {report?.call?.talhao?.tillage?.name}</p>
                <p style={{ fontSize: "3vw", color: "gray" }}>
                    {report?.call?.approved ? `Finalizado` : "Aguardando aprovação"}
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
