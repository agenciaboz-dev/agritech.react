import { Box, Button, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import SaveIcon from "../../../assets/icons/floppy_disk.svg"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { ContentKit } from "./ContentKit"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import { NewObject } from "../../../definitions/object"
import listEmployees from "../../../hooks/listEmployees"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import { useKits } from "../../../hooks/useKits"

interface AddKitProps {}

export const AddKit: React.FC<AddKitProps> = ({}) => {
    const navigate = useNavigate()
    const io = useIo()
    const { snackbar } = useSnackbar()
    const { listKits, setListKits, addKit } = useKits()

    const [opened, { open, close }] = useDisclosure(false)
    const [loading, setLoading] = useState(false)

    const { list } = listEmployees()
    const [allEmployees, setAllEmployees] = useState<User[] | undefined>([])
    const [listObjects, setListObjects] = useState<NewObject[]>([])
    const [team, setListEmployees] = useState<User[]>([])
    const data = {
        list: allEmployees,
        listObjects: listObjects,
        setListObjects: setListObjects,
        team: team,
        setListEmployees: setListEmployees,
    }

    const employeesIds = team
        .map((item) => item.employee?.id)
        .filter((id) => id !== undefined)
        .map((id) => ({ id }))

    const initalValues: NewKit = {
        name: "",
        description: "",
        image: "",
        image64: "",
        objects: [],
        employees: [],
        calls: [],
    }

    const submitKit = async (values: Kit) => {
        const objects = listObjects.map((item) => ({
            ...item,
            quantity: Number(item.quantity), // Converte para número
        }))
        const data = {
            ...values,
            objects: objects,
            employees: employeesIds,
        }
        console.log({ dados_formatados: data })
        io.emit("kit:create", data)
        setLoading(true)
        open()
    }

    useEffect(() => {
        io.on("kit:creation:success", (data: Kit) => {
            addKit(data)
            snackbar({ severity: "success", text: "Kit adicionado!" })
            setLoading(false)
            navigate("/adm/settings-kit/")
            close()
        })
        io.on("kit:creation:failed", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })
        return () => {
            io.off("kit:creation:success")
            io.off("kit:creation:failed")
        }
    }, [])
    useEffect(() => {
        setAllEmployees(list)
    }, [employeesIds])

    return (
        <Formik initialValues={initalValues} onSubmit={submitKit}>
            {({ values, handleChange }) => (
                <Form>
                    <Modal
                        color="#000"
                        opened={opened}
                        onClose={close}
                        size={"sm"}
                        withCloseButton={false}
                        centered
                        style={{ backgroundColor: "transparent" }}
                        styles={{
                            body: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "6vw",
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            },
                            root: {
                                width: "100%",

                                height: "100%",
                                maxHeight: "75%",
                            },
                            content: {
                                width: "100%",
                                height: "100%",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                            },
                        }}
                    >
                        <CircularProgress sx={{ color: colors.text.white, width: "15vw", height: "15vw" }} />
                    </Modal>
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
                                flex: 1,
                                backgroundColor: colors.secondary,
                                borderTopLeftRadius: "5vw",
                                borderTopRightRadius: "5vw",
                                paddingTop: 10,
                            }}
                        >
                            <Box
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: "5vw",
                                    justifyContent: "space-between",
                                    padding: "2vw 3vw",
                                }}
                            >
                                <p style={{ color: colors.text.white, fontSize: "4vw", fontFamily: "MalgunGothic2" }}>
                                    Adicionar novo kit
                                </p>
                                <Box sx={{ width: "60%", gap: "1.5vw", flexDirection: "row" }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        sx={{
                                            alignItems: "center",
                                            gap: "0vw",
                                            backgroundColor: colors.delete,
                                            color: colors.text.white,
                                            textTransform: "none",
                                            borderRadius: "5vw",
                                            fontSize: "3vw",
                                            width: "55%",
                                        }}
                                        onClick={() => navigate("../")}
                                    >
                                        <DeleteOutlineOutlinedIcon fontSize="small" sx={{ color: "#fff" }} />
                                        Descartar kit
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="small"
                                        variant="contained"
                                        sx={{
                                            alignItems: "center",
                                            gap: "1vw",
                                            backgroundColor: "#fff",
                                            textTransform: "none",
                                            borderRadius: "5vw",
                                            fontSize: "3vw",
                                            width: "45%",
                                            color: colors.text.black,
                                        }}
                                    >
                                        <img src={SaveIcon} style={{ width: "5vw" }} />
                                        Salvar kit
                                    </Button>
                                </Box>
                            </Box>

                            <Box
                                style={{
                                    padding: "6vw 4vw 0",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    borderTopLeftRadius: "7vw",
                                    borderTopRightRadius: "7vw",
                                    height: "100%",
                                    gap: "1vw",
                                    overflowY: "hidden",
                                }}
                            >
                                <Box sx={{ overflowX: "hidden", overflowY: "auto", height: "95%", p: "0 2vw" }}>
                                    <ContentKit edit values={values} handleChange={handleChange} data={data} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
