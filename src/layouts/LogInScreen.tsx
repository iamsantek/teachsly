import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import SignIn from '../components/SignIn'
import AuthService from '../services/AuthService'

interface SignInAttempt {
  email: string;
  password: string;
}

const logIn = async (credentials: SignInAttempt) => {
  console.log(credentials)

  const response = await AuthService.signIn(
    credentials.email,
    credentials.password
  )

  console.log(response)
}

export const LogInScreen = () => {
  const formControls = useForm<SignInAttempt>()
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = formControls

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack>
            <SignIn />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
