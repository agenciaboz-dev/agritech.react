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

    const initialValues: NewLavoura = {
        name: "",
        area: "",
        ceo: "",
        owner: user?.name || " ", //corrigir para o nome do Cliente
        manager: "",
        agronomist: "",
        technician: "",
        pilot: "",
        comments: "",
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
        gallery: [],
        location: [],
        producerId: user?.producer?.id,
    }
    const handleSubmit = (values: NewLavoura) => {
        console.log({ enviados: values })

        const data = {
            ...values,
        }
        io.emit("tillage:create", values)
        console.log(data)
        setLoadingTillage(true)
    }

    useEffect(() => {
        io.on("tillage:creation:success", (data: any) => {
            snackbar({ severity: "success", text: "Fazenda adicionada!" })
            addTillageProd(data.tillage)
            setLoadingTillage(false)
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
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="../" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
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
                        height: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                    }}
                >
                    <Box sx={{ width: "100%", height: "90%", gap: "4vw", flexDirection: "column" }}>
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
                                                        // @ts-ignore
                                                        inputComponent: MaskedInput,
                                                        inputProps: { mask: "00.000-000", inputMode: "numeric" },
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
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    fontSize: 17,
                                                    color: colors.text.white,
                                                    width: "90%",
                                                    backgroundColor: colors.primary,
                                                    borderRadius: "5vw",
                                                    textTransform: "none",
                                                    margin: "0 5vw",
                                                    position: "absolute",
                                                    zIndex: 1,
                                                    bottom: "25vw",
                                                }}
                                                onClick={() => {
                                                    setCurrentStep(2)
                                                }}
                                            >
                                                Próximo
                                            </Button>
                                        </>
                                    )}
                                    {currentStep === 2 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between" }}>
                                            <FormTillage data={values} addressApi={infoCep} change={handleChange} />
                                            <Box sx={{ flexDirection: "column", gap: "2vw", p: "0 4vw" }}>
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
                                                        setCurrentStep(0)
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
                                                    {loadingTillage ? <CircularProgress sx={{ color: "#fff" }} /> : "Salvar"}
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
