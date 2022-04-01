import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react'
import { mediaTypeIcons } from '../../../constants/Medias'
import { MediaWithFile } from '../../../interfaces/Media'
import { translate } from '../../../utils/LanguageUtils'
import { countFilesByType } from '../../../utils/MediaUtils'

interface Props {
    files: MediaWithFile[];
    onClick: () => void;
}

export const MediaFolderFilesCounter = ({ files, onClick }: Props) => {
  const countByType = countFilesByType(files)

  return (
        <Box
            borderWidth={2}
            borderRadius={8}
            borderStyle='solid'
            borderColor='gray.900'
        >
            <SimpleGrid padding={4} display='flex' flexDirection={['column', 'row']} justifyContent='space-around' gap={4}>
                {Object.entries(countByType).map((type) => {
                  const [key, value] = type
                  const Icon = (mediaTypeIcons as any)[key]
                  return (
                        <Box key={key} display='flex' gap={3} alignItems='center'>
                            {<Icon size={30} />}
                            {<Heading>{value}</Heading>}
                        </Box>
                  )
                })}
                <Button colorScheme='brand' onClick={onClick} isDisabled={files.length === 0}>{translate('REVIEW_FILES')}</Button>
            </SimpleGrid>
        </Box>
  )
}
