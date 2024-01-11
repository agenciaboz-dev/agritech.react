import { SxProps } from "@mui/material"
import { colors } from "./colors"

export const inputStyle = { height: 45, borderColor: colors.button }
export const textStyle = { fontFamily: "MalgunGothic2", justifyContent: "center", fontsize: "4vw", textAlign: "left" }
export const textField = {
    "& .MuiInputLabel-root.Mui-focused ": {
        color: "black", // Cor do label quando o TextField está em foco (digitando)
    },
    "& .MuiInputLabel-root ": {
        color: "black",
        fontSize: "3.2vw",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: colors.secondary,
        },
        fieldset: {
            borderColor: "#232323",
        },
    },
    "& .MuiOutlinedInput-input": {
        height: "3.5vw",
    },
}

export const input: SxProps = {
    "& .MuiInputBase-root": { color: "#fff", bgcolor: "#fff1" },
    "& .MuiInputLabel-root.Mui-focused ": {
        color: "#fff", // Cor do label quando o TextField está em foco (digitando)
    },
    "& .MuiInputLabel-root ": {
        color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
        borderColor: colors.secondary,
        fieldset: {
            borderColor: colors.primary,
        },
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
        "-webkit-box-shadow": ` 0 0 0 100px ${colors.button} inset`,
        borderRadius: "1vw",
        color: "#fff",
        bgcolor: "",
    },
}
