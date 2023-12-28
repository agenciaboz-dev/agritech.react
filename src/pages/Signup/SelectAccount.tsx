import React, { ChangeEventHandler, useState } from "react"
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"

interface SelectAccountProps {
    values: SignupValues
    change: ChangeEventHandler
    typeUser: string
    setUser: React.Dispatch<React.SetStateAction<string>>
    typeOffice: string
    setOffice: React.Dispatch<React.SetStateAction<string>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

export const SelectAccount: React.FC<SelectAccountProps> = ({
    values,
    change,
    typeUser,
    setUser,
    typeOffice,
    setOffice,
    setCurrentStep,
}) => {
    const handleTypeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((event.target as HTMLInputElement).value)
    }
    const handleTypeOffice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffice((event.target as HTMLInputElement).value)
        setCurrentStep(1)
    }
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5vw",
                    flexDirection: "column",
                }}
            >
                <p style={{ fontSize: "5vw", fontFamily: "MalgunGothic2" }}>Selecione o tipo de conta</p>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={typeUser}
                        name="typeAccount"
                        onChange={handleTypeUser}
                        sx={{ width: "100%" }}
                    >
                        <FormControlLabel
                            value="producer"
                            sx={{
                                fontWeight: typeUser == "producer" ? "800" : "400",
                                fontSize: "4vw",
                                fontFamily: "MalgunGothic2",
                            }}
                            control={<Radio />}
                            label="Produtor"
                        />
                        <FormControlLabel
                            value="employee"
                            sx={{
                                fontWeight: typeUser == "producer" ? "800" : "400",
                                fontSize: "4vw",
                                fontFamily: "MalgunGothic2",
                            }}
                            control={<Radio />}
                            label="Funcionário"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            {typeUser === "employee" && (
                <Box
                    sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5vw",
                        flexDirection: "column",
                    }}
                >
                    <p style={{ fontSize: "5vw", fontFamily: "MalgunGothic2" }}>Selecione o tipo de cargo</p>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={typeOffice}
                            name="office"
                            value={values.office}
                            onChange={change}
                            sx={{ width: "100%" }}
                        >
                            <FormControlLabel
                                value="agronomist"
                                sx={{
                                    fontWeight: typeOffice == "agronomist" ? "800" : "400",
                                    fontSize: "4vw",
                                    fontFamily: "MalgunGothic2",
                                }}
                                control={<Radio />}
                                label="Agronômo"
                            />
                            <FormControlLabel
                                value="pilot"
                                sx={{
                                    fontWeight: typeOffice == "pilot" ? "800" : "400",
                                    fontSize: "4vw",
                                    fontFamily: "MalgunGothic2",
                                }}
                                control={<Radio />}
                                label="Piloto de drone"
                            />
                            <FormControlLabel
                                value="technician"
                                sx={{
                                    fontWeight: typeOffice == "technician" ? "800" : "400",
                                    fontSize: "4vw",
                                    fontFamily: "MalgunGothic2",
                                }}
                                control={<Radio />}
                                label="Técnico"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            )}
        </Box>
    )
}
