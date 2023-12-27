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
