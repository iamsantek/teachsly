import { Tooltip } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  label: string;
}

export const TooltipHelper: FC<Props> = ({ label, children, ...rest }) => (
  <Tooltip label={label} placement="top" hasArrow arrowSize={10} {...rest}>
    {children}
  </Tooltip>
);
