import type { Locale } from './language'
import Cookies from 'js-cookie'
import { changeLanguage } from './i18next-config'
import { LanguagesSupported } from './language'
import { localeAtom } from '@/context/i18n'
import { getDefaultStore } from 'jotai'

export const LOCALE_COOKIE_NAME = 'locale'

export const i18n = {
  defaultLocale: 'en-US',
  locales: LanguagesSupported,
} as const

export { Locale }

// 设置语言（客户端）
export const setLocaleOnClient = async (locale: Locale, reloadPage = true) => {
  Cookies.set(LOCALE_COOKIE_NAME, locale, { expires: 365 })
  getDefaultStore().set(localeAtom, locale)
  await changeLanguage(locale)
  if (reloadPage)
    location.reload()
}

// 获取当前语言（客户端）
export const getLocaleOnClient = (): Locale => {
  return Cookies.get(LOCALE_COOKIE_NAME) as Locale || i18n.defaultLocale
}

// 渲染多语言对象
export const renderI18nObject = (obj: Record<string, string>, language: string) => {
  if (!obj)
    return ''
  if (obj?.[language])
    return obj[language]
  if (obj?.en_US)
    return obj.en_US
  return Object.values(obj)[0]
}