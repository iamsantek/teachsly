import { MediaType } from '../models/index'
import { Media, MediaWithMultiSelect } from '../interfaces/Media'
import { IconType } from 'react-icons'
import { AiFillFilePdf, AiOutlineLink } from 'react-icons/ai'
import { IoIosMusicalNotes, IoIosVideocam, IoMdImage } from 'react-icons/io'

export const defaultMedia: Media | MediaWithMultiSelect = {
  title: '',
  description: '',
  link: '',
  type: MediaType.LINK,
  groups: [],
  content: '',
  uploadedBy: ''
}

export const defaultMediaFolder = {
  title: '',
  groups: []
}

export const mediaContentLineIcons: { [key in MediaType]: IconType } = {
  [MediaType.LINK]: AiOutlineLink,
  [MediaType.FILE]: AiFillFilePdf
}

export const mediaTypeIcons = {
  image: IoMdImage,
  video: IoIosVideocam,
  audio: IoIosMusicalNotes,
  pdf: AiFillFilePdf
}
