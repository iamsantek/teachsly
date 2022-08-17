import {  Flex, Text } from "@chakra-ui/react";
import { TranslationsDictionary } from "../../../../../dictionaries/dictionary";
import { translate } from "../../../../../utils/LanguageUtils";

type MarkdownHelper = {
    color: string;
    symbol: string;
    description: TranslationsDictionary;
}

const correctionTypes: MarkdownHelper[] = [
    {
        color: "purple.500",
        symbol: "*",
        description: "GRAMMAR_CORRECTION"
    },
    {
        color: "blue.500",
        symbol: "#",
        description: "SPELLING_CORRECTION"
    },
    {
        color: "pink.500",
        symbol: "-",
        description: "PUNCTUATION_CORRECTION"
    },
    {
        color: "orange.500",
        symbol: "/",
        description: "VOCABULARY_CORRECTION"
    },
    {
        color: "blackAlpha.500",
        symbol: "()",
        description: "SUGGESTIONS"
    }
];

export const MarkDownColorHelper = () => (
    <Flex>
        <Flex gap={3} justifyContent='center' alignItems='center'>
            {correctionTypes.map(({ color, symbol, description }) => (
                <>
            <Flex fontWeight='bold' justifyContent='center' alignItems='center' bgColor={color} color="whiteAlpha.900" h={5} w={5}>
                {symbol}
            </Flex>
            <Text>{translate(description)}</Text>
            </>
            ))}
        </Flex>
    </Flex>
)