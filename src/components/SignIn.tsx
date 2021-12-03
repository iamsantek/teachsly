import React from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";

const SignIn = () => (
  <AmplifyAuthenticator>
    <AmplifySignIn
      headerText="The Office English Learning"
      slot="sign-in"
      hideSignUp
      submitButtonText="Ingresar"
    />
  </AmplifyAuthenticator>
);

export default SignIn;
