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
