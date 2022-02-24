import {
  TranslationsDictionary,
  LanguageEN,
  LanguageES
} from '../dictionaries/dictionary'
import { Languages } from '../enums/Languages'

const getTranslationLanguage = () => {
  const browserLanguage = navigator.language

  return browserLanguage.includes(Languages.ES) ? LanguageES : LanguageEN
}

export const translate = (key: TranslationsDictionary) => {
  const translationLanguage = getTranslationLanguage()

  return translationLanguage[key]
}
