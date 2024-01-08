import { Box, Button, SxProps, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { Form, Formik } from "formik"
import { useUser } from "../../../../hooks/useUser"
import { Geolocal } from "./Geolocal"
import { FormTillage } from "./Form"
import { useDataHandler } from "../../../../hooks/useDataHandler"
import { useIo } from "../../../../hooks/useIo"
import { CepAbertoApi } from "../../../../definitions/cepabertoApi"
import { LatLngExpression } from "leaflet"
import { DialogConfirm } from "../../../../components/DialogConfirm"
import { textField } from "../../../../style/input.ts"

interface NewTillageProps {}

const openCall = {
    title: "Adicione um CEP",
    content: "Insira o cep da sua lavoura. Caso não tenha, insira o cep mais próximo.",
    submitTitle: "Continuar",
    cancelTitle: "Cancelar",
}
const input: SxProps = {
    "& .MuiInputBase-root": { color: "#fff" },
    "& .MuiInputLabel-root.Mui-focused ": {
        color: "#fff", // Cor do label quando o TextField está em foco (digitando)
    },
    "& .MuiInputLabel-root ": {
        color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
        borderColor: colors.secondary,
        fieldset: {
            borderColor: colors.primary,
        },
    },
}
export const NewTillage: React.FC<NewTillageProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const { user } = useUser()
    const { unmask } = useDataHandler()
    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)

    //control modal
    const [open, setOpen] = useState(true)

    const [infoCep, setInfoCep] = useState<CepAbertoApi>()
    // const [origin, setOrigin] = useState<LatLngExpression>([-23.5489, -46.6388])
    const [origin, setOrigin] = useState<LatLngExpression>([0, 0])

    useEffect(() => {
        header.setTitle("Nova Lavoura")
    }, [])

    const initialValues: NewLavoura = {
        name: "",
        area: "",
        ceo: "",
        owner: "",
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
            city: "",
            cep: "",
            uf: "",
            adjunct: "",
        },
        gallery: [],
        location: [],
        producerId: user?.id,
    }
    const handleSubmit = (values: NewLavoura) => {
        console.log(values)

        const data = {
            ...values,
            address: {
                street: values.address.street,
                district: values.address.district,
                number: values.address.number,
                city: values.address.city,
                cep: unmask(values.address.cep),
                complement: values.address.adjunct,
                uf: "AM",
                // uf: estados.find((estado) => estado.value == values.address.uf)?.value || "",
            },
        }
        console.log(data)
    }
    const handleCoordinates = (value: string) => {
        io.emit("coordinate:cep", { data: unmask(value) })
        setLoading(true)
    }
    useEffect(() => {
        io.on("coordinate:cep:success", (data: CepAbertoApi) => {
            setLoading(false)
            console.log("Encontrando o cep")
            setInfoCep(data)
            setOrigin([Number(data.latitude), Number(data.longitude)])
            setCurrentStep(1)
        })
        io.on("coordinate:cep:error", () => {
            console.log("Algo deu errado. Tente Novamente!")
        })

        return () => {
            io.off("coordinate:cep:success")
            io.off("coordinate:cep:error")
        }
    }, [currentStep, origin])
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
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values, handleChange }) => (
                                <Form>
                                    {currentStep === 0 && (
                                        <DialogConfirm
                                            open={open}
                                            setOpen={setOpen}
                                            data={openCall}
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
                                                />
                                            }
                                            click={() => {
                                                {
                                                    !loading && setOpen(false)
                                                }
                                                handleCoordinates(values.address.cep)
                                            }}
                                            loading={loading}
                                        />
                                    )}
                                    {currentStep === 1 && (
                                        <>
                                            <Geolocal
                                                data={values}
                                                handleChange={handleChange}
                                                origin={origin}
                                                infoCep={infoCep}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    fontSize: 17,
                                                    color: colors.text.white,
                                                    width: "90%",
                                                    backgroundColor: colors.button,
                                                    borderRadius: "5vw",
                                                    textTransform: "none",
                                                    margin: "0 5vw",
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
                                        <FormTillage data={values} addressApi={infoCep} change={handleChange} />
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
