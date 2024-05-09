import { Modal, TextInput } from "@mantine/core"
import React, { ChangeEvent, useState } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdNumbers, MdOutlineAdd } from "react-icons/md"
import { Box, IconButton, MenuItem, Select, TextField, useMediaQuery } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import { colors } from "../../../style/colors"
import { useNumberMask } from "burgos-masks"
import MaskedInput from "../../../components/MaskedInput"
import MaskedInputNando from "../../../components/MaskedNando"
import { Product } from "../../../definitions/report"
import { unmaskNumber } from "../../../hooks/unmaskNumber"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface ModalProductProps {
    product: Product[]
    setproduct: (values: Product[]) => void
    opened: boolean
    close: () => void
}

export const ModalProduct: React.FC<ModalProductProps> = ({ opened, close, product, setproduct }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const [value, setValue] = useState("")
    const [unit, setUnit] = useState("")
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        if (name === "value") {
            setValue(value)
        } else if (name === "unit") {
            setUnit(value as string)
        }
    }
    const addObject = () => {
        setproduct([...product, { name: "", dosage: "" }])
    }
    const deleteObject = (id: number) => {
        const newObj = product.filter((_, index) => index !== id)
        setproduct(newObj)
    }
    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newObj = [...product]
        newObj[index] = {
            ...newObj[index],
            [event.target.name]: event.target.value,
        }
        setproduct(newObj)
    }

    const saveObject = () => {
        const newObj = product.map((item) => {
            return { ...item, dosage: `${unmaskNumber(item.dosage)} ${unit}` }
        })
        setproduct(newObj)
        close()
    }
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title="Inserir produtos"
            styles={{
                body: { display: "flex", flexDirection: "column", gap: isMobile ? "6vw" : "1vw", borderRadius: isMobile ? "10vw" : "2vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: isMobile ? "6vw" : "2vw" },
            }}
        >
            {product.map((item, index) => (
                <Box sx={{ gap: isMobile ? "3vw" : "1vw" }} key={index}>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Produto {index + 1}</h4>
                        <IconButton onClick={() => deleteObject(index)}>
                            <AiOutlineDelete color={colors.delete} />
                        </IconButton>
                    </Box>
                    <TextField
                        label="Nome"
                        name="name"
                        value={item.name}
                        data-autofocus
                        type="text"
                        required
                        sx={{ ...textField, width: "100%" }}
                        onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                    />

                    <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                        <TextField
                            label="Dose/HA"
                            name="dosage"
                            value={item.dosage}
                            sx={{ ...textField, width: "100%" }}
                            required
                            onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                            InputProps={{
                                inputComponent: MaskedInputNando,
                                inputProps: { mask: floatMask, inputMode: "numeric" },
                            }}
                        />
                        <TextField
                            select
                            onChange={handleInputChange}
                            label="Unidade"
                            name="unit"
                            sx={{
                                ...textField,
                                width: "100%",
                            }}
                            required
                            variant="outlined"
                            value={unit}
                            InputProps={{
                                sx: { ...textField, height: isMobile ? "10.76vw" : "fit-content" },
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
                            <MenuItem value={"g"}>g</MenuItem>
                            <MenuItem value={"Kg"}>Kg</MenuItem>
                            <MenuItem value={"L"}>L</MenuItem>
                        </TextField>
                    </Box>
                </Box>
            ))}
            <Box sx={{ width: "100%", flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                <ButtonAgritech
                    variant="outlined"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: isMobile ? "3.6vw" : "1rem",
                        p: isMobile ? "2vw" : "1vw",
                        bgColor: "red",
                        color: colors.text.black,
                    }}
                    onClick={addObject}
                >
                    <MdOutlineAdd color="#000" />
                    Produto
                </ButtonAgritech>
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: isMobile ? "3.6vw" : "1rem",
                        p: isMobile ? "2vw" : "1vw",
                        bgcolor: colors.button,
                        color: colors.text.white,
                    }}
                    onClick={saveObject}
                >
                    Salvar
                </ButtonAgritech>
            </Box>
        </Modal>
    )
}
