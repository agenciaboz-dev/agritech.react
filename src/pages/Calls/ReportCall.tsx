import React, { useEffect } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Call } from "../../definitions/call"
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
        openCall: "2023-12-26",
        init: "2023-12-26",
        finish: "",
        caller: user,
        comments: "",
        tillage: "select com as lavouras do produtor",
        producer: user?.producer ? user?.name : "Aqui é um select",
        kit: user.isAdmin ? "Kit #Vuitton" : "",
        stages: [
            {
                name: "Indo para a localização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
            },
            {
                name: "Chegada na Localização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
            },
            {
                name: "Pulverização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
            },
            {
                name: "Volta da Localização",
                comments: "",
                date: "2023-12-26",
                duration: "02:00:30",
                finish: "02:00:30",
                start: "02:00:30",
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
                <Header back location={!user?.isAdmin ? "/employee/panel" : "/"} />
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
                                        value={values.openCall}
                                        sx={{ ...textField }}
                                        inputProps={{ "aria-readonly": true }}
                                    />
                                    <TextField
                                        label="Produtor"
                                        name="producer"
                                        value={values.producer}
                                        sx={{ ...textField }}
                                    />
                                    <TextField
                                        label="Lavoura"
                                        name="tillage"
                                        value={values.tillage}
                                        sx={{ ...textField }}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <StageDescription title={values.stages[1].name} values={values} change={handleChange} />
                                <StageDescription title={values.stages[2].name} values={values} change={handleChange} />
                                <StageDescription title={values.stages[3].name} values={values} change={handleChange} />
                            </Form>
                            <ButtonComponent title="Reportar" location="" />
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
