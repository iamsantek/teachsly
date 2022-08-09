import { Stack, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
    text: string;
}

export const TextMarkDownCorrection = ({
  text = 'Lorem '
}: Props) => {
  const [value, setValue] = useState(text)
  const [markDownText, setMarkDownText] = useState(text)

  // Get the words between * and *
  const words = text.match(/\*(.*?)\*/g) || []
  // Get the words between ** and **
  const boldWords = text.match(/\*\*(.*?)\*\*/g) || []
  // Get the words between *** and ***
  const bolderWords = text.match(/\*\*\*(.*?)\*\*\*/g) || []

  const chunks = useHighlight({
    text: 'With the Highlight component, you can spotlight, emphasize and accentuate words instantly',
    query: ['spotlight', 'emphasize', 'accentuate', 'instantly']
  })



  return (
        <Stack>
            <Text>{text}</Text>

            <Textarea value={markDownText} onChange={(e) => setMarkDownText(e.target.value)} rows={4}>

            </Textarea>

        </Stack>
  )
}
function useHighlight(arg0: { text: string; query: string[]; }) {
  throw new Error('Function not implemented.');
}

