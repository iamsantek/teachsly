
import { FC } from 'react'
import { Center, HStack, Text, useColorModeValue } from '@chakra-ui/react'

interface Props {
  title: string;
  badges?: string[];
}

export const CommonContentLineTitle: FC<Props> = ({
  title,
  children
}) => (
  <HStack spacing={3} flex={1} justifyContent="start">
    <Text
      textAlign="start"
      textStyle={'title'}
      color={useColorModeValue('black', 'white')}
    >
      {title}
    </Text>
    {children && (
      <Center display={{ base: 'none', md: 'flex' }}>{children}</Center>
    )}
  </HStack>
)
