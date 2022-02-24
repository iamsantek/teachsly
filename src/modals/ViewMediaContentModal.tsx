import React from 'react'
import {
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Stack
} from '@chakra-ui/react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { Media } from '../interfaces/Media'
import { MediaType } from '../models'
import MediaService from '../services/MediaService'
import { translate } from '../utils/LanguageUtils'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  media: Media;
}

export const ViewMediaContentModal = ({ isOpen, onClose, media }: Props) => {
  const isPlayableContent = [MediaType.VIDEO, MediaType.LINK].includes(
    media?.type
  )
  const isDownloadable = [MediaType.PDF].includes(media?.type)

  return (
    <>
      <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textStyle={'paragraph'}>{media?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={3}>
            <Stack spacing={4}>
              <Text textStyle={'title'}>{translate('DESCRIPTION')}</Text>
              <Text textStyle={'paragraph'}>{media?.description}</Text>
              {media?.content && (
                <>
                  <Text textStyle={'title'}>{translate('CONTENT')}</Text>
                  <Text textStyle={'paragraph'}>{media?.content}</Text>
                </>
              )}
              {isPlayableContent && (
                <Button
                  leftIcon={<BsFillPlayFill />}
                  layerStyle={'base'}
                  onClick={() => window.open(media.link, '_blank')}
                >
                  {translate('SEE_CONTENT')}
                </Button>
              )}
              {isDownloadable && (
                <Button
                  leftIcon={<AiOutlineCloudDownload />}
                  layerStyle={'base'}
                  onClick={() => MediaService.generateSignedUrl(media.link)}
                >
                  {translate('DOWNLOAD')}
                </Button>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
