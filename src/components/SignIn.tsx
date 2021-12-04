import React from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";

const SignIn = () => (
  <AmplifyAuthenticator>
    <AmplifySignIn
      headerText="The Office English Learning"
      slot="sign-in"
      hideSignUp
      submitButtonText="Ingresar"
      //@ts-ignore
      style={{ "--container-height": "auto", "--background-color": "red" }}
    />
  </AmplifyAuthenticator>
);

export default SignIn;
