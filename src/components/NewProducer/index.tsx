import { Box, Button, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { colors } from "../../style/colors"
import { Header } from "../Header"
import { textField } from "../../style/input"
import { Form, Formik } from "formik"
import MaskedInput from "../MaskedInput"
import { Avatar } from "@files-ui/react"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { Geolocal } from "./Geolocal"
import { NewTillage } from "./NewTillage"
import { useDataHandler } from "../../hooks/useDataHandler"
import { Profile } from "./Profile"

interface NewProducerProps {}

export const NewProducer: React.FC<NewProducerProps> = ({}) => {
    const header = useHeader()
    const { user } = useUser()
    const { unmask } = useDataHandler()
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        header.setTitle("Novo Produtor")
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
            complement: "",
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
                complement: values.address.complement,
                uf: "AM",
                // uf: estados.find((estado) => estado.value == values.address.uf)?.value || "",
            },
        }
        setCurrentStep(1)
    }

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
                    style={{
                        padding: "4vw",
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
                                    {currentStep === 0 && <Profile values={values} handleChange={handleChange} />}
                                    {currentStep === 1 && (
                                        <>
                                            <Geolocal
                                                data={values}
                                                handleChange={handleChange}
                                                
                                            />
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
                                                onClick={() => {
                                                    setCurrentStep(2)
                                                }}
                                            >
                                                Próximo
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            )}
                        </Formik>
                        {currentStep === 2 && <NewTillage />}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
