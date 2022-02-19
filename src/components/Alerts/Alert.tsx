import * as React from "react";
import { useState } from "react";
import { Alert } from "reactstrap";
import {
  AlertNotification,
  MessageLevel,
} from "../../interfaces/AlertNotification";
import { ObservableTopics } from "../../interfaces/ObservableTopics";
import ObservableService from "../../observables/ObservableService";

const CustomAlert = () => {
  const [type, setType] = useState<MessageLevel>(MessageLevel.INFO);
  const [message, setMessage] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);

  const renderAlert = (alert: AlertNotification) => {
    setType(alert.type);
    setMessage(alert.message);
    setVisibility(true);
  };

  ObservableService.addListener(
    ObservableTopics.NotificationAlert,
    renderAlert
  );

  if (!visibility) {
    return null;
  }

  return (
    <>
      <Alert
        dismissible="true"
        toggle={() => setVisibility(false)}
        color={type}
        style={{
          position: "fixed",
          top: "1rem",
          zIndex: 10,
          left: "50%",
          transform: "translateX(-50%) ",
        }}
      >
        {message}
      </Alert>
    </>
  );
};

export default CustomAlert;
