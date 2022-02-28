import { Avatar, Badge, Box, Button, Center, Stack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { LoadMoreButton } from '../components/Buttons/LoadMoreButton'
import { ContentLine } from '../components/ContentLine/ContentLine'
import { SectionHeader } from '../components/Headers/SectionHeader'
import { ContentLinePlaceholder } from '../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../components/Placeholders/Placeholder'
import { UserTypes } from '../enums/UserTypes'
import UserCRUDModal from '../modals/UserCRUDModal'
import { ViewUserModal } from '../modals/ViewUserModal'
import { User } from '../platform-models/User'
import UserService from '../services/UserService'
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

  const fetchUsers = useCallback(async () => {
    const usersResult = await UserService.fetchUsersByType(listType, nextPageResultToken)

    setNextPageResultToken(usersResult?.listUsers?.nextToken)
    setIsLoadingNewPage(false)

    setUsers((previousUsers) =>
      previousUsers.concat((usersResult?.listUsers?.items as User[]) || [])
    )
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [listType, fetchUsers])

  const newUserButtonName = translate(listType === UserTypes.STUDENT ? 'CREATE_STUDENT_MODAL_TITLE' : 'CREATE_TEACHER_MODAL_TITLE')

  const loadMore = () => {
    setIsLoadingNewPage(true)
    fetchUsers()
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

  return (
    <>
      <UserCRUDModal
        isOpen={crudModalVisibility}
        onClose={() => setCrudModalVisibility(false)}
        onCreate={(user) => setUsers([user, ...users])}
        onUpdate={onUpdate}
        userType={listType}
        userToUpdate={selectedUser}
      />
      <ViewUserModal
        isOpen={viewModalVisibility}
        onClose={() => setViewModalVisibility(false)}
        user={selectedUser}

      />
      <Stack spacing={4}>
        <SectionHeader>
          <Center>
            <Button
              leftIcon={<AiOutlinePlus />}
              onClick={() => setCrudModalVisibility(true)}
              colorScheme="brand"
            >
              {newUserButtonName}
            </Button>
          </Center>
        </SectionHeader>
        <Box>
          {users.map((user) => {
            return (
              <ContentLine
                key={user.id}
                leftIcon={<Avatar name={user.name} />}
                onView={() => onView(user)}
                onEdit={() => onEdit(user)}
              >
                <CommonContentLineTitle title={user.name}>
                  {user.isDisabledUser && <Badge colorScheme='red'>{translate('DEACTIVATED_USER')}</Badge>}

                </CommonContentLineTitle>
              </ContentLine>
            )
          })}
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
          <LoadMoreButton show={!!nextPageResultToken} isLoading={isLoadingNewPage} onClick={loadMore} />
        </Box>
      </Stack>
    </>
  )
}

export default UserList
