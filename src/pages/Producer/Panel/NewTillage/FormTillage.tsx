import { Avatar, Box, Button, Tab, Tabs, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { colors } from "../../../../style/colors"
import { useNavigate } from "react-router-dom"
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
import { useNumberMask } from "burgos-masks"
import MaskedInputNando from "../../../../components/MaskedNando"
import { TitleComponents } from "../../../../components/TitleComponents"
import { useResponsiveStyles } from "../../../../hooks/useResponsiveStyles"

interface FormTillageProps {
    data: NewLavoura
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    addressApi?: CepAbertoApi
    producerUser?: User
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    setCoordinates: React.Dispatch<React.SetStateAction<LatLngTuple[]>>
    open: () => void
    opened: boolean
    images: { id: number; file: File; name: string; url: string }[]
}

export const FormTillage: React.FC<FormTillageProps> = ({
    data,
    change,
    addressApi,
    producerUser,
    setCurrentStep,
    setCoordinates,
    open,
    opened,
    images,
}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const tabStyle = useResponsiveStyles()
    const header = useHeader()
    const { user } = useUser()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const listGallery = useArray().newArray(3)
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })

    const [tab, setTab] = React.useState("team")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const handleSubmit = (values: NewLavoura) => {
        console.log(values)
    }

    useEffect(() => {
        header.setTitle(producerUser ? producerUser.name : "Nova Fazenda")
    }, [])
    return (
        <Box
            sx={{
                width: "100%",
                maxHeight: isMobile ? "96vh" : "fit-content",
                height: isMobile ? "100vh" : "fit-content",
                gap: "0vw",
                flexDirection: "column",
                padding: isMobile ? "4vw" : "1vw",
            }}
        >
            <p>Informações da Fazenda</p>

            <Box
                sx={{
                    flexDirection: "column",
                    width: "100%",
                    gap: 0,
                    alignItems: "center",
                    // overflowY: "auto",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        gap: isMobile ? "5vw" : "2vw",
                        width: "100%",
                        height: isMobile ? "20vh" : "fit-content",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        src={data.cover}
                        // onChange={(file) => setImage(file)}
                        onClick={() => {
                            setCurrentStep(1)
                            setCoordinates([])
                        }}
                        variant="rounded"
                        style={{
                            width: "25vw",
                            height: "25vw",
                            fontSize: isMobile ? "4vw" : "1.2rem",
                            fontFamily: "MalgunGothic2",
                        }}
                    />
                    <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", width: isMobile ? "65%" : "100%" }}>
                        <TextField label={"Nome da fazenda"} name="name" value={data.name} sx={textField} onChange={change} required />

                        <TextField
                            label={"Área"}
                            name="area"
                            value={data.area}
                            sx={textField}
                            onChange={change}
                            InputProps={{
                                inputComponent: MaskedInputNando,
                                inputProps: { mask: floatMask, inputMode: "numeric" },
                                endAdornment: "ha",
                            }}
                            required
                        />
                    </Box>
                </Box>
                <Box sx={{ width: 1, gap: isMobile ? "2vw" : "1vw" }}>
                    <p>
                        {addressApi?.cidade.nome}, {addressApi?.estado.sigla} - {addressApi?.cep}
                    </p>
                    <TextField label={"Complemento"} name="address.adjunct" value={data.address.adjunct} sx={textField} onChange={change} required />
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
            {tab === "team" && <Team data={data} handleChange={change} producerName={user?.producer ? user.name : producerUser?.name} />}
            {tab === "additional" && <Additional data={data} handleChange={change} />}
            {tab === "gallery" && (
                <Box sx={{ width: "100%", height: "52%", gap: "3vw" }}>
                    <Box sx={{ width: "100%", height: isMobile ? "66%" : "100%", overflowY: "auto", gap: isMobile ? "2vw" : "1vw" }}>
                        {images.length === 0 ? (
                            <Box sx={{ pt: isMobile ? "4vw" : "1vw" }}>
                                <TitleComponents title="Adicionar Galeria" button textButton="Adicionar" click={open} />
                            </Box>
                        ) : (
                            <Gallery key={1} id={0} images={images} open={open} />
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    )
}
