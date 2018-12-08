
import { ReactElement } from "react";

interface LocalizationProviderProps {
    messages: object
    devMode?: boolean
}

interface LocalizedMessageProps {
    id: string;
    [extraProps: string]: any;
}
