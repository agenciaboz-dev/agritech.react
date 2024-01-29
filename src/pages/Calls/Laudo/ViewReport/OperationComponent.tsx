import { Box } from "@mui/material"
import React from "react"
import { Call } from "../../../../definitions/call"

interface OperationComponentProps {
    operation?: Operation
    call?: Call
}

export const OperationComponent: React.FC<OperationComponentProps> = ({ operation, call }) => {
    return (
        <Box sx={{ gap: "2vw" }}>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Tipo de Serviço:</span> {operation?.service}{" "}
            </p>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Cultura:</span> {operation?.culture}{" "}
            </p>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Área Mapeada:</span> {operation?.areaMap} ha{" "}
            </p>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Equipamento:</span> {operation?.equipment}{" "}
            </p>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Modelo:</span> {operation?.model}{" "}
            </p>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Piloto/Copiloto:</span> {operation?.model}{" "}
            </p>
            <p style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Custo total:</span> {call?.totalPrice}{" "}
            </p>
        </Box>
    )
}
