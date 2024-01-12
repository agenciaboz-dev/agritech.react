import { Checkbox, Modal, Table, TextInput } from "@mantine/core"
import React, { useState } from "react"
import { ButtonAgritech } from "../ButtonAgritech"
import { colors } from "../../style/colors"
import { useUser } from "../../hooks/useUser"
import { TfiCrown } from "react-icons/tfi"

interface ModalEmployeeProps {
    employees: User[]
    setEmployees: (values: User[]) => void
    opened: boolean
    close: () => void
    allEmployees?: User[]
}

export const ModalEmployee: React.FC<ModalEmployeeProps> = ({ opened, close, setEmployees, allEmployees }) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const { user } = useUser()

    const rows = allEmployees?.map((element) => (
        <Table.Tr
            key={element.name}
            bg={selectedRows?.includes(element.employee?.id || 0) ? "var(--mantine-color-blue-light)" : undefined}
        >
            <Table.Td>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRows.includes(element.employee?.id || 0)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, element.id]
                                : selectedRows.filter((id) => id !== element.employee?.id || 0)
                        )
                    }
                />
            </Table.Td>
            <Table.Td>
                {element?.isAdmin ? (
                    <>
                        <span style={{ color: colors.primary }}> {element.employee?.id}</span>{" "}
                    </>
                ) : (
                    element.employee?.id
                )}
            </Table.Td>
            <Table.Td>
                {element?.isAdmin ? (
                    <>
                        <span style={{ color: colors.primary }}> {element.name}</span> <TfiCrown color={colors.primary} />
                    </>
                ) : (
                    element.name
                )}
            </Table.Td>
            <Table.Td>
                {element?.isAdmin ? (
                    <>
                        <span style={{ color: colors.primary }}> {element.cpf}</span>
                    </>
                ) : (
                    element.name
                )}
            </Table.Td>
        </Table.Tr>
    ))

    const saveList = () => {
        if (allEmployees) {
            const selectedEmployees = allEmployees.filter((element) => selectedRows.includes(element.employee?.id || 0))
            console.log({ time: selectedEmployees })
            setEmployees(selectedEmployees)
            close()
        }
    }
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title="Atribua a equipe"
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "6vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
            }}
        >
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th />
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Nome</Table.Th>
                        <Table.Th>CPF</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
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
                onClick={saveList}
            >
                Salvar
            </ButtonAgritech>
        </Modal>
    )
}
