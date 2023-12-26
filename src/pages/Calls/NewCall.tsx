import { Box, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { TitleComponents } from "../../components/TitleComponents"
import { useUser } from "../../hooks/useUser"
import { Form, Formik } from "formik"
import { OpenCall } from "../../definitions/call"
import { textField } from "../../style/input"
import { ButtonComponent } from "../../components/ButtonComponent"

interface NewCallProps {
    user: User
}

export const NewCall: React.FC<NewCallProps> = ({ user }) => {
    const header = useHeader()
    // const { user } = useUser()

    const initialValues: OpenCall = {
        approved: false,
        openCall: String(new Date()),
        init: "",
        caller: user,
        comments: "",
        tillage: "select com as lavouras do produtor",
        producer: user?.producer ? user?.name : "Aqui é um select",
        kit: user.isAdmin ? "Kit #Vuitton" : "",
    }

    const handleSubmit = (values: OpenCall) => {
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
                <Header back location={user?.employee ? "/employee/panel" : user?.producer ? "/producer/panel" : "/"} />
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
                    title="Novo Chamado"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Produtor"
                    variant
                />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Box sx={{ gap: "4vw" }}>
                            <Form>
                                <TextField
                                    label="Data Desejada"
                                    name="open"
                                    value={values.openCall}
                                    sx={{ ...textField }}
                                    inputProps={{ "aria-readonly": true }}
                                />
                                <TextField
                                    label="Produtor"
                                    name="producerId"
                                    value={values.producer}
                                    sx={{ ...textField }}
                                    onChange={user.employee ? handleChange : () => {}}
                                    disabled={user.producer ? true : false}
                                />
                                <TextField
                                    label="Lavoura"
                                    name="tillage"
                                    value={values.tillage}
                                    sx={{ ...textField }}
                                    onChange={handleChange}
                                />

                                {user.isAdmin && (
                                    <TextField
                                        label="Equipe Responsável"
                                        name="kit"
                                        value={values.kit}
                                        sx={{ ...textField }}
                                        onChange={handleChange}
                                    />
                                )}

                                <TextField
                                    multiline
                                    label="Observações"
                                    name="comments"
                                    value={values.comments}
                                    minRows={8}
                                    maxRows={20}
                                    sx={{
                                        ...textField,
                                    }}
                                    onChange={handleChange}
                                    InputProps={{
                                        sx: {
                                            "& .MuiOutlinedInput-root": {
                                                "&.Mui-focused fieldset": {
                                                    borderColor: colors.secondary,
                                                },
                                                fieldset: {
                                                    borderColor: "#232323",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </Form>
                            <ButtonComponent title="Abrir Chamado" location="" />
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
