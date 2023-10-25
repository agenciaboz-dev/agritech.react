import { Box, TextField, Tab, Tabs, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { useHeader } from "../../hooks/useHeader"
import { Header } from "../../components/Header"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { Avatar } from "@files-ui/react"
import { textField } from "../../style/input"
import { Formik, Form } from "formik"
import { tabStyle } from "../../style/tabStyle"
import { HeaderProfile } from "./HeaderProfile"
import { InfoProfile } from "./InfoProfile"

interface ProfileProps {
    user: User
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const header = useHeader()

    const initialValues: FormValues = {
        name: user?.name || "",
        cpf: user?.cpf || "",
        phone: user?.phone || "",
        email: user?.email || "",
        username: user?.username || "",
        password: user?.password || "",
        birth: new Date(user?.birth || 0).toLocaleDateString("pt-br") || "",
        image: user?.image || "",

        cep: user?.address?.cep || "",
        city: user?.address?.city || "",
        district: user?.address?.district || "",
        number: user?.address?.number || "",
        street: user?.address?.street || "",
        uf: user?.address?.uf || "",
        complement: user?.address?.complement || "",

        cnpj: user?.producer?.cnpj || "",

        rg: user?.employee?.rg || "",
        gender: user?.employee?.gender || "",
        military: user?.employee?.military || "",
        nationality: user?.employee?.nationality || "",
        relationship: user?.employee?.relationship || "",
        voter_card: user?.employee?.voter_card || "",
        work_card: user?.employee?.work_card || "",
        residence: user?.employee?.residence || "",
    }

    useEffect(() => {
        header.setTitle("Meu Perfil")
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
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "90%",
                    padding: "4vw",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    flexDirection: "column",
                    paddingBottom: "8vw",
                    gap: "4vw",
                }}
            >
                <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>Informações Pessoais</p>
                <Box sx={{ height: "100%" }}>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                        {({ values, handleChange }) => (
                            <Form>
                                <Box sx={{ gap: "8vw" }}>
                                    <HeaderProfile values={values} handleChange={handleChange} />
                                    <InfoProfile values={values} handleChange={handleChange} />
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}
