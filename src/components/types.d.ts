
export interface LocalizationProviderProps {
    messages: object
    onMissingResource: MissingResourceHandler
}

export interface LocalizedMessageProps {
    id: string
    [data: string]: any
}

interface MissingResourceHandler {
    (id: string): string
}
