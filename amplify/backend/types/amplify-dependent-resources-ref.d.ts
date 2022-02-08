export type AmplifyDependentResourcesAttributes = {
    "api": {
        "TheOfficeBackendApi": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "userPoolGroups": {
            "AdminGroupRole": "string",
            "TeachersGroupRole": "string",
            "StudentsGroupRole": "string"
        },
        "TheOfficeAuthApi": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "TheOfficeBucket": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "TheOfficeAuthApiCustomMessage": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}