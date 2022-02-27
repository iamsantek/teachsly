import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'

export interface User {
  id: string;
  email: string;
  name: string;
  groups: string[];
  type?: UserTypes;
  phone: string;
  isDisabledUser: boolean | null;
}

export interface UserWithMultiSelect extends Omit<User, 'groups'> {
  groups: MultiSelectOption[];
}
