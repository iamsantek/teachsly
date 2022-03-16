import { Box, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useContext } from 'react'
import { AiFillFolder, AiOutlineLink } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { Course } from '../../API'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { isTeacher } from '../../utils/CognitoGroupsUtils'
import { translate } from '../../utils/LanguageUtils'
import { TooltipHelper } from '../Tooltips/Tooltip'

interface Props {
  course: Course;
}

export const CourseCardButtons = ({ course: { externalId, virtualClassLink } }: Props) => {
  const color = useColorModeValue('gray.300', 'gray.700')
  const { user } = useContext(UserDashboardContext)
  const hasTeacherRole = isTeacher(user)

  return (
    <Box display='flex' flexDirection={'column'} gap={2}>
      <TooltipHelper label={translate('SEE_CONTENT')}>
        <Box
          as={NavLink}
          to={`/courses/${externalId.replace(/\s/g, '')}`}
        >
          <IconButton
            icon={<AiFillFolder />}
            isRound
            size='md'
            aria-label={translate('GO_TO_VIRTUAL_CLASS')}
            bg={color}
          />
        </Box>
      </TooltipHelper>
      {virtualClassLink && (
        <TooltipHelper label={translate('GO_TO_VIRTUAL_CLASS')}>
          <Box
            as={'a'}
            href={virtualClassLink}
            target='_blank'
          >
            <IconButton
              icon={<AiOutlineLink />}
              isRound
              size='md'
              aria-label={translate('GO_TO_VIRTUAL_CLASS')}
              bg={color}
            />
          </Box>
        </TooltipHelper>
      )}
      {hasTeacherRole && (
        <TooltipHelper label={translate('GO_TO_STUDENTS_LIST')}>
          <Box
          as={NavLink}
          to={`/courses/${externalId}/students`}
          >
            <IconButton
              icon={<BsFillPeopleFill />}
              isRound
              size='md'
              aria-label={translate('GO_TO_STUDENTS_LIST')}
              bg={color}
            />
          </Box>
        </TooltipHelper>
      )}
    </Box>

  )
}
