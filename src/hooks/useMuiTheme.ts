import { createTheme } from "@mui/material"
import { colors } from "../style/colors"

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            fontFamily: ["MalgunGothic2"].join(","),
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 600,
        },
        palette: {
            // mode: 'dark',

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            },
            text: {
                primary: colors.text.black,
                secondary: colors.text.white,
                // disabled: colors.primary,
            },
        },
    })

    return THEME
}
