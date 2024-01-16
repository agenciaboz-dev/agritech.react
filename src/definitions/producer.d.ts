declare interface Producer {
    id: number
    cnpj: string
    contract: boolean
    tillage?: Tillage[]
    employeeId?: number
    reportId?: number
    // userid: number
}
