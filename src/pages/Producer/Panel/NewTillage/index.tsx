import { Box, Button, CircularProgress, SxProps, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { Form, Formik } from "formik"
import { useUser } from "../../../../hooks/useUser"
import { Geolocal } from "./Geolocal"
import { FormTillage } from "./FormTillage.tsx"
import { useDataHandler } from "../../../../hooks/useDataHandler"
import { useIo } from "../../../../hooks/useIo"
import { CepAbertoApi } from "../../../../definitions/cepabertoApi"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { DialogConfirm } from "../../../../components/DialogConfirm"
import { textField, input } from "../../../../style/input.ts"
import { NewLavoura } from "../../../../definitions/newTillage"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"
import MaskedInput from "../../../../components/MaskedInput.tsx"
import { useProducer } from "../../../../hooks/useProducer.ts"
import { unmaskNumber } from "../../../../hooks/unmaskNumber.ts"
import MaskedInputNando from "../../../../components/MaskedNando.tsx"
import { useCepMask } from "burgos-masks"
import { useDisclosure } from "@mantine/hooks"
import { ModalGallery } from "../../ModalGallery.tsx"

interface NewTillageProps {}

const openCall = {
    title: "Adicione um CEP",
    content: "Insira o cep da sua Fazenda. Caso não tenha, insira o cep mais próximo.",
    submitTitle: "Continuar",
    cancelTitle: "Cancelar",
}

export const NewTillage: React.FC<NewTillageProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { user } = useUser()
    const { addTillageProd } = useProducer()
    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()

    //controls view
    const [currentStep, setCurrentStep] = useState(0)
    const [loadingCoordinate, setLoadingCoordinate] = useState(false)
    const [loadingTillage, setLoadingTillage] = useState(false)
    const [open, setOpen] = useState(true)

    //control map
    const [infoCep, setInfoCep] = useState<CepAbertoApi>()
    const [origin, setOrigin] = useState<LatLngExpression>([0, 0])
    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([])
    const [images, setImages] = useState<{ id: number; name: string; file: File; url: string }[]>([])
    const [opened, { open: openModal, close }] = useDisclosure()

    const initialValues: NewLavoura = {
        name: "",
        area: "",
        ceo: "",
        owner: user?.name || "", //corrigir para o nome do Cliente
        manager: "",
        agronomist: "",
        technician: "",
        pilot: "",
        comments: "",
        hectarePrice: "",
        others: "",
        address: {
            street: "",
            district: "",
            number: "",
            city: infoCep?.cidade.nome || "",
            cep: infoCep?.cep || "",
            uf: infoCep?.estado.sigla || "",
            adjunct: "",
        },
        cover: "",
        gallery: [],
        location: [],

        producerId: user?.producer?.id,
    }

    const [formatted, setFormatted] = useState<any>()
    useEffect(() => {
        console.log(formatted)
        setFormatted(
            images.map((item) => ({
                name: item.name,
                file: item.file,
            }))
        )
    }, [images])
    const handleSubmit = (values: NewLavoura) => {
        console.log({ enviados: values })
        const folder = {
            images: formatted,
        }
        const galleries: NewGallery[] = [folder]

        const data = {
            ...values,
            address: {
                street: infoCep?.logradouro || "",
                district: infoCep?.bairro || "",
                number: "",
                city: infoCep?.cidade.nome,
                cep: unmask(infoCep?.cep || ""),
                uf: infoCep?.estado.sigla,
                adjunct: values.address.adjunct,
            },
            area: unmaskNumber(values.area),
            hectarePrice: unmaskNumber(values.hectarePrice || 0),
            gallery: galleries,
        }
        io.emit("tillage:create", data, user?.isAdmin)

        // console.log(data)
        setLoadingTillage(true)
    }

    useEffect(() => {
        io.on("tillage:creation:success", (data: any) => {
            snackbar({ severity: "success", text: "Fazenda adicionada!" })
            addTillageProd(data.tillage)
            setLoadingTillage(false)
            console.log({ Tillage: data.tillage })
            navigate(`/producer/tillages`)
        })
        io.on("tillage:creation:failed", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })
    }, [])

    const handleCoordinates = (value: string) => {
        io.emit("coordinate:cep", { data: unmask(value) })
        setLoadingCoordinate(true)
    }
    useEffect(() => {
        io.on("coordinate:cep:success", (data: CepAbertoApi) => {
            setLoadingCoordinate(false)
            console.log("Encontrando o cep")
            setInfoCep(data)
            setOrigin([Number(data.latitude), Number(data.longitude)])
            setCurrentStep(1)
        })
        io.on("coordinate:cep:empty", () => {
            snackbar({ severity: "warning", text: "O CEP não existe! Insira um CEP válido." })
            setOpen(true)
            setLoadingCoordinate(false)
        })

        return () => {
            io.off("coordinate:cep:success")
            io.off("coordinate:cep:error")
        }
    }, [currentStep, origin])

    useEffect(() => {
        header.setTitle("Nova Fazenda")
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                    overflowY: "hidden",
                }}
            >
                <Header back location="../" />
            </Box>
            <Box
                sx={{
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    mt: "1vw",
                    overflowY: "hidden",
                }}
            >
                {currentStep === 1 && (
                    <p style={{ color: colors.text.white, width: "100%", fontSize: "5vw", padding: "2vw 4vw" }}>
                        Localização da lavoura
                    </p>
                )}
                <Box
                    sx={{
                        padding: "0vw",
                        width: "100%",
                        flex: 1,
                        height: "90%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflowY: "hidden",
                    }}
                >
                    <Box sx={{ width: "100%", height: "90%", gap: "4vw", flexDirection: "column" }}>
                        <ModalGallery images={images} close={close} opened={opened} setImages={setImages} />

                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values, handleChange }) => (
                                <Form>
                                    {currentStep === 0 && (
                                        <DialogConfirm
                                            open={open}
                                            setOpen={setOpen}
                                            data={openCall}
                                            user={user}
                                            children={
                                                <TextField
                                                    sx={{
                                                        ...textField,
                                                        ...input,
                                                    }}
                                                    label="CEP"
                                                    name="address.cep"
                                                    value={values.address.cep}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        inputComponent: MaskedInputNando,
                                                        inputProps: { mask: useCepMask, inputMode: "numeric" },
                                                    }}
                                                />
                                            }
                                            click={() => {
                                                {
                                                    !loadingCoordinate && setOpen(false)
                                                }
                                                handleCoordinates(values.address.cep)
                                            }}
                                            loading={loadingCoordinate}
                                        />
                                    )}
                                    {currentStep === 1 && (
                                        <>
                                            <Geolocal
                                                data={values}
                                                handleChange={handleChange}
                                                origin={origin}
                                                infoCep={infoCep}
                                                coordinates={coordinates}
                                                setCoordinates={setCoordinates}
                                                setCurrentStep={setCurrentStep}
                                            />
                                        </>
                                    )}
                                    {currentStep === 2 && (
                                        <Box
                                            sx={{
                                                height: "100vh",
                                                maxHeight: "120vh",
                                                justifyContent: "space-between",
                                                overflowY: "auto",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <FormTillage
                                                data={values}
                                                addressApi={infoCep}
                                                change={handleChange}
                                                setCurrentStep={setCurrentStep}
                                                setCoordinates={setCoordinates}
                                                open={openModal}
                                                opened={opened}
                                                images={images}
                                            />
                                            <Box
                                                sx={{
                                                    flexDirection: "row",
                                                    gap: "2vw",
                                                    p: "0 4vw",
                                                    width: 1,
                                                    pb: "3vh",
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        width: "100%",
                                                        padding: "3vw",
                                                        color: colors.text.black,
                                                        fontWeight: "600",
                                                        fontSize: "4vw",
                                                        textTransform: "none",
                                                        borderRadius: "10vw",
                                                        height: "10vw",
                                                    }}
                                                    onClick={() => {
                                                        setCurrentStep(1)
                                                        setCoordinates([])
                                                    }}
                                                >
                                                    Voltar
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        padding: "1vw",
                                                        width: "100%",
                                                        fontSize: 17,
                                                        color: colors.text.white,
                                                        backgroundColor: colors.button,
                                                        borderRadius: "5vw",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    {loadingTillage ? (
                                                        <CircularProgress size={"1.6rem"} sx={{ color: "#fff" }} />
                                                    ) : (
                                                        "Salvar"
                                                    )}
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
