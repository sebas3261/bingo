import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Game from "./pages/Game.jsx";
import Master from "./pages/Master.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game" element={<Game/>}/>
      <Route path="/master" element={<Master/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)
