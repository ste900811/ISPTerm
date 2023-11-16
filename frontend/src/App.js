import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Sidebar } from "./Components/Sidebar";
import { Home } from './Pages/Home';
import { AddDelete } from './Pages/AddDelete';
import { CalCalculator } from './Pages/CalCalculator';
import { NoPage } from './Pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddDelete" element={<AddDelete />} />
        <Route path="/CalCalculator" element={<CalCalculator />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
