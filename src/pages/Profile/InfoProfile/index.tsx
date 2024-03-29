import React, { ChangeEventHandler } from "react"
import { Box, Button, MenuItem, Tab, Tabs, TextField } from "@mui/material"
import { tabStyle } from "../../../style/tabStyle"
import { textField } from "../../../style/input"
import { Personal } from "./Personal"
import { Documentation } from "./Documentation"
import { colors } from "../../../style/colors"
import { Contact } from "./Contact"
import { Address } from "./Address"
import { Bank } from "./Bank"
import { Professional } from "./Professional"
import { useUser } from "../../../hooks/useUser"
import { Security } from "./Security"
import { Dayjs } from "dayjs"

interface InfoProfileProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    review: boolean
    tab: string
    setTab: React.Dispatch<React.SetStateAction<string>>
    pickDate?: Dayjs | null
    setPickDate?: React.Dispatch<React.SetStateAction<Dayjs | null>> 
    birthPick?: Dayjs | null
    setBirthPick?: React.Dispatch<React.SetStateAction<Dayjs | null>> 
}

export const InfoProfile: React.FC<InfoProfileProps> = ({
    values,
    handleChange,
    review,
    tab,
    setTab,
    pickDate,
    setPickDate,
    birthPick,
    setBirthPick,
}) => {
    const { user } = useUser()
    const userlog = user ? user.id === values.id || user.isAdmin : false
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    return (
        <Box sx={{ gap: "5vw", maxWidth: "100%", color: "black" }}>
            <Tabs
                value={tab}
                onChange={changeTab}
                textColor="primary"
                indicatorColor="primary"
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                {/* <Tab sx={tabStyle} value="historic" label="Histórico" /> */}
                <Tab sx={tabStyle} value="personal" label="Pessoal" />
                {values.employee !== undefined && <Tab sx={tabStyle} value="documentation" label="Documentação" />}
                <Tab sx={tabStyle} value="contact" label="Contato" />
                <Tab sx={tabStyle} value="address" label="Endereço" />
                {values.employee !== undefined && <Tab sx={tabStyle} value="bank" label="Dados Bancários" />}
                {values.employee !== undefined && values.employee !== undefined && (
                    <Tab sx={tabStyle} value="professional" label="Profissional" />
                )}
                {user?.cpf === values.cpf && <Tab sx={tabStyle} value="security" label="Privacidade e Segurança" />}
            </Tabs>
            {tab === "personal" && (
                <Personal
                    values={values}
                    handleChange={handleChange ? handleChange : () => {}}
                    birthPick={birthPick}
                    setBirthPick={setBirthPick}
                />
            )}
            {tab === "documentation" && values.employee !== undefined && (
                <Documentation values={values} handleChange={handleChange ? handleChange : () => {}} />
            )}
            {tab === "contact" && <Contact values={values} handleChange={handleChange ? handleChange : () => {}} />}
            {tab === "address" && <Address values={values} handleChange={handleChange ? handleChange : () => {}} />}
            {values.employee !== undefined && tab === "bank" && values.employee && (
                <Bank values={values} handleChange={handleChange ? handleChange : () => {}} />
            )}
            {values.employee !== undefined && tab === "professional" && values.employee && (
                <Professional
                    userLog={userlog}
                    values={values}
                    handleChange={handleChange ? handleChange : () => {}}
                    pickDate={pickDate}
                    setPickDate={setPickDate}
                />
            )}
            {user?.cpf === values.cpf && tab == "security" && <Security />}
        </Box>
    )
}
