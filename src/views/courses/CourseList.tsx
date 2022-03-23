import { Wrap, WrapItem } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Course } from '../../API'
import { CourseCardPreview } from '../../components/Card/CourseCardPreview'
import { CoursePreviewPlaceholder } from '../../components/Placeholders/CoursePreviewPlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import CourseService from '../../services/CourseService'

export const CourseList = () => {
  const [currentCourses, setCurrentCourses] = useState<Course[]>([])
  const { context: { user, courses } } = useContext(UserDashboardContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.groups) {
        return
      }

      const enrolledCourses = CourseService.getEnrolledCourses(user?.groups as string[])
      const userCourses = courses.filter(course => enrolledCourses.includes(course.externalId) && course.isActive)

      setCurrentCourses(userCourses || [])
      setIsLoading(false)
    }

    fetchCourses()
  }, [user?.groups])

  return (
    <>
      <Wrap spacing={4} display='flex' mx={'auto'}>
        {currentCourses.map(course =>
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
