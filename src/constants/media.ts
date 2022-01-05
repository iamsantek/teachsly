import { MediaType } from "../API";
import { Media } from "../interfaces/Media";

export const defaultMedia: Media = {
  title: "",
  description: "",
  link: "",
  type: MediaType.LINK,
  groups: [],
};

export const mediaIcons = {
  [MediaType.LINK]: "fa fa-link",
  [MediaType.PDF]: "fa fa-file",
  [MediaType.VIDEO]: "fa fa-play",
};
