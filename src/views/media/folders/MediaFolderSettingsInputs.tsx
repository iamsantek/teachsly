import { Select } from '../../../components/Inputs/Select'
import { Input } from '../../../components/Inputs/Input'
import { generalGroups } from '../../../utils/CognitoGroupsUtils'
import { renderCourseList } from '../../../utils/CourseUtils'
import { translate } from '../../../utils/LanguageUtils'
import { Stack } from '@chakra-ui/react'
import { useUserGroups } from '../../../hooks/useUserGroups'

export const MediaFolderSettingsInputs = () => {
  const { groups } = useUserGroups()

  return (
        <Stack spacing={4}>
            <Input
                name="title"
                label="TITLE"
                isRequired={true}
                placeholder={translate('TITLE')}
            />

            <Select
                name="groups"
                label="GROUP_MULTI_SELECT_TITLE"
                isRequired={true}
                placeholder={translate('DESCRIPTION')}
                options={renderCourseList(groups, generalGroups)}
                isMultiSelect
                closeMenuOnSelect={true}
            />
        </Stack >
  )
}
