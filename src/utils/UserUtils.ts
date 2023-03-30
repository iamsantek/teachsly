import { User } from "../API";
import { removeDiacritics } from "./StringUtils";

export const sortUsersByLastName = (users: User[]) => {
  return users.sort((a, b) => {
    const nameA = removeDiacritics(a.name.toUpperCase());
    const nameB = removeDiacritics(b.name.toUpperCase());

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};
