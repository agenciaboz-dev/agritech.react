import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "../contexts/ioContext"
import { UserProvider } from "../contexts/userContext"
import { MenuDrawerProvider } from "../contexts/menuDrawerContext"
import { MenuDrawer } from "./MenuDrawer"
import { HeaderProvider } from "../contexts/headerContext"
import { UsersPendingProvider } from "../contexts/usersPendingContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <UserProvider>
                        <UsersPendingProvider>
                            <MenuDrawerProvider>
                                <HeaderProvider>
                                    <Snackbar />
                                    <ConfirmDialog />
                                    <MenuDrawer />
                                    {children}
                                </HeaderProvider>
                            </MenuDrawerProvider>
                        </UsersPendingProvider>
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
