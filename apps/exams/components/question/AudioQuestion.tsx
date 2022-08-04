import { useEffect, useRef, useState } from 'react'
import PlacementService from '../../services/PlacementService'
import { AudioQuestion } from '../../types/types'
import { MediaControlButton } from './MediaControlButton'

interface Props {
    question: AudioQuestion
}

export const AudioQuestions = ({ question }: Props) => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>(undefined)
  const [audioProgress, setAudioProgress] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playedTimes, setPlayedTimes] = useState<number>(0)
  const [audioUrl, setAudioUrl] = useState<string>('')

  const { source } = question
  const maxPlays = 2

  const reportAudioProgress = () => {
    const audioPlayer = audioPlayerRef.current as HTMLAudioElement
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100

    setAudioProgress(progress)
  }

  useEffect(() => {
    const fetchAudioUrl = async () => {
      const url = await PlacementService.getCDNUrl(source)
      setAudioUrl(url.url)
      setIsLoading(false)
    }

    fetchAudioUrl()
  }, [source])

  const checkProgress = () => {
    const timer = setInterval(() => {
      if (audioPlayerRef.current) {
        reportAudioProgress()
      }
    }, 100)
    setTimerId(timer)
  }

  const onPlay = () => {
    const audioPlayer = audioPlayerRef.current as HTMLAudioElement
    audioPlayer.play()
    setIsPlaying(true)
    checkProgress()
  }

  const onPause = () => {
    audioPlayerRef.current?.pause()
    setIsPlaying(false)
    clearInterval(timerId as NodeJS.Timer)
  }

  const onClick = () => {
    if (maxPlays <= playedTimes) {
      return
    }

    isPlaying ? onPause() : onPlay()
  }

  if (isLoading) {
    return null
  }

  return (
        <>
            <MediaControlButton
                onClick={onClick}
                progress={audioProgress}
                currentPlays={playedTimes}
                maxPlays={maxPlays}
                isPlaying={isPlaying}
            />
            <audio
                ref={audioPlayerRef}
                style={{ display: 'none' }}
                src={audioUrl}
                onEnded={() => {
                  clearInterval(timerId as NodeJS.Timer)
                  setIsPlaying(false)
                  setAudioProgress(0)
                  setPlayedTimes(playedTimes + 1)
                }}
            />
        </>
  )
}
