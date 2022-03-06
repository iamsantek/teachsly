import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Image,
  Center
} from '@chakra-ui/react'
import SignIn from '../components/SignIn'
import { GeneralInformation } from '../enums/GeneralInformation'
import { SocialButtons } from '../components/Buttons/SocialButtons'

export const LogInScreen = () => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={3} px={6}>
        <Stack align={'center'}>
          <Box boxSize={60}>
            <Center>
              <Image src={require('../assets/img/brand/logo@2x.png')} alt={GeneralInformation.PROJECT_NAME} />
            </Center>
          </Box>
        </Stack>
        <SignIn />
        <Stack spacing={4}>
          <Center flexDirection={'column'}>
            <Text textStyle={'paragraph'} fontWeight='bold' fontSize={'xs'} marginY={4}>
              {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
            </Text>
            <SocialButtons />
          </Center>
        </Stack>
      </Stack>
    </Flex>
  )
}
