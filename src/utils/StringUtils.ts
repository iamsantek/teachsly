export const splitCamelCase = (camelCase: string | undefined | null) => {
  if (!camelCase) {
    return ''
  }

  return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export const removeWhiteSpaces = (value: string) => value.replace(/\s+/g, '')

export const generateRandomId = () => Math.random().toString(36).slice(2)

export const removeExtension = (fileName: string) => fileName.replace(/\.[^/.]+$/, '')
