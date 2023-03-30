import { GeneralInformation } from "../enums/GeneralInformation";
import { BackendEnvironments } from "../interfaces/BackendEnvironments";

const API_ENDPOINT = `https://api.${GeneralInformation.DOMAIN}/graphql`;

export const GRAPHQL_ENDPOINT =
  process.env.REACT_APP_GRAPHQL_API_ENDPOINT || API_ENDPOINT;

export const BACKEND_ENV = process.env.REACT_APP_ENV || BackendEnvironments.QA;
