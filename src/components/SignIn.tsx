// import { AmplifySignIn } from '@aws-amplify/ui-react'

import { Authenticator, translations } from "@aws-amplify/ui-react";
import { I18n } from "aws-amplify";
I18n.putVocabularies(translations);

const SignIn = () => {
  return <Authenticator hideSignUp={true} />;
};

export default SignIn;
