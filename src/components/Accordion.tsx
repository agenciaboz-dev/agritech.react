import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { styled } from "@mui/material"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"

export const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
        height: "3vw",
        "&:not(:last-child)": {
            // borderBottom: 0,
        },
        "&::before": {
            display: "none",
            boxShadow: "none",
        },
    })
)

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
    height: "3vw",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        // marginLeft: theme.spacing(1),
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        boxShadow: "none",
    },

    "& .MuiAccordionDetails-root": {
        padding: 0,
        margin: 0,
    },
}))
