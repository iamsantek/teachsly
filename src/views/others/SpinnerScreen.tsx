import { Container, Box, Spinner } from '@chakra-ui/react'

export const SpinnerScreen = () => {
  return (
    <Container centerContent alignContent={'center'} h='100vh' w='100vw' >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height="inherit">
        <Spinner size={'lg'} thickness={'6rem'} speed="1s" />
      </Box>
    </Container>
  )
}
