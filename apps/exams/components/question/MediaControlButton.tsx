import { Center, CircularProgress, CircularProgressLabel, Box, Text } from '@chakra-ui/react'
import { GrPlayFill } from 'react-icons/gr'
import { IoMdPause } from 'react-icons/io'

interface Props {
    maxPlays: number
    progress: number
    onClick: () => void
    currentPlays: number
    isPlaying: boolean
}

export const MediaControlButton = ({
  maxPlays = 1,
  progress,
  onClick,
  currentPlays = 0,
  isPlaying = false
}: Props) => {
  const buttonOpacity = maxPlays <= currentPlays ? 0.1 : 1

  return (
        <Center display='flex' flexDirection={'column'}>
        <CircularProgress
            value={progress}
            color='brand.primary'
            size='120px'
            justifyContent='center'
            cursor={maxPlays <= currentPlays ? 'no-drop' : 'pointer'}
            onClick={onClick}
        >
            <CircularProgressLabel>
                <Box display='flex' alignContent='center' justifyContent='center'>
                    {isPlaying ? <IoMdPause opacity={buttonOpacity} /> : <GrPlayFill opacity={buttonOpacity} />}
                </Box>
            </CircularProgressLabel>
        </CircularProgress>
         <Text fontWeight='thin' color='gray.400'>Plays left: {maxPlays - currentPlays}</Text>
    </Center>
  )
}
