import { RadioGroup, Stack, Radio, Text } from '@chakra-ui/react'
import { translate } from '../../../utils/LanguageUtils'

interface Props {
    questionPoolIndex: number;
    onChange: (questionIndex: number, value: string) => void;
    value: number
}

export const IsCorrectAnswerRadio = ({ questionPoolIndex, onChange, value }: Props) => {
  return (
        <RadioGroup onChange={(nextValue) => onChange(questionPoolIndex, nextValue)} value={value}>
            <Stack direction='row' spacing={3}>
                <Text fontWeight='bold'>{translate('CORRECT_ANSWER')}</Text>
                <Radio value={1}>{translate('YES')}</Radio>
                <Radio value={0}>{translate('NO')}</Radio>
            </Stack>
        </RadioGroup>
  )
}
