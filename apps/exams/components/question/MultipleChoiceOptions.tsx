import { Stack, useRadioGroup } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Question } from '../../types/types'
import { ChoiceOption } from '../ChoiceOption'

interface Props {
  question: Question;
  onChange: (value: string) => void;
}

export const MultipleChoiceOptions = ({ question, onChange }: Props) => {
  const [answer, setAnswer] = useState<string | undefined>(undefined)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  useEffect(() => {
    setAnswer(undefined)
  }, [question])

  const { getRadioProps } = useRadioGroup({
    name: question?.id,
    onChange: (value) => {
      setAnswer(value)
      onChange(value)
    },
    value: answer
  })

  if (!question.options) {
    return null
  }

  return (
    <Stack spacing={3}>
      {question.options?.map((_, index) => {
        const radio = getRadioProps({ value: _.id })
        radio.isChecked = answer === _.id
        return (
          <ChoiceOption key={_.id} {...radio} letter={alphabet[index]}>
            {_.label}
          </ChoiceOption>
        )
      })}
    </Stack>
  )
}
