export const useDocumentMask = () => {
    const documentMask = (value: string | number) => {
        const numbersOnly = value.toString().replace(/[^\d]/g, "")
        let mask

        if (numbersOnly.length <= 11) {
            mask = "000.000.000-000"
        } else {
            mask = "00.000.000/0000-00"
        }

        return mask
    }

    return documentMask
}
