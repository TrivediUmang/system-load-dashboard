import React from 'react';
import { Cpu, Zap, Terminal } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

const Dashboard = ({ data, history = [] }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 md:p-10">
      <header className="max-w-[1600px] mx-auto mb-10 flex justify-between items-center border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            System Load <span className="text-indigo-500">Dashboard</span> | Dell G15
          </h1>
          <p className="text-slate-500 font-bold tracking-[0.2em] text-xs uppercase italic">Infrastructure Intelligence Engine</p>
        </div>
        <div className="bg-[#111827] px-8 py-4 rounded-2xl border border-white/20 shadow-2xl text-right">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">AI Prediction</p>
          <p className={`text-3xl font-black italic ${data.risk === "HIGH" ? "text-red-500" : "text-emerald-400"}`}>
             {data.risk} RISK
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <div className="bg-[#0f172a] rounded-[2.5rem] p-10 grid grid-cols-1 md:grid-cols-2 gap-12 border border-white/5 shadow-2xl">
            <div className="space-y-10">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2"><Cpu size={16} /> Metrics</h3>
              <MetricRow label="CPU Utility" value={data.cpu} color="#3b82f6" />
              <MetricRow label="Memory (RAM)" value={data.memory} color="#a855f7" />
              <MetricRow label="Disk Activity" value={data.disk} color="#10b981" />
            </div>
            <div className="md:border-l border-white/10 md:pl-12 space-y-10">
              <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2"><Terminal size={16} /> Analysis</h3>
              <IndicatorItem label="Virtual Memory (Swap)" value={`${data.vMem}%`} />
              <IndicatorItem label="Active Processes" value={data.pCount} />
              <IndicatorItem label="Status" value="Operational" />
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl h-[450px]">
            <div className="flex gap-4 mb-6 justify-end text-[10px] font-black uppercase">
              <span className="text-blue-400">● CPU</span> <span className="text-purple-400">● RAM</span> <span className="text-emerald-400">● Disk</span> <span className="text-yellow-400">● Swap</span>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} stroke="#FFFFFF" fontSize={12} fontWeight="900" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="cpu" stroke="#60a5fa" strokeWidth={4} fill="rgba(99,102,241,0.2)" isAnimationActive={false} />
                <Area type="monotone" dataKey="memory" stroke="#c084fc" strokeWidth={2} fill="transparent" isAnimationActive={false} />
                <Area type="monotone" dataKey="disk" stroke="#10b981" strokeWidth={2} fill="transparent" isAnimationActive={false} />
                <Area type="monotone" dataKey="vMem" stroke="#fbbf24" strokeWidth={2} fill="transparent" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-10">
          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 flex-1 border border-white/5 flex flex-col shadow-2xl">
            <h3 className="text-sm font-black text-white mb-8 flex items-center gap-2 uppercase tracking-widest"><Zap size={20} className="text-yellow-400" /> AI Advisory</h3>
            <div className="h-48 mb-8 rounded-3xl bg-black/40 border border-white/5 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}><Line type="step" dataKey="cpu" stroke="#a3e635" strokeWidth={3} dot={false} isAnimationActive={false} /></LineChart>
              </ResponsiveContainer>
            </div>
            <div className={`p-8 rounded-3xl border-2 flex-1 flex items-center justify-center transition-all ${data.risk === "HIGH" ? "bg-red-500/20 border-red-500" : "bg-emerald-500/20 border-emerald-500"}`}>
              <p className="text-xl font-black text-white italic text-center uppercase leading-tight tracking-tighter">
                {data.risk === "HIGH" ? "CRITICAL LOAD: OPTIMIZE NOW." : "STABILITY OPTIMAL: NO ACTION."}
              </p>
            </div>
            <button className="w-full mt-10 bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.5em] shadow-lg">Retrain Model</button>
          </div>
        </div>
      </main>
    </div>
  );
};

function MetricRow({ label, value, color }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="text-4xl font-black text-white">{value}%</span>
      </div>
      <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
        <div className="h-full" style={{ width: `${value}%`, backgroundColor: color, boxShadow: `0 0 15px ${color}88` }} />
      </div>
    </div>
  );
}

function IndicatorItem({ label, value }) {
  return (
    <div className="flex justify-between items-center py-8 border-b border-white/5 last:border-0">
      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{label}</span>
      <span className="text-3xl font-black text-white italic tracking-tighter">{value}</span>
    </div>
  );
}

export default Dashboard;