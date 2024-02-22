declare module "@klarr-agency/circum-icons-react"
declare module "leaflet-image" {
    import { Map } from "leaflet"

    function leafletImage(map: Map, callback: (err: Error | null, canvas: HTMLCanvasElement) => void): void

    export default leafletImage
}
