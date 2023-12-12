import React from "react"
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined"
import { Box } from "@mui/material"
import green from "../assets/icons/green.svg"
import yellow from "../assets/icons/yellow.svg"
import blue from "../assets/icons/blue.svg"
interface OfficeDotProps {
    office?: string
}

export const OfficeDot: React.FC<OfficeDotProps> = ({ office }) => {
    return (
        <Box sx={{ flexDirection: "row", alignItems: "center", gap: "1vw" }}>
            <img src={office === "agronomist" ? green : office === "technician" ? yellow : blue} />
          

            <p style={{ fontSize: "3vw", color: "gray" }}>
                {office === "agronomist" ? "Agronômo" : office === "technician" ? "Técnico" : "Piloto de drone"}
            </p>
        </Box>
    )
}
