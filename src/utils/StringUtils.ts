export const splitCamelCase = (camelCase: string | undefined | null) => {
  if (!camelCase) {
    return ''
  }

  return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export const generateRandomId = () => Math.random().toString(36).slice(2)
