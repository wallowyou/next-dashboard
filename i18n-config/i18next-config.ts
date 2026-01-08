'use client'
import type { Locale } from './language'
import { camelCase, kebabCase } from 'es-toolkit/string'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// 导入默认语言的所有命名空间
import common from '../i18n/en-US/common.json'
import app from '../i18n/en-US/app.json'
// 导入其他命名空间...

// 定义资源对象
export const resources = {
  common,
  app,
  // 添加其他命名空间...
}

export type Resources = typeof resources
export type NamespaceCamelCase = keyof Resources
export type NamespaceKebabCase = string

// 动态加载命名空间
const requireSilent = async (lang: Locale, namespace: NamespaceKebabCase) => {
  let res
  try {
    res = (await import(`../i18n/${lang}/${namespace}.json`)).default
  }
  catch {
    res = (await import(`../i18n/en-US/${namespace}.json`)).default
  }
  return res
}

const NAMESPACES = Object.keys(resources).map(kebabCase) as NamespaceKebabCase[]

// 加载单个命名空间
export const loadNamespace = async (lang: Locale, ns: NamespaceKebabCase) => {
  const camelNs = camelCase(ns) as NamespaceCamelCase
  if (i18n.hasResourceBundle(lang, camelNs))
    return

  const resource = await requireSilent(lang, ns)
  i18n.addResourceBundle(lang, camelNs, resource, true, true)
}

// 加载所有命名空间
export const loadLangResources = async (lang: Locale) => {
  await Promise.all(
    NAMESPACES.map(ns => loadNamespace(lang, ns)),
  )
}

// 初始化翻译资源
const getInitialTranslations = () => {
  return {
    'en-US': resources,
  }
}

// 初始化 i18next
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: undefined,
    fallbackLng: 'en-US',
    resources: getInitialTranslations(),
    defaultNS: 'common',
    ns: Object.keys(resources),
    keySeparator: '.',
  })
}

// 切换语言
export const changeLanguage = async (lng?: Locale) => {
  if (!lng)
    return
  await loadLangResources(lng)
  await i18n.changeLanguage(lng)
}

export default i18n