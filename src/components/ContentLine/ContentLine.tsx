import {  PropsWithChildren } from 'react'
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
  leftIcon?: JSX.Element;
  onView?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  // eslint-disable-next-line no-undef
  customButtons?: JSX.Element[]
  transformOnHover?: boolean;
  noBorder?: boolean;
  borderColor?: string;
}

export const ContentLine = ({
  leftIcon: LeftIcon,
  onView,
  onDownload,
  onDelete,
  onEdit,
  children,
  customButtons,
  transformOnHover = true,
  noBorder = false,
  borderColor
}: PropsWithChildren<Props>) => {
  const customButtonWrapper = customButtons?.map(customButton => (
    <WrapItem key={generateRandomId()}>{customButton}</WrapItem>
  ))

  return (
    <Box
      // bg="white.100"
      rounded="lg"
      borderWidth="1px"
      bgColor="gray.50"
      borderColor={borderColor}
      boxShadow={noBorder ? "none" : "lg"}
      w="100%"
      p={4}
      color="white"
      _hover={{
        transform: transformOnHover ? 'scale(1.01)' : 'none',
        cursor: 'pointer'
      }}
    >
      <Flex justify={'space-between'} alignItems='center'>
        {LeftIcon && (
          <Circle
            size="40px"
            bg="brand.500"
            color='whiteAlpha.900'
            marginRight={[3, 5]}
          >
            {LeftIcon}
          </Circle>
        )}
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
