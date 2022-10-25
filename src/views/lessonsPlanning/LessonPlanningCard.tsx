import { Avatar, Badge, Text, Box } from "@chakra-ui/react"
import { AiOutlineCalendar } from "react-icons/ai"
import { BiTimeFive } from "react-icons/bi"

export const LessonPlanningCard = () => {
    return (
        <Box
        rounded="lg"
        flexBasis='100%'
        borderWidth="1px"
        boxShadow="lg"
        p={4}
        borderRadius='lg'
        overflow='hidden'
        display='flex'
        flexDirection='row'
        gap={4}
        alignContent='flex-start'
        justifyContent='space-between'
        height='100%'
        width='100%'
    >
        <Box display={'flex'} gap={3}>
            <Avatar name={'S'} />
            <Box
                display='flex'
                alignItems='baseline'
                flexDirection='column'
                gap={3}
            >
                <Badge
                    rounded='md'
                    bg='brand.500'
                    color='white'
                >
                    Test
                </Badge>
                <Box display='flex' flexDirection={'column'}>
                    <Text as='h1' textStyle={'title'} fontSize={'xl'}>"Hola</Text>
                    <Box display={'flex'} gap={2} alignItems='center'>
                        <AiOutlineCalendar />
                        <Text textStyle={'paragraph'} color='gray.500'>Hola que tal</Text>
                    </Box>
                    <Box display={'flex'} gap={2} alignItems='center'>
                        <BiTimeFive />
                        <Text textStyle={'paragraph'} color='gray.500'>Nuevo texto</Text>
                    </Box>
                </Box>

            </Box>
        </Box>
    </Box>
    )
}