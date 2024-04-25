import { Box, Button, CircularProgress, MenuItem, Switch, TextField, styled, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../Header"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { Stepper } from "@mantine/core"
import { useHeader } from "../../hooks/useHeader"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"
import { useDataHandler } from "../../hooks/useDataHandler"
import { useSnackbar } from "burgos-snackbar"
import { useRelationship } from "../../hooks/useRelationship"
import { StepOne } from "./StepOne"
import { useOffices } from "../../hooks/useOffices"
import { StepTwo } from "./StepTwo"
import { StepThree } from "./StepThree"
import { StepFour } from "./StepFour"
import { StepFive } from "./StepFive"
import { unmaskCurrency } from "../../hooks/unmaskNumber"
import { useIo } from "../../hooks/useIo"
import { useUsers } from "../../hooks/useUsers"
import { Avatar } from "@files-ui/react"
import dayjs, { Dayjs } from "dayjs"
import { useGender } from "../../hooks/useGender"

interface NewEmployeeProps {}

export const NewEmployee: React.FC<NewEmployeeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()

    const navigate = useNavigate()
    const header = useHeader()
    const io = useIo()
    const { addUser } = useUsers()

    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()
    const typeRelationship = useRelationship()
    const offices = useOffices()
    const gender = useGender()

    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File>()

    const [adminStatus, setAdminStatus] = useState(false)
    const [managerStatus, setManagerStatus] = useState(false)

    const [pickDate, setPickDate] = useState<Dayjs | null>(null)
    const [birthPick, setBirthPick] = useState<Dayjs | null>(null)

    const formik = useFormik<NewEmployee>({
        initialValues: {
            name: "",
            cpf: "",
            email: "",
            username: "",
            password: "",
            phone: "",
            birth: "",
            image: "",
            isAdmin: adminStatus,
            isManager: managerStatus,
            office: "",
            approved: true,
            rejected: "",
            address: {
                cep: "",
                city: "",
                district: "",
                number: "",
                street: "",
                uf: "",
                adjunct: "",
            },
            employee: {
                gender: "",
                military: "",
                nationality: "",
                relationship: "",
                residence: "",
                rg: "",
                voter_card: "",
                work_card: "",
                bank: {
                    account: "",
                    agency: "",
                    name: "",
                    type: "",
                },
                professional: {
                    admission: "",
                    salary: "",
                },
            },
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
    })

    const handleSubmit = (values: NewEmployee) => {
        const data = {
            ...values,
            isAdmin: adminStatus,
            isManager: managerStatus,
            username: values.email,
            password: unmask(values.cpf),
            cpf: unmask(values.cpf),
            phone: unmask(values.phone),
            approved: true,
            birth: dayjs(birthPick).valueOf().toString(),
            image: image
                ? {
                      file: image,
                      name: image.name,
                  }
                : undefined,

            employee: {
                rg: values.employee?.rg,
                gender: gender.find((gender) => gender.id == String(values.employee?.gender))?.value || "",
                relationship: typeRelationship.find((relationship) => relationship.id == values.employee?.relationship)?.value || "",
                nationality: values.employee?.nationality,
                voter_card: values.employee?.voter_card,
                work_card: values.employee?.work_card,
                military: values.employee?.military,
                residence: values.employee?.residence,
                bank: { ...values.employee.bank },
                professional: {
                    admission: dayjs(pickDate).valueOf().toString(),
                    salary: unmaskCurrency(values.employee?.professional?.salary || 0),
                },
            },
        }
        console.log({ enviado: data })
        io.emit("user:newEmployee", data)
        setLoading(true)
    }

    useEffect(() => {
        io.on("user:signup:success", (data: NewEmployee) => {
            console.log(data)
            snackbar({ severity: "success", text: "Colaborador cadastrado!" })
            setLoading(false)
            addUser(data)
            navigate(`/adm/profile/${data.id}`)
        })
        io.on("user:status:failed", (data) => {
            const errorMessage = data.error ? data.error : "Falha no cadastro!"
            snackbar({ severity: "error", text: errorMessage })
            setLoading(false)
        })

        return () => {
            io.off("user:signup:success")
            io.off("user:status:failed")
        }
    }, [])

    useEffect(() => {
        header.setTitle("Novo Colaborador")
    }, [])
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: isMobile ? "10%" : "fit-content",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="/adm" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    paddingTop: isMobile ? 10 : "1vw",
                }}
            >
                <Box
                    sx={{
                        padding: isMobile ? "4vw" : "1vw",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "94%",
                            gap: isMobile ? "5vw" : "1vw",
                            flexDirection: "column",
                            padding: "1vw",
                            overflow: "auto",
                        }}
                    >
                        <form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                            <Box
                                sx={{
                                    flexDirection: "row",
                                    gap: isMobile ? "3vw" : "2vw",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Avatar
                                    src={image}
                                    onChange={(file) => setImage(file)}
                                    variant="circle"
                                    emptyLabel="enviar imagem"
                                    changeLabel="trocar imagem"
                                    style={{ width: isMobile ? "30vw" : "10vw", height: isMobile ? "30vw" : "10vw" }}
                                />
                                <Box sx={{ flexDirection: "column", gap: "2vw", flex: 1 }}>
                                    <TextField
                                        label={"Nome"}
                                        name="name"
                                        value={formik.values.name}
                                        sx={textField}
                                        onChange={formik.handleChange}
                                        required
                                    />

                                    <TextField
                                        select
                                        onChange={formik.handleChange}
                                        label="Cargo"
                                        name="office"
                                        sx={textField}
                                        required
                                        variant="outlined"
                                        value={formik.values.office}
                                        SelectProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: {
                                                        width: "100%",
                                                        maxHeight: isMobile ? "80vw" : "fit-content",
                                                        overflowY: "auto",
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            value={0}
                                            sx={{
                                                display: "none",
                                            }}
                                        ></MenuItem>
                                        {offices.map((office) => (
                                            <MenuItem
                                                key={office.value}
                                                value={office.id}
                                                sx={{
                                                    width: "100%",
                                                }}
                                            >
                                                {office.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    height: isMobile ? "60%" : "45%",
                                    flexDirection: "row",
                                    gap: "2vw",
                                    alignItems: "start",
                                }}
                            >
                                <Stepper
                                    active={currentStep}
                                    size="xs"
                                    orientation="vertical"
                                    onStepClick={setCurrentStep}
                                    styles={{
                                        root: { width: "10%" },
                                        step: { flexDirection: "column", alignItems: "center", gap: "4vw" },
                                        content: { margin: 0 },
                                        stepIcon: { margin: 0 },
                                        stepBody: { margin: 0 },
                                    }}
                                >
                                    <Stepper.Step label="" />
                                    <Stepper.Step label="" />
                                    <Stepper.Step label="" />
                                    <Stepper.Step label="" />
                                    <Stepper.Step label="" />
                                </Stepper>
                                <Box sx={{ width: "100%", height: isMobile ? "50%" : "100%", overflowY: isMobile ? "" : "auto" }}>
                                    {currentStep === 0 && (
                                        <StepOne
                                            data={formik.values}
                                            handleChange={formik.handleChange}
                                            birthPick={birthPick}
                                            setBirthPick={setBirthPick}
                                        />
                                    )}
                                    {currentStep === 1 && <StepTwo data={formik.values} handleChange={formik.handleChange} />}
                                    {currentStep === 2 && <StepThree data={formik.values} handleChange={formik.handleChange} />}
                                    {currentStep === 3 && <StepFour data={formik.values} handleChange={formik.handleChange} />}
                                    {currentStep === 4 && (
                                        <StepFive
                                            data={formik.values}
                                            handleChange={formik.handleChange}
                                            adminStatus={adminStatus}
                                            setAdminStatus={setAdminStatus}
                                            managerStatus={managerStatus}
                                            setManagerStatus={setManagerStatus}
                                            setPickDate={setPickDate}
                                            pickDate={pickDate}
                                        />
                                    )}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    gap: isMobile ? "2vw" : "1vw",
                                    flexDirection: isMobile ? "row" : "row",
                                    marginLeft: isMobile ? "" : "auto",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        padding: isMobile ? "3vw" : "0 1vw",
                                        color: colors.text.black,
                                        fontWeight: "600",
                                        fontSize: isMobile ? "4vw" : "1.2rem",
                                        textTransform: "none",
                                        borderRadius: "10vw",
                                        height: isMobile ? "10vw" : "fit-content",
                                        width: isMobile ? "100%" : "fit-content",
                                    }}
                                    onClick={() => {
                                        navigate("/adm")
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="contained"
                                    type={"submit"}
                                    sx={{
                                        padding: isMobile ? "3vw" : "0 1vw",
                                        fontSize: isMobile ? "4vw" : "1.2rem",
                                        color: colors.text.white,
                                        height: isMobile ? "10vw" : "fit-content",
                                        width: isMobile ? "100%" : "fit-content",
                                        backgroundColor: colors.button,
                                        borderRadius: "5vw",
                                        textTransform: "none",
                                    }}
                                    onClick={() => {
                                        currentStep !== 4 && setCurrentStep(currentStep + 1)
                                    }}
                                >
                                    {loading ? <CircularProgress sx={{ color: "#fff" }} /> : currentStep !== 4 ? "Próximo" : "Salvar"}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
