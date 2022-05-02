import { useEditableControls, ButtonGroup, IconButton, Flex, Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import { AiOutlineCheck, AiTwotoneDelete } from 'react-icons/ai'
import { MdEdit, MdOutlineCancel } from 'react-icons/md'

interface InputPermissions {
  canEdit: boolean
  canDelete: boolean
}

interface Props {
  value: string
  onComplete: (value: string) => void
  onDelete: () => void
  permissions: InputPermissions
}

export const EditableInputComponent = ({ value, onComplete, onDelete, permissions: { canDelete, canEdit } }: Props) => {
  function EditableControls () {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls()

    return (
      <ButtonGroup justifyContent="center" size="sm">
        {isEditing && canEdit
          ? (
            <>
              <IconButton aria-label='Confirm' icon={<AiOutlineCheck />} {...getSubmitButtonProps()} />
              <IconButton aria-label='Cancel' icon={<MdOutlineCancel />} {...getCancelButtonProps()} />
            </>
            )
          : (
            <>
              {canEdit && <IconButton aria-label='Edit' size="sm" icon={<MdEdit />} {...getEditButtonProps()} />}
              {canDelete && <IconButton aria-label='Delete' size="sm" icon={<AiTwotoneDelete />} onClick={onDelete} />}
            </>
            )}
      </ButtonGroup>
    )
  }

  return (
    <>

      <Editable
        defaultValue={value}
        textStyle="paragraph"
        isPreviewFocusable={false}
        onSubmit={onComplete}
      >
        <Flex alignItems='center' gap={3}>
          <EditablePreview />
          <EditableInput
            size={30}
          />
          <EditableControls />
        </Flex>

      </Editable>

    </>
  )
}
