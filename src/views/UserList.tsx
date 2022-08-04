import { Avatar, Badge, Button, Center, Flex, Select, Stack } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { ContentLine } from '../components/ContentLine/ContentLine'
import { SectionHeader } from '../components/Headers/SectionHeader'
import { ContentLinePlaceholder } from '../components/Placeholders/ContentLinePlaceholder'
import { NoContentPlaceholder } from '../components/Placeholders/NoContentPlaceholder'
import { Placeholder } from '../components/Placeholders/Placeholder'
import { UserDashboardContext } from '../contexts/UserDashboardContext'
import { UserTypes } from '../enums/UserTypes'
import UserCRUDModal from '../modals/UserCRUDModal'
import { ViewUserModal } from '../modals/ViewUserModal'
import { User } from '../API'
import UserService from '../services/UserService'
import { isAdmin, isTeacher } from '../utils/CognitoGroupsUtils'
import { findAndUpdateContent } from '../utils/GeneralUtils'
import { translate } from '../utils/LanguageUtils'
import { CommonContentLineTitle } from './media/CommonContentLineTitle'
import { MdLibraryBooks } from 'react-icons/md'
import { formatCourseName } from '../utils/CourseUtils'
import { ExamFilter } from '../interfaces/Exams'
import { sortUsersByLastName } from '../utils/UserUtils'

interface Props {
  listType: UserTypes
}

const UserList = ({
  listType
}: Props) => {
  const [users, setUsers] = useState<User[]>([])
  const [usersDisplayed, setUsersDisplayed] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()
  const [nextPageResultToken, setNextPageResultToken] = useState<string | null>()
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)
  const [crudModalVisibility, setCrudModalVisibility] = useState<boolean>(false)
  const [viewModalVisibility, setViewModalVisibility] = useState<boolean>(false)
  const [currentCourseFilter, setCurrentCourseFilter] = useState<string>('')

  const { context: { user: loggedUser, courses } } = useContext(UserDashboardContext)

  const { id: courseId } = useParams()

  const fetchUsers = useCallback(async () => {
    setIsLoadingNewPage(true)
    const filter = courseId || listType
    const usersResult = await UserService.fetchUsersByCourseOrType(filter, nextPageResultToken)
    const users = usersResult?.listUsers?.items as User[] || []
    let filteredUsers = [...users]

    const hasTeacherRole = isTeacher(loggedUser)

    if (hasTeacherRole) {
      // Teachers only can see their own students
      filteredUsers = users.filter(
        user => user.groups.filter(group => loggedUser?.groups.includes(group))
      )
    }

    if (usersResult?.listUsers?.nextToken) {
      setNextPageResultToken(usersResult?.listUsers?.nextToken)
    }

    setIsLoadingNewPage(false)

    setUsers((previousUsers) =>
      sortUsersByLastName(previousUsers.concat(filteredUsers || []))
    )
    setUsersDisplayed((previousUsers) =>
      sortUsersByLastName(previousUsers.concat(filteredUsers || []))
    )
  }, [loggedUser, courseId, listType, nextPageResultToken])

  useEffect(() => {
    fetchUsers()
  }, [listType, fetchUsers, nextPageResultToken])

  const newUserButtonName = translate(listType === UserTypes.STUDENT ? 'CREATE_STUDENT_MODAL_TITLE' : 'CREATE_TEACHER_MODAL_TITLE')

  const onView = (user: User) => {
    setSelectedUser(user)
    setViewModalVisibility(true)
  }

  const onEdit = (user: User) => {
    setSelectedUser(user)
    setCrudModalVisibility(true)
  }

  const onUpdate = (user: User) => {
    const updatedUsers = findAndUpdateContent(user, users)
    const updatedDisplayedUsers = findAndUpdateContent(user, usersDisplayed)
    setUsersDisplayed(updatedDisplayedUsers)
    setUsers(updatedUsers)
  }

  const onClose = (modal: 'UserCRUDModal' | 'ViewUserModal') => {
    setSelectedUser(undefined)

    modal === 'ViewUserModal' ? setViewModalVisibility(false) : setCrudModalVisibility(false)
  }

  const hasAdminRole = isAdmin(loggedUser)

  const onChangeCourseFilter = (courseFilter: string) => {
    setCurrentCourseFilter(courseFilter)
    if (courseFilter === ExamFilter.ALL) {
      setUsersDisplayed(users)
      return
    }

    const filterUsers = users.filter(user => user.groups.includes(courseFilter))
    setUsersDisplayed(sortUsersByLastName(filterUsers))
  }

  const onDeleteSuccess = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id))
    setUsersDisplayed(usersDisplayed.filter(u => u.id !== user.id))
  }

  return (
    <>
      {hasAdminRole && (
        <UserCRUDModal
          isOpen={crudModalVisibility}
          onClose={() => onClose('UserCRUDModal')}
          onCreate={(user) => setUsers([user, ...users])}
          onUpdate={onUpdate}
          userType={listType}
          userToUpdate={selectedUser}
          onDelete={onDeleteSuccess}
        />
      )}

      <ViewUserModal
        isOpen={viewModalVisibility}
        onClose={() => onClose('ViewUserModal')}
        user={selectedUser}

      />
      <Stack spacing={4}>
        <SectionHeader>
          {hasAdminRole && (
            <Center>
              <Button
                leftIcon={<AiOutlinePlus />}
                onClick={() => setCrudModalVisibility(true)}
                colorScheme="brand"
              >
                {newUserButtonName}
              </Button>
            </Center>
          )}
        </SectionHeader>
        <Flex alignItems='center' gap={5} maxWidth={['100%', '40%']}>
        <MdLibraryBooks size={40} />
            <Select value={currentCourseFilter} onChange={(e) => onChangeCourseFilter(e.target.value)}>
                <option value={ExamFilter.ALL}>{translate('ALL')}</option>
                {courses.map(course => (
                    <option key={course.externalId} value={course.externalId}>{formatCourseName(course)}</option>
                ))}
            </Select>
        </Flex>
        <Stack>
          {usersDisplayed.map((user) => {
            return (
              <ContentLine
                key={user.id}
                leftIcon={<Avatar name={user.name} />}
                onView={() => onView(user)}
                onEdit={hasAdminRole ? () => onEdit(user) : undefined}
              >
                <CommonContentLineTitle id={user.id} title={user.name}>
                  {user.isDisabledUser && <Badge colorScheme='red'>{translate('DEACTIVATED_USER')}</Badge>}

                </CommonContentLineTitle>
              </ContentLine>
            )
          })}
          <NoContentPlaceholder show={usersDisplayed.length === 0 && !isLoadingNewPage} />
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
        </Stack>
      </Stack>
    </>
  )
}

export default UserList
