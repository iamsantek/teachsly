import * as React from "react";
import { Stack, Text, Input as ChakraInput, Flex } from "@chakra-ui/react";
import { TranslationsDictionary } from "../../dictionaries/dictionary";
import { translate } from "../../utils/LanguageUtils";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: TranslationsDictionary;
  isRequired: boolean;
  placeholder?: string;
  bottomNote?: string;
  type?: React.HTMLInputTypeAttribute;
  isDisabled?: boolean;
}

export const Input = ({
  name,
  label,
  isRequired,
  placeholder,
  bottomNote,
  type,
  isDisabled,
  ...rest
}: Props) => {
  const { register } = useFormContext();

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
      <ChakraInput
        placeholder={placeholder}
        size="md"
        type={type}
        isDisabled={isDisabled}
        {...register(name, { required: isRequired, ...rest })}
        {...rest}
      />

      {bottomNote && (
        <Text color="gray.500" textStyle={"paragraph"} marginLeft={1}>
          {bottomNote}
        </Text>
      )}
    </Stack>
  );
};
