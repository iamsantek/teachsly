import { Box, HStack, Text } from "@chakra-ui/react"
import { translate } from "../../utils/LanguageUtils"

interface Props {
    days: number[]
}

export const CourseDays = ({ days }: Props) => {
    const fullDayOfWeek = translate('DAYS_OF_THE_WEEK').split(',').map(day => day[0])
    return (
        <HStack spacing={2}>
            {fullDayOfWeek.map((day, index) => {
                return (
                    <Box

                        key={index}
                        w={6}
                        h={6}
                        borderRadius="50%"
                        bg={days.includes(index) ? "brand.500" : 'gray.300'}
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontWeight='bold'>{day[0]}</Text>
                    </Box>
                )
            }
            )}
        </HStack>
    )
}
