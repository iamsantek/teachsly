import { PutResult } from "@aws-amplify/storage"
import { Stack, ModalBody, ModalHeader, ModalOverlay, Modal, ModalContent, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { CreateLessonPlanMutation, LessonPlan, LessonPlanningType, UpdateLessonPlanInput, UpdateLessonPlanMutation } from "../../API"
import { FileUploader } from "../../components/Inputs/FileUploader"
import { Input } from "../../components/Inputs/Input"
import { Select } from "../../components/Inputs/Select"
import { ModalFooter } from "../../components/Modals/ModalFooter"
import { UserDashboardContext } from "../../contexts/UserDashboardContext"
import { TranslationsDictionary } from "../../dictionaries/dictionary"
import { MultiSelectOption } from "../../interfaces/MultiSelectOption"
import StorageService from "../../services/aws/StorageService"
import { createLessonPlan, updateLessonPlan } from "../../services/LessonPlanService"
import { generalGroups } from "../../utils/CognitoGroupsUtils"
import { renderCourseList, transformGroups } from "../../utils/CourseUtils"
import { translate } from "../../utils/LanguageUtils"
import { toastConfig } from "../../utils/ToastUtils"

export type LessonPlanning = {
  groups: MultiSelectOption | string[] | null,
  title: string,
  date: string,
  uploadedBy: string,
  content?: string,
  type?: string,
  externalId: string,
  media?: string
}

export const defaultLessonPlanning: LessonPlanning = {
  groups: null,
  title: '',
  date: '',
  uploadedBy: '',
  content: '',
  type: LessonPlanningType.LESSON,
  externalId: '',
  media: ''
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (lessonPlanning: LessonPlan) => void
  onUpdate: (lessonPlanning: LessonPlan) => void
  lessonToUpdate: LessonPlan | null;
}


export const LessonPlanningModal = ({ isOpen, onClose, onCreate, lessonToUpdate, onUpdate }: Props) => {
  const { context: { user, courses } } = useContext(UserDashboardContext)
  const { courseId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File>()
  const formControls = useForm<LessonPlanning>({ defaultValues: defaultLessonPlanning })
  const currentCourse = courses.find(course => course.externalId === courseId)


  const { handleSubmit, reset, setValue } = formControls
  const toast = useToast()

  useEffect(() => {
    setValue('groups', currentCourse ? transformGroups(courses, [currentCourse.externalId])[0] : null)
  }, [currentCourse])

  useEffect(() => {
    setValue('date', new Date().toISOString().split('T')[0])

    if (lessonToUpdate) {
      const group = transformGroups(courses, [lessonToUpdate.groups[0]])[0]
      reset({
        ...lessonToUpdate,
        media: lessonToUpdate.media || '',
        groups: group,
        content: lessonToUpdate.content ?? '',
        type: lessonToUpdate.type ?? LessonPlanningType.LESSON,
        date: lessonToUpdate.date.split('T')[0]
      })
    }
  }, [lessonToUpdate, courses])

  const saveLessonPlanning = async (values: LessonPlanning) => {
    setIsLoading(true)
    let savedFile: PutResult | undefined

    if (file) {
      savedFile = await StorageService.uploadToS3(file)
    }

    console.log(savedFile)

    const lessonPlan = {
      ...lessonToUpdate,
      ...values,
      media: savedFile?.key,
      uploadedBy: user?.name || '',
      type: values.type ?? LessonPlanningType.LESSON,
      groups: [(values.groups as MultiSelectOption).value || '']
    }

    let result: CreateLessonPlanMutation | UpdateLessonPlanMutation | undefined;
    let toastMessage: TranslationsDictionary;
    if (lessonToUpdate) {
      result = await updateLessonPlan(lessonPlan as UpdateLessonPlanInput) as UpdateLessonPlanMutation | undefined
      if (result?.updateLessonPlan) {
        onUpdate(result.updateLessonPlan as LessonPlan)
        toastMessage = 'LESSON_UPDATE_SUCCESS'
      } else {
        toastMessage = 'LESSON_UPDATE_ERROR'
      }
    } else {
      result = await createLessonPlan(lessonPlan as LessonPlanning) as CreateLessonPlanMutation | undefined

      if (result) {
        toastMessage = 'LESSON_SUCCESS'
        onCreate(result.createLessonPlan as LessonPlan)
      } else {
        toastMessage = 'LESSON_ERROR'
      }
    }

    setIsLoading(false)


    toast(toastConfig({
      description: toastMessage,
      status: result ? 'success' : 'error'
    }))

    reset(defaultLessonPlanning)
    onClose()
  }

  const onCloseModal = () => {
    reset(defaultLessonPlanning)
    onClose()
  }

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }

    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal} size="4xl">
        <ModalOverlay />
        <FormProvider {...formControls}>
          <form onSubmit={handleSubmit(saveLessonPlanning)}>
            <ModalContent>
              <ModalHeader textStyle={'paragraph'}>
                {translate('LESSON_PLAN')}
              </ModalHeader>
              <ModalBody marginBottom={3}>
                <Stack spacing={6}>
                  <Input
                    name="title"
                    label="TITLE"
                    isRequired={true}
                    placeholder={translate('TITLE')}
                  />
                  <Input
                    name="content"
                    label="DESCRIPTION"
                    isRequired={false}
                    placeholder={translate('DESCRIPTION')}
                  />
                  <Select
                    name="groups"
                    label="GROUP_MULTI_SELECT_TITLE"
                    placeholder={translate('COURSES')}
                    isRequired={true}
                    options={renderCourseList(courses, generalGroups, true)}
                    isMultiSelect={false}
                    closeMenuOnSelect={true}
                  />

                  <Input
                    name="date"
                    label="EXAM_START_DATE"
                    isRequired={true}
                    placeholder={translate('EXAM_START_DATE')}
                    type="date"
                  />
                  <FileUploader
                    name="media"
                    onChange={onChangeFile}
                    label="ATTACH_FILE"
                  />
                </Stack>
              </ModalBody>
              <ModalFooter
                isLoading={isLoading}
                sendButtonText={lessonToUpdate ? 'UPDATE_LESSON_PLAN' : 'CREATE_LESSON_PLAN'}
                onClose={onClose}
              />
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}