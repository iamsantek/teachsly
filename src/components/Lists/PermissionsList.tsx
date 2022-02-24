import { List, ListItem, ListIcon, Stack, Text } from '@chakra-ui/react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MultiSelectOption } from '../../interfaces/MultiSelectOption'

interface Props {
  permissionsGroups: MultiSelectOption[];
  title: string;
}

interface ListItemProps {
  group: string;
}

const AllowAccessItem = ({ group }: ListItemProps) => (
  <ListItem>
    <ListIcon as={AiFillCheckCircle} color="green.500" />
    {`${group} tendran acceso al contenido`}
  </ListItem>
)

export const PermissionsList = ({ permissionsGroups, title }: Props) => {
  const permissionsGroupsLabels = permissionsGroups.map((value) => value.label)

  if (permissionsGroupsLabels.length === 0) {
    return null
  }

  return (
    <Stack spacing={1}>
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {title}
      </Text>
      <List spacing={3}>
        {permissionsGroupsLabels.map((group) => (
          <AllowAccessItem group={group} key={group} />
        ))}
      </List>
    </Stack>
  )
}
