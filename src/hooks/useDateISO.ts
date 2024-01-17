const useDateISO = (date: Date | null) => {
    if (date) {
        const pickDate = date?.toISOString()
        // console.log(pickDate)
        return pickDate
    }
}



export default useDateISO
