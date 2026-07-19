import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Images from "./pages/Images";
import Deployments from "./pages/Deployments";
import Compliance from "./pages/Compliance";
import Alerts from "./pages/Alerts";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/images" element={<Images />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;