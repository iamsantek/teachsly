import { GeneralInformation } from "../enums/GeneralInformation";

export const ANALYTICS_URL = `https://analytics.${GeneralInformation.DOMAIN}`;

export enum GoogleAnalyticsCategory {
  MEDIA = "MEDIA",
  CLASS = "CLASS",
  EXAM = "EXAM",
}
