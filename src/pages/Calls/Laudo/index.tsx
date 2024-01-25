import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Call, CallStatus } from "../../../definitions/call"
import { Box, TextField } from "@mui/material"
import { ButtonComponent } from "../../../components/ButtonComponent"
import { Form, Formik } from "formik"
import { TitleComponents } from "../../../components/TitleComponents"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { textField } from "../../../style/input"
import { StageDescription } from "../../../components/StageDescription"
import { Stepper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import findProducer from "../../../hooks/filterProducer"
import { useKits } from "../../../hooks/useKits"
import { useUsers } from "../../../hooks/useUsers"
import { useCall } from "../../../hooks/useCall"
import { useProducer } from "../../../hooks/useProducer"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { Operation } from "./Operation"
import { Treatment } from "./Treatment"
import { useDisclosure } from "@mantine/hooks"
import { ModalProduct } from "./ModalProduct"
import { TechReport } from "./TechReport"
import { ModalFlight } from "./ModalFlight"
import { useCallInfo } from "../../../hooks/useCallSelect"

interface LaudoCallProps {
    user: User
}

export const LaudoCall: React.FC<LaudoCallProps> = ({ user }) => {
    const header = useHeader()
    const navigate = useNavigate()
    const { callid } = useParams()
    const call = useCallInfo(callid)

    const [stage, setstage] = useState(0)

    const [opened, { open, close }] = useDisclosure(false)
    const [openedFlight, { open: openFlight, close: closeFlight }] = useDisclosure(false)
    const [listProducts, setListProducts] = useState<Product[]>([])
    const [listFlight, setListFlight] = useState<Flight[]>([])

    const initialValues: NewReport = {
        operation: {
            service: "",
            culture: "",
            areaMap: 0,
            equipment: "",
            model: "",
        },
        treatment: {
            products: [],
        },
        material: [],
        techReport: {
            date: "",
            init: "",
            finish: "",
            comments: "",
            flight: [],
        },
    }

    const handleSubmit = (values: NewReport) => {
        const data = {
            ...values,
            call: call,
            producer: call.producerSelect?.producer,
            treatment: { products: listProducts },
        }
        if (call !== null) {
            console.log(data)
        } else {
            console.error("call é null")
        }
    }

    useEffect(() => {
        header.setTitle("Relatório Operacional")
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
            <ModalProduct opened={opened} close={close} product={listProducts} setproduct={setListProducts} />
            <ModalFlight opened={openedFlight} close={closeFlight} flight={listFlight} setFlight={setListFlight} />
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
                <Header
                    back
                    location={
                        user?.isAdmin
                            ? `/adm/producer/${call.producerSelect?.id}/${call.tillageSelect?.id}`
                            : `/employee/producer/${call.producerSelect?.id}/${call.tillageSelect?.id}`
                    }
                />
            </Box>

            <Box
                style={{
                    padding: "5vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    gap: "3vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                <TitleComponents
                    title="Preencher dados"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Cliente"
                    click={() =>
                        navigate(
                            user.isAdmin
                                ? `/adm/profile/${call.producerSelect?.id}`
                                : `/employee/profile/${call.producerSelect?.id}`
                        )
                    }
                    variant
                />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Box sx={{ gap: "3vw", height: "85%", overflowY: "auto", p: "2vw 0" }}>
                            <Form>
                                <Box sx={{ justifyContent: "space-between", height: "100%" }}>
                                    <Box sx={{ gap: "5vw" }}>
                                        <Box gap={"3vw"}>
                                            <TextField
                                                label="Contratante"
                                                name="producer"
                                                value={call.producerSelect ? call.producerSelect?.name : ""}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />
                                            <TextField
                                                label="Propriedade"
                                                name="tillage"
                                                value={call.tillageSelect ? call.tillageSelect?.name : " "}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />
                                            <TextField
                                                label="Área Trabalhada"
                                                InputProps={{ endAdornment: "ha" }}
                                                name="tillage"
                                                value={values.operation?.areaMap}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Box>
                                        <Stepper
                                            active={stage}
                                            size="xs"
                                            onStepClick={setstage}
                                            styles={{
                                                step: {
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: "2vw",
                                                    justifyContent: "center",
                                                    marginLeft: 0,
                                                },
                                                content: { margin: 0 },
                                                stepIcon: { margin: 0 },
                                                stepBody: { margin: 0 },
                                            }}
                                        >
                                            <Stepper.Step label="Operação" step={2} />
                                            <Stepper.Step label="Tratamento" />
                                            <Stepper.Step label="Laudo Técnico" />
                                            <Stepper.Step label="Insumos" />
                                        </Stepper>
                                    </Box>
                                    {stage === 0 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <Operation user={user} values={values} change={handleChange} />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(1)
                                                }}
                                            >
                                                Tratamento {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 1 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <Treatment
                                                listProducts={listProducts}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={open}
                                            />
                                            <ButtonAgritech
                                                type="submit"
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(2)
                                                    handleSubmit(values)
                                                }}
                                            >
                                                Laudo Técnico {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 2 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <TechReport
                                                listFlights={listFlight}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={openFlight}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(3)
                                                    console.log("Finalizado")
                                                }}
                                            >
                                                Insumos {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 3 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(3)
                                                    console.log("Finalizado")
                                                    navigate(user.isAdmin ? `/` : `/employee`)
                                                }}
                                            >
                                                Enviar Relatório {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {/* {!user?.producer && <ButtonComponent title="Reportar" location="" />} */}
                                </Box>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
