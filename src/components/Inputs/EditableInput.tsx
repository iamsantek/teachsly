import { useEditableControls, ButtonGroup, IconButton, Flex, Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import { AiOutlineCheck, AiTwotoneDelete } from 'react-icons/ai'
import { MdEdit, MdOutlineCancel } from 'react-icons/md'

interface Props {
  value: string
  onComplete: (value: string) => void
  onDelete: () => void
}

export const EditableInputComponent = ({ value, onComplete, onDelete }: Props) => {
  function EditableControls () {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls()

    return (
      <ButtonGroup justifyContent="center" size="sm">
        {isEditing
          ? (
            <>
              <IconButton aria-label='Confirm' icon={<AiOutlineCheck />} {...getSubmitButtonProps()} />
              <IconButton aria-label='Cancel' icon={<MdOutlineCancel />} {...getCancelButtonProps()} />
            </>
            )
          : (
            <>
              <IconButton aria-label='Edit' size="sm" icon={<MdEdit />} {...getEditButtonProps()} />
              <IconButton aria-label='Delete' size="sm" icon={<AiTwotoneDelete />} onClick={onDelete} />
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
