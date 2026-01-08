import { useTranslation } from 'react-i18next'
import { renderI18nObject } from '@/i18n-config'

export const useRenderI18nObject = () => {
  const { i18n } = useTranslation()
  const language = i18n.language
  
  return (obj: Record<string, string>) => {
    return renderI18nObject(obj, language)
  }
}