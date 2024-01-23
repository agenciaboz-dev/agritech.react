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

interface LaudoCallProps {
    user: User
}

export const LaudoCall: React.FC<LaudoCallProps> = ({ user }) => {
    const header = useHeader()
    const navigate = useNavigate()
    const { callid } = useParams()
    const { listUsers } = useUsers()
    const { listCalls } = useCall()
    const { listTillages } = useProducer()

    const [stage, setstage] = useState(0)

    const initialValues: Call = {
        approved: false,
        open: "2023-12-26",
        init: "2023-12-26",
        finish: "",
        userId: user.id,
        comments: "",
        tillageId: 224,
        producerId: user?.producer?.id || 0,
        id: 148,
        // status: CallStatus.INPROGRESS,
        stages: [
            {
                name: "Indo para a localização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
                callId: 148,
            },
            {
                name: "Chegada na Localização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
                callId: 148,
            },
            {
                name: "Pulverização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
                callId: 148,
            },
            {
                name: "Volta da Localização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
                callId: 148,
            },
        ],
    }

    const handleSubmit = (values: Call) => {
        console.log(values.stages[0])
    }
    const [call, setCall] = useState<Call | null>()
    const [producerSelect, setProducerSelect] = useState<User | null>()
    const [tillage, setTillage] = useState<Tillage | null>()

    useEffect(() => {
        header.setTitle("Relatório Operacional")
    }, [])

    useEffect(() => {
        setCall(listCalls.find((item) => String(item.id) === callid))
        setProducerSelect(listUsers?.find((item) => item.producer?.id === call?.producerId) || null)
        setTillage(listTillages?.find((item) => item.id === call?.tillageId && item.producerId === call.producerId))
    }, [call])

    useEffect(() => {
        console.log(stage)
    }, [stage])
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
                <Header
                    back
                    location={
                        user?.isAdmin
                            ? `/adm/producer/${producerSelect?.id}/${tillage?.id}`
                            : `/employee/producer/${producerSelect?.id}/${tillage?.id}`
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
                    textButton="Acessar Produtor"
                    click={() =>
                        navigate(
                            user.isAdmin ? `/adm/profile/${producerSelect?.id}` : `/employee/profile/${producerSelect?.id}`
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
                                                value={producerSelect ? producerSelect?.name : ""}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />
                                            <TextField
                                                label="Propriedade"
                                                name="tillage"
                                                value={tillage ? tillage?.name : " "}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />
                                        </Box>
                                        <Stepper
                                            active={stage}
                                            size="xs"
                                            // onStepClick={setstage}
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
                                                    handleSubmit(values)
                                                }}
                                            >
                                                Tratamento {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 1 && (
                                        <Box sx={{ height: "100%" }}>
                                            <StageDescription
                                                title={values.stages[2].name}
                                                values={values}
                                                change={handleChange}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => setstage(2)}
                                            >
                                                Finalizar Pulverização
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 2 && (
                                        <>
                                            <StageDescription
                                                title={values.stages[3].name}
                                                values={values}
                                                change={handleChange}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(3)
                                                    console.log("Finalizado")
                                                    navigate(`/adm/call/${callid}/laudo`)
                                                }}
                                            >
                                                Finalizar
                                            </ButtonAgritech>
                                        </>
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
