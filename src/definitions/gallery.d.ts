declare interface Gallery {
    id?: number
    images?: Image[]

    talhao?: Talhao
    talhaoId?: number

    tillage?: Tillage
    tillageId?: number
}
declare interface GalleryImage {
    id?: number
    url: string
    gallery?: Gallery
    galleryId?: number
    isDeleting?: boolean
}
declare interface NewGallery {
    id?: int
    images?: Image[]
    urls?: string[]
    tillageId?: number
    talhaoId?: number
}

declare interface Image {
    file: ArrayBuffer
    name: string
    isDeleting?: boolean
}
