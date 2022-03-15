import { Box } from '@chakra-ui/react'
import React from 'react'
import { generateRandomId } from '../../utils/StringUtils'

interface Props {
  show: boolean;
  number: number;
  placeholderElement: React.ReactNode;
  orientation?: 'column' | 'row'
}

export const Placeholder = ({ show, number, placeholderElement, orientation = 'column' }: Props) => {
  if (!show) {
    return null
  }

  return (
    <Box display={'flex'} flexDirection={orientation} gap={4} marginY={4}>
      {Array.from(Array(number).fill(1)).map(() => {
        return <div key={generateRandomId()}>{placeholderElement}</div>
      })}
    </Box>
  )
}
