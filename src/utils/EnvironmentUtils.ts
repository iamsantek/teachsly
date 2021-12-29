import awsmobile from "../aws-exports";

export enum Environment {
  PRODUCTION = "production",
  DEVELOPMENT = "dev",
}

export const getEnvironment = () => {
  //TODO - Workaround. Amplify doesn't provide a way to get the current env.
  const envMatchArray = awsmobile.aws_user_files_s3_bucket.match(/.*-(\w+)/);

  if (envMatchArray) {
    return envMatchArray[1];
  }
};
