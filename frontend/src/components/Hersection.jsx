import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-8 max-w-[1280px] mx-auto">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text Content */}
        <div className="space-y-6 md:space-y-8 text-left">
          {/* AI Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800/50">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            AI Engine v2.4 Active
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#0f172a] dark:text-white leading-tight tracking-tight">
              Instant Loan <br className="hidden md:block" />
              <span className="text-[#00779b] dark:text-blue-400">Predictions</span>
            </h1>
            <p className="text-[#494548] dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Our platform leverages advanced ML models to deliver 99.9% accuracy, enabling data-driven credit decisions in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="w-full sm:w-auto px-4 sm:px-8 py-4 bg-[#0f172a] dark:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-[#1e293b] dark:hover:bg-blue-500 shadow-lg shadow-blue-900/10 dark:shadow-blue-500/20">
              Check My Eligibility
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-8 py-4 bg-white dark:bg-transparent text-[#0f172a] dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
              Learn More
            </button>
          </div>
        </div>

        {/* Performance Metrics Card */}
        <div className="w-full lg:block">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-100 dark:border-slate-800/80 shadow-2xl shadow-blue-900/5 dark:shadow-none space-y-8 relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 dark:bg-blue-600 rounded-full blur-3xl -mr-8 -mt-8 opacity-50 dark:opacity-10 sm:w-32 sm:h-32 sm:-mr-16 sm:-mt-16"></div>

            <div className="flex justify-between items-center relative z-10">
              <h4 className="font-bold text-[#0f172a] dark:text-white text-lg md:text-xl">Model Performance</h4>
              <span className="bg-blue-50 dark:bg-blue-900/40 text-[#00779b] dark:text-blue-400 px-3 py-1 rounded-full text-sm font-bold">Real-time</span>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-[#494548] dark:text-slate-400">
                  <span>System Reliability</span>
                  <span className="dark:text-white">99.9%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00779b] dark:bg-blue-500 w-[99.9%] rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-700/50">
                  <p className="text-sm font-semibold text-[#494548] dark:text-slate-400 mb-1">Avg. Latency</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white">124ms</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-700/50">
                  <p className="text-sm font-semibold text-[#494548] dark:text-slate-400 mb-1">Confidence</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#00779b] dark:text-blue-400">99.8%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-3 text-sm text-[#7a7579] dark:text-slate-500">
                <span className="material-symbols-outlined text-sm text-green-500">verified</span>
                Verified by Global Credit Standards
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;