import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import CourseCRUDModal from '../../modals/CourseCRUDModal'
import { Course } from '../../platform-models/Course'
import CourseService from '../../services/CourseService'
import DateTimeUtils, { TimeFormats } from '../../utils/DateTimeUtils'
import { findAndUpdateContent } from '../../utils/GeneralUtils'
import { translate } from '../../utils/LanguageUtils'
import { CommonContentLineTitle } from '../media/CommonContentLineTitle'

export const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseModalVisibility, seCourseModalVisibility] =
    useState<boolean>(false)
  const [selectedCourse, setSelectedCourse] = useState<Course>()
  const [nextPageResultToken, setNextPageResultToken] = useState<string | null>()
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)

  const fetchCourses = async () => {
    const courses = await CourseService.fetchCourses(nextPageResultToken)

    setNextPageResultToken(courses?.listCourses?.nextToken)
    setIsLoadingNewPage(false)

    setCourses((previousCourses) =>
      previousCourses.concat((courses?.listCourses?.items as Course[]) || [])
    )
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const onEdit = (course: Course) => {
    setSelectedCourse(course)
    seCourseModalVisibility(true)
  }

  const onUpdate = (updatedCourse: Course) => {
    const updatedCourses = findAndUpdateContent(updatedCourse, courses)
    setCourses(updatedCourses)
  }

  const loadMore = () => {
    setIsLoadingNewPage(true)
    fetchCourses()
  }

  const color = useColorModeValue('gray.500', 'white')

  return (
    <>
      <CourseCRUDModal
        onCreate={(course) => setCourses([course, ...courses])}
        isOpen={courseModalVisibility}
        onClose={() => seCourseModalVisibility(false)}
        courseToUpdate={selectedCourse}
        onUpdate={onUpdate}
      />
      <Stack spacing={4} flexDirection={'column'}>
        <SectionHeader>
          <Center>
            <Button
              leftIcon={<AiOutlinePlus />}
              onClick={() => seCourseModalVisibility(true)}
              colorScheme="brand"
            >
              {translate('ADD_COURSE_BUTTON')}
            </Button>
          </Center>
        </SectionHeader>
        <Box>
          {courses.map((course) => {
            const days = DateTimeUtils.shortDays(
              course.scheduleDates as string[]
            )
            const startTime = DateTimeUtils.formateHour(
              course.scheduleStartTime,
              TimeFormats.TwentyFourHours
            )
            const endTime = DateTimeUtils.formateHour(
              course.scheduleEndTime,
              TimeFormats.TwentyFourHours
            )

            return (
              <ContentLine
                key={course.id}
                leftIcon={<Avatar name={course.name} />}
                onView={() => console.log()}
                onEdit={() => onEdit(course)}
              >
                <CommonContentLineTitle title={course.name}>
                  <Text
                    textStyle={'title'}
                    color={color}
                  >
                    {days} ({startTime} - {endTime})
                  </Text>
                  {course.virtualClassLink && (
                    <Badge marginLeft={3} colorScheme={'brand'}>
                      {translate('VIRTUAL_COURSE')}
                    </Badge>
                  )}
                </CommonContentLineTitle>
              </ContentLine>
            )
          })}
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
        </Box>
      </Stack>
      <LoadMoreButton show={!!nextPageResultToken} isLoading={isLoadingNewPage} onClick={loadMore} />
    </>
  )
}
