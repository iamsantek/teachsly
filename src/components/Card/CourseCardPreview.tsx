import { Box, Text, Avatar, Badge } from '@chakra-ui/react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { Course } from '../../API'
import DateTimeUtils, { TimeFormats } from '../../utils/DateTimeUtils'

interface Props {
    course: Course;
}

export const CourseCardPreview = ({ course: { name, scheduleStartTime, scheduleEndTime, scheduleDates, virtualClassLink } }: Props) => {
  const startTime = DateTimeUtils.formateHour(scheduleStartTime, TimeFormats.TwentyFourHours)
  const endTime = DateTimeUtils.formateHour(scheduleEndTime, TimeFormats.TwentyFourHours)

  console.log(scheduleDates)

  return (
        <Box
        rounded="lg"
        borderWidth="1px"
        boxShadow="lg"
        p={4}
        maxW='sm'
        borderRadius='lg'
        overflow='hidden'
        display={'flex'}
        gap={4}
        alignContent='flex-start'
        >
            <Avatar name={name} />
            <Box
                display='flex'
                alignItems='baseline'
                justifyContent={'space-between'}
                flexDirection={'column'}
                gap={3}>
                <Badge
                    rounded='md'
                    bg='brand.500'
                    color='white'
                >
                    {virtualClassLink ? 'Virtual' : 'Presencial'}
                </Badge>
                <Box display='flex' flexDirection={'column'}>
                    <Text as='h1' textStyle={'title'} fontSize={'xl'}>{name}</Text>
                    <Box display={'flex'} gap={2} alignItems='center'>
                        <AiOutlineCalendar />
                        <Text textStyle={'paragraph'} color='gray.500'>{'Test'}</Text>
                    </Box>
                    <Box display={'flex'} gap={2} alignItems='center'>
                        <BiTimeFive />
                        <Text textStyle={'paragraph'} color='gray.500'>{startTime} - {endTime}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
  )
}
