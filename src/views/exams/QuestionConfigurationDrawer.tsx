import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AnswerType, QuestionType } from '../../interfaces/Exams'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (questionType: QuestionType, answersType: AnswerType) => void;
}

export const QuestionConfigurationDrawer = ({ isOpen, onClose, onSave }: Props) => {
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.TEXT)
  const [answersType, setAnswersType] = useState<AnswerType>(AnswerType.TextArea)

  const save = () => {
    onSave(questionType, answersType)
    onClose()
  }

  return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Configuracion de la pregunta</DrawerHeader>

                <DrawerBody>
                    <Stack spacing={5}>
                        <Stack spacing={3}>
                            <Text>Configurar tipo de pregunta</Text>
                            <RadioGroup onChange={(nextValue: string) => setQuestionType(Number(nextValue) as QuestionType)} value={questionType}>
                                <Stack direction='column' spacing={2} marginY={3}>
                                    <Radio value={QuestionType.TEXT}>Texto</Radio>
                                    <Radio value={QuestionType.AUDIO}>Audio</Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                        <Stack spacing={2}>
                            <RadioGroup onChange={(nextValue: string) => setAnswersType(Number(nextValue) as AnswerType)} value={answersType}>
                                <Text>Configurar tipo de respuesta</Text>
                                <Stack direction='column' spacing={2} marginY={3}>
                                    <Radio value={AnswerType.MultipleChoice}>Multiple choice</Radio>
                                    <Radio value={AnswerType.TextArea}>A desarrollar</Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </Stack>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={save}>Guardar</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

  )
}
