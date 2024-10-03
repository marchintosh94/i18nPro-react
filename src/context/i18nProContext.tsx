import { createContext, useContext, PropsWithChildren, useEffect } from 'react'
import { I18nProContextType, I18nProProviderProps } from '../types/context'
import { useI18nPro } from '../hook/useI18nPro'

// Create a context for i18nPro with a default value of null
export const i18nProContext = createContext<I18nProContextType | null>(null)
// Create a custom hook to use the i18nPro context
export const useI18nProContext = () =>
  useContext(i18nProContext) as I18nProContextType

/**
 * I18nProProvider component that provides i18nPro context to its children.
 *
 * @param {PropsWithChildren<I18nProProviderProps>} props - The props for the provider.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 * @param {I18nProProviderProps} props.initialSetup - Initial setup for the i18nPro context.
 * @param {string} props.initialSetup.locale - The initial locale to set.
 * @param {string} props.initialSetup.path - The path to the translation files.
 * @param {Record<string, string | number>} props.initialSetup.messages - The translation messages.
 * @returns {React.ReactElement} A React component.
 */
export const I18nProProvider = ({
  children,
  initialSetup
}: PropsWithChildren<I18nProProviderProps>) => {
  const { locale, switchLoadLanguage, t, updateExisitngLocale } = useI18nPro()

  useEffect(() => {
    if (initialSetup && initialSetup.locale) {
      switchLoadLanguage(
        initialSetup.locale,
        initialSetup.path ?? initialSetup.messages
      )
    }
  }, [])

  return (
    <i18nProContext.Provider
      value={{
        locale,
        switchLoadLanguage,
        t,
        updateExisitngLocale
      }}
    >
      {children}
    </i18nProContext.Provider>
  )
}
