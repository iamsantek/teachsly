import { Text, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { UseFieldArrayUpdate, useFormContext } from 'react-hook-form'
import { ExamAttempt } from '../../../API'
import { ExamAnswers, ExamCorrection, QuestionPool } from '../../../interfaces/Exams'
import { translate } from '../../../utils/LanguageUtils'
import { generateRandomId } from '../../../utils/StringUtils'
import { ExamAttemptQuestionPoolAnswers } from './ExamAttemptQuestionPoolAnswers'

interface Props {
    attempt: ExamAttempt;
    updateFn: UseFieldArrayUpdate<ExamCorrection, 'questionPools'>
}

export const ExamAttemptAnswers = ({ attempt, updateFn }: Props) => {
  const { watch } = useFormContext()
  const questionPools: QuestionPool[] = watch('questionPools')

  return (
        <Accordion allowMultiple>
            {questionPools.map((questionPool, questionPoolIndex) => {
              const id = generateRandomId()
              const questionPoolAnswers = (JSON.parse(attempt.results as string) as ExamAnswers | undefined)?.answers
              return (
                <AccordionItem key={id} boxShadow='md' marginY={5}>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                <Text marginY={2} fontWeight='bold'>{translate('EXERCISE')} #{questionPoolIndex + 1} </Text>
                               <Text color='gray.500' fontStyle='italic'>{questionPool.exerciseExplanation}</Text>
                               <Text color='gray.500' fontStyle='italic'>{questionPool.exerciseDescription}</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <ExamAttemptQuestionPoolAnswers
                        questionPoolIndex={questionPoolIndex}
                        questionPool={questionPool}
                        answers={questionPoolAnswers && questionPoolAnswers[questionPoolIndex]}
                        updateFn={updateFn}
                        />
                    </AccordionPanel>
                </AccordionItem>
              )
            })}
        </Accordion>
  )
}
