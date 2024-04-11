import { Modal, ModalContent } from "@mantine/core"

import React from "react"

import { Box, CircularProgress, IconButton } from "@mui/material"
import { GiPlainCircle } from "react-icons/gi"
import { colors } from "../../style/colors"

interface ModalLegendProps {
    opened: boolean
    close: () => void
}

export const ModalLegend: React.FC<ModalLegendProps> = ({ opened, close }) => {
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
                body: { display: "flex", flexDirection: "column", gap: "6vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            <Box sx={{ flexDirection: "column", gap: "4vw", width: 1 }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <GiPlainCircle color={"#88A486"} style={{ width: "4vw", height: "4vw" }} />
                    <p>Não há nenhum chamado no dia</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <GiPlainCircle color={"#FFD700"} style={{ width: "5.3vw", height: "5.3vw" }} />
                    <p>Atingiu mais da metade do limite de hectares/dia do kit</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <GiPlainCircle color={colors.delete} style={{ width: "4vw", height: "4vw" }} />
                    <p>Atingiu o limite de hectares/dia do kit</p>
                </Box>
            </Box>
        </Modal>
    )
}
