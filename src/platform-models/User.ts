import { User } from '../API'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'

export interface UserWithMultiSelect extends Omit<User, 'groups' | 'englishLevel'> {
  groups: MultiSelectOption[];
  englishLevel: MultiSelectOption;
}
