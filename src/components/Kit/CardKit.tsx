import { Box, FormControl, FormControlLabel, FormGroup, Stack, styled, useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import Switch, { SwitchProps } from "@mui/material/Switch"
import { colors } from "../../style/colors"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { useKits } from "../../hooks/useKits"
import { useSetState } from "@mantine/hooks"
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos"

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&:before": {
            left: 12,
        },
        "&:after": {
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}))

interface CardKitProps {
    kit: Kit
}
export const CardKit: React.FC<CardKitProps> = ({ kit }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { user } = useUser()
    const { toggleKit } = useKits()

    const handleChange = (event: any, checked: boolean) => {
        console.log(kit.id)
        console.log(event.target.checked)
        kit.id && toggleKit(kit.id)
    }

    return (
        <Box sx={{ padding: isMobile ? "3vw 1vw" : "1vw", flexDirection: "row", alignItems: "center", borderBottom: "1px solid #88A486" }}>
            <FormGroup sx={{ width: isMobile ? "90%" : "100%" }}>
                <FormControlLabel
                    checked={kit.active}
                    control={<Android12Switch />}
                    onChange={user?.isAdmin ? handleChange : () => {}}
                    label={
                        <Box sx={{ width: "100%" }}>
                            <p style={{ fontSize: isMobile ? "4vw" : "1.2rem", width: "100%" }}>{kit.name}</p>
                            <p
                                style={{
                                    fontSize: isMobile ? "3vw" : "1rem",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    // overflow: "hidden",
                                    width: "100%",
                                }}
                            >
                                {kit.description}
                            </p>
                        </Box>
                    }
                />
            </FormGroup>
            <ArrowForwardIos
                fontSize="small"
                onClick={() => navigate(user?.isAdmin ? `/adm/settings-kit/${kit.id}` : `/employee/settings-kit/${kit.id}`)}
            />
        </Box>
    )
}
