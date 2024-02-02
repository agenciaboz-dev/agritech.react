import { Box } from "@mui/material"
import React, { useEffect, useRef } from "react"
import { MapContainer, Polygon, TileLayer, useMapEvents } from "react-leaflet"
import { Marker } from "react-leaflet/Marker"
import { CepAbertoApi } from "../../../definitions/cepabertoApi"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { NewLavoura } from "../../../definitions/newTillage"
import { useFormikContext } from "formik"

interface GeolocalTalhaoProps {
    infoCep: CepAbertoApi | undefined
    origin: LatLngExpression

    coordinates: LatLngTuple[]
    setCoordinates: React.Dispatch<React.SetStateAction<LatLngTuple[]>>
}

export const GeolocalTalhao: React.FC<GeolocalTalhaoProps> = ({ origin, coordinates, setCoordinates }) => {
    const mapboxStyleId = import.meta.env.VITE_STYLE
    const mapboxToken = import.meta.env.VITE_API_TOKEN
    //functions map
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setCoordinates([...coordinates, [e.latlng.lat, e.latlng.lng]])
            },
        })
        return null
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
        console.log(origin)
        updateMap(origin)
    }, [origin])
    //update title
    //array coordinates
    useEffect(() => {
        console.log("Coordenadas", coordinates)
    }, [coordinates])

    return (
        <Box sx={{ width: "100%", height: "100%", zIndex: 0 }}>
            <MapContainer center={origin} zoom={16} scrollWheelZoom={true} style={{ height: "100%" }}>
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/${mapboxStyleId}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
                    attribution='&copy; <a href="">Mapbox</a>'
                />
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={coord} />
                ))}
                {coordinates.length > 0 && (
                    <Polygon positions={coordinates} color="blue" fillColor="lightblue" fillOpacity={0.5} />
                )}

                <MapClickHandler />
            </MapContainer>
        </Box>
    )
}
