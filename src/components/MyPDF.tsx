// Exemplo de um componente PDF simples
import { Document, Page, Text } from "@react-pdf/renderer"

const MyPDF = () => (
    <Document>
        <Page>
            <Text>Hello, world!</Text>
        </Page>
    </Document>
)

export default MyPDF
