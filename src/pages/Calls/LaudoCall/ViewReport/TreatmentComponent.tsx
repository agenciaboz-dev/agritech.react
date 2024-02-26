import { Box } from "@mui/material"
import React from "react"
import { TitleComponents } from "../../../../components/TitleComponents"
import { Treatment } from "../../../../definitions/report"

interface TreatmentComponentProps {
    treatment?: Treatment
}

export const TreatmentComponent: React.FC<TreatmentComponentProps> = ({ treatment }) => {
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw", p: "2vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold" }}>Produtos</p>
                    <p style={{ fontWeight: "bold" }}>Dose/HA</p>
                </Box>
                {treatment?.products.map((item, index) => (
                    <Box key={index} sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <p>{item["name"]}</p>
                        <p>
                            {item["dosage"]} {item["unit"]}
                        </p>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
