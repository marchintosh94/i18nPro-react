import { useState } from 'react'
import { i18nPro, ChangeLanguage } from '@marchintosh94/i18n-pro'

export const useI18nPro = () => {
  const [locale, setLocale] = useState<string>(
    i18nPro.locale ?? i18nPro.defaultLocale
  )

  const updateLocaleState = (newLocale: string | undefined): string => {
    if (newLocale && i18nPro.isLocaleAvailable(newLocale)) {
      i18nPro.setLocale(newLocale)
      setLocale(newLocale)
      return newLocale
    }
    return ''
  }

  const switchLoadLanguage: ChangeLanguage = (...args) => {
    return i18nPro.changeLanguage(...args).then(updateLocaleState)
  }

  const t: typeof i18nPro.t = (value: string, ...args) => {
    return i18nPro.t(value, ...args)
  }

  const updateExisitngLocale = (locale: string) => updateLocaleState(locale)

  return {
    locale,
    t,
    switchLoadLanguage,
    updateExisitngLocale
  }
}
