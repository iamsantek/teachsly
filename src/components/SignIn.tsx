// import { AmplifySignIn } from '@aws-amplify/ui-react'

import { Authenticator, translations } from '@aws-amplify/ui-react'
import { I18n } from 'aws-amplify'
I18n.putVocabularies(translations)

const SignIn = () => {
  const services = {
    async handleForgotPassword () {
      alert('Forgot password functionality is not allowed in this demo')
    }
  }

  return (
    <Authenticator
      services={services}
      hideSignUp={true}
    />
  )
}

export default SignIn
