import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { TitleComponents } from "../../../components/TitleComponents"
import { NewReport, Product } from "../../../definitions/report"

interface TreatmentProps {
    user: User
    values: NewReport
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    listProducts: Product[]
    open: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Treatment: React.FC<TreatmentProps> = ({ listProducts, open }) => {
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw", p: "2vw" }}>
                <TitleComponents title="Tratamento" button click={open} />
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold" }}>Produtos</p>
                    <p style={{ fontWeight: "bold" }}>Dose/HA</p>
                </Box>
                {listProducts.map((item, index) => (
                    <Box key={index} sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <p>{item.name}</p>
                        <p>
                            {item.dosage} {item.unit}
                        </p>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
