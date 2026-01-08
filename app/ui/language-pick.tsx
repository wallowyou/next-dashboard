'use client'
import { useLocale } from '@/context/i18n'
import { setLocaleOnClient } from '@/i18n-config'
import { languages, Locale } from '@/i18n-config/language'

export default function LanguageSwitcher() {
  const locale = useLocale()
  
  return (
    <select
      className="w-[180px] text-sm" 
      value={locale}
      onChange={(e) => setLocaleOnClient(e.target.value as Locale)}
    >
      {languages
        .filter(lang => lang.supported)
        .map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.name}
          </option>
        ))
      }
    </select>
  )
}