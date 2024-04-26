import { Box, Button, Tab, Tabs, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Avatar } from "@files-ui/react"
import { colors } from "../../../style/colors"
import { useNavigate } from "react-router-dom"
import GeoImage from "../../../assets/geo.svg"
import { Form, Formik } from "formik"
import { Team } from "../../../components/NewProducer/NewTillage/Team"
import { Additional } from "../../../components/NewProducer/NewTillage/Additional"
import { Gallery } from "../../../components/NewProducer/NewTillage/Gallery"
import { useArray } from "burgos-array"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { useUser } from "../../../hooks/useUser"
import { CepAbertoApi } from "../../../definitions/cepabertoApi"
import { NewLavoura } from "../../../definitions/newTillage"
import { useNumberMask } from "burgos-masks"
import MaskedInputNando from "../../../components/MaskedNando"
import { TitleComponents } from "../../../components/TitleComponents"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface FormTalhaoProps {
    data: NewTalhao
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    producerUser?: User
    open: () => void
    opened: boolean
    images: { id: number; file: File; name: string; url: string }[]
}

export const FormTalhao: React.FC<FormTalhaoProps> = ({ data, change, images, open }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const tabStyle = useResponsiveStyles()
    const textField = useResponsiveStyles()
    const header = useHeader()
    const { user } = useUser()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const listGallery = useArray().newArray(3)
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })

    const [tab, setTab] = React.useState("gallery")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const handleSubmit = (values: NewLavoura) => {
        console.log(values)
    }

    useEffect(() => {}, [])
    return (
        <Box
            sx={{
                width: "100%",
                height: isMobile ? "90%" : "100%",
                gap: isMobile ? "6vw" : "1vw",
                flexDirection: "column",
                p: isMobile ? "4vw" : "1vw",
            }}
        >
            <p>Informações do Talhão</p>

            <Box
                sx={{
                    flexDirection: "row",
                    gap: isMobile ? "3vw" : "2vw",
                    width: "100%",
                    height: isMobile ? "23%" : "fit-content",
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={data.cover}
                    onChange={(file) => setImage(file)}
                    changeLabel="Trocar foto"
                    emptyLabel="Adicionar foto"
                    variant="square"
                    style={{
                        width: isMobile ? "30vw" : "10vw",
                        height: isMobile ? "30vw" : "10vw",
                        fontSize: isMobile ? "4vw" : "1.2rem",
                        fontFamily: "MalgunGothic2",
                    }}
                />
                <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", width: isMobile ? "65%" : "100%" }}>
                    <TextField label={"Nome do Talhão"} name="name" value={data.name} sx={textField} onChange={change} required />

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
            <Box>
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
                {/* {tab === "additional" && <Additional data={data} handleChange={change} />} */}
                {tab === "gallery" && (
                    <Box sx={{ width: "100%", height: "80%", gap: isMobile ? "2vw" : "1vw", pt: isMobile ? "2vw" : 0 }}>
                        {images.length === 0 ? (
                            <TitleComponents title="Adicionar Galeria" button textButton="Adicionar" click={open} />
                        ) : (
                            <Box sx={{ width: "100%", overflowY: "auto", gap: "1vw" }}>
                                <Gallery key={1} id={0} images={images} open={open} />
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    )
}
