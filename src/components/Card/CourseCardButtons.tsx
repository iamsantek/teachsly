import { Box, IconButton, useColorModeValue } from '@chakra-ui/react'
import { AiFillFolder } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Course } from '../../API'
import { TooltipHelper } from '../Tooltips/Tooltip'

interface Props {
  course: Course;
}

export const CourseCardButtons = ({ course }: Props) => {
  const color = useColorModeValue('gray.300', 'gray.700')

  return (
    <TooltipHelper label='Ver contenido'>
      <Box
        as={NavLink}
        to={`/courses/${course.name.replace(/\s/g, '')}`}
      >
        <IconButton
          icon={<AiFillFolder />}
          isRound
          size='md'
          aria-label='Call Sage'
          bg={color}
        />
      </Box>
    </TooltipHelper>
  )
}
