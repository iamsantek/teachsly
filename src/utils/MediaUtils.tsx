import { BsFillFileTextFill } from 'react-icons/bs'
import { IoMdImage, IoIosVideocam, IoIosMusicalNotes } from 'react-icons/io'
import { MediaWithFile } from '../interfaces/Media'
import { removeExtension } from './StringUtils'
import { v4 as uuid } from 'uuid'

export const getFileTypeIcon = (fileType: string) => {
  if (fileType.includes('image')) {
    return <IoMdImage size={30} />
  } else if (fileType.includes('video')) {
    return <IoIosVideocam size={30} />
  } else if (fileType.includes('audio')) {
    return <IoIosMusicalNotes size={30} />
  } else {
    return <BsFillFileTextFill size={30} />
  }
}

export const countFilesByType = (files: MediaWithFile[]) => {
  const defaultObject = {
    image: 0,
    video: 0,
    audio: 0,
    pdf: 0
  }

  return files.reduce((acc: { [key: string]: number }, mediaWithFile: MediaWithFile) => {
    const { file: { type } } = mediaWithFile

    if (type.startsWith('image')) {
      acc.image += 1
    } else if (type.startsWith('video')) {
      acc.video += 1
    } else if (type.startsWith('audio')) {
      acc.audio += 1
    } else if (type.includes('pdf')) {
      acc.pdf += 1
    }

    return acc
  }, defaultObject)
}

export const mapFilesToMediaWithFile = (files: File[]) => {
  return files.map((file) => ({
    id: uuid(),
    file,
    displayName: removeExtension(file.name)
  }))
}
