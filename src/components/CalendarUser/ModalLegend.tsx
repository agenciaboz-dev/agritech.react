import { Modal, ModalContent } from "@mantine/core"

import React from "react"

import { Box, CircularProgress, IconButton, useMediaQuery } from "@mui/material"
import { GiPlainCircle } from "react-icons/gi"
import { colors } from "../../style/colors"

interface ModalLegendProps {
    opened: boolean
    close: () => void
}

export const ModalLegend: React.FC<ModalLegendProps> = ({ opened, close }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title={<p style={{ fontWeight: "bold" }}>Legenda de cores</p>}
            styles={{
                body: { display: "flex", flexDirection: "column", gap: isMobile ? "6vw" : "1vw", borderRadius: isMobile ? "10vw" : "2vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: isMobile ? "6vw" : "2vw" },
            }}
        >
            <Box sx={{ flexDirection: "column", gap: isMobile ? "4vw" : "1vw", width: 1 }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <GiPlainCircle color={"#88A486"} style={{ width: isMobile ? "4vw" : "2vw", height: isMobile ? "4vw" : "2vw" }} />
                    <Box sx={{ width: "90%" }}>
                        <p>Não há nenhum chamado no dia</p>
                    </Box>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <GiPlainCircle color={"#FFD700"} style={{ width: isMobile ? "4vw" : "2vw", height: isMobile ? "4vw" : "2vw" }} />
                    <Box sx={{ width: "90%" }}>
                        <p>Atingiu mais da metade do limite de hectares/dia do kit</p>
                    </Box>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <GiPlainCircle color={colors.delete} style={{ width: isMobile ? "4vw" : "2vw", height: isMobile ? "4vw" : "2vw" }} />
                    <Box sx={{ width: "90%" }}>
                        <p>Atingiu o limite de hectares/dia do kit</p>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
