import type { Locale } from '@/i18n-config/language'
import { atom, useAtomValue } from 'jotai'
import { getLanguage } from '@/i18n-config/language'

export const localeAtom = atom<Locale>('en-US')
export const useLocale = () => {
  return useAtomValue(localeAtom)
}

export const useGetLanguage = () => {
  const locale = useLocale()

  return getLanguage(locale)
}
