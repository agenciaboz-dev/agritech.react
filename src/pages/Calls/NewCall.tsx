import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { TitleComponents } from "../../components/TitleComponents"
import { Form, Formik } from "formik"
import { Call, CreateCall } from "../../definitions/call"
import { textField } from "../../style/input"
import listProducers from "../../hooks/listProducers"
import useDateISO from "../../hooks/useDateISO"
import { useUser } from "../../hooks/useUser"
import { useKits } from "../../hooks/useKits"
import { useProducer } from "../../hooks/useProducer"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useCall } from "../../hooks/useCall"

interface NewCallProps {
    user: User
}

export const NewCall: React.FC<NewCallProps> = ({ user }) => {
    const io = useIo()
    const header = useHeader()
    const account = useUser()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const { listKits } = useKits()
    const { listTillages } = useProducer()
    const { addCallPending } = useCall()

    const [loading, setLoading] = useState(false)
    const [producerId, setProducerId] = useState<number | null>(null)
    const [tillageId, setTillageId] = useState<number | null>(null)
    const [kitId, setKitId] = useState<number | null>(null)
    const [inputValue, setInputValue] = useState("")
    const [tillageValue, setTillageValue] = useState("")
    const [kitValue, setKitValue] = useState("")

    const producers =
        listProducers()?.map((item) => ({
            id: item.producer?.id || 0,
            name: item.name,
        })) || []

    const tillages =
        listTillages
            ?.filter((tillage) => tillage.producerId === producerId)
            .map((tillage) => ({
                id: tillage.id,
                name: tillage.name,
            })) || []

    const kits =
        listKits?.map((item) => ({
            id: item.id || 0,
            name: item.name,
        })) || []

    const initialValues: CreateCall = {
        approved: user.isAdmin ? true : false,
        open: new Date().toLocaleDateString("pt-br"),
        comments: "",
        producerId: 0,
        kitId: 0,
        userId: Number(account?.user?.id),
    }

    const handleSubmit = (values: CreateCall) => {
        console.log(values)
        io.emit("call:create", values)
        setLoading(true)
    }

    useEffect(() => {
        io.on("call:creation:success", (data: Call) => {
            console.log({ chamadoAberto: data })
            {
                !data.approved && addCallPending(data)
            }
            setLoading(false)
            snackbar({
                severity: "success",
                text: !user.isAdmin ? "Chamado aberto! Aguarde a aprovação." : "Chamado aberto!",
            })
            navigate(user.isAdmin ? "/adm/calls" : user.employee ? "/employee/" : "/producer/")
        })
        io.on("call:creation:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Algo deu errado" })
            setLoading(false)
        })
        return () => {
            io.off("call:creation:success")
            io.off("call:creation:failed")
        }
    }, [])

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
                                    label="Previsão da visita"
                                    name="openCall"
                                    // type="date"
                                    value={values.open}
                                    sx={{ ...textField }}
                                />
                                <Autocomplete
                                    value={producers.find((prod) => prod.id === values.producerId) || null}
                                    options={producers || []}
                                    getOptionLabel={(option: { id: number; name: string }) => option.name}
                                    inputValue={inputValue}
                                    onChange={(event, selected) => {
                                        if (selected) {
                                            setInputValue(selected.name)
                                            setFieldValue("producerId", selected.id)
                                            setProducerId(selected.id)
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Produtor" required />
                                    )}
                                />
                                {/* <Autocomplete
                                    value={tillages.find((tillage) => tillage.id === values.tillageId) || null}
                                    options={tillages || []}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, selected) => {
                                        if (selected) {
                                            setFieldValue("tillageId", selected.id)
                                            setTillageId(selected.id)
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Lavoura" required />
                                    )}
                                /> */}

                                {user.isAdmin && (
                                    <Autocomplete
                                        value={kits.find((kit) => kit.id === values.kitId) || null}
                                        inputValue={kitValue}
                                        getOptionLabel={(option: { id: number; name: string }) => option.name}
                                        options={kits || []}
                                        onChange={(event, selected) => {
                                            if (selected) {
                                                setFieldValue("kitId", selected.id)
                                                setProducerId(selected.id)
                                                setKitValue(selected.name)
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} sx={{ ...textField }} label="Kit" required />
                                        )}
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
                                        width: "100%",
                                        backgroundColor: colors.button,
                                        borderRadius: "5vw",
                                        textTransform: "none",
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
