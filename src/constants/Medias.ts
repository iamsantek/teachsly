import { MediaType } from '../models/index'
import { Media, MediaWithMultiSelect } from '../interfaces/Media'
import { IconType } from 'react-icons'
import { AiFillFilePdf, AiOutlineLink } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'

export const defaultMedia: Media | MediaWithMultiSelect = {
  title: '',
  description: '',
  link: '',
  type: MediaType.LINK,
  groups: [],
  content: '',
  uploadedBy: ''
}

export const mediaIcons = {
  [MediaType.LINK]: 'fa fa-link',
  [MediaType.FILE]: 'fa fa-file',
  [MediaType.VIDEO]: 'fa fa-play'
}

export const mediaContentLineIcons: { [key in MediaType]: IconType } = {
  [MediaType.LINK]: AiOutlineLink,
  [MediaType.FILE]: AiFillFilePdf,
  [MediaType.VIDEO]: BsFillPlayFill
}
