import { Avatar, Box } from "@mui/material"
import React from "react"
import { OfficeDot } from "../OfficeDot"
import { TfiCrown } from "react-icons/tfi"
import { colors } from "../../style/colors"

interface CardTeamProps {
    employee: User
}

export const CardTeam: React.FC<CardTeamProps> = ({ employee }) => {
    return (
        <Box sx={{ p: "1vw", pt: 0, pb: 0, pl: "2vw", flexDirection: "row", gap: "3vw" }}>
            <Avatar src={employee.image} sx={{ width: "10vw", height: "10vw" }} />
            <Box sx={{ flexDirection: "column" }}>
                {employee?.isAdmin ? (
                    <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                        <span style={{ color: colors.primary }}> {employee.name}</span> <TfiCrown color={colors.primary} />
                    </Box>
                ) : (
                    employee.name
                )}
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <OfficeDot office={employee.office} />
                </Box>
            </Box>
        </Box>
    )
}
