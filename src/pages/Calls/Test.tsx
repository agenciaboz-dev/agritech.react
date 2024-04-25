import React, { useEffect } from "react"
import { TextField } from "@mui/material"
import { CreateCall } from "../../definitions/call"
import { useCurrencyMask } from "burgos-masks"
import MaskedInputNando from "../../components/MaskedNando"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface TestProps {
    values: CreateCall
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    disabled: boolean
}

export const Test: React.FC<TestProps> = ({ values, handleChange, disabled }) => {
    const textField = useResponsiveStyles()

    useEffect(() => {
        console.log({ price: values.hectarePrice })
    }, [values.hectarePrice])

    return (
        <TextField
            label={"Custo por hectare"}
            name="hectarePrice"
            value={values.hectarePrice}
            sx={textField}
            onChange={handleChange}
            required
            InputProps={{
                inputComponent: MaskedInputNando,
                inputProps: {
                    mask: useCurrencyMask({ decimalLimit: 6 }),
                    inputMode: "numeric",
                },
            }}
            disabled={disabled}
        />
    )
}
