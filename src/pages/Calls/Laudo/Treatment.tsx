import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { Call } from "../../../definitions/call"
import { TitleComponents } from "../../../components/TitleComponents"

interface TreatmentProps {
    user: User
    values: any
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    listProducts: Product[]
    open: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Treatment: React.FC<TreatmentProps> = ({ values, change, user, listProducts, open }) => {
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw", p: "2vw" }}>
                <TitleComponents title="Tratamento" button click={open} />
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold" }}>Produtos</p>
                    <p style={{ fontWeight: "bold" }}>Dose/HA</p>
                </Box>
                {listProducts.map((item, index) => (
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <p>{item.name}</p>
                        <p>{item.dosage}L</p>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
