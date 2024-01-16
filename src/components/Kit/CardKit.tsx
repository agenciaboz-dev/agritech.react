import { Box, FormControl, FormControlLabel, FormGroup, Stack, styled } from "@mui/material"
import React from "react"
import Switch, { SwitchProps } from "@mui/material/Switch"
import { colors } from "../../style/colors"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { useNavigate } from "react-router-dom"

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
    const navigate = useNavigate()
    return (
        <Box sx={{ padding: "3vw 1vw", flexDirection: "row", alignItems: "center", borderBottom: "1px solid #88A486" }}>
            <FormGroup sx={{ width: "90%" }}>
                <FormControlLabel
                    checked={kit.active}
                    control={<Android12Switch />}
                    label={
                        <Box sx={{ width: "100%" }}>
                            <p style={{ fontSize: "4vw", width: "100%" }}>{kit.name}</p>
                            <p
                                style={{
                                    fontSize: "3vw",
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
            <ArrowRightIcon onClick={() => navigate(`/adm/settings-kit/${kit.id}`)} />
        </Box>
    )
}
