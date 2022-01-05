import { MediaType } from "../models";

export interface Media {
  title: string;
  description: string;
  link: string;
  type: MediaType;
  groups: string[];
}
