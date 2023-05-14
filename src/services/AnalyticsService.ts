import { ANALYTICS_URL } from "../constants/Analytics";
import { BACKEND_ENV } from "../constants/Environment";
import { AnalyticsEvent } from "../enums/Analytics";
import LocalStorageService, { LocalStorageKeys } from "./LocalStorageService";
import ReactGA from "react-ga4";

class AnalyticsService {
  public recordEvent = async (event: AnalyticsEvent) => {
    const user = LocalStorageService.getItem(LocalStorageKeys.USER);

    const response = await fetch(ANALYTICS_URL, {
      method: "POST",
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        user,
      }),
      headers: {
        "Content-Type": "application/json",
        env: BACKEND_ENV,
      },
    });

    return response;
  };

  public sendEventToAnalytics = ({ action, category, label, value}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
}

export default new AnalyticsService();
