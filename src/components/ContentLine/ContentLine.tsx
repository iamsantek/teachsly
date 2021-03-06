import { FC } from 'react'
import {
  Box,
  Circle,
  Flex,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import {
  AiFillDelete
} from 'react-icons/ai'
import { MdCloudDownload, MdModeEditOutline } from 'react-icons/md'
import { translate } from '../../utils/LanguageUtils'
import { TooltipHelper } from '../Tooltips/Tooltip'
import { ButtonSquare } from '../Buttons/SquareButton'
import { generateRandomId } from '../../utils/StringUtils'

interface Props {
  // eslint-disable-next-line no-undef
  leftIcon: JSX.Element;
  onView?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  // eslint-disable-next-line no-undef
  customButtons?: JSX.Element[]
}

export const ContentLine: FC<Props> = ({
  leftIcon: LeftIcon,
  onView,
  onDownload,
  onDelete,
  onEdit,
  children,
  customButtons
}) => {
  const customButtonWrapper = customButtons?.map(customButton => (
    <WrapItem key={generateRandomId()}>{customButton}</WrapItem>
  ))

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
        transform: 'scale(1.01)',
        cursor: 'pointer'
      }}
    >
      <Flex justify={'space-between'}>
        <Circle
          size="40px"
          bg="brand.500"
          color='whiteAlpha.900'
          marginRight={[3, 5]}
        >
          {LeftIcon}
        </Circle>
        <Flex flex="1" justifyContent="space-between" onClick={onView}>
          {children}
        </Flex>
        <Wrap>
          {customButtonWrapper}
          {onDownload && (
            <WrapItem>
              <TooltipHelper label={translate('DOWNLOAD')}>
                <ButtonSquare onClick={onDownload} icon={<MdCloudDownload />} />
              </TooltipHelper>
            </WrapItem>
          )}
          {onEdit && (
            <WrapItem>
              <TooltipHelper label={translate('EDIT')}>
                <ButtonSquare onClick={onEdit} icon={<MdModeEditOutline />} />
              </TooltipHelper>
            </WrapItem>
          )}
          {onDelete && (
            <WrapItem>
              <TooltipHelper label={translate('DELETE')}>
                <ButtonSquare onClick={onDelete} icon={<AiFillDelete />} />
              </TooltipHelper>
            </WrapItem>
          )}
        </Wrap>
      </Flex>
    </Box>
  )
}
