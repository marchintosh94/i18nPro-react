import { useI18nPro } from '../hook/useI18nPro'

export type I18nProContextType = ReturnType<typeof useI18nPro>

export type InitialSetup = { locale: string } & (
  | { path: string; messages?: never }
  | { messages: Record<string, string | number>; path?: never }
)

export interface I18nProProviderProps {
  initialSetup: InitialSetup
}
