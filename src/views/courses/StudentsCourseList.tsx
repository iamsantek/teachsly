import { Wrap, WrapItem } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Course } from '../../API'
import { CourseCardPreview } from '../../components/Card/CourseCardPreview'
import { CoursePreviewPlaceholder } from '../../components/Placeholders/CoursePreviewPlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import CourseService from '../../services/CourseService'
import { splitCamelCase } from '../../utils/StringUtils'

export const StudentsCourseList = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const { user } = useContext(UserDashboardContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const enrolledCourses = CourseService.getEnrolledCourses(user?.groups as string[]).map(course => splitCamelCase(course))
      const courses = await CourseService.searchCoursesByName(enrolledCourses)
      const activeCourses = courses?.listCourses?.items.filter(course => course?.isActive)

      setCourses(activeCourses as Course[] || [])
      setIsLoading(false)
    }

    fetchCourses()
  }, [user?.groups])

  return (
    <>
      <Wrap spacing={4}>
        {courses.map(course =>
          <WrapItem key={course.id}>
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
