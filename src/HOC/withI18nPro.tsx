import { ComponentType, PropsWithChildren } from 'react'
import { WithI18nProExtendedProps } from '../types/hoc'
import { useI18nPro } from '../hook/useI18nPro'

/**
 * Higher-order component that enhances a component with i18nPro functionality.
 * @template T - The type of the props of the wrapped component.
 * @param {ComponentType<T>} WrappedComponent - The component to be wrapped.
 * @returns {React.ComponentType<PropsWithChildren<Omit<T, keyof WithI18nProExtendedProps>>>} - The enhanced component.
 */
export const withI18nPro = <T extends WithI18nProExtendedProps>(
  WrappedComponent: ComponentType<T>
) => {
  return ({
    children,
    ...props
  }: PropsWithChildren<Omit<T, keyof WithI18nProExtendedProps>>) => {
    const i18nProHook = useI18nPro()
    return (
      <WrappedComponent {...(props as T)} {...i18nProHook}>
        {children}
      </WrappedComponent>
    )
  }
}
