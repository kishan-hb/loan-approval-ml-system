import React from 'react';

const PrecisionCreditHome = () => {
  return (
    <div className="min-h-screen bg-[#fcf8fa] font-sans pb-24 text-[#1c1b1c]">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex justify-between items-center px-4 h-16 w-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center text-white">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <span className="text-xl font-bold text-[#0f172a] tracking-tight">
              LendingAI
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden scale-95 active:scale-90 transition-transform cursor-pointer">
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATaYWDGgcnx-hDK1MPjJ6zc-h75gwMSBEATSyD_CoK4H7QRGGMoKxtRRTZWx-Ql6IfQgM5OpM6RyLHuD_H3wHCVp5mQyABO1lcZfsYddRveBVdI8DeC6VzJUp9MeQMDu9dKVTg8OnBzuvuDJtc3NSvZ6VKi4lERc0MnqNBJRKiyftPqUaRfc9BvrioPSBqtmfOow2ytrNSIv-STAh2uwQdc7WgaK7Za7gIdLpxFty-M9NNuGOp8FobkqkU05MVnT4OgUeXjtllMA"
            />
          </div>
        </div>
      </header>

      <main className="pt-24 px-4 space-y-8">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            AI Engine v2.4 Active
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-[#0f172a] leading-tight">
              Instant Loan <br />
              <span className="text-[#00779b]">Predictions</span>
            </h1>
            <p className="text-[#494548] text-lg leading-relaxed">
              Powered by advanced ML models for 99.9% accuracy. Data-driven decisions in seconds.
            </p>
          </div>

          <button className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            Check My Eligibility
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </section>

        {/* Real-time Analysis Card */}
        <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#40c4ff] flex items-center justify-center text-white">
              <span className="material-symbols-outlined">query_stats</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#0f172a]">Real-time Analysis</h3>
              <p className="text-sm text-[#494548]">Live ML computation</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl relative overflow-hidden h-32">
             <div className="absolute top-3 right-4 text-[#00779b] font-bold text-xs">
                0.02s latency
             </div>
             <div className="flex items-end gap-2 h-full pt-4">
                <div className="flex-1 bg-slate-300 rounded-sm h-[30%]"></div>
                <div className="flex-1 bg-slate-400 rounded-sm h-[50%]"></div>
                <div className="flex-1 bg-slate-400 rounded-sm h-[40%]"></div>
                <div className="flex-1 bg-slate-300 rounded-sm h-[20%]"></div>
                <div className="flex-1 bg-slate-500 rounded-sm h-[60%]"></div>
                <div className="flex-1 bg-slate-400 rounded-sm h-[35%]"></div>
                <div className="flex-1 bg-[#00779b] rounded-sm h-[80%]"></div>
             </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <span className="material-symbols-outlined text-[#0f172a]">database</span>
            <div>
              <h4 className="font-bold text-[#0f172a]">Secure Storage</h4>
              <p className="text-xs text-[#494548]">PostgreSQL encrypted node</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <span className="material-symbols-outlined text-[#0f172a]">verified_user</span>
            <div>
              <h4 className="font-bold text-[#0f172a]">Transparent Scoring</h4>
              <p className="text-xs text-[#494548]">Explainable AI models</p>
            </div>
          </div>
        </section>

        {/* System Status */}
        <section className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
             </div>
             <div>
                <p className="font-bold text-sm text-[#0f172a]">System Status</p>
                <p className="text-xs text-[#494548]">Node.js + Python 3.11</p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-green-600 font-bold text-xs uppercase tracking-wider">Services Online</p>
             <p className="text-[#494548] text-xs font-medium">99.98% Uptime</p>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="bg-[#0f172a] p-10 rounded-3xl text-center space-y-4">
           <h3 className="text-white font-bold text-xl">Precision Analysis</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             Our proprietary algorithm analyzes over 500 data points in under 100ms.
           </p>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-100 flex justify-around items-center h-20 pb-safe z-50">
        <button className="flex flex-col items-center gap-1">
          <div className="px-5 py-1 bg-[#40c4ff] rounded-full text-white">
            <span className="material-symbols-outlined">home</span>
          </div>
          <span className="text-[10px] font-bold text-[#0f172a]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#494548]">
          <span className="material-symbols-outlined text-[24px]">query_stats</span>
          <span className="text-[10px] font-medium">Insights</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#494548]">
          <span className="material-symbols-outlined text-[24px]">description</span>
          <span className="text-[10px] font-medium">Applications</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#494548]">
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default PrecisionCreditHome;