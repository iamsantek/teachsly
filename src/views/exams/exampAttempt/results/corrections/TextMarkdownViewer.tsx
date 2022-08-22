import { useHighlight, Mark } from "@chakra-ui/react"
import { generateCorrectionMatches, getMarkColor } from "../../../../../utils/ExamUtils"

interface Props {
    markdownText: string
}

export const TextMarkdownViewer = ({ markdownText }: Props) => {
    const { matches } = generateCorrectionMatches(markdownText)

    const generalChunks = useHighlight({
        text: markdownText,
        query: matches
    })

    return (
        <>
            {generalChunks.map(({ text, match }) => {
                if (!match) return text
                const { color } = getMarkColor(text)
                return <Mark bgColor={color} color='whiteAlpha.900'>{text}</Mark>
            }
            )}
        </>

    )
}