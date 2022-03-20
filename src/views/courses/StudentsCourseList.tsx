import { Wrap, WrapItem } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Course } from '../../API'
import { CourseCardPreview } from '../../components/Card/CourseCardPreview'
import { CoursePreviewPlaceholder } from '../../components/Placeholders/CoursePreviewPlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import CourseService from '../../services/CourseService'

export const StudentsCourseList = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const { context: { user } } = useContext(UserDashboardContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.groups) {
        return
      }

      const enrolledCourses = CourseService.getEnrolledCourses(user?.groups as string[])
      const courses = await CourseService.searchCourses(enrolledCourses)
      const activeCourses = courses?.listCourses?.items.filter(course => course?.isActive)

      setCourses(activeCourses as Course[] || [])
      setIsLoading(false)
    }

    fetchCourses()
  }, [user?.groups])

  return (
    <>
      <Wrap spacing={4} display='flex' mx={'auto'}>
        {courses.map(course =>
          <WrapItem key={course.id} w={['100%', 'auto']}>
            <CourseCardPreview course={course} key={course.id} />
          </WrapItem>
        )}
      </Wrap>
      <Placeholder
        show={isLoading}
        number={2}
        placeholderElement={<CoursePreviewPlaceholder />}
        orientation='row'
      />
    </>
  )
}
