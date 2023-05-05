export type AmplifyDependentResourcesAttributes = {
  "api": {
    "TheOfficeBackendApi": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "TheOfficeAuthApi": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "CreatedSNSRole": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "AdminGroupRole": "string",
      "StudentsGroupRole": "string",
      "TeachersGroupRole": "string"
    }
  },
  "function": {
    "TheOfficeAuthApiCustomMessage": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "TheOfficeBucket": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}