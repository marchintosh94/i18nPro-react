import { useState } from 'react'
import { i18nPro, ChangeLanguage } from '@marchintosh94/i18n-pro'

/**
 * useI18nPro is a custom React hook that provides functionalities for internationalization (i18n).
 * It uses the i18nPro library for the actual i18n operations.
 *
 * @returns {Object} An object containing the following properties:
 * - locale: The current locale.
 * - t: A function to translate a given key into the current locale.
 * - switchLoadLanguage: A function to change the current language and load the new translations.
 * - updateExisitngLocale: A function to update the current locale if it's available in the i18nPro library.
 */
export const useI18nPro = () => {
  const [locale, setLocale] = useState<string>(
    i18nPro.locale ?? i18nPro.defaultLocale
  )

  /**
   * Updates the locale state if the new locale is available in the i18nPro library.
   *
   * @param {string | undefined} newLocale - The new locale to set.
   * @returns {string} The updated locale, or an empty string if the locale was not updated.
   */
  const updateLocaleState = (newLocale: string | undefined): string => {
    if (newLocale && i18nPro.isLocaleAvailable(newLocale)) {
      i18nPro.setLocale(newLocale)
      setLocale(newLocale)
      return newLocale
    }
    return ''
  }

  /**
   * Changes the current language and loads the new translations.
   *
   * @param {...any} args - The arguments to pass to the i18nPro.changeLanguage function.
   * @returns {Promise<string>} A promise that resolves to the updated locale.
   */
  const switchLoadLanguage: ChangeLanguage = (...args) => {
    return i18nPro.changeLanguage(...args).then(updateLocaleState)
  }

  /**
   * Translates a given key into the current locale.
   *
   * @param {string} value - The key to translate.
   * @param {...any} args - The arguments to pass to the i18nPro.t function.
   * @returns {string} The translated string.
   */
  const t: typeof i18nPro.t = (value: string, ...args) => {
    return i18nPro.t(value, ...args)
  }

  /**
   * Updates the current locale if it's available in the i18nPro library.
   *
   * @param {string} locale - The new locale to set.
   */
  const updateExisitngLocale = (locale: string) => updateLocaleState(locale)

  return {
    locale,
    t,
    switchLoadLanguage,
    updateExisitngLocale
  }
}
