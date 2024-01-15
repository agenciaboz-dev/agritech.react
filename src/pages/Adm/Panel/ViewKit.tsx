import { Box, Button, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ContentKit } from "./ContentKit"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import SaveIcon from "../../../assets/icons/floppy_disk.svg"
import { useParams } from "react-router-dom"
import { useKits } from "../../../hooks/useKits"
import { useHeader } from "../../../hooks/useHeader"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import { Form, Formik } from "formik"
import { NewObject } from "../../../definitions/object"
import { UpdateContentKit } from "./UpdateContentKit"
import { FiEdit2 } from "react-icons/fi"

interface ViewKitProps {}

export const ViewKit: React.FC<ViewKitProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { snackbar } = useSnackbar()
    const { kitid } = useParams()
    const { listKits, updateKit } = useKits()

    const kit = listKits.filter((item) => item.id === Number(kitid))

    const [opened, { open, close }] = useDisclosure(false)
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)

    const initalValues: NewKit = {
        name: kit[0].name,
        description: kit[0].description,
        image: kit[0].image,
        image64: kit[0].image64,
        objects: kit[0].objects,
        employees: kit[0].employees,
        calls: kit[0].calls,
    }

    const [allEmployees, setAllEmployees] = useState<User[] | undefined>([])
    const [listObjects, setListObjects] = useState<NewObject[]>()
    const [team, setListEmployees] = useState<User[]>()

    const data = {
        list: allEmployees,
        listObjects: listObjects,
        setListObjects: setListObjects,
        team: team,
        setListEmployees: setListEmployees,
    }

    const handleUpdateKit = (values: Kit) => {
        io.emit("kit:update", values)
        setLoading(true)
        open()
    }

    useEffect(() => {
        io.on("kit:update:success", (data: Kit) => {
            updateKit(data)
            snackbar({ severity: "success", text: "Kit atualizado!" })
            setLoading(false)
            close()
        })
        io.on("kit:update:failed", (error) => {
            snackbar({ severity: "success", text: error })
        })

        return () => {
            io.off("kit:update:success")
            io.off("kit:update:failed")
        }
    }, [])

    useEffect(() => {
        header.setTitle("Kits")
    }, [])
    return (
        <Formik initialValues={initalValues} onSubmit={handleUpdateKit}>
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
                                paddingBottom: "13vw",
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
                                <p
                                    style={{
                                        color: colors.text.white,
                                        fontSize: "5vw",
                                        fontFamily: "MalgunGothic2",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {kit !== null ? kit[0].name : "Kit"}
                                </p>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        alignItems: "center",
                                        gap: "1vw",
                                        backgroundColor: "#fff",
                                        textTransform: "none",
                                        borderRadius: "5vw",
                                        fontSize: "3vw",
                                        width: "fit-content",
                                        color: colors.text.black,
                                    }}
                                    onClick={() => {
                                        setEdit(!edit)
                                    }}
                                >
                                    {!edit ? (
                                        <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                                            <FiEdit2 /> <p style={{ fontSize: "3.5vw" }}>Editar</p>
                                        </Box>
                                    ) : (
                                        "Salvar informações"
                                    )}
                                </Button>
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
                                <Box sx={{ overflowX: "hidden", overflowY: "auto", height: "88%", p: "0 2vw" }}>
                                    <UpdateContentKit edit={edit} values={values} handleChange={handleChange} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
