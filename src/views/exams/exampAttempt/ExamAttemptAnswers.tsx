import { Text, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { ExamAttempt } from '../../../API'
import { ExamAnswers, QuestionPool } from '../../../interfaces/Exams'
import { translate } from '../../../utils/LanguageUtils'
import { ExamAttemptQuestionPoolAnswers } from './ExamAttemptQuestionPoolAnswers'

interface Props {
    questionPools: QuestionPool[]
    attempt: ExamAttempt;
}

export const ExamAttemptAnswers = ({ questionPools, attempt }: Props) => {
  return (
        <Accordion allowMultiple>
            {questionPools.map((questionPool, index) => {
              const questionPoolAnswers = (JSON.parse(attempt.results as string) as ExamAnswers | undefined)?.answers
              return (
                <AccordionItem key={questionPool.id} boxShadow='md' marginY={5}>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                <Text marginY={2} fontWeight='bold'>{translate('EXERCISE')} #{index + 1} </Text>
                               <Text color='gray.500' fontStyle='italic'>{questionPool.exerciseExplanation}</Text>
                               <Text color='gray.500' fontStyle='italic'>{questionPool.exerciseDescription}</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <ExamAttemptQuestionPoolAnswers questionPool={questionPool} answers={questionPoolAnswers && questionPoolAnswers[index]} />
                    </AccordionPanel>
                </AccordionItem>
              )
            })}
        </Accordion>
  )
}
