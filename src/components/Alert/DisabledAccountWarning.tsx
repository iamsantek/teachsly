import { Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { translate } from '../../utils/LanguageUtils'

export const DisabledAccountWarning = () => {
  return (
        <Alert status='info'>
            <AlertIcon />
            <Box flex='1'>
                <AlertTitle>{translate('DISABLED_ACCOUNT_ALERT_TITLE')}</AlertTitle>
                <AlertDescription display='block'>
                    {translate('DISABLED_ACCOUNT_ALERT_DESCRIPTION')}
                </AlertDescription>
            </Box>
            <CloseButton position='absolute' right='8px' top='8px' />
        </Alert>
  )
}
