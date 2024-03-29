import { Box, Button, CircularProgress, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { colors } from "../../style/colors"
import { Header } from "../Header"
import { Form, Formik } from "formik"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useDataHandler } from "../../hooks/useDataHandler"
import { Profile } from "./Profile"
import { useIo } from "../../hooks/useIo"
import { CepAbertoApi } from "../../definitions/cepabertoApi"
import { LatLngExpression, LatLngTuple } from "leaflet"
import { DialogConfirm } from "../DialogConfirm"
import { textField, input } from "../../style/input.ts"
import { NewLavoura } from "../../definitions/newTillage"
import { useSnackbar } from "burgos-snackbar"
import { FormTillage } from "../../pages/Producer/Panel/NewTillage/FormTillage.tsx"
import { useProducer } from "../../hooks/useProducer.ts"
import { Geolocal } from "./Geolocal.tsx"
import { useUsers } from "../../hooks/useUsers.ts"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil.ts"
import { useCepMask } from "burgos-masks"
import MaskedInputNando from "../MaskedNando.tsx"
import { unmaskNumber } from "../../hooks/unmaskNumber.ts"
import { useDisclosure } from "@mantine/hooks"
import { ModalGallery } from "../../pages/Producer/ModalGallery.tsx"

interface NewProducerProps {}

const openCall = {
    title: "Adicione um CEP",
    content: "Insira o cep da fazenda. Caso não tenha, insira o cep mais próximo.",
    submitTitle: "Continuar",
    cancelTitle: "Cancelar",
}

export const NewProducer: React.FC<NewProducerProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { user } = useUser()
    const { addTillage } = useProducer()
    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()
    const { addUser } = useUsers()

    const [currentStep, setCurrentStep] = useState(0)
    const [open, setOpen] = useState(true)
    const [loadingProducer, setLoadingProducer] = useState(false)
    const [loadingCoordinate, setLoadingCoordinate] = useState(false)
    const [loadingTillage, setLoadingTillage] = useState(false)

    //control map
    const [infoCep, setInfoCep] = useState<CepAbertoApi>()
    const [origin, setOrigin] = useState<LatLngExpression>([0, 0])
    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([])

    const [producer, setProducer] = useState<User>()
    const [tillage, setTilllage] = useState<Tillage>()
    const estados = useEstadosBrasil()
    const [image, setImage] = useState<File>()
    const [images, setImages] = useState<{ id: number; name: string; file: File; url: string }[]>([])
    const [opened, { open: openModal, close }] = useDisclosure()

    useEffect(() => {
        header.setTitle(producer ? `${producer?.name}` : "Novo Cliente")
    }, [producer?.name])

    const valuesProducer: NewProducer = {
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
        office: "",

        // employeeId: user?.employee?.id,
        producer: {
            cnpj: "",
            contract: true,
            inscricaoEstadual: "",
            employeeId: user?.employee?.id,
        },
    }

    const submitProducer = async (values: NewProducer) => {
        const data = {
            ...values,
            username: values.email,
            password: unmask(values.cpf),
            cpf: unmask(values.cpf),
            phone: unmask(values.phone),
            approved: true,
            image: image
                ? {
                      file: image,
                      name: image.name,
                  }
                : undefined,
            address: {
                street: values.address.street,
                district: values.address.district,
                number: values.address.number,
                city: values.address.city,
                cep: unmask(values.address.cep),
                complement: values.address.adjunct,
                // uf: "AM",
                uf: estados.find((estado) => estado.value == values.address.uf)?.value || "",
            },
            producer: {
                cnpj: unmask(values.producer?.cnpj || ""),
                inscricaoEstadual: unmask(values.producer.inscricaoEstadual || ""),
                contract: values.producer.contract,
                tillage: values.producer.tillage,
                employeeId: user?.employee?.id,
            },
        }
        console.log(data)

        io.emit("user:signup", data)
        setLoadingProducer(true)
    }

    useEffect(() => {
        console.log("Cliente recuperado", producer)
    }, [producer])

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            setLoadingProducer(false)
            if (user) {
                snackbar({
                    severity: "success",
                    text: "Cliente cadastrado!",
                })
                setProducer(user)
                addUser(user)
                setCurrentStep(1)
            }
        })

        io.on("user:status:failed", (data) => {
            const errorMessage = data.error ? data.error : "Falha no cadastro! Reveja as informações"
            snackbar({ severity: "error", text: errorMessage })
            setLoadingProducer(false)
        })

        return () => {
            io.off("user:signup:success")
            io.off("user:status:failed")
        }
    }, [producer])

    const valuesTillage: NewLavoura = {
        name: "",
        area: "",
        ceo: "",
        owner: producer?.name || " ", //corrigir para o nome do Cliente
        manager: "",
        agronomist: "",
        technician: "",
        pilot: "",
        comments: "",
        others: "",
        address: {
            street: "",
            district: infoCep?.bairro || "",
            number: "",
            city: infoCep?.cidade.nome || "",
            cep: infoCep?.cep || "",
            uf: infoCep?.estado.sigla || "",
            adjunct: "",
        },
        cover: "",
        gallery: [],
        location: [],
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

    const submitTillage = async (values: NewLavoura) => {
        console.log(values)
        console.log({ enviados: values })
        const folder = {
            images: formatted,
        }
        const galleries: NewGallery[] = [folder]

        const data = {
            ...values,
            cover: values.cover,
            address: {
                street: infoCep?.logradouro || "",
                district: infoCep?.bairro || "",
                number: "",
                city: infoCep?.cidade.nome,
                cep: unmask(infoCep?.cep || ""),
                uf: infoCep?.estado.sigla,
                adjunct: infoCep?.complemento,
            },
            area: unmaskNumber(values.area),
            producerId: producer?.producer?.id,
            gallery: galleries,
        }
        io.emit("tillage:create", data, user?.isAdmin)

        console.log(data)
        setLoadingTillage(true)
    }

    useEffect(() => {
        io.on("coordinate:cep:success", (data: CepAbertoApi) => {
            setLoadingCoordinate(false)
            console.log("Encontrando o cep")
            setInfoCep(data)
            setOrigin([Number(data.latitude), Number(data.longitude)])
            setCurrentStep(2)
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
        io.on("tillage:creation:success", (data: any) => {
            setTilllage(data.tillage)
            addTillage(data.tillage)
            snackbar({ severity: "success", text: "Lavoura adicionada!" })
            setLoadingTillage(false)
            navigate(
                user?.isAdmin
                    ? `/adm/producer/${producer?.producer?.id}/${data.tillage.id}`
                    : `/employee/producer/${producer?.producer?.id}/${data.tillage.id}`
            )
        })
        io.on("tillage:creation:failed", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })
    }, [producer, tillage])

    const handleCoordinates = (value: string) => {
        io.emit("coordinate:cep", { data: unmask(value) })
        setLoadingCoordinate(true)
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
                        Localização da Fazenda
                    </p>
                )}
                <Box
                    sx={{
                        padding: "0vw",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
                        <ModalGallery images={images} close={close} opened={opened} setImages={setImages} />

                        <Formik initialValues={valuesProducer} onSubmit={submitProducer}>
                            {({ values, handleChange }) => (
                                <Form>
                                    {currentStep === 0 && (
                                        <Box
                                            sx={{ justifyContent: "space-between", flexDirection: "column", height: "90%" }}
                                        >
                                            <Profile
                                                values={values}
                                                handleChange={handleChange}
                                                image={image}
                                                setImage={setImage}
                                            />
                                            <Box sx={{ flexDirection: "column", p: "4vw", gap: "2vw" }}>
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
                                                    type="submit"
                                                    sx={{
                                                        fontSize: 17,
                                                        color: colors.text.white,
                                                        width: "100%",
                                                        backgroundColor: colors.button,
                                                        borderRadius: "5vw",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    {loadingProducer ? (
                                                        <CircularProgress sx={{ color: "#fff" }} />
                                                    ) : (
                                                        "Salvar"
                                                    )}
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                    {currentStep === 1 && (
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
                                </Form>
                            )}
                        </Formik>
                        <Formik initialValues={valuesTillage} onSubmit={submitTillage}>
                            {({ values, handleChange }) => (
                                <Form>
                                    {currentStep === 2 && (
                                        <>
                                            <Geolocal
                                                coordinates={coordinates}
                                                setCoordinates={setCoordinates}
                                                data={values}
                                                handleChange={handleChange}
                                                origin={origin}
                                                infoCep={infoCep}
                                                setCurrentStep={setCurrentStep}
                                            />
                                        </>
                                    )}
                                    {currentStep === 3 && (
                                        <Box sx={{ height: "89%", justifyContent: "space-between" }}>
                                            <FormTillage
                                                data={values}
                                                change={handleChange}
                                                producerUser={producer}
                                                addressApi={infoCep}
                                                setCoordinates={setCoordinates}
                                                setCurrentStep={setCurrentStep}
                                                images={images}
                                                open={openModal}
                                                opened={opened}
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
                                                        setCurrentStep(2)
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
                                                    onClick={() => setLoadingTillage(true)}
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
