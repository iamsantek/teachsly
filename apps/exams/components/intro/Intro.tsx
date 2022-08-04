import { Button, Container, Box, Image } from '@chakra-ui/react'
import { useContext } from 'react'
import { PlacementContext } from '../../context/PlacementContext'
import { CurrentScreen } from '../../types/types'
import { IntroInstruction } from './IntroInstructions'

export const Intro = () => {
  const { context, setContext } = useContext(PlacementContext)

  const onStart = () => {
    setContext({
      ...context,
      currentScreen: CurrentScreen.Questions
    })
    window.scrollTo(0, 0)
  }

  return (
    <Container>
        <Box boxSize={40} display='flex' mx='auto'>
            <Image src='/logo.jpg' alt='Placementek logo' />
        </Box>
        <IntroInstruction />
        <Box display='flex' alignContent='center' justifyContent='center' alignItems='center'>
            <Button color='whiteAlpha.800' size={'lg'} bg='brand.primary' _hover={{ bg: 'whiteAlpha.900', border: '1px solid', borderColor: 'brand.primary', color: 'brand.primary', transform: 'scale(1.05)' }} onClick={() => onStart()}>
                Comenzar
            </Button>

        </Box>
    </Container>
  )
}
