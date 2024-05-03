import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { TitleComponents } from "../../../../components/TitleComponents"
import { Treatment } from "../../../../definitions/report"

interface TreatmentComponentProps {
    treatment?: Treatment
}

export const TreatmentComponent: React.FC<TreatmentComponentProps> = ({ treatment }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw", p: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold" }}>Produtos</p>
                    <p style={{ fontWeight: "bold" }}>Dose/HA</p>
                </Box>
                {treatment?.products.map((item, index) => (
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
