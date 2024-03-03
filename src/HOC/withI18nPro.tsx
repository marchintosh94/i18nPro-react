import { ComponentType, PropsWithChildren } from "react"
import { WithI18nProExtendedProps } from "../types/hoc"
import { useI18nPro } from "../hook/useI18nPro"

export const withI18nPro = <T extends WithI18nProExtendedProps>(WrappedComponent: ComponentType<T>) => {
    return ({children, ...props}: PropsWithChildren<Omit<T, keyof WithI18nProExtendedProps>>) => {
        const i18nProHook = useI18nPro()
        return (
            <WrappedComponent {...props as T} {...i18nProHook}>
                {children}
            </WrappedComponent>
        )
    }
}