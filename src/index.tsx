import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import CommonLayout from "./layouts/CommonLayout";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<CommonLayout />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
