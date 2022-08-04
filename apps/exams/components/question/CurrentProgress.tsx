import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

interface Props {
    current: number
    total: number
    label?: string;
}

export const CurrentProgress = ({ current, total, label }: Props) => (
    <CircularProgress value={(current / total) * 100} color='brand.primary' thickness='12px'>
    <CircularProgressLabel>
        {label || `${Math.round((current / total) * 100)}%`}
        </CircularProgressLabel>
    </CircularProgress>
)
