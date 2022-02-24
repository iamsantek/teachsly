import React, { FC } from 'react'
import {
  Box,
  Circle,
  Flex,
  Wrap,
  WrapItem,
  useColorModeValue
} from '@chakra-ui/react'
import {
  AiOutlineCloudDownload,
  AiOutlineEye,
  AiFillDelete
} from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { translate } from '../../utils/LanguageUtils'
import { TooltipHelper } from '../Tooltips/Tooltip'

interface Props {
  leftIcon: JSX.Element;
  onView?: <T>(item: T) => void;
  onDownload?: <T>(item: T) => void;
  onEdit?: <T>(item: T) => void;
  onDelete?: <T>(item: T) => void;
}

export const ContentLine: FC<Props> = ({
  leftIcon: LeftIcon,
  onView,
  onDownload,
  onDelete,
  onEdit,
  children
}) => {
  const iconColor = useColorModeValue('white', 'black')
  const iconBackgroundColor = useColorModeValue('gray.700', 'white')
  return (
    <Box
      bg="white.100"
      rounded="lg"
      borderWidth="1px"
      boxShadow="lg"
      w="100%"
      p={4}
      color="white"
      _hover={{
        transform: 'scale(1.01)'
      }}
    >
      <Flex justify={'space-between'}>
        <Circle
          size="40px"
          bg="brand.500"
          color={iconColor}
          marginRight={[3, 5]}
          display={{ base: 'none', md: 'flex' }}
        >
          {LeftIcon}
        </Circle>
        <Flex flex="1" justifyContent="space-between">
          {children}
        </Flex>
        <Wrap>
          {onView && (
            <WrapItem>
              <TooltipHelper label={translate('SEE_CONTENT')}>
                <Circle
                  size="40px"
                  bg={iconBackgroundColor}
                  color={iconColor}
                  _hover={{ cursor: 'pointer' }}
                  onClick={onView}
                >
                  <AiOutlineEye />
                </Circle>
              </TooltipHelper>
            </WrapItem>
          )}
          {onDownload && (
            <WrapItem>
              <TooltipHelper label={translate('DOWNLOAD')}>
                <Circle
                  size="40px"
                  bg={iconBackgroundColor}
                  color={iconColor}
                  _hover={{ cursor: 'pointer' }}
                  onClick={onDownload}
                >
                  <AiOutlineCloudDownload />
                </Circle>
              </TooltipHelper>
            </WrapItem>
          )}
          {onEdit && (
            <WrapItem>
              <TooltipHelper label={translate('EDIT')}>
                <Circle
                  size="40px"
                  bg={iconBackgroundColor}
                  color={iconColor}
                  _hover={{ cursor: 'pointer' }}
                  onClick={onEdit}
                >
                  <MdModeEditOutline />
                </Circle>
              </TooltipHelper>
            </WrapItem>
          )}
          {onDelete && (
            <WrapItem>
              <TooltipHelper label={translate('DELETE')}>
                <Circle
                  size="40px"
                  bg={iconBackgroundColor}
                  color={iconColor}
                  _hover={{ cursor: 'pointer' }}
                  onClick={onDelete}
                >
                  <AiFillDelete />
                </Circle>
              </TooltipHelper>
            </WrapItem>
          )}
        </Wrap>
      </Flex>
    </Box>
  )
}
