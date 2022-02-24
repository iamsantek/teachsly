import { useEffect, useState } from 'react'
// core components
import { UserTypes } from '../enums/UserTypes'
import { DynamoDBUser } from '../models/index.js'
import UserService from '../services/UserService'

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
  }

  useEffect(() => {
    fetchUsers()
  }, [props.listType])

  return (
    <>

    </>
  )
}

export default UserList
