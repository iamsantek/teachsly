import { AmplifySignIn } from '@aws-amplify/ui-react'

const SignIn = () => (
    <AmplifySignIn
      headerText="The Office English Learning"
      slot="sign-in"
      hideSignUp
      submitButtonText="Ingresar"
      // @ts-ignore
      style={{ '--container-height': 'auto', '--background-color': 'red' }}
    />
)

export default SignIn
