import { Box, Button, CircularProgress, SxProps, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader.ts"
import { colors } from "../../../../style/colors.ts"
import { Header } from "../../../../components/Header.tsx"
import { Form, Formik } from "formik"
import { useUser } from "../../../../hooks/useUser.ts"
import { GeolocalTalhao } from "./GeolocalTalhao.tsx"
import { FormTalhao } from "./FormTalhao.tsx"
import { useDataHandler } from "../../../../hooks/useDataHandler.ts"
import { useIo } from "../../../../hooks/useIo.ts"
import { CepAbertoApi } from "../../../../definitions/cepabertoApi"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { DialogConfirm } from "../../../../components/DialogConfirm.tsx"
import { textField, input } from "../../../../style/input.ts"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"
import MaskedInput from "../../../../components/MaskedInput.tsx"
import { useProducer } from "../../../../hooks/useProducer.ts"

interface NewTalhaoProps {}

const openCall = {
    title: "Adicione um CEP",
    content: "Insira o cep da sua Fazenda. Caso não tenha, insira o cep mais próximo.",
    submitTitle: "Continuar",
    cancelTitle: "Cancelar",
}

export const NewTalhao: React.FC<NewTalhaoProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { user } = useUser()
    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()

    const { tillageid } = useParams()
    const findTillage = user?.producer?.tillage?.find((item) => item.id === Number(tillageid))
    //controls view
    const [currentStep, setCurrentStep] = useState(1)
    const [loadingCoordinate, setLoadingCoordinate] = useState(false)
    const [loadingTalhao, setLoadingTalhao] = useState(false)
    const [open, setOpen] = useState(true)

    //control map
    const [infoCep, setInfoCep] = useState<CepAbertoApi>()
    const [origin, setOrigin] = useState<LatLngExpression>()
    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([])

    const initialValues: NewTalhao = {
        name: "",
        area: "",
        calls: [],
        gallery: [],
        location: [],
        tillageId: findTillage?.id || 0,
    }
    const handleSubmit = (values: NewTalhao) => {
        console.log({ enviados: values })

        const data = {
            name: values.name,
            area: values.area,
            call: values.calls,
            gallery: values.gallery,
            location: values.location,
            tillageId: values.tillageId,
        }
        io.emit("talhao:create", values)
        console.log(data)
        setLoadingTalhao(true)
    }

    useEffect(() => {
        io.on("talhao:create:success", (data: any) => {
            snackbar({ severity: "success", text: "Talhão adicionado!" })
            setLoadingTalhao(false)
            console.log({ Talhão: data.talhao })
            navigate(`/producer/tillage/${data.tillage.id}`)
        })
        io.on("talhao:create:failed", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })
    }, [])

    const recoverCepTillage = () => {
        io.emit("coordinate:cep", { data: unmask(findTillage?.address.cep || "") })
        io.on("coordinate:cep:success", (data: CepAbertoApi) => {
            console.log("Encontrando o cep")
            setInfoCep(data)
            setOrigin([Number(data.latitude), Number(data.longitude)])
        })
        io.on("coordinate:cep:empty", () => {
            snackbar({ severity: "warning", text: "O CEP não encontrado!" })
        })
    }
    useEffect(() => {
        header.setTitle("Novo Talhão")
        recoverCepTillage()
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
                        Localização do Talhão
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
                                    {currentStep === 1 &&
                                        (!origin ? (
                                            <Box sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                                                <CircularProgress sx={{ color: colors.button }} />
                                            </Box>
                                        ) : (
                                            <>
                                                <GeolocalTalhao
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
                                        ))}
                                    {currentStep === 2 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between" }}>
                                            <FormTalhao data={values} change={handleChange} />
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
                                                    {loadingTalhao ? <CircularProgress sx={{ color: "#fff" }} /> : "Salvar"}
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
