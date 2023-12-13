import { Box } from "@mui/material"
import React from "react"
import green from "../../assets/icons/green.svg"
import yellow from "../../assets/icons/yellow.svg"
import blue from "../../assets/icons/blue.svg"
import { ActionIcon, Group, Menu } from "@mantine/core"
import {IconDots } from "@tabler/icons-react"

interface LogsCardProps {
    variant: boolean
    user: User | undefined
}

export const LogsCard: React.FC<LogsCardProps> = ({ variant, user }) => {
    return (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <img
                        style={{ width: "2vw", height: "2vw" }}
                        src={user?.office === "agronomist" ? green : user?.office === "technician" ? yellow : blue}
                    />
                    <p style={{ fontSize: "3vw", color: "gray" }}>11:00 - 13:00</p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>Chamado aberto para {user?.name}</p>
                <p style={{ fontSize: "3vw", color: "gray" }}>Utilizando #Kit 3</p>
            </Box>
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
        </Box>
    )
}
