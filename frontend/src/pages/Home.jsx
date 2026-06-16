jsx
import React from 'react';

const PrecisionCreditHome = () => {
  return (
    // UPDATED: Changed dark:bg-slate-950/40 to dark:bg-[#0f172a] for a solid, deep navy background
    <div className="min-h-screen bg-[#fcf8fa] dark:bg-[#0f172a] font-sans pb-24 text-[#1c1b1c] dark:text-white transition-colors duration-300">
      
      <main className="pt-24 px-4 md:px-8 space-y-8 max-w-[1280px] mx-auto">
        {/* Hero Section */}
        <section className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            AI Engine v2.4 Active
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#0f172a] dark:text-white leading-tight tracking-tight">
              Instant Loan <br className="hidden md:block" />
              <span className="text-[#00779b] dark:text-[#40c4ff]">Predictions</span>
            </h1>
            <p className="text-[#494548] dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Powered by advanced ML models for 99.9% accuracy. Data-driven decisions in seconds.
            </p>
          </div>

          <button className="w-full md:w-auto md:px-8 py-4 bg-black dark:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-gray-900 dark:hover:bg-slate-700 shadow-lg shadow-black/5">
            Check My Eligibility
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </button>
        </section>

        {/* Real-time Analysis Card */}
        <section className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#40c4ff] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined" aria-hidden="true">query_stats</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#0f172a] dark:text-white">Real-time Analysis</h3>
              <p className="text-sm text-[#494548] dark:text-slate-400">Live ML computation</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl relative overflow-hidden h-32">
             <div className="absolute top-3 right-4 text-[#00779b] dark:text-[#40c4ff] font-bold text-xs">
                0.02s latency
             </div>
             <div className="flex items-end gap-2 h-full pt-4">
                <div className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-sm h-[30%]"></div>
                <div className="flex-1 bg-slate-400 dark:bg-slate-600 rounded-sm h-[50%]"></div>
                <div className="flex-1 bg-slate-400 dark:bg-slate-600 rounded-sm h-[40%]"></div>
                <div className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-sm h-[20%]"></div>
                <div className="flex-1 bg-slate-500 dark:bg-slate-500 rounded-sm h-[60%]"></div>
                <div className="flex-1 bg-slate-400 dark:bg-slate-600 rounded-sm h-[35%]"></div>
                <div className="flex-1 bg-[#00779b] dark:bg-[#40c4ff] rounded-sm h-[80%]"></div>
             </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <span className="material-symbols-outlined text-[#0f172a] dark:text-[#40c4ff]" aria-hidden="true">database</span>
            <div>
              <h4 className="font-bold text-[#0f172a] dark:text-white">Secure Storage</h4>
              <p className="text-xs text-[#494548] dark:text-slate-400">PostgreSQL encrypted node</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <span className="material-symbols-outlined text-[#0f172a] dark:text-[#40c4ff]" aria-hidden="true">verified_user</span>
            <div>
              <h4 className="font-bold text-[#0f172a] dark:text-white">Transparent Scoring</h4>
              <p className="text-xs text-[#494548] dark:text-slate-400">Explainable AI models</p>
            </div>
          </div>
        </section>

        {/* System Status */}
        <section className="bg-white dark:bg-slate-900/50 px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
             </div>
             <div>
                <p className="font-bold text-sm text-[#0f172a] dark:text-white">System Status</p>
                <p className="text-xs text-[#494548] dark:text-slate-400">Node.js + Python 3.11</p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-green-600 dark:text-green-400 font-bold text-xs uppercase tracking-wider">Services Online</p>
             <p className="text-[#494548] dark:text-slate-400 text-xs font-medium">99.98% Uptime</p>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="bg-[#0f172a] dark:bg-slate-900 p-10 rounded-3xl text-center border border-transparent dark:border-slate-800 space-y-4 shadow-xl shadow-blue-900/10">
           <h3 className="text-white font-bold text-xl">Precision Analysis</h3>
           <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed">
             Our proprietary algorithm analyzes over 500 data points in under 100ms.
           </p>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-[#0f172a]/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 flex justify-around items-center h-20 pb-safe z-50">
        <button className="flex flex-col items-center gap-1 group">
          <div className="px-5 py-1 bg-[#40c4ff] rounded-full text-white transition-all group-active:scale-90">
            <span className="material-symbols-outlined" aria-hidden="true">home</span>
          </div>
          <span className="text-[10px] font-bold text-[#0f172a] dark:text-white">Home</span>
        </button>
        {/* Other buttons remain same */}
      </nav>
    </div>
  );
};

export default PrecisionCreditHome;