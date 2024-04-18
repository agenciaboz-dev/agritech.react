import { useEffect, useRef } from "react"

export interface DynamicImageOptions {
    no_observe?: boolean
    callback: () => void
}

export const useDynamicImage = (options: DynamicImageOptions) => {
    const ref = useRef(null)

    useEffect(() => {
        console.log(options.no_observe)
        if (!options.no_observe) {
            const observer = new IntersectionObserver(
                async (entries) => {
                    const [entry] = entries
                    if (entry.isIntersecting) {
                        // ? executa abaixo quando o componente que o ref está atribuido estiver visível
                        options.callback()
                        observer.unobserve(entry.target) // Stop observing since image is fetched
                    }
                },
                {
                    root: null, // Use the viewport as the root
                    threshold: 0.1, // 10% of the product should be visible
                }
            )

            if (ref.current) {
                observer.observe(ref.current)
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current)
                }
            }
        }
    }, [ref])

    return ref
}
