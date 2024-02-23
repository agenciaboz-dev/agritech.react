import { Avatar, Box, Button, Tab, Tabs, TextField } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
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
import MaskedInputNando from "../../../../components/MaskedNando"
import { useNumberMask } from "burgos-masks"
import { ButtonAgritech } from "../../../../components/ButtonAgritech"
import { TitleComponents } from "../../../../components/TitleComponents"

interface FormTalhaoProps {
    data: NewTalhao
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    producerUser?: User
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    setCoordinates: React.Dispatch<React.SetStateAction<LatLngTuple[]>>
    open: () => void
    images: { id: number; file: File; name: string }[]
}

export const FormTalhao: React.FC<FormTalhaoProps> = ({ data, change, setCurrentStep, setCoordinates, open, images }) => {
    const header = useHeader()
    const { user } = useUser()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const [galleries, setGalleries] = useState<Gallery[]>()

    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })

    const [tab, setTab] = React.useState("gallery")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const handleSubmit = (values: NewLavoura) => {
        console.log(values)
    }

    useEffect(() => {
        console.log(data.cover)
    }, [])
    return (
        <Box sx={{ width: "100%", height: "90%", gap: "3vw", flexDirection: "column", p: "4vw" }}>
            <p>Informações do Talhão</p>

            <Box
                sx={{
                    flexDirection: "row",
                    gap: "3vw",
                    width: "100%",
                    height: "20%",
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={data.cover}
                    variant="rounded"
                    style={{
                        width: "34vw",
                        height: "34vw",
                        fontSize: "4vw",
                        fontFamily: "MalgunGothic2",
                    }}
                />
                <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                    <TextField
                        label={"Nome do Talhão"}
                        name="name"
                        value={data.name}
                        sx={textField}
                        onChange={change}
                        required
                    />

                    <TextField
                        label={"Area"}
                        name="area"
                        value={data.area}
                        sx={textField}
                        onChange={change}
                        required
                        InputProps={{
                            inputComponent: MaskedInputNando,
                            inputProps: { mask: floatMask, inputMode: "numeric" },
                            endAdornment: "ha",
                        }}
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
                <Tab sx={tabStyle} value="gallery" label="Imagens" />
            </Tabs>

            <Box sx={{ width: "100%", height: "60%", gap: "1vw", pt: "2vw" }}>
                <TitleComponents title="Adicionar Galeria" button textButton="Adicionar" click={open} />
                <Box sx={{ width: "100%", overflowY: "auto", gap: "1vw" }}>
                    <Gallery key={1} id={2 + 1} images={images} />
                </Box>
            </Box>
        </Box>
    )
}
