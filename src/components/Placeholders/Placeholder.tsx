import React from 'react'
import { generateRandomId } from '../../utils/StringUtils'

interface Props {
  show: boolean;
  number: number;
  placeholderElement: React.ReactNode;
}

export const Placeholder = ({ show, number, placeholderElement }: Props) => {
  if (!show) {
    return null
  }

  return (
    <>
      {Array.from(Array(number).fill(1)).map(() => {
        return <div key={generateRandomId()}>{placeholderElement}</div>
      })}
    </>
  )
}
