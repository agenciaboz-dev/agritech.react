import React, { useEffect } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Call, CallStatus } from "../../definitions/call"
import { Box, TextField } from "@mui/material"
import { ButtonComponent } from "../../components/ButtonComponent"
import { Form, Formik } from "formik"
import { TitleComponents } from "../../components/TitleComponents"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { StageDescription } from "../../components/StageDescription"

interface ReportCallProps {
    user: User
}

export const ReportCall: React.FC<ReportCallProps> = ({ user }) => {
    const header = useHeader()

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
        console.log(values)
    }

    useEffect(() => {
        header.setTitle("Painel")
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
                <Header back location={user?.isAdmin ? "/" : user?.producer ? "/producer/" : "/employee/"} />
            </Box>

            <Box
                style={{
                    padding: "5vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    gap: "5vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                <TitleComponents
                    title="Chamado"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Produtor"
                    variant
                />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Box sx={{ gap: "3vw", height: "83%", overflowY: "auto", p: "2vw 0" }}>
                            <Form>
                                <Box sx={{ gap: "4vw" }}>
                                    <TextField
                                        label="Aberto em"
                                        name="init"
                                        type="date"
                                        value={values.open}
                                        sx={{ ...textField }}
                                        inputProps={{ "aria-readonly": true }}
                                        disabled={!user?.producer ? false : true}
                                    />
                                    <TextField
                                        label="Produtor"
                                        name="producer"
                                        value={values.producerId}
                                        sx={{ ...textField }}
                                        disabled={!user?.producer ? false : true}
                                    />
                                    <TextField
                                        label="Lavoura"
                                        name="tillage"
                                        value={values.approved}
                                        sx={{ ...textField }}
                                        disabled={!user?.producer ? false : true}
                                    />
                                </Box>
                                <StageDescription title={values.stages[1].name} values={values} change={handleChange} />
                                <StageDescription title={values.stages[2].name} values={values} change={handleChange} />
                                <StageDescription title={values.stages[3].name} values={values} change={handleChange} />
                            </Form>
                            {!user?.producer && <ButtonComponent title="Reportar" location="" />}
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
