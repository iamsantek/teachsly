import { Stack, Text, Textarea } from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string;
  label: TranslationsDictionary;
  isRequired: boolean;
  placeholder: string;
  bottomNote?: string;
}

export const TextArea = ({
  name,
  label,
  isRequired,
  placeholder,
  bottomNote
}: Props) => {
  const { register } = useFormContext()

  return (
    <Stack spacing={1}>
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate(label)}
      </Text>
      <Textarea
        placeholder={placeholder}
        size="md"
        {...register(name, { required: isRequired, maxLength: 80 })}
      />

      {bottomNote && (
        <Text color="gray.400" marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  )
}
