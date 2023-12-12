import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "../contexts/ioContext"
import { UserProvider } from "../contexts/userContext"
import { MenuDrawerProvider } from "../contexts/menuDrawerContext"
import { MenuDrawer } from "./MenuDrawer"
import { HeaderProvider } from "../contexts/headerContext"
import { UsersProvider } from "../contexts/usersContext"
import { MantineProvider } from "@mantine/core"
interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <MantineProvider>
            <SnackbarProvider>
                <ConfirmDialogProvider>
                    <IoProvider>
                        <UserProvider>
                            <UsersProvider>
                                <MenuDrawerProvider>
                                    <HeaderProvider>
                                        <Snackbar />
                                        <ConfirmDialog />
                                        <MenuDrawer />
                                        {children}
                                    </HeaderProvider>
                                </MenuDrawerProvider>
                            </UsersProvider>
                        </UserProvider>
                    </IoProvider>
                </ConfirmDialogProvider>
            </SnackbarProvider>
        </MantineProvider>
    )
}
