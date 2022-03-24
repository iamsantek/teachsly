import { BackendEnvironments } from '../interfaces/BackendEnvironments'

const API_ENDPOINT = 'https://api-qa.theofficeenglishlearning.com/graphql'

export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_API_ENDPOINT || API_ENDPOINT

export const BACKEND_ENV = process.env.REACT_APP_ENV || BackendEnvironments.QA

export const AUTH_URL = process.env.REACT_APP_AUTH_URL || undefined
