import { VideoQuestion as IVideoQuestion } from '../../types/types'
import { Container } from '@chakra-ui/react'
import { useRef } from 'react'

interface Props {
    question: IVideoQuestion
}

export const VideoQuestion = ({ question: { source } }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
        <Container>
            <video
                ref={videoRef}
                src={source}
            />
        </Container >
  )
}
