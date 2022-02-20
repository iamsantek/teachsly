import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/700.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
