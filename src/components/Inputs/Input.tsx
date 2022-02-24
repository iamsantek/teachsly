import * as React from 'react';
import { Stack, Text, Input as ChakraInput } from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string;
  label: TranslationsDictionary;
  isRequired: boolean;
  placeholder?: string;
  bottomNote?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const Input = ({
  name,
  label,
  isRequired,
  placeholder,
  bottomNote,
  type
}: Props) => {
  const { register } = useFormContext()

  return (
    <Stack spacing={1}>
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate(label)}
      </Text>
      <ChakraInput
        placeholder={placeholder}
        size="md"
        type={type}
        {...register(name, { required: isRequired, maxLength: 80 })}
      />

      {bottomNote && (
        <Text color="gray.500" fontSize="sm" marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  )
}
