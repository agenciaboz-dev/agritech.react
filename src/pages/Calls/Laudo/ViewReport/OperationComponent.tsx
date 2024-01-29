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
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Tipo de Serviço:</p>
                <p style={{ justifyContent: "space-between" }}>{operation?.service} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Cultura:</p>
                <p style={{ justifyContent: "space-between" }}>{operation?.culture} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Área Mapeada:</p>
                <p style={{ justifyContent: "space-between" }}>{operation?.areaMap} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Equipamento:</p>
                <p style={{ justifyContent: "space-between" }}>{operation?.equipment} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Modelo:</p>
                <p style={{ justifyContent: "space-between" }}>{operation?.model} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Piloto/Copiloto:</p>
                <p style={{ justifyContent: "space-between" }}>{operation?.service} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Custo total:</p>
                <p style={{ justifyContent: "space-between" }}>
                    R${" "}
                    {call?.producer?.hectarePrice && operation?.areaMap && call?.producer?.hectarePrice * operation?.areaMap}
                    ,00
                </p>
            </Box>
        </Box>
    )
}
