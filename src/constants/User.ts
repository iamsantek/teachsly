import { CreateUserInput } from '../API'
import { UserTypes } from '../enums/UserTypes'
import { UserWithMultiSelect } from '../platform-models/User'

export const nonStudentGroups = [UserTypes.ADMIN, UserTypes.TEACHER]

export const defaultUser: CreateUserInput | UserWithMultiSelect = {
  id: null,
  name: '',
  groups: [],
  email: '',
  phone: '',
  isDisabledUser: null,
  cognitoId: ''
}
