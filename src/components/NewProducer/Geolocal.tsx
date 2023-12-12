import { Box } from "@mui/material"
import React, { ChangeEventHandler, useEffect } from "react"
import { useHeader } from "../../hooks/useHeader"

interface GeolocalProps {
    data: NewProducer
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Geolocal: React.FC<GeolocalProps> = ({ data, handleChange }) => {
    const header = useHeader()

    useEffect(() => {
        header.setTitle(data.name)
    })

    return <Box>{data.email}</Box>
}
