import { Box, Button, TextField } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { MapContainer, Polygon, TileLayer, useMapEvents } from "react-leaflet"
import { Marker } from "react-leaflet/Marker"
import { useIo } from "../../../../hooks/useIo"
import { useDataHandler } from "../../../../hooks/useDataHandler"
import { CepAbertoApi } from "../../../../definitions/cepabertoApi"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { colors } from "../../../../style/colors"
import { NewLavoura } from "../../../../definitions/newTillage"
import { useFormikContext } from "formik"

interface GeolocalProps {
    infoCep: CepAbertoApi | undefined
    origin: LatLngExpression
    data: NewLavoura
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    coordinates: LatLngTuple[]
    setCoordinates: React.Dispatch<React.SetStateAction<LatLngTuple[]>>
}

export const Geolocal: React.FC<GeolocalProps> = ({ data, handleChange, origin, coordinates, setCoordinates }) => {
    const io = useIo()
    const header = useHeader()
    const { unmask } = useDataHandler()
    // const [coordinates, setCoordinates] = useState<LatLngTuple[]>([])

    //functions map
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

    const { setFieldValue } = useFormikContext<NewLavoura>()

    useEffect(() => {
        // Atualiza o campo 'location' no Formik sempre que 'coordinates' mudar
        const formattedCoordinates = coordinates.map((coord) => ({
            x: coord[0].toString(),
            y: coord[1].toString(),
        }))

        setFieldValue("location", formattedCoordinates)
    }, [coordinates, setFieldValue])

    const mapRef = useRef<any>(null)

    // Função para atualizar o mapa completo
    const updateMap = (coordinates: LatLngExpression) => {
        if (mapRef.current) {
            // Atualiza o centro do mapa e o zoom
            mapRef.current.setView(coordinates, 12)
        }
    }

    useEffect(() => {
        // Chama a função para atualizar o mapa sempre que 'search' mudar
        updateMap(origin)
    }, [origin])
    //update title
    useEffect(() => {
        header.setTitle(unmask(data.address.cep))
    }, [])

    //array coordinates
    useEffect(() => {
        console.log("Coordenadas", coordinates)
    }, [coordinates])

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
            {/* <Button
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
            </Button> */}
        </Box>
    )
}
