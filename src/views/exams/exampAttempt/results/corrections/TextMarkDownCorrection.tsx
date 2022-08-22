import { Text, Stack, Textarea, useHighlight, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { ExamForm } from '../../../../../interfaces/Exams';
import { generateCorrectionMatches } from '../../../../../utils/ExamUtils';
import { translate } from '../../../../../utils/LanguageUtils';
import { MarkDownColorHelper } from './MarkDownColorHelper';
import { TextMarkdownViewer } from './TextMarkdownViewer';

interface Props {
  text: string;
  questionPoolIndex: number;
  questionIndex: number
}

export const TextMarkDownCorrection = ({ text, questionIndex, questionPoolIndex }: Props) => {
  const [markDownText, setMarkDownText] = useState(text)
  const { register, watch } = useFormContext<ExamForm>()
  const { matches } = generateCorrectionMatches(markDownText)

  const generalChunks = useHighlight({
    text: markDownText,
    query: matches
  })

  console.log(watch())

  const existMatches = generalChunks.some(({ match }) => match)

  return (
    <Stack>
      <Textarea
        marginY={5}
        {...register(`questionPools.${questionPoolIndex}.questions.${questionIndex}.correction.markDownCorrection`)}
        value={markDownText}
        onChange={(e) => setMarkDownText(e.target.value)}
      />
      <MarkDownColorHelper onResetCorrection={() => setMarkDownText(text)} />
      <Box marginY={3}>
        {existMatches && <Text textStyle='title' marginY={3}>{translate('CORRECTION_PREVIEW')}</Text>}
        <TextMarkdownViewer markdownText={markDownText} />
      </Box>
    </Stack>
  )
}


