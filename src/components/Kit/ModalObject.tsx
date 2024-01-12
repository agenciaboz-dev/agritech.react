import { Modal, ModalContent, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { ButtonAgritech } from "../ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdNumbers, MdOutlineAdd } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { Box, CircularProgress, IconButton } from "@mui/material"
import { colors } from "../../style/colors"
import { AiOutlineDelete } from "react-icons/ai"
import { NewObject } from "../../definitions/object"

interface ModalObjectProps {
    object: NewObject[]
    setObject: (values: NewObject[]) => void
    opened: boolean
    close: () => void
}

export const ModalObject: React.FC<ModalObjectProps> = ({ opened, close, object, setObject }) => {
    const addObject = () => {
        setObject([...object, { name: "", quantity: 1, description: "" }])
    }
    const deleteObject = (id: number) => {
        const newObj = object.filter((_, index) => index !== id)
        setObject(newObj)
    }
    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newObj = [...object]
        newObj[index] = {
            ...newObj[index],
            [event.target.name]: event.target.value,
        }
        setObject(newObj)
    }

    const saveObject = () => {
        console.log("Objetos salvos:", object)
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
            title="Inserir objetos"
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "6vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
            }}
        >
            {object.map((objeto, index) => (
                <Box sx={{ gap: "0.5vw" }} key={index}>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Objeto {index + 1}</h4>
                        <IconButton onClick={() => deleteObject(index)}>
                            <AiOutlineDelete color={colors.delete} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                        <TextInput
                            label="Nome"
                            name="name"
                            value={objeto.name}
                            data-autofocus
                            type="text"
                            withAsterisk
                            styles={{ root: { width: "75%" }, input: { border: "1px solid black" } }}
                            leftSection={<LiaObjectGroupSolid style={{ width: "6vw", height: "6vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <TextInput
                            label="Quantidade"
                            name="quantity"
                            type="number"
                            value={objeto.quantity}
                            withAsterisk
                            onChange={(e) => handleChange(index, e)}
                            styles={{ root: { width: "25%" }, input: { border: "1px solid black" } }}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                        />
                    </Box>
                    <TextInput
                        label="Descrição"
                        multiple
                        name="description"
                        value={objeto.description}
                        styles={{ root: { width: "100%" }, input: { border: "1px solid black" } }}
                        withAsterisk
                        onChange={(e) => handleChange(index, e)}
                        leftSection={<TbFileDescription style={{ width: "5vw", height: "5vw" }} />}
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
                    Adicionar objeto
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
