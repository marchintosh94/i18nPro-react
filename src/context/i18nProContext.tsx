import { createContext, PropsWithChildren, useContext } from 'react'
import { useI18nPro } from '../hook/useI18nPro'
import { I18nProContextType } from '../types/context'

const i18nProContext = createContext<I18nProContextType | null>(null)

export const I18nProProvider = ({ children }: PropsWithChildren) => {
  const { locale, switchLoadLanguage, t, updateExisitngLocale } = useI18nPro()
  console.log(locale)
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

export const useI18nProContext = () => {
  const context = useContext(i18nProContext)
  if (!context) {
    console.error('useI18nProContext must be used within an I18nProProvider')
    throw new Error('useI18nProContext must be used within an I18nProProvider')
  }
  return context
}
