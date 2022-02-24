import * as React from 'react';
import { Stack, Text } from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'

interface Props {
  name: string;
  label: TranslationsDictionary;
  bottomNote?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FileUploader = ({ onChange, label, bottomNote }: Props) => {
  return (
    <Stack spacing={1}>
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate(label)}
      </Text>
      <input type="file" onChange={onChange} />
      {bottomNote && (
        <Text color="gray.500" fontSize="sm" marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  )
}
