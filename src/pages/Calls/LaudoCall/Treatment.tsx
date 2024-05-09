import { Box, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { TitleComponents } from "../../../components/TitleComponents"
import { NewReport, Product } from "../../../definitions/report"

interface TreatmentComponentProps {
    user: User
    values: NewReport
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    listProducts: Product[]
    open: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const TreatmentComponent: React.FC<TreatmentComponentProps> = ({ listProducts, open }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw", p: isMobile ? "2vw" : "1vw" }}>
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
