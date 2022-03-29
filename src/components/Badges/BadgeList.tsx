import * as React from 'react'
import { generateRandomId } from '../../utils/StringUtils'
import { HStack, Badge, Wrap, WrapItem } from '@chakra-ui/react'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { groupsToString } from '../../utils/CourseUtils'

interface Props {
  badges: string[];
}

export const BadgeList: React.FC<Props> = ({ badges }) => {
  const { context: { courses } } = React.useContext(UserDashboardContext)
  const groupNames = groupsToString(courses, badges)

  return (
    <HStack spacing={3}>
      <Wrap>
        {groupNames?.map((group) => {
          const id = generateRandomId()
          return (
            <WrapItem key={id}>
              <Badge
                rounded='md'
                bg='brand.500'
                color='white'
              >
                {group}
              </Badge>
            </WrapItem>
          )
        })}
      </Wrap>
    </HStack>
  )
}
