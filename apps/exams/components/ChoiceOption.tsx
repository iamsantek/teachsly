import { useRadio, Box, Text } from '@chakra-ui/react'

export function ChoiceOption (props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'brand.primary',
          color: 'white'
        }}
        // _focus={{
        //   transform: 'scale(1.03)'
        // }}
        px={5}
        py={3}
        flexDirection='row'
        display='flex'
        gap={3}
        alignContent='center'
        alignItems='center'
      >
        <Box
        h={7}
        w={7}
        border='1px'
        display='flex'
        borderColor='gray.100'
        alignContent='center'
        justifyContent='center'>
          <Text>{props.letter}</Text>
        </Box>
        {props.children}
      </Box>
    </Box>
  )
}
