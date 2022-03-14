import { Flex, Stack, Text } from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'
import { Controller, useFormContext } from 'react-hook-form'
import { MultiSelectOption } from '../../interfaces/MultiSelectOption'
import { Select as ChakraSelect } from 'chakra-react-select'

interface Props {
  name: string;
  label: TranslationsDictionary;
  isRequired: boolean; // TODO: Remove this prop
  placeholder?: string;
  bottomNote?: string;
  options: MultiSelectOption[];
  isMultiSelect: boolean;
  closeMenuOnSelect: boolean;
  rules?: Object;
}

export const Select = ({
  closeMenuOnSelect,
  name,
  label,
  placeholder,
  bottomNote,
  options,
  isMultiSelect,
  isRequired
}: Props) => {
  const { control } = useFormContext()

  return (
    <Stack spacing={1}>
      <Flex>
        <Text fontWeight={600} fontSize="sm" textStyle="title">
          {translate(label)}
        </Text>
        {isRequired && (
          <Text color="brand.500" marginLeft={1}>
            *
          </Text>
        )}
      </Flex>
      <Controller
        render={({ field: { onChange, value, ref } }) => (
          <ChakraSelect
            isMulti={isMultiSelect}
            placeholder={placeholder}
            options={options}
            focusBorderColor="brand.300"
            closeMenuOnSelect={closeMenuOnSelect}
            onChange={onChange}
            value={value}
            ref={ref}
          />
        )}
        control={control}
        name={name}
        rules={{
          required: true
        }}
      />
      {bottomNote && (
        <Text color="gray.400" marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  )
}
