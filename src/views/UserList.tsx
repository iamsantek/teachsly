import { Avatar, Badge, Box, Button, Center, Stack } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { LoadMoreButton } from '../components/Buttons/LoadMoreButton'
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

interface Props {
  listType: UserTypes
}

const UserList = ({
  listType
}: Props) => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()
  const [nextPageResultToken, setNextPageResultToken] = useState<string | null>()
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)
  const [crudModalVisibility, setCrudModalVisibility] = useState<boolean>(false)
  const [viewModalVisibility, setViewModalVisibility] = useState<boolean>(false)

  const { context: { user: loggedUser } } = useContext(UserDashboardContext)

  const { id: courseId } = useParams()

  const fetchUsers = useCallback(async (nextPageResultToken: string | undefined | null = undefined) => {
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

    setNextPageResultToken(usersResult?.listUsers?.nextToken)

    setIsLoadingNewPage(false)

    setUsers((previousUsers) =>
      previousUsers.concat(filteredUsers || [])
    )
  }, [loggedUser, courseId, listType])

  useEffect(() => {
    console.log(listType)
    fetchUsers()
  }, [listType, fetchUsers])

  const newUserButtonName = translate(listType === UserTypes.STUDENT ? 'CREATE_STUDENT_MODAL_TITLE' : 'CREATE_TEACHER_MODAL_TITLE')

  const onLoadMore = () => {
    setIsLoadingNewPage(true)
    fetchUsers(nextPageResultToken)
  }

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
    setUsers(updatedUsers)
  }

  const onClose = (modal: 'UserCRUDModal' | 'ViewUserModal') => {
    setSelectedUser(undefined)

    modal === 'ViewUserModal' ? setViewModalVisibility(false) : setCrudModalVisibility(false)
  }

  const hasAdminRole = isAdmin(loggedUser)

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
        <Box>
          {users.map((user) => {
            return (
              <ContentLine
                key={user.id}
                leftIcon={<Avatar name={user.name} />}
                onView={() => onView(user)}
                onEdit={hasAdminRole ? () => onEdit(user) : undefined}
              >
                <CommonContentLineTitle title={user.name}>
                  {user.isDisabledUser && <Badge colorScheme='red'>{translate('DEACTIVATED_USER')}</Badge>}

                </CommonContentLineTitle>
              </ContentLine>
            )
          })}
          <NoContentPlaceholder show={users.length === 0 && !isLoadingNewPage} />
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
          <LoadMoreButton show={!!nextPageResultToken} isLoading={isLoadingNewPage} onClick={onLoadMore} />
        </Box>
      </Stack>
    </>
  )
}

export default UserList
