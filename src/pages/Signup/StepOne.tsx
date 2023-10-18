import { Avatar } from "@files-ui/react"
import { Box, Button, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textStyle } from "../../style/input"
import { colors } from "../../style/colors"

interface StepOneProps {
    data: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepOne: React.FC<StepOneProps> = ({ data, handleChange, typeUser, setCurrentStep }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2" }}>Informações Pessoais</p>
            <Box style={{ flexDirection: "row", gap: "5vw", width: "100%", height: "40%", alignItems: "center" }}>
                <Avatar variant="circle" style={{ width: "30vw", height: "30vw" }} />
                <Box style={{ flexDirection: "column", gap: 10, width: "65%" }}>
                    <p style={{ fontWeight: "500", fontFamily: "MalgunGothic2", textAlign: "start" }}>Foto</p>
                    <p style={{ fontSize: "3vw", fontFamily: "MalgunGothic2", textAlign: "start" }}>
                        Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar plenamente visível e sem
                        adereços.
                    </p>
                </Box>
            </Box>
            <Box sx={{ gap: "2vw", width: "100%", height: "100%" }}>
                <TextField
                    variant="outlined"
                    label={"Nome"}
                    name="name"
                    value={data.name}
                    style={textStyle}
                    onChange={handleChange}
                />
                <Box style={{ flexDirection: "row", gap: "2vw", width: "100%" }}>
                    <TextField
                        variant="outlined"
                        label={"CPF"}
                        name="cpf"
                        value={data.cpf}
                        style={{ ...textStyle, width: "50%" }}
                        onChange={handleChange}
                    />
                    {typeUser == "producer" && (
                        <TextField
                            variant="outlined"
                            label={"CNPJ"}
                            name="cnpj"
                            value={data.cnpj}
                            style={{ ...textStyle, width: "50%" }}
                            onChange={handleChange}
                        />
                    )}
                    {typeUser == "employee" && (
                        <TextField
                            variant="outlined"
                            label={"Rg"}
                            name="rg"
                            value={data.rg}
                            style={{ ...textStyle, width: "50%" }}
                            onChange={handleChange}
                        />
                    )}
                </Box>

                <TextField
                    variant="outlined"
                    label={"Data de Nascimento"}
                    name="birth"
                    value={data.birth}
                    style={textStyle}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    label={"E-mail"}
                    name="email"
                    value={data.email}
                    style={textStyle}
                    onChange={handleChange}
                />
                {/* {typeUser == "employee" && (
                    <>
                        <p style={{ fontSize: 15 }}>Gênero</p>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                setGender(value)
                            }}
                            value={gender}
                        >
                            <Box>
                                <Box style={{ flexDirection: "row", alignItems: "center" }}>
                                    <RadioButton.IOS value="F" />
                                    <Text
                                        style={{
                                            fontWeight: gender == "F" ? "800" : "400",
                                            fontSize: 15,
                                        }}
                                        onPress={() => {
                                            setGender("F")
                                        }}
                                    >
                                        Feminino
                                    </Text>
                                </Box>
                                <Box style={{ flexDirection: "row", alignItems: "center" }}>
                                    <RadioButton.IOS value="M" />
                                    <Text
                                        style={{
                                            fontWeight: gender == "M" ? "800" : "400",
                                            fontSize: 15,
                                            fontFamily: "MalgunGothic2",
                                        }}
                                        onPress={() => {
                                            setGender("M")
                                        }}
                                    >
                                        Masculino
                                    </Text>
                                </Box>
                                <Box style={{ flexDirection: "row", alignItems: "center" }}>
                                    <RadioButton.IOS value="other" />
                                    <Text
                                        style={{
                                            fontWeight: gender == "others" ? "800" : "400",
                                            fontSize: 15,
                                            fontFamily: "MalgunGothic2",
                                        }}
                                        onPress={() => {
                                            setGender("other")
                                        }}
                                    >
                                        Outro
                                    </Text>
                                </Box>
                            </Box>
                        </RadioButton.Group>
                    </>
                )} */}
            </Box>
            <Button
                variant="contained"
                style={{
                    fontSize: 17,
                    color: colors.text.white,
                    width: "100%",
                    backgroundColor: colors.button,
                    borderRadius: "5vw",
                }}
                onClick={() => {
                    setCurrentStep(0)
                }}
            >
                Voltar
            </Button>
            <Button
                variant="contained"
                style={{
                    fontSize: 17,
                    color: colors.text.white,
                    width: "100%",
                    backgroundColor: colors.button,
                    borderRadius: "5vw",
                }}
                onClick={() => {
                    setCurrentStep(2)
                }}
            >
                Próximo
            </Button>
        </Box>
    )
}
