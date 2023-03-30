/* eslint-disable @typescript-eslint/no-unused-vars */
interface NotAllowedProperties {
  createdAt?: string;
  updatedAt?: string;
  _deleted?: string;
  _lastChangedAt?: string;
  owner?: string | null | undefined;
}

// TODO: Type this util
export const removeNotAllowedPropertiesFromModel = (model: any) => {
  if (!model) {
    return;
  }

  const {
    createdAt,
    updatedAt,
    _deleted,
    _lastChangedAt,
    owner,
    ...updatedModel
  } = model;

  return updatedModel;
};
