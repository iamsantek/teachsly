import { Text, Box, ListItem, Flex, ListIcon, List } from '@chakra-ui/react'
import { AiFillFile } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { Attachment } from '../../../../interfaces/Exams'
import StorageService from '../../../../services/aws/StorageService'

interface Props {
    attachments: Attachment[];
}

export const ExamResultAttachments = ({ attachments }: Props) => {
  return (
        <List marginY={5}>
        {attachments.map((attachment, attachmentIndex) => (
          <ListItem key={attachmentIndex}>
            <Flex
            gap={1}
            alignItems='center'
            cursor='pointer'
            onClick={async () => {
              const url = await StorageService.getSignedUrl(attachment.path)
              window.open(url?.url, '_blank')
            }}
            >
              <ListIcon as={AiFillFile} cursor='pointer' />
              <Text>{attachment.name}</Text>
              <BiLinkExternal />
            </Flex>
          </ListItem>
        ))}
      </List>

  )
}
