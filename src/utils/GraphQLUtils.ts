interface NotAllowedProperties {
  createdAt: string;
  updatedAt: string;
  _deleted: string;
  _lastChangedAt: string;
  owner: string;
}

//TODO: Type this util
export const removeNotAllowedPropertiesFromModel = (model: any) => {
  const {
    createdAt,
    updatedAt,
    _deleted,
    _lastChangedAt,
    owner,
    ...updatedMedia
  } = model;

  return updatedMedia;
};
