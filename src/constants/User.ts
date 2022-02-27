import { UserTypes } from '../enums/UserTypes'
import { User, UserWithMultiSelect } from '../platform-models/User'

export const defaultUser: User | UserWithMultiSelect = {
  id: '',
  name: '',
  groups: [],
  email: '',
  phone: '',
  type: UserTypes.STUDENT,
  isDisabledUser: null
}
