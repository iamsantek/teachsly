import { ReactNode, useContext, ReactText } from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Spacer
} from '@chakra-ui/react'
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { UserDashboardContext } from '../contexts/UserDashboardContext'
import UserService from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footers/Footer'
// import DarkModeSwitch from '../components/Switches/DarkModeSwitch'
import { translate } from '../utils/LanguageUtils'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { ApplicationRoute, CustomRouteObject } from '../interfaces/Routes'

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path?: string;
  onClose: () => void;
}

const NavItem = ({ icon, onClose, children, path, ...rest }: NavItemProps) => {
  const navigate = useNavigate()
  return (
    <Box
      style={{ textDecoration: 'none', fontWeight: 800 }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => {
        navigate(path as string)
        onClose()
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { context: { routes: applicationRoutes } } = useContext(UserDashboardContext)
  const routes = applicationRoutes?.filter((route: ApplicationRoute) => (route as CustomRouteObject).name)

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      paddingTop={5}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        marginBottom={[10, 5]}
      >
        <Image w={[36, 40]} padding={[0, 4]} src={'/logo.png'} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {routes?.filter((route: any) => route.showInNavbar).map((link: any, index: number) => (
        <NavItem key={index} icon={link.icon} path={link.path} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
      <Spacer />
      {/* <DarkModeSwitch /> */}
      <Footer />
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { context: { user } } = useContext(UserDashboardContext)
  const { signOut } = useAuthenticator()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image w={20} display={{ base: 'flex', md: 'none' }} src={require('../assets/img/brand/logo.png')} />

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          as={'div'}
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={'div'}
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} name={user?.name as string} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" isTruncated>
                    {user?.name as string}
                  </Text>
                  <Text fontSize="xs">
                    {UserService.getUserType(user)}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={signOut}>{translate('SIGN_OUT')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default function DashboardLayout ({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  )
}
