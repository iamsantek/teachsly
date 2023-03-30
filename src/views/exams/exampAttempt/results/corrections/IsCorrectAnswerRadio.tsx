import { RadioGroup, Stack, Radio, Text } from "@chakra-ui/react";
import { translate } from "../../../../../utils/LanguageUtils";

interface Props {
  onChange: (value: string) => void;
  value: 1 | 0 | undefined;
}

export const IsCorrectAnswerRadio = ({ onChange, value }: Props) => {
  return (
    <RadioGroup onChange={onChange} value={value}>
      <Stack direction="row" spacing={3}>
        <Text fontWeight="bold">{translate("CORRECT_ANSWER")}</Text>
        <Radio value={1}>✅</Radio>
        <Radio value={0}>❌</Radio>
      </Stack>
    </RadioGroup>
  );
};
