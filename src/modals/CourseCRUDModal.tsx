import React, { useEffect, useState } from 'react'
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
import { Course, Course as PlatformCourse } from '../platform-models/Course'
import { FormProvider, useForm } from 'react-hook-form'
import DateTimeUtils from '../utils/DateTimeUtils'
import { ModalFooter } from '../components/Modals/ModalFooter'
import { Select } from '../components/Inputs/Select'
import { renderMultiSelectOptions } from '../utils/SelectUtils'
import { CourseWithMultiSelect } from '../interfaces/Course'
import { Toast } from '../components/Toast/Toast'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (course: PlatformCourse) => void;
  onUpdate: (course: PlatformCourse) => void;
  courseToUpdate?: PlatformCourse;
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
        scheduleDates: renderMultiSelectOptions(courseToUpdate.scheduleDates)
      }

      // setCourse(course);
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

    const updatedCourse: Course = {
      ...course,
      scheduleDates: course.scheduleDates.map((date) => date.value) as string[]
    }

    const createdCourse = await CourseService.createCourse(updatedCourse)

    if (createdCourse) {
      onCreate(updatedCourse)
      onClose()
      setIsLoading(false)

      Toast({
        status: 'SUCCESS',
        description: 'COURSE_CREATED_MESSAGE'
      })
    }
  }

  const formatCourse = (course: CourseWithMultiSelect): Course => ({
    ...course,
    scheduleDates: course.scheduleDates.map((day) => day.value) as string[]
  })

  const updateCourse = async (course: CourseWithMultiSelect) => {
    const updatedCourse = formatCourse(course)
    const courseSuccessfullyEdited = await CourseService.updateCourse(
      updatedCourse as Course
    )

    if (courseSuccessfullyEdited) {
      onUpdate(updatedCourse)
      onClose()

      Toast({
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
                  label="COURSE_SCHEDULE"
                  isRequired={true}
                  type="time"
                />

                <Select
                  name="scheduleDates"
                  label="COURSE_DATES"
                  isRequired={true}
                  placeholder={translate('COURSE_DATES')}
                  options={renderMultiSelectOptions(daysOfTheWeek)}
                  isMultiSelect={true}
                  closeMenuOnSelect={true}
                />

                <CustomInput
                  name="virtualClassLink"
                  label="COURSE_LINK"
                  isRequired={false}
                  bottomNote={translate('COURSE_LINK_HELPER')}
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
