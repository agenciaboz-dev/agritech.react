import { Box, Button, Tab, Tabs, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Avatar } from "@files-ui/react"
import { textField } from "../../../style/input"
import MaskedInput from "../../MaskedInput"
import { colors } from "../../../style/colors"
import { useNavigate } from "react-router-dom"
import { tabStyle } from "../../../style/tabStyle"
import GeoImage from "../../../assets/geo.svg"
import { Form, Formik } from "formik"
import { Team } from "./Team"

interface NewTillageProps {
    data: NewProducer
}

export const NewTillage: React.FC<NewTillageProps> = ({ data }) => {
    const header = useHeader()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()

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
        header.setTitle(data.name)
    }, [])
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
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
                                    value={data.name}
                                    sx={textField}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label={"Endereço"}
                                    name="name"
                                    value={data.name}
                                    sx={textField}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label={"Area"}
                                    name="name"
                                    value={data.name}
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
                        <Button
                            variant="outlined"
                            sx={{
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
                                fontSize: 17,
                                color: colors.text.white,
                                width: "100%",
                                backgroundColor: colors.button,
                                borderRadius: "5vw",
                                textTransform: "none",
                            }}
                        >
                            Salvar
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
