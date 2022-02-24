import { Stack, Text } from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'
import { Controller, useFormContext } from 'react-hook-form'
import { MultiSelectOption } from '../../interfaces/MultiSelectOption'
import { Select as ChakraSelect } from 'chakra-react-select'

interface Props {
  name: string;
  label: TranslationsDictionary;
  isRequired: boolean;
  placeholder?: string;
  bottomNote?: string;
  options: MultiSelectOption[];
  isMultiSelect: boolean;
  closeMenuOnSelect: boolean;
}

export const Select = ({
  closeMenuOnSelect,
  name,
  label,
  isRequired,
  placeholder,
  bottomNote,
  options,
  isMultiSelect
}: Props) => {
  const { control } = useFormContext()

  return (
    <Stack spacing={1}>
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate(label)}
      </Text>
      <Controller
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <ChakraSelect
            isMulti={isMultiSelect}
            placeholder={placeholder}
            options={options}
            focusBorderColor="primary.300"
            closeMenuOnSelect={closeMenuOnSelect}
            onChange={onChange}
            value={value}
            ref={ref}
          />
        )}
        control={control}
        name={name}
      />
      {bottomNote && (
        <Text color="gray.400" marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  )
}
