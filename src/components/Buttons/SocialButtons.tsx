import { Circle, Stack, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsCodeSlash } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { FiLink } from 'react-icons/fi'
import { RiFacebookBoxLine } from 'react-icons/ri'
import { GeneralInformation } from '../../enums/GeneralInformation'

const SocialButton = ({
  children,
  label,
  href
}: {
    children: ReactNode;
    label: string;
    href: string;
  }) => {
  return (
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
        {children}
      </Circle>
  )
}

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
