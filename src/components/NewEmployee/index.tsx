import {
    Box,
    Button,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Switch,
    TextField,
    styled,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../Header"
import { Formik, useFormik } from "formik"
import { useFormAction, useNavigate } from "react-router-dom"
import { LoadingOverlay, Stepper } from "@mantine/core"
import { useHeader } from "../../hooks/useHeader"
import MaskedInputNando from "../MaskedNando"
import { usePhoneMask } from "burgos-masks"
import { textField } from "../../style/input"
import { useDataHandler } from "../../hooks/useDataHandler"
import { useSnackbar } from "burgos-snackbar"
import { useDateValidator } from "../../hooks/useDateValidator"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { useGender } from "../../hooks/useGender"
import { useRelationship } from "../../hooks/useRelationship"
import { StepOne } from "./StepOne"
import { useOffices } from "../../hooks/useOffices"
import { StepTwo } from "./StepTwo"
import { StepThree } from "./StepThree"
import { StepFour } from "./StepFour"
import { StepFive } from "./StepFive"
import { PiCpuFill } from "react-icons/pi"
import { unmaskCurrency } from "../../hooks/unmaskNumber"
import { useIo } from "../../hooks/useIo"
import { useUsers } from "../../hooks/useUsers"
import { Avatar } from "@files-ui/react"
import dayjs, { Dayjs } from "dayjs"

interface NewEmployeeProps {}

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&:before": {
            left: 12,
        },
        "&:after": {
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}))
export const NewEmployee: React.FC<NewEmployeeProps> = ({}) => {
    const navigate = useNavigate()
    const header = useHeader()
    const io = useIo()
    const { addUser } = useUsers()

    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()
    const { isValidDateString } = useDateValidator()
    const estados = useEstadosBrasil()
    const gender = useGender()
    const typeRelationship = useRelationship()
    const offices = useOffices()

    const [typeOffice, setTypeOffice] = useState("")
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
                relationship:
                    typeRelationship.find((relationship) => relationship.id == values.employee?.relationship)?.value || "",
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
                <Header back location="/adm" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    sx={{
                        padding: "4vw",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                    }}
                >
                    <Box sx={{ width: "100%", height: "100%", gap: "5vw", flexDirection: "column", p: "1vw" }}>
                        <form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                            <Box sx={{ flexDirection: "row", gap: "3vw", alignItems: "center", width: "100%" }}>
                                <Avatar
                                    src={image}
                                    onChange={(file) => setImage(file)}
                                    variant="circle"
                                    emptyLabel="enviar imagem"
                                    changeLabel="trocar imagem"
                                    style={{ width: "40vw", height: "30vw" }}
                                />
                                <Box sx={{ flexDirection: "column", gap: "2vw", width: "80%" }}>
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
                                        sx={{
                                            ...textField,
                                            width: "100%",
                                        }}
                                        required
                                        variant="outlined"
                                        value={formik.values.office}
                                        InputProps={{
                                            sx: { ...textField, height: "10.5vw" },
                                        }}
                                        SelectProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: { width: "100%", maxHeight: "80vw", overflowY: "auto" },
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

                            <Box sx={{ height: "55%", flexDirection: "row", gap: "2vw", alignItems: "start" }}>
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
                                <Box sx={{ maxHeight: "80%", width: "100%" }}>
                                    {currentStep === 0 && (
                                        <StepOne
                                            data={formik.values}
                                            handleChange={formik.handleChange}
                                            birthPick={birthPick}
                                            setBirthPick={setBirthPick}
                                        />
                                    )}
                                    {currentStep === 1 && (
                                        <StepTwo data={formik.values} handleChange={formik.handleChange} />
                                    )}
                                    {currentStep === 2 && (
                                        <StepThree data={formik.values} handleChange={formik.handleChange} />
                                    )}
                                    {currentStep === 3 && (
                                        <StepFour data={formik.values} handleChange={formik.handleChange} />
                                    )}
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

                            <Box sx={{ gap: "2vw" }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        padding: "3vw",
                                        color: colors.text.black,
                                        fontWeight: "600",
                                        fontSize: "4vw",
                                        textTransform: "none",
                                        borderRadius: "10vw",
                                        height: "10vw",
                                    }}
                                    onClick={() => {
                                        navigate("/adm")
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="contained"
                                    type={currentStep === 4 ? "submit" : "button"}
                                    sx={{
                                        fontSize: 17,
                                        color: colors.text.white,
                                        width: "100%",
                                        backgroundColor: colors.button,
                                        borderRadius: "5vw",
                                        textTransform: "none",
                                    }}
                                    onClick={() => {
                                        currentStep !== 4 && setCurrentStep(currentStep + 1)
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress sx={{ color: "#fff" }} />
                                    ) : currentStep !== 4 ? (
                                        "Próximo"
                                    ) : (
                                        "Salvar"
                                    )}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
