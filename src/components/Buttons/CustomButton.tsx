import React, { FC } from 'react'
import { Button, Spinner } from 'reactstrap'
import { MessageLevel } from '../../interfaces/AlertNotification'
import { translate } from '../../utils/LanguageUtils'

interface Props {
  isLoading: boolean;
  onClick?: () => void;
  type: MessageLevel;
  buttonType?: 'submit' | 'reset' | 'button' | undefined;
}

export const CustomButton: FC<Props> = ({
  children,
  isLoading,
  onClick,
  type: alertType,
  buttonType
}) => (
  <Button
    type={buttonType}
    color={alertType}
    disabled={isLoading}
    onClick={onClick}
  >
    {isLoading && <Spinner size="sm" />}
    {isLoading
      ? (
      <span className="ml-3">{translate('PROCESSING')}</span>
        )
      : (
      <>
        <span>{children}</span>
      </>
        )}
  </Button>
)
