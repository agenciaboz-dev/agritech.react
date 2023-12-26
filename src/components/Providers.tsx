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
                            <NotificationDrawerProvider>
                                <MenuDrawerProvider>
                                    <HeaderProvider>
                                        <Snackbar />
                                        <ConfirmDialog />
                                        <NotificationDrawer />
                                        <MenuDrawer />
                                        <MantineProvider theme={mantine_theme}>{children}</MantineProvider>
                                    </HeaderProvider>
                                </MenuDrawerProvider>
                            </NotificationDrawerProvider>
                        </UsersProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
