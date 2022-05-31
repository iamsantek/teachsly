import { Container, Box, Image, Heading } from '@chakra-ui/react'
import { translate } from '../../utils/LanguageUtils'

export const SpinnerScreen = () => {
  return (
    <Container centerContent alignContent={'center'} h='100vh' w='100vw' >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height="inherit" flexDirection={'column'} gap={4}>
        <Image maxHeight='25%' src={'/logo.png'} />
        <Heading fontSize={'2xl'} fontWeight='bold' color='brand.500'>{translate('LOADING')}</Heading>
      </Box>
    </Container>
  )
}
