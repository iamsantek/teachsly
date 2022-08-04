import { List, ListItem, ListIcon, Text, Box, Heading, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { instructions } from '../../constants/introGuidelines'
import PlacementService from '../../services/PlacementService'
import { ExamConfiguration } from '../../types/types'
import { translate } from '../../utils/language.utils'

export const IntroInstruction = () => {
  const [examConfiguration, setExamConfiguration] = useState<ExamConfiguration>()
  const { query } = useRouter()

  console.log(query)

  useEffect(() => {
    const fetchExamDetails = async () => {
      if (!query.attemptId) {
        return
      }

      const examDetails = await PlacementService.fetchExamDetails(query.attemptId as string)
      console.log({ examDetails })
      setExamConfiguration(examDetails)
    }

    fetchExamDetails()
  }, [query])

  return (
        <>
            <Stack spacing={10} align='center'>
            <Heading color='brand.primary' fontWeight='black' textAlign='center'>{examConfiguration?.title?.toUpperCase()}</Heading>
            <Text
                        align='justify'
                        bgGradient='linear(to-l, #3394b3, #FF0080)'
                        bgClip='text'

            >{translate('INTRO_INSTRUCTION')}</Text>
            </Stack>
            <List spacing={5} marginY={8}>
                {instructions.map((instructions, index) => (
                    <ListItem key={index}>
                        <Box display='flex' alignContent='center'>
                            <ListIcon as={instructions.icon} color='brand.primary' alignContent='center' alignSelf={'center'} />
                            <Text fontWeight='bold'>{instructions.title}</Text>
                        </Box>
                        <Box display='flex' flexDirection='column' marginTop={1}>
                            <Text fontWeight='thin' color='gray.500'>{instructions.description}</Text>
                        </Box>
                    </ListItem>

                ))}
            </List>
        </>
  )
}
