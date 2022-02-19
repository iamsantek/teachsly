import { MultiSelectOption } from "../interfaces/MultiSelectOption";
import { MediaType } from "../models";

export const renderMediaTypeList = (): MultiSelectOption[] => {
  return Object.values(MediaType).map((mediaType) => {
    return {
      label: mediaType,
      value: mediaType,
    };
  });
};

export const mapMediaTypeToMultiSelectOption = (mediaType: string) => ({
  label: mediaType,
  value: mediaType,
});
