import React, { ChangeEventHandler } from "react"

interface ProfessionalProps {
    values: User
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Professional: React.FC<ProfessionalProps> = ({}) => {
    return <div className="Professional-Component"></div>
}
