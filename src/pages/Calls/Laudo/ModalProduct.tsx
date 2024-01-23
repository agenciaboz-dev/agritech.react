import { Modal, ModalContent, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdNumbers, MdOutlineAdd } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { Box, IconButton } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import { colors } from "../../../style/colors"

interface ModalProductProps {
    product: Product[]
    setproduct: (values: Product[]) => void
    opened: boolean
    close: () => void
}

export const ModalProduct: React.FC<ModalProductProps> = ({ opened, close, product, setproduct }) => {
    const addObject = () => {
        setproduct([...product, { name: "", dosage: "1" }])
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
