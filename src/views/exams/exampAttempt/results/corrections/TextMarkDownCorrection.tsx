import { Text, Mark, Stack, Textarea, useHighlight, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { translate } from '../../../../../utils/LanguageUtils';
import { MarkDownColorHelper } from './MarkDownColorHelper';

interface Props {
  text: string;
}

export const TextMarkDownCorrection = ({ text }: Props) => {
  const [markDownText, setMarkDownText] = useState(text)

  const asteriskWords = markDownText.match(/\*(.*?)\*/g) || []
  const doubleAsteriskWords = markDownText.match(/#(.*?)#/g) || []
  const dashWords = markDownText.match(/-([^-]+)-/g) || []
  const slashWords = markDownText.match(/\/([^/]+)\//g) || []
  const parenthesisWords = markDownText.match(/\(([^()]+)\)/g) || []

  const matches = [...asteriskWords, ...doubleAsteriskWords, ...dashWords, ...slashWords, ...parenthesisWords]

  const generalChunks = useHighlight({
    text: markDownText,
    query: matches
  })


  const existMatches = generalChunks.some(({ match }) => match)

  const getMarkColor = (text: string) => {
    if (asteriskWords.includes(text)) {
      return { color: 'purple.500' }
    } else if (doubleAsteriskWords.includes(text)) {
      return { color: 'blue.500' }
    }
    else if (dashWords.includes(text)) {
      return { color: 'pink.500' }
    }
    else if (slashWords.includes(text)) {
      return { color: 'orange.500' }
    }
    else if (parenthesisWords.includes(text)) {
      return { color: 'blackAlpha.500' }
    }
    return { color: 'blackAlpha.500' }
  }

  return (
    <Stack>
      <Textarea marginY={5} minHeight='sm' value={markDownText} noOfLines={10} onChange={(e) => setMarkDownText(e.target.value)} rows={4} />
      <MarkDownColorHelper />
      <Box marginY={3}>
        {existMatches && <Text textStyle='title' marginY={3}>{translate('CORRECTION_PREVIEW')}</Text>}
        {generalChunks.map(({ text, match }) => {
          if (!match) return text
          const { color } = getMarkColor(text)
          return <Mark bgColor={color} color='whiteAlpha.900'>{text}</Mark>
        }
        )}
      </Box>
    </Stack>
  )
}
