
import { PropsWithChildren } from 'react'
import { Box, Center, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { isContentSeen as isContentSeenHelper } from '../../utils/GeneralUtils'

interface Props {
  id: string;
  title: string;
  badges?: string[];
  showSeenBadge?: boolean;
  [rest: string]: any;
  header?: JSX.Element
}

export const CommonContentLineTitle = ({
  id,
  title,
  children,
  showSeenBadge = false,
  header,
  ...rest
}: PropsWithChildren<Props>) => {
  let isContentSeen: boolean = false

  if (showSeenBadge) {
    isContentSeen = isContentSeenHelper(id)
  }

  return (
    <Flex flexDirection='column'>
      <Box>
        {header}
      </Box>
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
          <Center display={{ base: 'none', md: 'flex' }} {...rest}>{children}</Center>
        )}
      </HStack>
    </Flex>
  )
}
