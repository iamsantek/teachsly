import { Box, Text, Avatar, Badge } from '@chakra-ui/react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { Course } from '../../API'
import DateTimeUtils, { TimeFormats } from '../../utils/DateTimeUtils'
import { translate } from '../../utils/LanguageUtils'
import { CourseCardButtons } from './CourseCardButtons'

interface Props {
    course: Course;
}

export const CourseCardPreview = ({ course }: Props) => {
  const { name, scheduleStartTime, scheduleEndTime, scheduleDates, virtualClassLink } = course
  const startTime = DateTimeUtils.formateHour(scheduleStartTime, TimeFormats.TwentyFourHours)
  const endTime = DateTimeUtils.formateHour(scheduleEndTime, TimeFormats.TwentyFourHours)
  const dates = DateTimeUtils.shortDays(scheduleDates as number[])

  // WIP Next class time
  //   const nextDay = (scheduleDates as number[]).find((day: number) => day >= dayjs().day())
  //   const nextClassDate = dayjs().add(nextDay || 0, 'day')
  //   const nextClassDateAndTime = nextClassDate.add(Number(startTime.split(':')[0]), 'h')
  //   const nextClassTime = DateTimeUtils.timeTo(nextClassDateAndTime)

  return (
        <Box
            rounded="lg"
            flexBasis='100%'
            borderWidth="1px"
            boxShadow="lg"
            p={4}
            borderRadius='lg'
            overflow='hidden'
            display='flex'
            flexDirection='row'
            gap={4}
            alignContent='flex-start'
            justifyContent='space-between'
            height='100%'
            width='100%'
        >
            <Box display={'flex'} gap={3}>
                <Avatar name={name} />
                <Box
                    display='flex'
                    alignItems='baseline'
                    flexDirection='column'
                    gap={3}
                >
                    <Badge
                        rounded='md'
                        bg='brand.500'
                        color='white'
                    >
                        {translate(virtualClassLink ? 'VIRTUAL_COURSE' : 'ON_SITE_CLASS')}
                    </Badge>
                    <Box display='flex' flexDirection={'column'}>
                        <Text as='h1' textStyle={'title'} fontSize={'xl'}>{name}</Text>
                        <Box display={'flex'} gap={2} alignItems='center'>
                            <AiOutlineCalendar />
                            <Text textStyle={'paragraph'} color='gray.500'>{dates}</Text>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems='center'>
                            <BiTimeFive />
                            <Text textStyle={'paragraph'} color='gray.500'>{startTime} - {endTime}</Text>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Box ml={10}>
                <CourseCardButtons course={course} />
            </Box>
        </Box>
  )
}
