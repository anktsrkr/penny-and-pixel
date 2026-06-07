import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { AdventurePicker } from "./pages/AdventurePicker";
import { HomeWorld } from "./pages/HomeWorld";
import { LevelPlayer } from "./pages/LevelPlayer";
import { ParentDashboard } from "./pages/ParentDashboard";
import { StampBook } from "./pages/StampBook";
import { useProgressStore } from "./store/progressStore";

export function App() {
  const hydrate = useProgressStore((state) => state.hydrate);
  const hydrated = useProgressStore((state) => state.hydrated);
  const logSession = useProgressStore((state) => state.logSession);

  useEffect(() => {
    void hydrate().then(logSession);
  }, [hydrate, logSession]);

  if (!hydrated) {
    return <div className="loading-screen">Penny & Pixel is waking up...</div>;
  }

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomeWorld />} />
        <Route path="/adventures" element={<AdventurePicker />} />
        <Route path="/play/:gameId" element={<LevelPlayer />} />
        <Route path="/stamp-book" element={<StampBook />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
