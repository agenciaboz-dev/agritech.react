import { Box } from "@mui/material"
import React, { ChangeEventHandler, useEffect } from "react"
import { useHeader } from "../../../../hooks/useHeader"

interface GeolocalProps {
    data: NewProducer
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const Geolocal: React.FC<GeolocalProps> = ({ data, handleChange, setCurrentStep }) => {
    const header = useHeader()

    useEffect(() => {
        header.setTitle(data.name)
    })

    return <Box>{data.name}</Box>
}
