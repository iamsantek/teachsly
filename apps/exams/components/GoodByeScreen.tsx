import { chakra, Text, Stack, Heading, Container, Divider } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const ChakraBox = chakra(motion.div, {
  /**
     * Allow motion props and the children prop to be forwarded.
     * All other chakra props not matching the motion props will still be forwarded.
     */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
})

export const GoodByeScreen = () => {
  return (
    <Container>
        <Stack alignContent='center' alignItems='center'>
            <ChakraBox
                animate={{
                  scale: [1, 2, 1],
                  rotate: [0, 360, 0],
                  borderRadius: ['20%', '50%']
                }}
                // @ts-ignore no problem in operation, although type error appears.
                transition={{
                  duration: 3
                }}
                margin={12}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="75px"
                height="75px"
            >
                <Text fontSize='3xl'>🎉</Text>
            </ChakraBox>
            <Stack marginTop={10} spacing={6} alignItems='center' justifyContent='center'>
            <Heading fontWeight='900'>Examen completo!</Heading>
            <Text textAlign='center'>
            Muchas gracias por completar el examen. Los resultados estarán disponibles luego de las vacaciones de invierno.
            </Text>
            <Text textAlign='center'>¡Felices vacaciones!</Text>
            <Divider />
            <Text textAlign='center' fontWeight='bold' color='brand.primary'>The Office English Learning</Text>
            </Stack>
        </Stack>
        </Container>
  )
}
