import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const CoursePreviewPlaceholder = () => {
  return (
        <Box
            rounded="lg"
            borderWidth="1px"
            boxShadow="lg"
            p={4}
            maxW='sm'
            borderRadius='lg'
            overflow='hidden'
            display={'flex'}
            flexDirection='row'
            gap={4}
            alignContent='flex-start'
            justifyContent={'space-between'}
        >
            <Box display={'flex'} gap={3}>
                <SkeletonCircle size={'10'} />
                <Box
                    display='flex'
                    alignItems='baseline'
                    justifyContent={'space-between'}
                    flexDirection={'column'}
                    gap={3}
                >
                    <Box display='flex' flexDirection={'column'}>
                        <Box display={'flex'} gap={2} alignItems='center'>
                            <SkeletonText height={20} width={40}/>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Box display={'flex'} flexDirection='column' gap={2}>
            <SkeletonCircle size={'2'} />
            <SkeletonCircle size={'2'} />
            <SkeletonCircle size={'2'} />
            </Box>
        </Box>
  )
}
