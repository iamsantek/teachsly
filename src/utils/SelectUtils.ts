import { MultiSelectOption } from '../interfaces/MultiSelectOption'

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

export const mapSingleValueToMultiSelectOption = (mediaType: string) => ({
  label: mediaType,
  value: mediaType
})
