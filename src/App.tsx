import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import MonitoringPage from "./pages/MonitoringPage";
import AlertHistoryPage from "./pages/AlertHistoryPage";
import CareReportPage from "./pages/CareReportPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MonitoringPage />} />
          <Route path="/alerts" element={<AlertHistoryPage />} />
          <Route path="/care-report" element={<CareReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
