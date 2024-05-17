import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { MapContainer, Polygon, TileLayer, useMapEvents } from "react-leaflet"
import { Marker } from "react-leaflet/Marker"
import { useIo } from "../../hooks/useIo"
import { useDataHandler } from "../../hooks/useDataHandler"
import { CepAbertoApi } from "../../definitions/cepabertoApi"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { colors } from "../../style/colors"
import { NewLavoura } from "../../definitions/newTillage"
import { useFormikContext } from "formik"
import leafletImage from "leaflet-image"
import { ButtonAgritech } from "../../components/ButtonAgritech"
import leaflet from "../../api/leaflet"

interface GeolocalProps {
    infoCep: CepAbertoApi | undefined
    origin: LatLngExpression
    data: NewLavoura
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    coordinates: LatLngTuple[]
    setCoordinates: React.Dispatch<React.SetStateAction<LatLngTuple[]>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

export const Geolocal: React.FC<GeolocalProps> = ({ setCurrentStep, origin, coordinates, setCoordinates }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const mapboxStyleId = leaflet.style
    const mapboxToken = leaflet.TOKEN

    const { setFieldValue } = useFormikContext<NewLavoura>()

    const mapRef = useRef<any>(null)

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setCoordinates([...coordinates, [e.latlng.lat, e.latlng.lng]])
            },
        })
        return null
    }

    const captureMapImage = () => {
        if (mapRef.current) {
            leafletImage(mapRef.current, function (err, canvas) {
                if (err) {
                    console.log(err)
                    return
                }
                const imageUrl = canvas.toDataURL()
                console.log(imageUrl)
                setFieldValue("cover", imageUrl)
                setCurrentStep(3)
            })
        } else {
            console.log("Map reference not defined")
        }
    }
    const updateMap = (coordinates: LatLngExpression) => {
        if (mapRef.current) {
            mapRef.current.setView(coordinates, 12)
            console.log(mapRef.current.setView(coordinates, 12))
        }
    }

    useEffect(() => {
        // Atualiza o campo 'location' no Formik sempre que 'coordinates' mudar
        const formattedCoordinates = coordinates.map((coord) => ({
            x: coord[0].toString(),
            y: coord[1].toString(),
        }))

        setFieldValue("location", formattedCoordinates)
    }, [coordinates, setFieldValue])
    useEffect(() => {
        updateMap(origin)
    }, [origin])

    return (
        <Box sx={{ padding: isMobile ? 0 : "1vw 0", width: "100%", height: "100%", zIndex: 0 }}>
            <MapContainer
                center={origin}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: "100%", zIndex: 1, borderRadius: isMobile ? "7vw" : "2vw" }}
                ref={mapRef}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/${mapboxStyleId}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
                />
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={coord} />
                ))}
                {coordinates.length > 0 && (
                    <Polygon positions={coordinates} color="blue" fillColor="lightblue" fillOpacity={0.5} />
                )}

                <MapClickHandler />
            </MapContainer>

            <Box
                sx={{
                    padding: isMobile ? "vw" : 0,
                    margin: "0 auto",
                    position: "fixed",
                    bottom: isMobile ? "12vh" : "15vh",
                    alignItems: "center",
                    zIndex: 2,
                    width: 1,
                }}
            >
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        padding: "0vw",
                        margin: "0 auto",
                        width: "70%",
                        height: "fit-content",
                        fontSize: isMobile ? 17 : "1.2rem   ",
                        color: colors.text.white,
                        backgroundColor: colors.button,
                        borderRadius: "5vw",
                        textTransform: "none",
                    }}
                    type="button"
                    onClick={captureMapImage}
                >
                    Salvar
                </ButtonAgritech>
            </Box>
        </Box>
    )
}
