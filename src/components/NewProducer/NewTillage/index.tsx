import { Box, Button, Tab, Tabs, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Avatar } from "@files-ui/react"
import { textField } from "../../../style/input"
import { colors } from "../../../style/colors"
import { useNavigate } from "react-router-dom"
import { tabStyle } from "../../../style/tabStyle"
import GeoImage from "../../../assets/geo.svg"
import { Form, Formik } from "formik"
import { Team } from "./Team"
import { Additional } from "./Additional"
import { Gallery } from "./Gallery"
import { useArray } from "burgos-array"
import { LatLngExpression, LatLngTuple } from "leaflet"

interface NewTillageProps {
    // coordinates: LatLngTuple[]
    // origin: LatLngExpression
}

export const NewTillage: React.FC<NewTillageProps> = ({}) => {
    const header = useHeader()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const listGallery = useArray().newArray(3)

    const [tab, setTab] = React.useState("team")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const initialValues: NewTillage = {
        name: "",
        area: "",
        owner: "",
        ceo: "",
        manager: "",
        agronomist: "",
        technician: "",
        others: "",
        commments: "",
    }
    const handleSubmit = (values: NewTillage) => {
        console.log(values)
    }

    useEffect(() => {
        header.setTitle("Produtor")
    }, [])
    return (
        <Box sx={{ width: "100%", height: "90%", gap: "3vw", flexDirection: "column", p: "4vw" }}>
            <p>Informações da Lavoura</p>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
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
                                    value={values.name}
                                    sx={textField}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label={"Endereço"}
                                    name="address"
                                    value={""}
                                    sx={textField}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label={"Area"}
                                    name="area"
                                    value={values.area}
                                    sx={textField}
                                    onChange={handleChange}
                                    required
                                />
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
                        {tab === "team" && <Team data={values} handleChange={handleChange} />}
                        {tab === "additional" && <Additional data={values} handleChange={handleChange} />}
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
                                    onChange={handleChange}
                                    required
                                />
                            </Box>
                        )}
                        <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "50%",
                                    padding: "3vw",
                                    color: colors.text.black,
                                    fontWeight: "600",
                                    fontSize: "4vw",
                                    textTransform: "none",
                                    borderRadius: "10vw",
                                    height: "10vw",
                                }}
                                onClick={() => {
                                    navigate("../")
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    padding: "1vw",
                                    width: "50%",
                                    fontSize: 17,
                                    color: colors.text.white,
                                    backgroundColor: colors.button,
                                    borderRadius: "5vw",
                                    textTransform: "none",
                                }}
                                onClick={() => navigate("/producer/1/1")}
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
