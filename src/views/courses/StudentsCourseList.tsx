import { useContext, useEffect, useState } from 'react'
import { Course } from '../../API'
import { CourseCardPreview } from '../../components/Card/CourseCardPreview'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
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
      const activeCourses = courses?.searchCourses?.items.filter(course => course?.isActive)

      setCourses(activeCourses as Course[] || [])
      setIsLoading(false)
    }

    fetchCourses()
  }, [user?.groups])

  return (
    <>
      {courses.map(course => <CourseCardPreview course={course} key={course.id} />)}

      <Placeholder
        show={isLoading}
        number={2}
        placeholderElement={<ContentLinePlaceholder />}
      />
    </>
  )
}
