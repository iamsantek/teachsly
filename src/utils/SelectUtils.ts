import { EnglishLevel } from '../API'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import { capitalize } from './StringUtils'

export const renderMultiSelectOptions = (
  values: string[]
): MultiSelectOption[] => {
  return values.map((value) => {
    return {
      label: value,
      value: value,
      colorScheme: 'brand'
    }
  })
}

export const mapSingleValueToMultiSelectOption = (mediaType: string): MultiSelectOption => ({
  label: capitalize(mediaType),
  value: mediaType
})

export const renderEnglishLevelOptions = (): MultiSelectOption[] => {
  return Object.values(EnglishLevel).map(level => {
    return {
      label: capitalize(level),
      value: level,
      colorScheme: 'brand'
    }
  })
}
