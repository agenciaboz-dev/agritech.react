import { Box, Button, CircularProgress, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { Form, Formik } from "formik"
import { useUser } from "../../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { Geolocal } from "./Geolocal"
import { FormTillage } from "./Form"
import { useDataHandler } from "../../../../hooks/useDataHandler"
import { useIo } from "../../../../hooks/useIo"
import { CepAbertoApi } from "../../../../definitions/cepabertoApi"
import { LatLngExpression } from "leaflet"

interface NewTillageProps {}

export const NewTillage: React.FC<NewTillageProps> = ({}) => {
    const header = useHeader()
    const { user } = useUser()
    const { unmask } = useDataHandler()
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const io = useIo()
    const [infoCep, setInfoCep] = useState<CepAbertoApi>()
    // const [origin, setOrigin] = useState<LatLngExpression>([-23.5489, -46.6388])
    const [origin, setOrigin] = useState<LatLngExpression>([0, 0])

    useEffect(() => {
        header.setTitle("Nova Lavoura")
    }, [name])

    const initialValues: NewProducer = {
        name: "",
        email: "",
        username: "",
        password: "",
        cpf: "",
        birth: "",
        phone: "",
        image: "",

        //address
        address: {
            street: "",
            district: "",
            number: "",
            city: "",
            cep: "",
            uf: "",
            adjunct: "",
        },
        isAdmin: false,
        approved: false,
        rejected: "",

        employeeId: user?.employee?.id,
        producer: { cnpj: "", tillage: [] },
    }

    const handleSubmit = (values: NewProducer) => {
        console.log(values)

        const data = {
            ...values,
            cpf: unmask(values.cpf),
            phone: unmask(values.phone),
            approved: true,
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
        handleCoordinates(values.address.cep)
    }
    const handleCoordinates = (value: string) => {
        io.emit("coordinate:cep", { data: unmask(value) })
        setLoading(true)
    }
    useEffect(() => {
        io.on("coordinate:cep:success", (data: CepAbertoApi) => {
            setLoading(false)
            console.log("atualizando")
            setInfoCep(data)
            setOrigin([Number(data.latitude), Number(data.longitude)])
            setCurrentStep(1)
        })
        io.on("coordinate:cep:error", () => {
            console.log("Algo de errado não está certo!")
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
                                    {currentStep === 2 && <FormTillage />}
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
