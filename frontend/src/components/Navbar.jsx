import React, { useState, useEffect, useRef } from 'react'; 

const Navbar = () => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuRef = useRef(null); 

  // Close the menu automatically when clicking outside of it 
  useEffect(() => { 
    const handleClickOutside = (event) => { 
      if (menuRef.current && !menuRef.current.contains(event.target)) { 
        setIsMenuOpen(false); 
      } 
    }; 
    document.addEventListener('mousedown', handleClickOutside); 
    return () => document.removeEventListener('mousedown', handleClickOutside); 
  }, []); 

  return ( 
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100"> 
      <div className="flex justify-between items-center px-4 h-16 w-full max-w-[1280px] mx-auto md:px-8"> 

        {/* Brand Logo & Name */} 
        <div className="flex items-center gap-3"> 
          <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center text-white shrink-0"> 
            <span className="material-symbols-outlined"></span> 
          </div> 
          <span className="text-xl font-bold text-[#0f172a] tracking-tight"> 
            LendingAI 
          </span> 
        </div> 

        {/* Desktop Navigation Links (Hidden on Mobile) */} 
        <nav className="hidden md:flex items-center gap-8"> 
          <a href="#" className="text-sm font-semibold text-[#0f172a] hover:text-[#00779b] transition-colors">Home</a> 
          <a href="#" className="text-sm font-semibold text-[#494548] hover:text-[#0f172a] transition-colors">Insights</a> 
          <a href="#" className="text-sm font-semibold text-[#494548] hover:text-[#0f172a] transition-colors">Applications</a> 
          <a href="#" className="text-sm font-semibold text-[#494548] hover:text-[#0f172a] transition-colors">Settings</a> 
        </nav> 

        {/* User Actions Container */} 
        <div className="flex items-center gap-4 relative" ref={menuRef}> 
          <button className="hidden md:flex px-4 py-2 bg-[#0f172a] text-white rounded-lg text-sm font-bold active:scale-95 transition-transform"> 
            Get Started 
          </button> 

          {/* Profile Button / Menu Trigger */} 
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden scale-95 active:scale-90 transition-transform cursor-pointer shrink-0 focus:outline-none focus:border-[#0f172a]" 
            aria-label="Toggle user menu" 
          > 
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATaYWDGgcnx-hDK1MPjJ6zc-h75gwMSBEATSyD_CoK4H7QRGGMoKxtRRTZWx-Ql6IfQgM5OpM6RyLHuD_H3wHCVp5mQyABO1lcZfsYddRveBVdI8DeC6VzJUp9MeQMDu9dKVTg8OnBzuvuDJtc3NSvZ6VKi4lERc0MnqNBJRKiyftPqUaRfc9BvrioPSBqtmfOow2ytrNSIv-STAh2uwQdc7WgaK7Za7gIdLpxFty-M9NNuGOp8FobkqkU05MVnT4OgUeXjtllMA" 
            /> 
          </button> 

          {/* Unified Dropdown Menu */} 
          {isMenuOpen && ( 
            <div className="absolute right-0 top-14 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 flex flex-col z-50"> 

              {/* Mobile-Only Navigation Links (Hidden on Desktop) */} 
              <div className="flex flex-col md:hidden border-b border-slate-100 pb-2 mb-2"> 
                <a href="#" className="px-4 py-2.5 text-sm font-semibold text-[#0f172a] hover:bg-slate-50">Home</a> 
                <a href="#" className="px-4 py-2.5 text-sm font-semibold text-[#494548] hover:text-[#0f172a] hover:bg-slate-50">Insights</a> 
                <a href="#" className="px-4 py-2.5 text-sm font-semibold text-[#494548] hover:text-[#0f172a] hover:bg-slate-50">Applications</a> 
                <a href="#" className="px-4 py-2.5 text-sm font-semibold text-[#494548] hover:text-[#0f172a] hover:bg-slate-50">Settings</a> 
                <div className="px-4 pt-2"> 
                  <button className="w-full py-2 bg-[#0f172a] text-white rounded-lg text-xs font-bold active:scale-[0.98] transition-transform"> 
                    Get Started 
                  </button> 
                </div> 
              </div> 

              {/* Standard Profile Dropdown Links (Visible on All Screens) */} 
              <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider"> 
                Account 
              </div> 
              <a href="#profile" className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"> 
                <span className="material-symbols-outlined text-lg"></span> 
                Profile Details 
              </a> 
              <a href="#billing" className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"> 
                <span className="material-symbols-outlined text-lg"></span> 
                Billing 
              </a> 
              <div className="border-t border-slate-100 mt-2 pt-2"> 
                <a href="#logout" className="px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"> 
                  <span className="material-symbols-outlined text-lg"></span> 
                  Log Out 
                </a> 
              </div> 
            </div> 
          )} 
        </div> 
      </div> 
    </header> 
  ); 
}; 

export default Navbar;