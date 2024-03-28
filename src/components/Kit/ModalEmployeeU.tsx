import { Checkbox, Modal, Table, TextInput } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { ButtonAgritech } from "../ButtonAgritech"
import { colors } from "../../style/colors"
import { useUser } from "../../hooks/useUser"
import { TfiCrown } from "react-icons/tfi"

interface ModalEmployeeUpdateProps {
    employees: User[]
    setEmployees: (values: User[]) => void
    opened: boolean
    close: () => void
    allEmployees?: User[]
    kit: Kit
}

export const ModalEmployeeUpdate: React.FC<ModalEmployeeUpdateProps> = ({
    opened,
    close,
    setEmployees,
    allEmployees,
    kit,
}) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const { user } = useUser()

    useEffect(() => {
        if (kit && kit.employees) {
            const assignedEmployeeIds = kit.employees.map((employee) => employee.id || 0)
            setSelectedRows(assignedEmployeeIds)
        }
    }, [kit])

    useEffect(() => {
        console.log(kit.employees)
    }, [kit.employees])

    const freeEmployees = allEmployees?.filter(
        (item) =>
            (item.employee?.kits?.length === 0 || (item.employee?.kits && item.employee?.kits[0].id === kit.id)) &&
            (item.office === "copilot" || item.office === "pilot")
    )

    const rows = freeEmployees?.map((element) => (
        <Table.Tr
            key={element.name}
            bg={selectedRows?.includes(element.employee?.id || 0) ? "var(--mantine-color-blue-light)" : undefined}
        >
            <Table.Td>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRows.includes(element.employee?.id || 0)}
                    disabled={selectedRows.length >= 2 && !selectedRows.includes(element.employee?.id || 0)}
                    onChange={() => handleCheckboxChange(element.employee?.id || 0)}
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
                        <span style={{ color: colors.primary }}>
                            {" "}
                            {element.office === "agronomist"
                                ? "Agronômo"
                                : element.office === "technician"
                                ? "Técnico"
                                : "Piloto"}
                        </span>
                    </>
                ) : element.office === "agronomist" ? (
                    "Agronômo"
                ) : element.office === "technician" ? (
                    "Técnico"
                ) : element.office === "copilot" ? (
                    "Copiloto"
                ) : element.office === "seller" ? (
                    "Vendedor"
                ) : (
                    element.office === "pilot" && "Piloto"
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

    const handleCheckboxChange = (id: number) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
        } else if (selectedRows.length < 2) {
            // Limita a seleção para no máximo 2 valores
            setSelectedRows([...selectedRows, id])
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
                content: { borderRadius: "6vw" },
            }}
        >
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th />
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Nome</Table.Th>
                        <Table.Th>Cargo</Table.Th>
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
