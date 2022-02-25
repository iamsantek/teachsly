import { UserTypes } from '../../enums/UserTypes'
import UserList from '../UserList'

export const StudentsList = () => {
  return (
        <>
            <UserList listType={UserTypes.STUDENT} />
        </>
  )
}
