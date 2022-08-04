import { Container, Box, Image, Heading } from '@chakra-ui/react'

export const SpinnerScreen = () => {
  return (
    <Container centerContent alignContent={'center'} h='100vh' w='100vw' >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height="inherit" flexDirection={'column'} gap={4}>
        <Image src='/spinner.gif' />
        <Heading fontSize={'2xl'} fontWeight='bold' color='brand.primary'>Cargando...</Heading>
      </Box>
    </Container>
  )
}
