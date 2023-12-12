import { createTheme } from "@mantine/core"
import { colors } from "../style/colors"

export const useMantineTheme = () => {
    const theme = createTheme({
        colors: {
            brown: [
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
            ],
        },
        primaryColor: "brown",
    })

    return theme
}
