import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack } from '@chakra-ui/react'
import { Course } from '../API'
import { TimeFormats } from '../enums/DateTime'
import DateTimeUtils from '../utils/DateTimeUtils'
import { translate } from '../utils/LanguageUtils'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

export const ViewCourseModal = ({
  isOpen,
  onClose,
  course
}: Props) => {
  const days = DateTimeUtils.transformDayIndexesToStringDays(
    course?.scheduleDates as number[]
  )
  const startTime = DateTimeUtils.formateHour(
    course?.scheduleStartTime,
    TimeFormats.TwentyFourHours
  )
  const endTime = DateTimeUtils.formateHour(
    course?.scheduleEndTime,
    TimeFormats.TwentyFourHours
  )

  // WIP
  return (
    <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle={'paragraph'} flex="1" flexDirection="row">
          {course?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom={3}>
          <Stack spacing={4}>
            <Text textStyle={'title'}>{translate('COURSE_DATES')}</Text>
            <Text textStyle={'paragraph'}>{days} {startTime} - {endTime}</Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
