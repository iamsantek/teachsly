import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import ConfettiGenerator from 'confetti-js'
import { useContext, useEffect } from 'react'
import { PlacementContext } from '../context/PlacementContext'

export const Results = () => {
  const { context } = useContext(PlacementContext)

  useEffect(() => {
    const confettiSettings = { target: 'my-canvas' }
    const confetti = new ConfettiGenerator(confettiSettings)
    confetti.render()

    return () => confetti.clear()
  }, [])

  const { results } = context

  return (
    <>
      <canvas id="my-canvas" style={{ zIndex: 1, position: 'absolute', left: 0, height: 'full' }} />
      <Stack
        zIndex={999}
        display='flex'
        justifyContent='center'
        alignItems='center'
        spacing={10}
      >
        <Text fontWeight='500' fontSize="2xl">Tu nivel es</Text>
        <Box borderColor='red.700' border='1px' p={[5, 5]}>
          <Heading
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
          >
            {results?.level}
          </Heading>
        </Box>
        <Text color='gray.700' textAlign="center">Contestaste {results?.correctAnswers} preguntas correctamente.</Text>
        <Text textAlign='center' fontWeight='bold'>
          Por favor revisá tu correo, acabamos de enviarte toda la información de los cursos que tenemos para vos.
        </Text>
        <Text textAlign='center'>¡Gracias por tu interés en estudiar con nosotros!</Text>
        <Divider />
        <Text textAlign='center' fontWeight='bold' color='brand.primary'>The Office English Learning</Text>
      </Stack>
    </>
  )
}
