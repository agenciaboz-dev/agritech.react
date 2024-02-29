import { useContext } from "react"
import ReportsContext from "../contexts/reportsContext"

export const useReports = () => {
    const reportsContext = useContext(ReportsContext)

    return { ...reportsContext }
}
