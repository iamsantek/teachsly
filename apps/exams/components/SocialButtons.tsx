import React from 'react'
import { Circle, Stack, Tag, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { BsCodeSlash } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { FiLink } from 'react-icons/fi'
import { RiFacebookBoxLine } from 'react-icons/ri'
import { GeneralInformation } from '../GeneralInformation'

// eslint-disable-next-line react/display-name
const SocialButton = React.forwardRef(({ children, href, label, ...rest }: any, ref) => (
  <Circle
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded={'full'}
    cursor={'pointer'}
    as={'a'}
    href={href}
    target="_blank"
    size={8}
    display={'inline-flex'}
    alignItems={'center'}
    justifyContent={'center'}
    transition={'background 0.3s ease'}
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    <Tag ref={ref as any} {...rest}>
      {children}
    </Tag>
  </Circle>
))

export const SocialButtons = () => (
  <Stack direction={'row'} spacing={6}>
    <SocialButton label={'Website'} href={GeneralInformation.WEBSITE}>
      <FiLink />
    </SocialButton>
    <SocialButton label={'Twitter'} href={GeneralInformation.FACEBOOK}>
      <RiFacebookBoxLine />
    </SocialButton>
    <SocialButton label={'Instagram'} href={GeneralInformation.INSTAGRAM}>
      <FaInstagram />
    </SocialButton>
      <SocialButton
        label={'Developer'}
        href={GeneralInformation.DEVELOPED_BY}
      >
        <BsCodeSlash />
      </SocialButton>
  </Stack>
)
