import { Modal, TextInput } from "@mantine/core"
import React, { ChangeEvent, useState } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdNumbers, MdOutlineAdd } from "react-icons/md"
import { Box, IconButton, MenuItem, Select } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import { colors } from "../../../style/colors"
import { textField } from "../../../style/input"

interface ModalProductProps {
    product: Product[]
    setproduct: (values: Product[]) => void
    opened: boolean
    close: () => void
}

export const ModalProduct: React.FC<ModalProductProps> = ({ opened, close, product, setproduct }) => {
    const [value, setValue] = useState("")
    const [unit, setUnit] = useState("")

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        if (name === "value") {
            setValue(value)
        } else if (name === "unit") {
            setUnit(value)
        }
    }
    const addObject = () => {
        setproduct([...product, { name: "", dosage: 1, unit: "L" }])
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
                body: { display: "flex", flexDirection: "column", gap: "6vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            {product.map((item, index) => (
                <Box sx={{ gap: "0.5vw" }} key={index}>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Produto {index + 1}</h4>
                        <IconButton onClick={() => deleteObject(index)}>
                            <AiOutlineDelete color={colors.delete} />
                        </IconButton>
                    </Box>
                    <TextInput
                        label="Nome"
                        name="name"
                        value={item.name}
                        data-autofocus
                        type="text"
                        withAsterisk
                        styles={{ input: { border: "1px solid black" } }}
                        leftSection={<LiaObjectGroupSolid style={{ width: "6vw", height: "6vw" }} />}
                        onChange={(e) => handleChange(index, e)}
                    />

                    <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                        <TextInput
                            label="Dose/HA"
                            name="dosage"
                            type="number"
                            value={item.dosage}
                            styles={{ root: { width: "100%" }, input: { border: "1px solid black" } }}
                            withAsterisk
                            onChange={(e) => handleChange(index, e)}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                        />
                        {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            sx={{
                                "& .MuiSelect-root": {
                                    border: "1px solid black",
                                },
                                "& .MuiInputBase-root .MuiOutlinedInput-root .MuiInputBase-colorPrimary  .css-44k0ts-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                                    {
                                        height: "9vw",
                                        borderColor: colors.secondary,
                                        "& fieldset": {
                                            borderColor: colors.primary,
                                        },
                                    },
                            }}
                            onChange={handleInputChange}
                            inputProps={{
                                sx: {
                                    border: "none",
                                    "& .MuiSelect-root": {
                                        border: "1px solid black",
                                    },
                                    "& .MuiOutlinedInput-root .MuiSelect-root": {
                                        borderColor: colors.secondary,
                                        "& fieldset": {
                                            borderColor: colors.primary,
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value={"g"}>g</MenuItem>
                            <MenuItem value={"kg"}>Kg</MenuItem>
                            <MenuItem value={"l"}>L</MenuItem>
                        </Select> */}
                    </Box>
                </Box>
            ))}
            <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                <ButtonAgritech
                    variant="outlined"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "3.6vw",
                        p: "2vw",
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
                        fontSize: "3.6vw",
                        p: "2vw",
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
