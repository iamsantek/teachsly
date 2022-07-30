
import { FC } from 'react'
import { Center, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { isContentSeen as isContentSeenHelper } from '../../utils/GeneralUtils'

interface Props {
  id: string;
  title: string;
  badges?: string[];
  showSeenBadge?: boolean;
}

export const CommonContentLineTitle: FC<Props> = ({
  id,
  title,
  children,
  showSeenBadge = false
}) => {
  let isContentSeen: boolean = false

  if (showSeenBadge) {
    isContentSeen = isContentSeenHelper(id)
  }

  return (
  <HStack spacing={3} flex={1} justifyContent="start">
    <Text
      textAlign="start"
      textStyle={'title'}
      color={useColorModeValue('black', 'white')}
      opacity={showSeenBadge && isContentSeen ? 0.5 : 1}
    >
      {title}
    </Text>
    {children && (
      <Center display={{ base: 'none', md: 'flex' }}>{children}</Center>
    )}
  </HStack>
  )
}
