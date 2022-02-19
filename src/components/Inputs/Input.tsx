import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { TranslationsDictionary } from "../../dictionaries/dictionary";
import { translate } from "../../utils/LanguageUtils";
import { Input as ChakraInput } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: TranslationsDictionary;
  isRequired: boolean;
  placeholder: string;
  bottomNote?: string;
}

export const Input = ({
  name,
  label,
  isRequired,
  placeholder,
  bottomNote,
}: Props) => {
  const { register } = useFormContext();

  return (
    <Stack spacing={1}>
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate(label)}
      </Text>
      <ChakraInput
        placeholder={placeholder}
        size="md"
        {...register(name, { required: isRequired, maxLength: 80 })}
      />

      {bottomNote && (
        <Text color="gray.500" fontSize="sm" marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  );
};
