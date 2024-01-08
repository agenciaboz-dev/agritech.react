import { Box, Button, Tab, Tabs, TextField } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { Avatar } from "@files-ui/react"
import { textField } from "../../../../style/input"
import { colors } from "../../../../style/colors"
import { useNavigate } from "react-router-dom"
import { tabStyle } from "../../../../style/tabStyle"
import GeoImage from "../../../../assets/geo.svg"
import { Form, Formik } from "formik"
import { Team } from "../../../../components/NewProducer/NewTillage/Team"
import { Additional } from "../../../../components/NewProducer/NewTillage/Additional"
import { Gallery } from "../../../../components/NewProducer/NewTillage/Gallery"
import { useArray } from "burgos-array"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { useUser } from "../../../../hooks/useUser"
import { CepAbertoApi } from "../../../../definitions/cepabertoApi"
import { NewLavoura } from "../../../../definitions/newTillage"

interface FormTillageProps {
    data: NewLavoura
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    addressApi?: CepAbertoApi
    // coordinates: LatLngTuple[]
    // origin: LatLngExpression
}

export const FormTillage: React.FC<FormTillageProps> = ({ data, change, addressApi }) => {
    const header = useHeader()
    const { user } = useUser()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const listGallery = useArray().newArray(3)

    const [tab, setTab] = React.useState("team")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const handleSubmit = (values: NewLavoura) => {
        console.log(values)
    }

    useEffect(() => {
        header.setTitle(user?.name || "Produtor")
    }, [])
    return (
        <Box sx={{ width: "100%", height: "90%", gap: "6vw", flexDirection: "column", p: "4vw" }}>
            <p>Informações da Lavoura</p>

            <Box
                sx={{
                    flexDirection: "row",
                    gap: "5vw",
                    width: "100%",
                    height: "23%",
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={GeoImage}
                    onChange={(file) => setImage(file)}
                    changeLabel="Trocar foto"
                    emptyLabel="Adicionar foto"
                    variant="square"
                    style={{
                        width: "40vw",
                        height: "40vw",
                        fontSize: "4vw",
                        fontFamily: "MalgunGothic2",
                    }}
                />
                <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                    <TextField
                        label={"Nome da lavoura"}
                        name="name"
                        value={data.name}
                        sx={textField}
                        onChange={change}
                        required
                    />
                    <TextField
                        label={"Endereço"}
                        name="address.city"
                        value={`${addressApi?.cidade.nome}, ${addressApi?.estado.sigla} - ${addressApi?.cep}`}
                        sx={textField}
                        onChange={change}
                        required
                    />
                    <TextField label={"Area"} name="area" value={data.area} sx={textField} onChange={change} required />
                </Box>
            </Box>
            <Tabs
                value={tab}
                onChange={changeTab}
                textColor="primary"
                indicatorColor="primary"
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                <Tab sx={tabStyle} value="team" label="Equipe" />
                <Tab sx={tabStyle} value="additional" label="Adicionais" />
                <Tab sx={tabStyle} value="gallery" label="Imagens" />
            </Tabs>
            {tab === "team" && <Team data={data} handleChange={change} />}
            {tab === "additional" && <Additional data={data} handleChange={change} />}
            {tab === "gallery" && (
                <Box sx={{ width: "100%", height: "52%", gap: "3vw" }}>
                    <Box sx={{ width: "100%", height: "66%", overflowY: "auto", gap: "2vw" }}>
                        {listGallery.map((item, index) => (
                            <Gallery key={index} id={index + 1} />
                        ))}
                    </Box>
                    <p>Adicionar nova Galeria</p>
                    <TextField
                        label={"Nome da Galeria"}
                        name="name_gallery"
                        value={""}
                        sx={textField}
                        onChange={change}
                        required
                    />
                </Box>
            )}
        </Box>
    )
}
