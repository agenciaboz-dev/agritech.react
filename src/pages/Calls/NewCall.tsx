import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { TitleComponents } from "../../components/TitleComponents"
import { Form, Formik } from "formik"
import { OpenCall } from "../../definitions/call"
import { textField } from "../../style/input"
import listProducers from "../../hooks/listProducers"
import useDateISO from "../../hooks/useDateISO"
import { useUser } from "../../hooks/useUser"

interface NewCallProps {
    user: User
}

export const NewCall: React.FC<NewCallProps> = ({ user }) => {
    const header = useHeader()
    const account = useUser()

    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [tillageValue, setTillageValue] = useState("")
    const producers = listProducers()?.map((item) => item.name) || []
    const options: string[] | undefined = ["Selecione um produtor", ...producers]
    const tillages: string[] = ["Selecione a lavoura", "Fazenda Mormaço", "Tigrinho", "Zabelê"]

    const initialValues: OpenCall = {
        approved: false,
        openCall: new Date().toLocaleDateString("pt-br"),
        init: "",
        caller: user,
        comments: "",
        tillage: "Selecione a lavoura",
        producer: user?.producer ? user?.name : "Selecione um produtor",
        kit: user.isAdmin ? "Kit #Vuitton" : "",
    }

    const handleSubmit = (values: OpenCall) => {
        console.log(values)

        setLoading(true)
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
                <Header back location={account.user?.isAdmin ? "/" : user?.producer ? "/producer/" : "/employee/"} />
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
                    {({ values, handleChange, setFieldValue }) => (
                        <Box sx={{ gap: "4vw" }}>
                            <Form>
                                <TextField
                                    label="Data Desejada"
                                    name="openCall"
                                    // type="date"
                                    value={values.openCall}
                                    sx={{ ...textField }}
                                    disabled
                                />
                                <Autocomplete
                                    value={values.producer}
                                    onChange={(event, newValue) => {
                                        setFieldValue("producer", newValue)
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue)
                                    }}
                                    options={options || []}
                                    isOptionEqualToValue={(option, value) => {
                                        {
                                            value === "Selecione um produtor" && option === "Selecione um produtor"
                                        }
                                        return option === value
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Produtor" required />
                                    )}
                                />
                                <Autocomplete
                                    value={values.tillage}
                                    onChange={(event, newValue) => {
                                        setFieldValue("tillage", newValue)
                                    }}
                                    inputValue={tillageValue}
                                    onInputChange={(event, newInputValue) => {
                                        setTillageValue(newInputValue)
                                    }}
                                    options={tillages || []}
                                    isOptionEqualToValue={(option, value) => {
                                        {
                                            value === "Selecione a lavoura" && option === "Selecione a lavoura"
                                        }
                                        return option === value
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Lavoura" required />
                                    )}
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
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        fontSize: 17,
                                        color: colors.text.white,
                                        width: "90%",
                                        backgroundColor: colors.button,
                                        borderRadius: "5vw",
                                        textTransform: "none",
                                        margin: "0 5vw",
                                    }}
                                >
                                    {loading ? <CircularProgress sx={{ color: "#fff" }} /> : "Abrir Chamado"}
                                </Button>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
