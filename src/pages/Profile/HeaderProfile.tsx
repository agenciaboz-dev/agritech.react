import { Avatar } from "@files-ui/react"
import { Avatar as ProfileImage } from "@mui/material"
import { Box, TextField, SxProps, Button, FormGroup, FormControlLabel, styled, Switch } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { textField } from "../../style/input"
import MaskedInput from "../../components/MaskedInput"
import { colors } from "../../style/colors"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"

interface HeaderProfileProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    style?: SxProps
    view?: boolean
    image: File | undefined
    setImage: React.Dispatch<React.SetStateAction<File | undefined>>
}

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

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ values, handleChange, style, view, image, setImage }) => {
    // const [adminStatus, setAdminStatus] = useState(false)
    // const [managerStatus, setManagerStatus] = useState(false)
    const { snackbar } = useSnackbar()
    const { user } = useUser()

    const io = useIo()
    const [isAdmin, setIsAdmin] = useState(values.isAdmin)
    const [isManager, setIsManager] = useState(values.isManager)
    const [profile, setProfile] = useState<User>()

    const toggleAdmin = (user: User) => {
        io.emit("user:toggle:admin", { id: values.id })
    }

    const toggleManager = (user: User) => {
        io.emit("user:toggle:manager", user)
    }

    const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsAdmin(checked)
        io.emit("user:admin:toggle", profile)
    }

    const handleChangeManager = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsManager(checked)
        toggleManager(values)
    }
    useEffect(() => {
        setProfile(values)
    }, [values])

    useEffect(() => {
        io.on("user:manager:toggle:success", (data: User) => {
            setProfile(data)
            console.log(data)
        })
        io.on("user:admin:toggle:success", (data: User) => {
            setProfile(data)
        })
        io.on("user:admin:toggle:failed", (error) => {
            snackbar({ severity: "error", text: "Não foi possível atualizar!" })
        })
        io.on("user:manager:toggle:failed", (error) => {
            snackbar({ severity: "error", text: "Não foi possível atualizar!" })
        })
    }, [])

    return (
        <Box
            sx={{
                ...style,
            }}
        >
            {view && values !== user ? (
                <ProfileImage src={values.image} style={{ width: "40vw", height: "40vw" }} />
            ) : (
                <Avatar
                    src={image || values.image || null}
                    onChange={(file) => setImage(file)}
                    variant="circle"
                    style={{ width: "52vw", height: "43vw", alignSelf: "center" }}
                    emptyLabel="enviar imagem"
                    changeLabel="trocar imagem"
                />
            )}
            <Box sx={{ flexDirection: "column", gap: "3vw", width: "60%" }}>
                <TextField
                    label={"Nome Completo"}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    sx={textField}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label={"Telefone"}
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    sx={textField}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "(00) 0 0000-0000" },
                    }}
                />

                {user?.isAdmin && values.employee?.id !== undefined && (
                    <Box sx={{ flexDirection: "column", justifyContent: "space-between" }}>
                        <FormGroup sx={{ width: "90%" }}>
                            <FormControlLabel
                                checked={isAdmin}
                                control={<Android12Switch />}
                                onChange={handleChangeAdmin}
                                label={
                                    <Box sx={{ width: "100%" }}>
                                        <p style={{ fontSize: "3.5vw", width: "100%" }}>Administrador</p>
                                    </Box>
                                }
                            />
                        </FormGroup>
                        <FormGroup sx={{ width: "90%" }}>
                            <FormControlLabel
                                checked={isManager}
                                control={<Android12Switch />}
                                onChange={handleChangeManager}
                                label={
                                    <Box sx={{ width: "100%" }}>
                                        <p style={{ fontSize: "3.5vw", width: "100%" }}>Gerente</p>
                                    </Box>
                                }
                            />
                        </FormGroup>
                    </Box>
                )}

                {/* {values.employee === null && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ bgcolor: colors.button, textTransform: "none", borderRadius: "5vw" }}
                    >
                        Iniciar conversa
                    </Button>
                )} */}
            </Box>
        </Box>
    )
}
