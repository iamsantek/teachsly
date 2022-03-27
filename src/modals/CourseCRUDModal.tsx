import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Stack
} from '@chakra-ui/react'
import { translate } from '../utils/LanguageUtils'
import { Input as CustomInput } from '../components/Inputs/Input'
import { defaultCourse } from '../constants/Courses'
import CourseService from '../services/CourseService'
import { FormProvider, useForm } from 'react-hook-form'
import DateTimeUtils from '../utils/DateTimeUtils'
import { ModalFooter } from '../components/Modals/ModalFooter'
import { Select } from '../components/Inputs/Select'
import { CourseWithMultiSelect } from '../interfaces/Course'
import { ToastNotification } from '../observables/ToastNotification'
import { mapSingleValueToMultiSelectOption, renderMultiSelectOptions } from '../utils/SelectUtils'
import { Course as CourseAPI, CreateCourseInput } from '../API'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (course: CourseAPI) => void;
  onUpdate: (course: CourseAPI) => void;
  courseToUpdate?: CourseAPI;
}

const daysOfTheWeek = DateTimeUtils.daysOfTheWeek()

const CourseCRUDModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  courseToUpdate
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formControls = useForm({
    defaultValues: defaultCourse as CourseWithMultiSelect
  })

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = formControls

  const courseId = watch('id')

  useEffect(() => {
    if (courseToUpdate) {
      const course: CourseWithMultiSelect = {
        ...courseToUpdate,
        scheduleDates: DateTimeUtils.dayIndexesToMultiSelectOption(courseToUpdate.scheduleDates as number[]),
        scheduleYear: mapSingleValueToMultiSelectOption(String(courseToUpdate.scheduleYear))
      }

      reset(course)
    }
  }, [courseToUpdate])

  useEffect(() => {
    if (!isOpen) {
      reset(defaultCourse as CourseWithMultiSelect)
    }
  }, [isOpen])

  const createCourse = async (course: CourseWithMultiSelect) => {
    setIsLoading(true)

    const updatedCourse: CreateCourseInput = {
      ...course,
      scheduleDates: course.scheduleDates.map((date) => Number(date.value)) as number[],
      scheduleYear: Number(course.scheduleYear.value)
    }

    const createdCourse = await CourseService.createCourse(updatedCourse)

    if (createdCourse?.createCourse) {
      onCreate(createdCourse?.createCourse)
      onClose()
      setIsLoading(false)

      ToastNotification({
        status: 'SUCCESS',
        description: 'COURSE_CREATED_MESSAGE'
      })
    }
  }

  const formatCourse = (course: CourseWithMultiSelect): CourseAPI | CreateCourseInput => ({
    ...course,
    scheduleDates: course.scheduleDates.map((day) => Number(day.value)) as number[],
    scheduleYear: Number(course.scheduleYear.value)
  })

  const updateCourse = async (course: CourseWithMultiSelect) => {
    const updatedCourse = formatCourse(course)
    const courseSuccessfullyEdited = await CourseService.updateCourse(
      updatedCourse as CourseAPI
    )

    if (courseSuccessfullyEdited) {
      onUpdate(courseSuccessfullyEdited)
      onClose()

      ToastNotification({
        status: 'SUCCESS',
        description: 'COURSE_UPDATED_SUCCESS'
      })
    }
  }

  const onSubmit = (course: CourseWithMultiSelect) => {
    const hasErrors = Object.keys(errors).length !== 0

    if (hasErrors) {
      // TODO: Implement form errors
      console.log(errors)
      return
    }

    courseId ? updateCourse(course) : createCourse(course)
  }

  const date = new Date()
  const years = [date.getFullYear(), date.getFullYear() + 1, date.getFullYear() + 2]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...formControls}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader textStyle={'paragraph'}>
              {courseId
                ? `${translate('EDITING')} '${courseToUpdate?.name}'`
                : translate('CREATE_COURSE_MODAL_TITLE')}
            </ModalHeader>
            <ModalBody marginBottom={3}>
              <Stack spacing={4}>
                <CustomInput
                  name="name"
                  label="NAME"
                  isRequired={true}
                  placeholder={translate('NAME')}
                />

                <CustomInput
                  name="scheduleStartTime"
                  label="COURSE_SCHEDULE"
                  isRequired={true}
                  type="time"
                />

                <CustomInput
                  name="scheduleEndTime"
                  label='COURSE_END_SCHEDULE'
                  isRequired={true}
                  type="time"
                />

                <Select
                  name="scheduleDates"
                  label="COURSE_DATES"
                  isRequired={true}
                  placeholder={translate('COURSE_DATES')}
                  options={DateTimeUtils.daysToMultiSelectOption(daysOfTheWeek)}
                  isMultiSelect={true}
                  closeMenuOnSelect={true}
                  rules={{ required: true }}
                />

                <CustomInput
                  name="virtualClassLink"
                  label="COURSE_LINK"
                  isRequired={false}
                  bottomNote={translate('COURSE_LINK_HELPER')}
                />
                <Select
                  name="scheduleYear"
                  label="COURSE_YEAR"
                  isRequired={true}
                  options={renderMultiSelectOptions(years.map(year => year.toString()))}
                  isMultiSelect={false}
                  closeMenuOnSelect={true}
                />
              </Stack>
            </ModalBody>
            <ModalFooter
              isLoading={isLoading}
              sendButtonText={
                courseToUpdate ? 'UPDATE_COURSE_BUTTON' : 'CREATE_COURSE_BUTTON'
              }
              onClose={onClose}
            />
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default CourseCRUDModal
