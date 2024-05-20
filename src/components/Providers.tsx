import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "../contexts/ioContext"
import { UserProvider } from "../contexts/userContext"
import { MenuDrawerProvider } from "../contexts/menuDrawerContext"
import { MenuDrawer } from "./MenuDrawer"
import { HeaderProvider } from "../contexts/headerContext"
import { UsersProvider } from "../contexts/usersContext"
import { MantineProvider } from "@mantine/core"
import { useMantineTheme } from "../hooks/useMantineTheme"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import { NotificationDrawerProvider } from "../contexts/notificationDrawer"
import { NotificationDrawer } from "./NotificationDrawer"
import { ProducerProvider } from "../contexts/producerContext"
import { KitProvider } from "../contexts/kitContext"
import { CallProvider } from "../contexts/callsContext"
import { ReportProvider } from "../contexts/reportsContext"
import { TalhaoProvider } from "../contexts/talhaoContext"
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const mantine_theme = useMantineTheme()

    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <UserProvider>
                        <UsersProvider>
                            <KitProvider>
                                <ProducerProvider>
                                    <TalhaoProvider>
                                        <CallProvider>
                                            <ReportProvider>
                                                <MenuDrawerProvider>
                                                    <HeaderProvider>
                                                        <NotificationDrawerProvider>
                                                            <Snackbar />
                                                            <ConfirmDialog />
                                                            <NotificationDrawer />
                                                            <MenuDrawer />
                                                            <MantineProvider theme={mantine_theme}>
                                                                <LocalizationProvider
                                                                    dateAdapter={AdapterDayjs}
                                                                    localeText={
                                                                        ptBR.components.MuiLocalizationProvider.defaultProps
                                                                            .localeText
                                                                    }
                                                                    adapterLocale={"pt-br"}
                                                                >
                                                                    {children}
                                                                </LocalizationProvider>
                                                            </MantineProvider>
                                                        </NotificationDrawerProvider>
                                                    </HeaderProvider>
                                                </MenuDrawerProvider>
                                            </ReportProvider>
                                        </CallProvider>
                                    </TalhaoProvider>
                                </ProducerProvider>
                            </KitProvider>
                        </UsersProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
