import { createContext, useEffect, useState } from "react"
import React from "react"
import { Report } from "../definitions/report"
import { useIo } from "../hooks/useIo"

interface ReportsContextValue {
    listReports: Report[]
    setListReports: (value: Report[]) => void
    update: (value:Report) => void
}

interface ReportsProviderProps {
    children: React.ReactNode
}

const ReportsContext = createContext<ReportsContextValue>({} as ReportsContextValue)

export default ReportsContext

export const ReportProvider: React.FC<ReportsProviderProps> = ({ children }) => {
    const io = useIo()
    const [listReports, setListReports] = useState<Report[]>([])

    const update = (report: Report) => setListReports((list) => [...list?.filter((item) => item.id != report.id), report])

    useEffect(() => {
        io.emit("report:list")
        io.on("report:list:success", (reports: Report[]) => {
            setListReports(reports)
        })

        return () => {
            io.off("report:list:success")
        }
    }, [])

    return <ReportsContext.Provider value={{ listReports, setListReports, update }}>{children}</ReportsContext.Provider>
}
