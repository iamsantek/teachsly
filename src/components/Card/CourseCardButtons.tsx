import { Box, IconButton, useColorModeValue } from '@chakra-ui/react'
import { AiFillFolder, AiOutlineLink } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Course } from '../../API'
import { translate } from '../../utils/LanguageUtils'
import { TooltipHelper } from '../Tooltips/Tooltip'

interface Props {
  course: Course;
}

export const CourseCardButtons = ({ course: { externalId, virtualClassLink } }: Props) => {
  const color = useColorModeValue('gray.300', 'gray.700')

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
    </Box>

  )
}
