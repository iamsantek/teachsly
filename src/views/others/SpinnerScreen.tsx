import { Container, Box, Image } from '@chakra-ui/react'

export const SpinnerScreen = () => {
  return (
    <Container centerContent alignContent={'center'} h='100vh' w='100vw' >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height="inherit">
        <Image src={require('../../assets/img/brand/spinner.gif')} />
      </Box>
    </Container>
  )
}
