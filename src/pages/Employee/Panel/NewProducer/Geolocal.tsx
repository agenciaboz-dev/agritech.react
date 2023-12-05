import { Box } from "@mui/material"
import React, { ChangeEventHandler } from "react"

interface GeolocalProps {
    data: NewProducer
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const Geolocal: React.FC<GeolocalProps> = ({ data, handleChange, setCurrentStep }) => {
    return <Box>{data.name}</Box>
}
