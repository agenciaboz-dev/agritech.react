import { Box, Button } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { MapContainer, Polygon, Polyline, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { Marker } from "react-leaflet/Marker"
import { useIo } from "../../hooks/useIo"
import { useDataHandler } from "../../hooks/useDataHandler"
import { CepAbertoApi } from "../../definitions/cepabertoApi"
import { LatLng, LatLngExpression, LatLngTuple } from "leaflet"
import L from "leaflet"
import { colors } from "../../style/colors"

interface GeolocalProps {
    infoCep: CepAbertoApi | undefined
    origin: LatLngExpression
    data: NewProducer
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Geolocal: React.FC<GeolocalProps> = ({ data, handleChange, origin, infoCep }) => {
    const io = useIo()
    const header = useHeader()
    const { unmask } = useDataHandler()

    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([])

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setCoordinates([...coordinates, [e.latlng.lat, e.latlng.lng]])
            },
        })
        return null
    }
    const handleSave = () => {
        if (coordinates.length > 0) {
            setCoordinates([...coordinates, coordinates[0]])
        }
    }

    useEffect(() => {
        header.setTitle(unmask(data.address.cep))
    }, [])

    return (
        <Box sx={{ width: "100%", height: "80%" }}>
            <MapContainer center={origin} zoom={16} scrollWheelZoom={true} style={{ height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={coord} />
                ))}
                {coordinates.length > 0 && (
                    <Polygon positions={coordinates} color="blue" fillColor="lightblue" fillOpacity={0.5} />
                )}

                <MapClickHandler />
            </MapContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                    fontSize: 17,
                    color: colors.text.white,
                    width: "90%",
                    backgroundColor: colors.button,
                    borderRadius: "5vw",
                    textTransform: "none",
                    margin: "0 5vw",
                }}
            >
                Salvar Area
            </Button>
        </Box>
    )
}
