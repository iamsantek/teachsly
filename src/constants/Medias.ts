import { MediaType } from "../models/index";
import { Media, MediaWithMultiSelect } from "../interfaces/Media";
import { IconType } from "react-icons";
import { AiFillFilePdf, AiOutlineLink } from "react-icons/ai";
import {
  IoIosLink,
  IoIosMusicalNotes,
  IoIosVideocam,
  IoMdImage,
} from "react-icons/io";
import { MultiSelectOption } from "../interfaces/MultiSelectOption";
import { BsBox } from "react-icons/bs";

export const defaultMedia: Media | MediaWithMultiSelect = {
  title: "",
  description: "",
  link: "",
  type: MediaType.LINK,
  groups: [],
  content: "",
  uploadedBy: "",
};

export const defaultMediaFolder = {
  title: "",
  groups: [] as MultiSelectOption[],
};

export const mediaContentLineIcons: { [key in MediaType]: IconType } = {
  [MediaType.LINK]: AiOutlineLink,
  [MediaType.FILE]: AiFillFilePdf,
};

export const mediaTypeIcons = {
  image: IoMdImage,
  video: IoIosVideocam,
  audio: IoIosMusicalNotes,
  pdf: AiFillFilePdf,
  link: IoIosLink,
  others: BsBox,
};
