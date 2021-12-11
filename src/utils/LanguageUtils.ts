import { translations } from "../dictionaries/dictionary";
import { Languages } from "../enums/Languages";

const getTranslationLanguage = () => {
  const browserLanguage = navigator.language;

  return browserLanguage.includes(Languages.ES) ? Languages.ES : Languages.EN;
};

export const translate = (key: string) => {
  const translationLanguage = getTranslationLanguage();

  return translations[translationLanguage][key];
};
