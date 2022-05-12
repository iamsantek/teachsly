import { BsFillFileTextFill } from 'react-icons/bs'
import { IoMdImage, IoIosVideocam, IoIosMusicalNotes, IoIosLink } from 'react-icons/io'
import { MediaDrawer, MediaWithFile } from '../interfaces/Media'
import { removeExtension } from './StringUtils'
import { v4 as uuid } from 'uuid'
import { Media } from '../API'
import MediaService from '../services/MediaService'

export const getFileTypeIcon = (fileType: string, size: number = 30) => {
  if (fileType?.includes('image')) {
    return <IoMdImage size={size} />
  } else if (fileType?.includes('video')) {
    return <IoIosVideocam size={size} />
  } else if (fileType?.includes('audio')) {
    return <IoIosMusicalNotes size={size} />
  } else if (fileType?.includes('link')) {
    return <IoIosLink size={size} />
  } else {
    return <BsFillFileTextFill size={size} />
  }
}

export const countFilesByType = (fileTypes: string[]) => {
  const defaultObject = {
    image: 0,
    video: 0,
    audio: 0,
    pdf: 0,
    link: 0,
    others: 0
  }

  return fileTypes.reduce((acc: { [key: string]: number }, type: string) => {
    if (type?.startsWith('image')) {
      acc.image += 1
    } else if (type?.startsWith('video')) {
      acc.video += 1
    } else if (type?.startsWith('audio')) {
      acc.audio += 1
    } else if (type?.includes('pdf')) {
      acc.pdf += 1
    } else if (type?.includes('link')) {
      acc.link += 1
    } else {
      acc.others += 1
    }

    return acc
  }, defaultObject)
}

export const mapFilesToMediaWithFile = (files: File[]) => {
  return files.map((file) => ({
    id: uuid(),
    file,
    title: removeExtension(file.name)
  }))
}

export const mediaToMediaDrawer = (medias: Media[]): MediaDrawer[] => {
  return medias.map(media => ({
    id: media.id,
    title: media.title,
    type: media.mimeType ?? '',
    isUploaded: true,
    owner: media.owner
  }))
}

export const mediaWithFileToMediaDrawer = (medias: MediaWithFile[]): MediaDrawer[] => {
  return medias.map(media => ({
    id: media.id,
    title: removeExtension(media.file.name),
    type: media.file.type ?? '',
    isUploaded: false
  }))
}

export const mediaDrawerToUpdateMediaPromises = (mediaDrawers: MediaDrawer[]) => {
  return mediaDrawers.map(async media => (
    MediaService.updateMedia({
      id: media.id,
      title: media.title
    })
  ))
}

export const mediaToUpdateMediaPromises = (medias: Media[], groups: string[]) => {
  return medias.map(media => {
    return MediaService.updateMedia({
      ...media,
      groups
    })
  })
}

export const notRecommendedMediaTypes = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.presentation',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.graphics',
  'application/vnd.oasis.opendocument.chart',
  'application/vnd.oasis.opendocument.formula',
  'application/vnd.oasis.opendocument.image',
  'application/vnd.oasis.opendocument.text-master',
  'application/vnd.oasis.opendocument.graphics-template',
  'application/vnd.oasis.opendocument.presentation-template',
  'application/vnd.oasis.opendocument.spreadsheet-template',
  'application/vnd.oasis.opendocument.text-template'
]
