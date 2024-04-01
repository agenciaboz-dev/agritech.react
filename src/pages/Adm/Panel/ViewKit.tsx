import { Box, Button, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
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
import { AiOutlineSave } from "react-icons/ai"
import findEmployee from "../../../hooks/filterEmployee"
import listEmployees from "../../../hooks/listEmployees"
import { useUser } from "../../../hooks/useUser"
import { unmaskNumber } from "../../../hooks/unmaskNumber"

interface ViewKitProps {}

export const ViewKit: React.FC<ViewKitProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { snackbar } = useSnackbar()
    const { kitid } = useParams()
    const { listKits, updateKit } = useKits()
    const { list } = listEmployees()
    const { user } = useUser()

    const kit = listKits.find((item) => item.id === Number(kitid))

    const [image, setImage] = useState<File>()
    const [opened, { open, close }] = useDisclosure(false)
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)

    const initalValues: Kit = {
        id: kit?.id,
        name: kit?.name || "",
        description: kit?.description || "",
        image: kit?.image || null,
        hectareDay: kit?.hectareDay,
        objects: kit?.objects,
        employees: kit?.employees,
        calls: kit?.calls,
        equipment: kit?.equipment,
        model: kit?.model,
    }
    const dataEmployee = kit?.employees?.map((item) => {
        return findEmployee(String(item.id))
    })

    const [allEmployees, setAllEmployees] = useState<User[] | null>([])
    const [listObjects, setListObjects] = useState<NewObject[]>([])
    const [team, setListEmployees] = useState<User[]>(dataEmployee || [])

    useEffect(() => {
        kit?.objects && setListObjects(kit.objects)
    }, [])

    const data = {
        list: allEmployees || undefined,
        listObjects: listObjects,
        setListObjects: setListObjects,
        team: team,
        setListEmployees: setListEmployees,
        dataEmployee: dataEmployee,
        image: image,
        setImage: setImage,
    }

    const employeesIds = team
        .map((item) => item.employee?.id)
        .filter((id) => id !== undefined)
        .map((id) => ({ id }))

    console.log({ opa: employeesIds })

    const handleUpdateKit = (values: Kit) => {
        const objects = listObjects.map((item) => ({
            ...item,
            quantity: Number(item.quantity), // Converte para número
        }))
        const data = {
            ...values,
            hectareDay: unmaskNumber(String(values.hectareDay)),
            objects: objects,
            employees: employeesIds,
            image: image
                ? {
                      file: image,
                      name: image.name,
                  }
                : undefined,
        }

        io.emit("kit:update", data)
        setLoading(true)
        // open()
    }
    useEffect(() => {
        console.log(edit)
    }, [edit])

    useEffect(() => {
        io.on("kit:update:success", (data: Kit) => {
            updateKit(data)
            console.log(data)
            snackbar({ severity: "success", text: "Kit atualizado!" })
            setLoading(false)
            // setEdit(false)
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

    useEffect(() => {
        setAllEmployees(list || [])
        console.log(kit)
    }, [])
    return (
        <>
            <Formik initialValues={initalValues} onSubmit={handleUpdateKit}>
                {({ values, handleChange }) => (
                    <Form>
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
                                <Header back location={user?.isAdmin ? `/adm/settings-kit/13` : "/employee/settings-kit"} />
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
                                        {kit !== null ? kit?.name : "Kit"}
                                    </p>
                                    {!edit && user?.isAdmin ? (
                                        <Button
                                            type="button"
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
                                                color: edit ? colors.text.white : colors.text.black,
                                            }}
                                            onClick={() => {
                                                setEdit(true)
                                            }}
                                        >
                                            <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                                                <FiEdit2 /> <p style={{ fontSize: "3.5vw" }}>Editar</p>
                                            </Box>
                                        </Button>
                                    ) : (
                                        user?.isAdmin && (
                                            <Button
                                                type={"submit"}
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    alignItems: "center",
                                                    gap: "1vw",
                                                    backgroundColor: colors.primary,
                                                    textTransform: "none",
                                                    borderRadius: "5vw",
                                                    fontSize: "3vw",
                                                    width: "fit-content",
                                                    color: edit ? colors.text.white : colors.text.black,
                                                }}
                                                // onClick={}
                                            >
                                                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                                                    <p style={{ fontSize: "3.5vw" }}>Salvar Informações</p>
                                                </Box>
                                            </Button>
                                        )
                                    )}
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
                                        {kit && (
                                            <UpdateContentKit
                                                data={data}
                                                edit={edit}
                                                values={values}
                                                handleChange={handleChange}
                                                kit={kit}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}
