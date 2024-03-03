import { ChangeLanguage } from "@marchintosh94/i18n-pro";

export interface WithI18nProExtendedProps {
    locale: string;
    t: (value: string, ...args: any[]) => string;
    switchLoadLanguage: ChangeLanguage;
    updateExisitngLocale: (locale: string) => string;
}