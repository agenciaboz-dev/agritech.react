declare interface Gallery {
    id?: number
    images: GalleryImage[]

    talhao?: Talhao
    talhaoId: number

    tillage?: Tillage
    tillageId: number
}
declare interface GalleryImage {
    id?: number
    url: string
    gallery?: Gallery
    galleryId: number
    isDeleting?: boolean
}
