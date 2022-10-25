export const splitCamelCase = (camelCase: string | undefined | null) => {
  if (!camelCase) {
    return ''
  }

  return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export const removeWhiteSpaces = (value: string) => value.replace(/\s+/g, '')

export const generateRandomId = () => Math.random().toString(36).slice(2)

export const removeExtension = (fileName: string) => fileName.replace(/\.[^/.]+$/, '')

export const countWords = (text: string) => {
  return text.split(/\s+/).length
}

// Delete accents and diacritics from a string
export const removeDiacritics = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Capitalize the first letter of a string and lowercase the rest
export const capitalizeWord = (text: string) => {
  const test = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  return test
}

// Capitalize first letter of each word and replace underscores with one space
export const capitalize = (text: string) => {
  return text.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
