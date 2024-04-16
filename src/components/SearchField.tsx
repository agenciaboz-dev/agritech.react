import Search from "@mui/icons-material/Search"
import { IconButton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { MdCancel } from "react-icons/md"
import { textField } from "../style/input"
interface SearchFieldProps {
    setSearchText: (value: string) => void
    searchText: string
    placeholder?: string
}

export const SearchField: React.FC<SearchFieldProps> = ({ searchText, setSearchText, placeholder }) => {
    const handleChange = (event: any) => {
        const newValue = event.target.value
        setSearchText(newValue) // Atualiza o estado de pesquisa no componente pai
    }
    return (
        <TextField
            fullWidth
            label="Buscar"
            sx={{
                ...textField,
                width: "100%",
                "& .MuiOutlinedInput-input": {
                    height: "1vw",
                },
                "& .MuiOutlinedInput-root": {
                    fieldset: {
                        borderColor: "#232323",
                        borderRadius: "8vw",
                    },
                },
            }}
            placeholder={`Buscar ${placeholder ? placeholder : ""}`}
            value={searchText}
            InputProps={{
                startAdornment: <Search />,
                endAdornment: searchText && (
                    <IconButton color="inherit" onClick={() => setSearchText("")}>
                        <MdCancel />
                    </IconButton>
                ),
            }}
            InputLabelProps={{
                style: {
                    fontSize: "1rem",
                },
            }}
            onChange={(e) => setSearchText(e.target.value)}
        />
    )
}
