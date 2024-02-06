import { Modal, TextInput } from "@mantine/core"
import React, { ChangeEvent } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { MdOutlineAdd } from "react-icons/md"
import { Accordion, Box, IconButton, TextField, Typography } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import { colors } from "../../../style/colors"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import { AccordionSummary } from "../../../components/Accordion"
import MaskedInputNando from "../../../components/MaskedNando"
import { useNumberMask } from "burgos-masks"
import { textField } from "../../../style/input"

interface ModalMaterialProps {
    material: Material[]
    setMaterial: (values: Material[]) => void
    opened: boolean
    close: () => void
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ModalMaterial: React.FC<ModalMaterialProps> = ({ opened, close, material, setMaterial }) => {
    const [expanded, setExpanded] = React.useState<string | false>("")
    const floatMask = useNumberMask({ allowDecimal: true,allowLeadingZeroes: true })

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const addObject = () => {
        setMaterial([
            ...material,
            {
                talhao: "",
                area: "",
                product: "",
                dosage: "",
                classification: "",
                total: "",
                removed: "",
                applied: "",
                returned: "",
                comments: "",
            },
        ])
    }
    const deleteObject = (id: number) => {
        const newObj = material.filter((_, index) => index !== id)
        setMaterial(newObj)
    }
    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newObj = [...material]
        newObj[index] = {
            ...newObj[index],
            [event.target.name]: event.target.value,
        }
        setMaterial(newObj)
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
            title="Inserir Insumos"
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "6vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            {material.map((item, index) => (
                <Accordion
                    elevation={0}
                    key={index}
                    expanded={expanded === String(index)}
                    onChange={expandendChange(String(index))}
                >
                    <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                        <Typography>Insumo {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ gap: "2vw" }} key={index}>
                            <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <h4>Insumo {index + 1}</h4>
                                <IconButton onClick={() => deleteObject(index)}>
                                    <AiOutlineDelete color={colors.delete} />
                                </IconButton>
                            </Box>

                            <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                                <TextField
                                    label="Fazenda "
                                    name="talhao"
                                    value={item.talhao}
                                    data-autofocus
                                    sx={{ ...textField, width: "50%" }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                    required
                                />

                                <TextField
                                    label="Área"
                                    name="area"
                                    value={item.area}
                                    data-autofocus
                                    sx={{ ...textField, width: "50%" }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "ha",
                                    }}
                                    required
                                />
                            </Box>

                            <TextField
                                label="Produto"
                                name="product"
                                value={item.product}
                                sx={{ ...textField, width: "100%" }}
                                onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                data-autofocus
                                required
                            />

                            <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%" }}>
                                <TextField
                                    label="Dose/ha"
                                    name="dosage"
                                    value={item.dosage}
                                    data-autofocus
                                    required
                                    sx={{ ...textField, width: "50%" }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "L",
                                    }}
                                />
                                <TextField
                                    label="Classificação"
                                    name="classification"
                                    value={item.classification}
                                    data-autofocus
                                    required
                                    sx={{ ...textField, width: "50%" }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                />
                            </Box>

                            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                                <TextField
                                    label="Total"
                                    name="total"
                                    value={item.total}
                                    data-autofocus
                                    required
                                    sx={{ ...textField, width: "100%" }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "L",
                                    }}
                                />
                                <TextField
                                    label="Retirado"
                                    name="removed"
                                    value={item.removed}
                                    data-autofocus
                                    required
                                    sx={{ ...textField, width: "100%" }}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "L",
                                    }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                />
                            </Box>
                            <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                                <TextField
                                    label="Aplicado "
                                    name="applied"
                                    value={item.applied}
                                    data-autofocus
                                    sx={{ ...textField, width: "100%" }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "L",
                                    }}
                                    required
                                />

                                <TextField
                                    label="Devolvido"
                                    name="returned"
                                    value={item.returned}
                                    data-autofocus
                                    sx={{ ...textField, width: "100%" }}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "L",
                                    }}
                                    onChange={(e) => handleChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                                    required
                                />
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
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
                    Insumo
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
