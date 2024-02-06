export const unmaskCurrency = (value: string | number) => {
    return Number(
        value
            .toString()
            .replace(/[^\d,]/g, "")
            .replace(",", ".")
    )
}

export const unmaskNumber = (value: string | number) => Number(value.toString().replace(/,/g, "."))
