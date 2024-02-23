import { Box, Button, CircularProgress } from "@mui/material"
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
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"
import { unmaskNumber } from "../../../../hooks/unmaskNumber.ts"
import { useDisclosure } from "@mantine/hooks"
import { ModalGallery } from "../../ModalGallery.tsx"

interface NewTalhaoProps {}

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
    const [loadingTalhao, setLoadingTalhao] = useState(false)
    const [opened, { open, close }] = useDisclosure()

    //control map
    const [infoCep, setInfoCep] = useState<CepAbertoApi>()
    const [origin, setOrigin] = useState<LatLngExpression>()
    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([])
    const [images, setImages] = useState<{ id: number; url: string; name: string; file: File }[]>([])

    const initialValues: NewTalhao = {
        name: "",
        area: "",
        cover: "",
        calls: [],
        gallery: [],
        location: [],
        tillageId: findTillage?.id || 0,
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

    const handleSubmit = (values: NewTalhao) => {
        const folder = {
            images: formatted,
            tillageId: values.tillageId,
        }
        const galleries: NewGallery[] = [folder]

        const data = {
            name: values.name,
            area: unmaskNumber(values.area),
            call: values.calls,
            location: values.location,
            tillageId: values.tillageId,
            cover: values.cover,
            gallery: galleries,
        }
        io.emit("talhao:create", data)
        console.log({ enviado: data })
        setLoadingTalhao(true)
    }

    useEffect(() => {
        io.on("talhao:create:success", (data: any) => {
            setLoadingTalhao(false)
            snackbar({ severity: "success", text: "Talhão adicionado!" })
            navigate(`/producer/tillage/${tillageid}`)
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
                                    <ModalGallery images={images} close={close} opened={opened} setImages={setImages} />
                                    {currentStep === 1 &&
                                        (!origin ? (
                                            <Box sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                                                <CircularProgress sx={{ color: colors.button }} />
                                            </Box>
                                        ) : (
                                            <>
                                                <GeolocalTalhao
                                                    data={values}
                                                    origin={origin}
                                                    infoCep={infoCep}
                                                    handleChange={handleChange}
                                                    coordinates={coordinates}
                                                    setCoordinates={setCoordinates}
                                                    setCurrentStep={setCurrentStep}
                                                />
                                            </>
                                        ))}
                                    {currentStep === 2 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between" }}>
                                            <FormTalhao
                                                data={values}
                                                change={handleChange}
                                                setCoordinates={setCoordinates}
                                                setCurrentStep={setCurrentStep}
                                                open={open}
                                                images={images}
                                            />
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
