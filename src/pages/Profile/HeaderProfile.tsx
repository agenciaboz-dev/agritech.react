import { Avatar } from "@files-ui/react"
import { Box, TextField, SxProps, Button, FormGroup, FormControlLabel, styled, Switch } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { textField } from "../../style/input"
import MaskedInput from "../../components/MaskedInput"
import { colors } from "../../style/colors"
import avatar from "../../assets/logo/Avatar.png"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { profile } from "console"
import { useSnackbar } from "burgos-snackbar"

interface HeaderProfileProps {
    values: User
    handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    style?: SxProps
    view?: boolean
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ values, handleChange, style, view }) => {
    const [image, setImage] = useState<File>()
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
    return (
        <Box
            sx={{
                ...style,
            }}
        >
            <Avatar
                src={avatar}
                onChange={(file) => setImage(file)}
                changeLabel="Trocar foto"
                emptyLabel="Adicionar foto"
                variant="circle"
                style={{
                    width: "37vw",
                    height: "36vw",
                    fontSize: "4vw",
                    fontFamily: "MalgunGothic2",
                }}
            />
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
                    label={"E-mail"}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    sx={textField}
                    InputProps={{ readOnly: true }}
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
                                        <p style={{ fontSize: "4vw", width: "100%" }}>Administrador</p>
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
                                        <p style={{ fontSize: "4vw", width: "100%" }}>Gerente</p>
                                    </Box>
                                }
                            />
                        </FormGroup>
                    </Box>
                )}
                {/* {values.producer && (
                    <TextField
                        label={"Custo por Hectare"}
                        name="hectarePrice"
                        value={values.producer?.hectarePrice}
                        onChange={handleChange}
                        sx={textField}
                        InputProps={{ readOnly: true, startAdornment: "R$" }}
                    />
                )} */}
                {view ? (
                    // <Button
                    //     size="small"
                    //     variant="contained"
                    //     sx={{ bgcolor: colors.button, textTransform: "none", borderRadius: "5vw" }}
                    // >
                    //     Iniciar conversa
                    // </Button>
                    <></>
                ) : (
                    <>
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
                    </>
                )}
            </Box>
        </Box>
    )
}
