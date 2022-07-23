import { Select } from '@chakra-ui/react'
import { Question } from '../../../interfaces/Exams'

interface Props {
    question: Question;
    questionPoolIndex: number;
    questionIndex: number;
    value: number;
    onChange: (value: number) => void;
}

export const SelectCorrectAnswer = ({ onChange, value, question }: Props) => {
  return (
        <>
            <Select
                placeholder='Select correct answer'
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
            >
                {question.options?.map((option, index) => {
                  return (
                    <option key={option.id} value={index}>
                        {option.label}
                    </option>
                  )
                })}
            </Select>
        </>
  )
}
