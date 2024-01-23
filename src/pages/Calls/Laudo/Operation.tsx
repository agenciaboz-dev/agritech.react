import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import { colors } from "../../../style/colors"
import { Call } from "../../../definitions/call"
import { useUser } from "../../../hooks/useUser"

interface OperationProps {
    user: User
    values: any
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}
// service         String
// culture         String
// areaMap         String
// equipment       String
// model           String

// report          Report        @relation(fields: [reportId],references: [id],onDelete: Cascade)
// reportId        Int
export const Operation: React.FC<OperationProps> = ({ values, change, user }) => {
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw" }}>
                <p style={{ fontSize: "3.5vw", fontWeight: "bold" }}>Dados de Operação</p>
                <TextField
                    label="Tipo de serviço"
                    name="service"
                    value={"Pulverização com drones"}
                    sx={{ ...textField }}
                    onChange={change}
                />
                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        label="Cultura"
                        name="culture"
                        value={"Pastagem"}
                        sx={{ ...textField, width: "85%" }}
                        onChange={change}
                    />
                    <TextField
                        label="Área Mapeada (ha)"
                        name="areaMap"
                        value={"60"}
                        type="number"
                        sx={{ ...textField }}
                        onChange={change}
                    />
                </Box>
                <TextField
                    label="Equipamento"
                    name="equipment"
                    value={"AGRAS T40"}
                    sx={{ ...textField }}
                    onChange={change}
                />
                <TextField label="Modelo" name="model" value={"DJI"} sx={{ ...textField }} onChange={change} />
            </Box>
            <TextField
                multiline
                label="Piloto/Copiloto"
                name="comments"
                value={"Bruno Santana/ Rodrigo Cardoso"}
                minRows={1}
                maxRows={3}
                sx={{
                    ...textField,
                }}
                onChange={!user?.producer ? change : () => {}}
                disabled={!user?.producer ? false : true}
                InputProps={{
                    sx: {
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: colors.secondary,
                            },
                            fieldset: {
                                borderColor: "#232323",
                            },
                        },
                    },
                }}
            />
        </Box>
    )
}
