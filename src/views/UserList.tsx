import { Avatar, Box, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ContentLine } from '../components/ContentLine/ContentLine'
import { SectionHeader } from '../components/Headers/SectionHeader'
import { ContentLinePlaceholder } from '../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../components/Placeholders/Placeholder'
// core components
import { UserTypes } from '../enums/UserTypes'
import { DynamoDBUser } from '../models/index.js'
import UserService from '../services/UserService'
import { CommonContentLineTitle } from './media/CommonContentLineTitle'

interface Props {
  listType: UserTypes | 'ALL';
}

const UserList = (props: Props) => {
  const [users, setUsers] = useState<DynamoDBUser[]>([])
  const [nextPageResultToken, setNextPageResultToken] = useState<string>()
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)

  const fetchUsers = async () => {
    const users = await UserService.fetchUsersByType(props.listType)

    setNextPageResultToken(users?.nextToken)
    setIsLoadingNewPage(false)

    setUsers((previousUsers) =>
      previousUsers.concat((users?.items as DynamoDBUser[]) || [])
    )

    console.log(nextPageResultToken, isLoadingNewPage)
  }

  useEffect(() => {
    fetchUsers()
  }, [props.listType])

  return (
    <Stack spacing={4}>
      <SectionHeader />
      <Box>
        {users.map((user) => {
          return (
            <ContentLine
              key={user.id}
              leftIcon={<Avatar name={user.name} />}

            >
              <CommonContentLineTitle title={user.name} />
            </ContentLine>
          )
        })}
        <Placeholder
          show={isLoadingNewPage}
          number={2}
          placeholderElement={<ContentLinePlaceholder />}
        />
      </Box>

    </Stack>
  )
}

export default UserList
