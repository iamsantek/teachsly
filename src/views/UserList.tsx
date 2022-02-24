import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// core components
import { UserTypes } from '../enums/UserTypes'
import { DynamoDBUser } from '../models/index.js'
import UserService from '../services/UserService'

interface Props {
  listType: UserTypes | 'ALL';
}

const UserList = (props: Props) => {
  const [users, setUsers] = useState<DynamoDBUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UserService.fetchUsersByType(props.listType)

      if (users) {
        setUsers(users)
      }
    }

    fetchUsers()
  }, [props.listType])

  return (
    <>

    </>
  )
}

export default UserList
