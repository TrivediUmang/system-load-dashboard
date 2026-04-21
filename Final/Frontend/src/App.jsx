import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard"; // Check path: src/components/Dashboard.jsx
import { score } from "./model.js";

export default function App() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const BASE_URL = "http://localhost:3000";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/metrics`);
      const data = res.data;
      const cpu = Math.round(data.cpu) || 0;
      const memory = Math.round(data.memory) || 0;
      const pCount = parseInt(data.process_count) || 0;
      const disk = Math.round(data.disk || data.disk_usage || 0);
      const vMem = Math.round(data.virtual_memory || data.vmem || 0);

      const currentMetrics = { cpu, memory, disk, vMem, pCount, risk: score([cpu, memory, pCount]) >= 1.5 ? "HIGH" : "LOW" };
      setMetrics(currentMetrics);

      setHistory(prev => {
        const newEntry = { time: new Date().toLocaleTimeString().split(' ')[0], cpu, memory, disk, vMem };
        return [...prev, newEntry].slice(-40);
      });
    } catch (err) {
      console.error("Backend Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div className="h-screen bg-black flex items-center justify-center text-indigo-500 font-black">BOOTING DELL G15...</div>;

  return <Dashboard data={metrics} history={history} />;
}