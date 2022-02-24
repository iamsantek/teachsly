import React, { FC } from 'react'
import { Tooltip } from '@chakra-ui/react'

interface Props {
  label: string;
}

export const TooltipHelper: FC<Props> = ({ label, children, ...rest }) => (
  <Tooltip label={label} placement="top" hasArrow arrowSize={10} {...rest}>
    {children}
  </Tooltip>
)
