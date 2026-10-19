import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChristmasGamePage from "./pages/ChristmasGamePage";
import NightMovementDashboardPage from "./pages/NightMovementDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NightMovementDashboardPage />} />
        <Route path="/game" element={<ChristmasGamePage />} />
        <Route path="*" element={<NightMovementDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
