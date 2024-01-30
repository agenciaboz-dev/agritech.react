import React from "react"
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined"
import { Box } from "@mui/material"
import green from "../assets/icons/green.svg"
import yellow from "../assets/icons/yellow.svg"
import copilot from "../assets/icons/copilot.svg"
import seller from "../assets/icons/seller2.svg"
import blue from "../assets/icons/blue.svg"
interface OfficeDotProps {
    office?: string
}

export const OfficeDot: React.FC<OfficeDotProps> = ({ office }) => {
    return (
        <Box sx={{ flexDirection: "row", alignItems: "center", gap: "1vw" }}>
            <img
                src={
                    office === "agronomist"
                        ? green
                        : office === "technician"
                        ? yellow
                        : office === "copilot"
                        ? copilot
                        : office === "seller"
                        ? seller
                        : office === "pilot" && blue
                }
            />

            <p style={{ fontSize: "3vw", color: "gray" }}>
                {office === "agronomist"
                    ? "Agronômo"
                    : office === "technician"
                    ? "Técnico"
                    : office === "copilot"
                    ? "Copiloto de drone"
                    : office === "seller"
                    ? "Vendedor"
                    : office === "pilot" && "Piloto de drone"}
            </p>
        </Box>
    )
}
