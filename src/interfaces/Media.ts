import { CreateMediaInput, Media as MediaAPI } from '../API'
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
  mimeType?: string;
}

export interface MediaWithMultiSelect extends Omit<MediaAPI | CreateMediaInput, 'groups' | 'type'> {
  groups: MultiSelectOption[];
  type: MultiSelectOption;
}

export interface MediaWithFile {
  id: string;
  file: File;
  title: string;
}

export interface MediaDrawer {
  id: string;
  title: string;
  type: string;
  isUploaded: boolean;
  owner?: string | null | undefined;
}
