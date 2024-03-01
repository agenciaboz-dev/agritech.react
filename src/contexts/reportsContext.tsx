import { createContext, useEffect, useState } from "react"
import React from "react"
import { Report } from "../definitions/report"
import { useIo } from "../hooks/useIo"

interface ReportsContextValue {
    listReports: Report[] | undefined
    setListReports: (value: Report[] | undefined) => void
}

interface ReportsProviderProps {
    children: React.ReactNode
}

const ReportsContext = createContext<ReportsContextValue>({} as ReportsContextValue)

export default ReportsContext

export const ReportProvider: React.FC<ReportsProviderProps> = ({ children }) => {
    const io = useIo()
    const [listReports, setListReports] = useState<Report[] | undefined>()

    useEffect(() => {
        io.emit("report:list")
        io.on("report:list:success", (reports: Report[]) => {
            setListReports(reports)
        })

        return () => {
            io.off("report:list:success")
        }
    }, [])

    return <ReportsContext.Provider value={{ listReports, setListReports }}>{children}</ReportsContext.Provider>
}
