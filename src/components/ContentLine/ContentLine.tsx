import { PropsWithChildren } from "react";
import { Box, Circle, Flex, Wrap, WrapItem, Checkbox } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { MdCloudDownload, MdModeEditOutline } from "react-icons/md";
import { translate } from "../../utils/LanguageUtils";
import { TooltipHelper } from "../Tooltips/Tooltip";
import { ButtonSquare } from "../Buttons/SquareButton";
import { generateRandomId } from "../../utils/StringUtils";

interface Props {
  // eslint-disable-next-line no-undef
  leftIcon?: JSX.Element;
  onView?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReset?: () => void;
  // eslint-disable-next-line no-undef
  customButtons?: JSX.Element[];
  transformOnHover?: boolean;
  noBorder?: boolean;
  borderColor?: string;
  checkable?: boolean;
  id?: string;
  onCheck?: (id?: string, checked?: boolean) => void;
  isChecked?: boolean;
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
  borderColor,
  checkable = false,
  id,
  onCheck,
  isChecked,
  onReset,
}: PropsWithChildren<Props>) => {
  const customButtonWrapper = customButtons?.map((customButton) => (
    <WrapItem key={generateRandomId()}>{customButton}</WrapItem>
  ));

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
        transform: transformOnHover ? "scale(1.01)" : "none",
        cursor: "pointer",
      }}
    >
      <Flex justify={"space-between"} alignItems="center" gap={3}>
        {checkable && (
          <Checkbox
            isChecked={isChecked}
            size="lg"
            onChange={(e) => onCheck && onCheck(id, e.target.checked)}
          />
        )}
        {LeftIcon && (
          <Circle
            size="40px"
            bg="brand.500"
            color="whiteAlpha.900"
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
              <TooltipHelper label={translate("DOWNLOAD")}>
                <ButtonSquare onClick={onDownload} icon={<MdCloudDownload />} />
              </TooltipHelper>
            </WrapItem>
          )}
          {onEdit && (
            <WrapItem>
              <TooltipHelper label={translate("EDIT")}>
                <ButtonSquare onClick={onEdit} icon={<MdModeEditOutline />} />
              </TooltipHelper>
            </WrapItem>
          )}
          {onDelete && (
            <WrapItem>
              <TooltipHelper label={translate("DELETE")}>
                <ButtonSquare onClick={onDelete} icon={<AiFillDelete />} />
              </TooltipHelper>
            </WrapItem>
          )}
          {onReset && (
            <WrapItem>
              <TooltipHelper label={translate("RESET_CORRECTION")}>
                <ButtonSquare onClick={onReset} icon={<GrPowerReset />} />
              </TooltipHelper>
            </WrapItem>
          )}
        </Wrap>
      </Flex>
    </Box>
  );
};
