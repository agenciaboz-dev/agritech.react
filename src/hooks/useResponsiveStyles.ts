import { SxProps, useMediaQuery } from "@mui/material"
import { colors } from "../style/colors"

export const useResponsiveStyles = () => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const inputStyle = { height: 45, borderColor: colors.button }

    const textStyle = {
        fontFamily: "MalgunGothic2",
        justifyContent: "center",
        fontSize: isMobile ? "4vw" : "1.2vw",
        textAlign: "left",
    }

    const textField = {
        "& .MuiInputLabel-root.Mui-focused ": {
            color: "black", // Cor do label quando o TextField está em foco (digitando)
        },
        "& .MuiInputLabel-root ": {
            color: "black",
            fontSize: isMobile ? "3.2vw" : "1vw",
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
            height: isMobile ? "3vw" : "fit-content",
        },
    }

    const input: SxProps = {
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

    return { inputStyle, textStyle, textField, input }
}
