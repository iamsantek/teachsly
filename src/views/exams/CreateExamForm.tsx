import { Button, Text, Stack, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { ConfirmationDialog } from '../../components/AlertDialog/ConfirmationDialog'
import { Input } from '../../components/Inputs/Input'
import { Select } from '../../components/Inputs/Select'
import { defaultExamForm, defaultQuestionPool } from '../../constants/Exams'
import { useUserGroups } from '../../hooks/useUserGroups'
import { ExamForm } from '../../interfaces/Exams'
import { ToastNotification } from '../../observables/ToastNotification'
import { generalGroups } from '../../utils/CognitoGroupsUtils'
import { renderCourseList } from '../../utils/CourseUtils'
import { translate } from '../../utils/LanguageUtils'
import { QuestionPoolQuestions } from './QuestionPoolQuestions'

export const CreateExamForm = () => {
  const [showDeleteQuestionPoolConfirmation, setShowDeleteQuestionPoolConfirmation] = useState(false)
  const [questionPoolIndexToDelete, setQuestionPoolIndexToDelete] = useState(-1)
  const { groups } = useUserGroups()
  const formControls = useForm<ExamForm>(defaultExamForm)
  const { handleSubmit, control } = formControls

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const { fields: questionPools, update, remove, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'questionPools' // unique name for your Field Array
  })

  const onDeleteQuestionPool = (questionPoolIndex: number) => {
    if (questionPools.length === 1) {
      ToastNotification({
        description: 'DELETE_LAST_QUESTIONS_POOL_ERROR',
        status: 'INFO'
      })
      return
    }

    setQuestionPoolIndexToDelete(questionPoolIndex)
    setShowDeleteQuestionPoolConfirmation(true)
  }

  const deleteQuestionPool = () => {
    setShowDeleteQuestionPoolConfirmation(false)
    remove(questionPoolIndexToDelete)
  }

  const onAddQuestionPool = () => {
    append(defaultQuestionPool)
  }

  return (
    <>
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Input
              name="title"
              label="TITLE"
              isRequired={true}
              placeholder={translate('TITLE')}
            />
            <Select
              name="groups"
              label="GROUP_MULTI_SELECT_TITLE"
              placeholder={translate('COURSES')}
              isRequired={true}
              options={renderCourseList(groups, generalGroups)}
              isMultiSelect
              closeMenuOnSelect={true}
            />

            <ConfirmationDialog
              isOpen={showDeleteQuestionPoolConfirmation}
              onClose={() => setShowDeleteQuestionPoolConfirmation(false)}
              title='DELETE_QUESTIONS_POOL_TITLE'
              description='DELETE_QUESTIONS_POOL_DESCRIPTION'
              confirmButtonText={'DELETE'}
              onAction={deleteQuestionPool}
            />

            <Accordion allowMultiple>
              {questionPools?.map((questionPool, questionPoolIndex) => {
                return (
                  <AccordionItem boxShadow='md' key={questionPoolIndex} marginY={5}>
                    <h2>
                      <AccordionButton display='flex' justifyContent="space-between" flexDir='row'>
                        <Text fontWeight='bold'>Pool de preguntas #{questionPoolIndex + 1}</Text>
                        <Box display='flex' alignItems='center' gap={3}>
                          <Button
                            onClick={() => onDeleteQuestionPool(questionPoolIndex)}
                          >
                            <AiFillDelete />
                          </Button>
                          <AccordionIcon />
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <QuestionPoolQuestions
                        questionPoolIndex={questionPoolIndex}
                        questionPool={questionPool}
                        updateFn={update}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
            <Container centerContent maxW='100%'>
              <Button
                leftIcon={<AiOutlinePlus />}
                marginTop={5}
                onClick={() => onAddQuestionPool()}
                colorScheme='brand'
                variant='solid'>
                {translate('ADD_QUESTION_POOL')}
              </Button>
            </Container>
          </Stack>
        </form>
      </FormProvider>
    </>
  )
}
