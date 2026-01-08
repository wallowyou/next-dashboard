import data from './languages'

export type Item = {
  value: number | string
  name: string
  example: string
}

export type I18nText = Record<typeof LanguagesSupported[number], string>

export const languages = data.languages

export type Locale = (typeof languages[number])['value']

export const LanguagesSupported: Locale[] = languages
  .filter(item => item.supported)
  .map(item => item.value)

export const getLanguage = (locale: Locale): Locale => {
  if (LanguagesSupported.includes(locale))
    return locale
  return LanguagesSupported[0]
}

export const localeMap: Record<Locale, string> = {
  'en-US': 'en',
  'zh-Hans': 'zh-cn',
  // 添加其他语言映射
}