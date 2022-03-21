import {
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Stack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { translate } from '../utils/LanguageUtils'
import { BadgeList } from '../components/Badges/BadgeList'
import { User } from '../API'
import { BsWhatsapp } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'
import { useContext } from 'react'
import { UserDashboardContext } from '../contexts/UserDashboardContext'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | undefined;
}

export const ViewUserModal = ({ isOpen, onClose, user }: Props) => {
  const color = useColorModeValue('black', 'white')
  const { context: { courses } } = useContext(UserDashboardContext)
  const groups = courses.filter(course => user?.groups.includes(course.externalId)).map(course => course.name)

  return (
    <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle={'paragraph'} flex="1" flexDirection="row" color={color} />
        <ModalCloseButton />
        <ModalBody marginBottom={3}>
          <Stack spacing={4}>
            <Text textStyle={'title'}>{translate('NAME')}</Text>
            <Text textStyle={'paragraph'}>{user?.name}</Text>

            <Text textStyle={'title'}>{translate('EMAIL')}</Text>
            <Text textDecoration='underline' textStyle={'paragraph'} as={'a'} href={`mailto:${user?.email}`}>{user?.email}</Text>

            {!!Number(user?.phone) && (
              <>
                <Text textStyle={'title'}>{translate('PHONE_NUMBER')}</Text>
                <HStack>
                  <Text textStyle={'paragraph'} marginRight={2}>{user?.phone}</Text>
                  <Button
                    colorScheme='whatsapp'
                    onClick={() => window.open(`https://api.whatsapp.com/send?phone=${user?.phone}`, '_blank')}
                    color='whiteAlpha.900'
                  >
                    <BsWhatsapp />
                  </Button>
                  <Button
                    colorScheme='brand'
                    onClick={() => window.open(`tel:+${user?.phone}`, '_blank')}
                    color='whiteAlpha.900'
                  >
                    <AiFillPhone />
                  </Button>
                </HStack>
              </>
            )}

            <Text textStyle={'title'}>{translate('COURSES')}</Text>
            <BadgeList badges={groups} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
