import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { GeneralInformation } from '../../enums/GeneralInformation'
import { SocialButtons } from '../Buttons/SocialButtons'

export const Footer = () => {
  return (
    <Box
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        position="absolute"
        bottom={0}
        py={4}
        flex={1}
        direction={'column'}
        spacing={4}
      >
        <Text textStyle={'title'} fontSize={'xs'}>
          {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
        </Text>

        <SocialButtons />
      </Container>
    </Box>
  )
}
