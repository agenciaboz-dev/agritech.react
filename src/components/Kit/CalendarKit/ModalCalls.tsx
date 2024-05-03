import { Modal } from "@mantine/core"

import React from "react"

import { Box, useMediaQuery } from "@mui/material"
import { Call } from "../../../definitions/call"
import { LogsCard } from "../../../pages/Calls/LogsCard"

interface ModalCallsProps {
    opened: boolean
    close: () => void
    callsDay: Call[] | undefined
    kit: Kit | null
}

export const ModalCalls: React.FC<ModalCallsProps> = ({ opened, close, callsDay, kit }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title={<p style={{ fontWeight: "bold" }}>Chamados do Dia</p>}
            styles={{
                body: {
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "6vw" : "1vw",
                    borderRadius: isMobile ? "5vw" : "2vw",
                },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: isMobile ? "5vw" : "2vw" },
            }}
        >
            <Box sx={{ flexDirection: "column", gap: isMobile ? "4vw" : "1vw", width: 1 }}>
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        height: isMobile ? "38%" : "fit-content",
                        overflowY: "auto",
                        p: isMobile ? "2vw 4vw" : "1vw 0",
                        gap: isMobile ? "3vw" : "1vw",
                    }}
                >
                    {kit ? (
                        callsDay?.length !== 0 ? (
                            callsDay?.map((call, index) => <LogsCard key={index} review={false} call={call} />)
                        ) : (
                            "Nenhum chamado aberto para esse dia"
                        )
                    ) : (
                        <p style={{ fontSize: "0.9rem" }}>Selecione um kit para visualizar o calendário</p>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
