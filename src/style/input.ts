import { SxProps } from "@mui/material"
import { colors } from "./colors"

export const inputStyle = { height: 45, borderColor: colors.button }
export const textStyle = { fontFamily: "MalgunGothic2", justifyContent: "center", fontsize: "4vw", textAlign: "left" }
export const textField: SxProps = {
    "& .MuiInputLabel-root.Mui-focused ": {
        color: "black", // Cor do label quando o TextField está em foco (digitando)
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "black", // Cor da borda quando o TextField está em foco (digitando)
        },
    },
}
