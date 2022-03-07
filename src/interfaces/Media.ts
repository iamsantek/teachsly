import { MediaType } from '../models'
import { MultiSelectOption } from './MultiSelectOption'

export interface Media {
  id?: string;
  title: string;
  description: string;
  link: string;
  type: MediaType;
  groups: string[];
  content?: string;
  uploadedBy: string;
}

export interface MediaWithMultiSelect extends Omit<Media, 'groups' | 'type'> {
  groups: MultiSelectOption[];
  type: MultiSelectOption;
}
