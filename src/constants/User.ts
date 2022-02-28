import { UserTypes } from '../enums/UserTypes'
import { User, UserWithMultiSelect } from '../platform-models/User'

export const nonStudentGroups = [UserTypes.ADMIN, UserTypes.TEACHER]

export const defaultUser: User | UserWithMultiSelect = {
  id: '',
  name: '',
  groups: [],
  email: '',
  phone: '',
  type: UserTypes.STUDENT,
  isDisabledUser: null
}
