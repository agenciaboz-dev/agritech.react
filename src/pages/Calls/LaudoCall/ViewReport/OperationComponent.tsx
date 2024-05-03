import { Box, useMediaQuery } from "@mui/material"
import React, { useEffect } from "react"
import { Call } from "../../../../definitions/call"
import { CurrencyText } from "../../../../components/CurrencyText"
import { Operation } from "../../../../definitions/report"

interface OperationComponentProps {
    operation: Operation
    call: Call
}

export const OperationComponent: React.FC<OperationComponentProps> = ({ operation, call }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Tipo de Serviço:</p>
                <p style={{ justifyContent: "space-between" }}>{operation.service} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Cultura:</p>
                <p style={{ justifyContent: "space-between" }}>{operation.culture} </p>
            </Box>
            {/* <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Área Mapeada do Talhão:</p>
                <p style={{ justifyContent: "space-between" }}>{call?.talhao?.area} ha</p>
            </Box> */}
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Área Mapeada da Fazenda:</p>
                <p style={{ justifyContent: "space-between" }}>{call.talhao?.tillage && call.talhao.tillage.area} ha</p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Equipamento:</p>
                <p style={{ justifyContent: "space-between" }}>{operation.equipment} </p>
            </Box>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Modelo:</p>
                <p style={{ justifyContent: "space-between" }}>{operation.model} </p>
            </Box>

            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Piloto/Copiloto:</p>
                {call.kit?.employees && call.kit?.employees?.length < 2 && <p>{call.kit?.employees[0].user?.name}</p>}
                {call.kit?.employees?.length === 2 && (
                    <p style={{ justifyContent: "space-between" }}>
                        {call?.kit?.employees &&
                            call.kit.employees[0].user &&
                            (call.kit.employees[0].user.office === "pilot"
                                ? call.kit.employees[0].user.name
                                : call.kit.employees && call.kit.employees[1].user?.name)}
                        /
                        {call?.kit?.employees &&
                            call.kit.employees[0].user &&
                            (call.kit.employees[0].user?.office === "copilot"
                                ? call.kit.employees[0].user.name
                                : call.kit && call.kit.employees[1].user && call.kit.employees[1].user.name)}
                    </p>
                )}
            </Box>
        </Box>
    )
}
