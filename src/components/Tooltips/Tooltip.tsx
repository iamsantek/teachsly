import { PropsWithChildren } from "react";
import { Tooltip } from "@chakra-ui/react";

interface Props {
  label: string;
  [props: string]: any;
}

export const TooltipHelper = ({
  label,
  children,
  ...rest
}: PropsWithChildren<Props>) => (
  <Tooltip label={label} placement="top" hasArrow arrowSize={10} {...rest}>
    {children}
  </Tooltip>
);
