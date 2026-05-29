import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import MonitoringPage from "./pages/MonitoringPage";
import AlertHistoryPage from "./pages/AlertHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MonitoringPage />} />
          <Route path="/alerts" element={<AlertHistoryPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
