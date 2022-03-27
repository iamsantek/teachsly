import React, { forwardRef } from 'react'
import { useColorModeValue, Square } from '@chakra-ui/react'

interface Props {
  onClick: () => void;
  icon: React.ReactNode;
}

// eslint-disable-next-line react/display-name
export const ButtonSquare = forwardRef(({ onClick, icon: Icon, ...rest }: Props, ref) => {
  const iconColor = useColorModeValue('gray.900', 'white')
  const iconBackgroundColor = useColorModeValue('gray.600', 'whiteAlpha.900')

  return (
    <Square
      size="40px"
      border='1px solid'
      ref={ref as any}
      color={iconColor}
      _hover={{
        cursor: 'pointer',
        bg: iconBackgroundColor,
        color: useColorModeValue('white', 'gray.700'),
        border: 'none'
      }}
      onClick={onClick}
      borderRadius={4}
      {...rest}
    >
      {Icon}
    </Square>
  )
})
