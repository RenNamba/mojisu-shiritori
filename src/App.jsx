import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TitlePage from "./pages/TitlePage";
import SettingsPage from "./pages/SettingsPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
