import { Languages } from '../enums/Languages'
import { LanguageDictionary, LanguageEN, LanguageES } from '../lang/lant'

const getTranslationLanguage = () => {
  if (typeof window === 'undefined') {
    return LanguageES
  }

  const browserLanguage = navigator.language

  return browserLanguage.includes(Languages.ES) ? LanguageES : LanguageEN
}

export const translate = (key: LanguageDictionary) => {
  const translationLanguage = getTranslationLanguage()

  return translationLanguage[key]
}
