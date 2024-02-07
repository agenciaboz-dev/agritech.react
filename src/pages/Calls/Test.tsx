import React, { useEffect } from "react"
import { TextField } from "@mui/material"
import { textField } from "../../style/input"
import { CreateCall } from "../../definitions/call"
import { useCurrencyMask } from "burgos-masks"
import MaskedInputNando from "../../components/MaskedNando"

interface TestProps {
    values: CreateCall
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Test: React.FC<TestProps> = ({ values, handleChange }) => {
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
        />
    )
}
