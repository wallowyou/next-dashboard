'use client'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n-config/i18next-config'
import { getLocaleOnClient } from '@/i18n-config'
import { changeLanguage } from '@/i18n-config/i18next-config'
import { localeAtom } from '@/context/i18n'
import { useSetAtom } from 'jotai'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const setLocale = useSetAtom(localeAtom)
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    const initLanguage = async () => {
      const locale = getLocaleOnClient()
      setLocale(locale)
      await changeLanguage(locale)
      setIsReady(true)
    }
    
    initLanguage()
  }, [setLocale])

  // 监听 i18next 语言变化，同步到 atom
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLocale(lng as any)
    }
    
    i18n.on('languageChanged', handleLanguageChanged)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [setLocale])

  // 等待语言初始化完成后再渲染子组件
  if (!isReady) {
    return null
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}