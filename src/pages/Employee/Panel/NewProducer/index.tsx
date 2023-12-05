import { Box, Button, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../../hooks/useHeader"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { textField } from "../../../../style/input"
import { Form, Formik } from "formik"
import MaskedInput from "../../../../components/MaskedInput"
import { Avatar, ExtFile } from "@files-ui/react"
import { useUser } from "../../../../hooks/useUser"
import { useNavigate } from "react-router-dom"

interface NewProducerProps {}

export const NewProducer: React.FC<NewProducerProps> = ({}) => {
    const header = useHeader()
    const { user } = useUser()
    const [image, setImage] = useState<File>()
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        header.setTitle("Novo Produtor")
    })

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
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ values, handleChange }) => (
                            <Form>
                                <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
                                    {currentStep === 0 && (
                                        <>
                                            <p
                                                style={{
                                                    fontSize: "4.5vw",
                                                    fontFamily: "MalgunGothic2",
                                                    textAlign: "left",
                                                    fontWeight: "800",
                                                }}
                                            >
                                                Informações Pessoais
                                            </p>
                                            <Box
                                                sx={{
                                                    flexDirection: "row",
                                                    gap: "5vw",
                                                    width: "100%",
                                                    height: "23%",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Avatar
                                                    src={image}
                                                    onChange={(file) => setImage(file)}
                                                    changeLabel="Trocar foto"
                                                    emptyLabel="Adicionar foto"
                                                    variant="circle"
                                                    style={{
                                                        width: "30vw",
                                                        height: "30vw",
                                                        fontSize: "4vw",
                                                        fontFamily: "MalgunGothic2",
                                                    }}
                                                />
                                                <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                                                    <p
                                                        style={{
                                                            fontWeight: "600",
                                                            fontFamily: "MalgunGothic2",
                                                            textAlign: "start",
                                                            fontSize: "4vw",
                                                        }}
                                                    >
                                                        Foto (Opcional)
                                                    </p>
                                                    <p
                                                        style={{
                                                            fontSize: "3vw",
                                                            fontFamily: "MalgunGothic2",
                                                            textAlign: "start",
                                                        }}
                                                    >
                                                        Clique na imagem ao lado para adicionar uma foto sua. A foto deve
                                                        estar plenamente visível e sem adereços.
                                                    </p>
                                                </Box>
                                            </Box>

                                            <Box sx={{ width: "100%", flexDirection: "column", gap: "2vw" }}>
                                                <TextField
                                                    label={"Nome Completo"}
                                                    name="name"
                                                    value={values.name}
                                                    sx={textField}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <TextField
                                                    label={"E-mail"}
                                                    name="email"
                                                    value={values.email}
                                                    type="email"
                                                    sx={textField}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <TextField
                                                    label={"CPF"}
                                                    name="cpf"
                                                    value={values.cpf}
                                                    sx={{ ...textField, width: "100%" }}
                                                    InputProps={{
                                                        inputComponent: MaskedInput,
                                                        inputProps: { mask: "000.000.000-00", inputMode: "numeric" },
                                                    }}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <TextField
                                                    label={"CNPJ"}
                                                    name="producer.cnpj"
                                                    value={values.producer?.cnpj}
                                                    sx={{ ...textField, width: "100%" }}
                                                    InputProps={{
                                                        inputComponent: MaskedInput,
                                                        inputProps: { mask: "00.000.000/0000-00", inputMode: "numeric" },
                                                    }}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <TextField
                                                    label={"Telefone"}
                                                    name="phone"
                                                    value={values.phone}
                                                    sx={textField}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        inputComponent: MaskedInput,
                                                        inputProps: { mask: "(00) 0 0000-0000" },
                                                        inputMode: "numeric",
                                                    }}
                                                    required
                                                />
                                            </Box>

                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    padding: "3vw",
                                                    color: colors.text.black,
                                                    fontWeight: "600",
                                                    fontSize: "4vw",
                                                    textTransform: "none",
                                                    borderRadius: "10vw",
                                                    height: "10vw",
                                                }}
                                                onClick={() => {
                                                    navigate("../")
                                                }}
                                            >
                                                Cancelar
                                            </Button>
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
                                                    setCurrentStep(1)
                                                }}
                                            >
                                                Próximo
                                            </Button>
                                        </>
                                    )}
                                    {currentStep === 5 && (
                                        <Button
                                            type="submit"
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
                                                // setCurrentStep(2)
                                            }}
                                        >
                                            Próximo
                                        </Button>
                                    )}
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}
