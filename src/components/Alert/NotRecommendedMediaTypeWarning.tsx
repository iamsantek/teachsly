import { Alert, AlertIcon, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { translate } from '../../utils/LanguageUtils'

export const NotRecommendedMediaTypeWarning = () => {
  return (
        <Alert status='error' flexDirection='column' gap={4}>
            <Flex flexDirection='row'>
                <AlertIcon />
                <Text fontWeight={'bold'}>{translate('NOT_RECOMMENDED_MEDIA_TYPES_WORDING')}</Text>
            </Flex>
            <TableContainer>
                <Table variant='unstyled' size={'sm'} wordBreak='break-word' overflowX={'hidden'}>
                    <Thead>
                        <Tr>
                            <Th wordBreak='break-word'>{translate('NOT_RECOMMENDED_MEDIA_TYPES_TABLE_TITLE_1')}</Th>
                            <Th>{translate('NOT_RECOMMENDED_MEDIA_TYPES_TABLE_TITLE_2')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td wordBreak='break-word'>{translate('FILES_WITH_INFORMATION_TITLE')}</Td>
                            <Td>{translate('FILES_WITH_INFORMATION_FORMAT')}</Td>
                        </Tr>
                        <Tr>
                            <Td wordBreak='break-word'>{translate('AUDIOS_TITLE')}</Td>
                            <Td>{translate('AUDIOS_FORMAT')}</Td>
                        </Tr>
                        <Tr>
                            <Td wordBreak='break-word'>{translate('VIDEOS_TITLE')}</Td>
                            <Td>{translate('VIDEOS_FORMAT')}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Text fontWeight='semibold'>{translate('NOT_RECOMMENDED_MEDIA_TYPES_FINAL_WORDING')}</Text>
        </Alert>
  )
}
