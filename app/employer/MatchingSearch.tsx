"use client";

import { useState } from "react";

// Mock data for demonstration - NO CHANGES MADE
const mockCompanies = [
  "Microsoft",
  "Google",
  "Apple",
  "Amazon",
  "Walmart",
  "Bank of America",
  "Coca-Cola",
  "Johnson & Johnson",
  "Procter & Gamble",
  "Verizon",
  "AT&T",
  "Wells Fargo",
  "Home Depot",
  "Costco",
  "Target",
];

export function MatchingSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const filtered = mockCompanies.filter((company) =>
      company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
    setHasSearched(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Brand-Matched Search Container */}
      <div className="relative p-1 bg-gradient-to-r from-[#8A2B59]/10 via-white to-[#008767]/10 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#8A2B59] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Type your employer’s name"
              className="w-full pl-12 pr-4 py-4 rounded-lg border-none bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#8A2B59]/20 text-slate-700 placeholder-slate-400 transition-all text-base font-medium"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#8A2B59] text-white px-10 py-4 sm:py-2 rounded-lg font-bold hover:bg-[#722149] transition-all shadow-lg active:scale-[0.96] flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Section - Brand Themed */}
      {hasSearched && (
        <div className="mt-8 animate-in fade-in slide-in-from-top-3 duration-500">
          {results.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-15px_rgba(138,43,89,0.1)] overflow-hidden">
              <div className="bg-[#8A2B59]/5 px-6 py-4 border-b border-[#8A2B59]/10 flex items-center justify-between">
                <p className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="bg-[#008767] text-white px-2.5 py-0.5 rounded text-xs font-black">
                    {results.length}
                  </span>
                  {results.length !== 1 ? "Employers" : "Employer"} found
                </p>
              </div>
              
              <div className="p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {results.map((company) => (
                    <li 
                      key={company} 
                      className="group flex items-center gap-3 text-slate-600 hover:text-[#8A2B59] p-3 rounded-lg hover:bg-[#8A2B59]/5 transition-all cursor-default border border-transparent"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#008767] group-hover:bg-[#8A2B59] transition-colors"></span>
                      <span className="font-semibold text-sm sm:text-base tracking-tight">{company}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Brand Warning/Info Box */}
                <div className="mt-8 p-5 bg-[#008767]/5 rounded-xl border border-[#008767]/10 flex gap-4 items-start">
                  <div className="text-[#008767] mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-[#008767] uppercase tracking-wider text-[11px] block mb-0.5">Next Steps</span> 
                    Please check with your HR department for specific matching gift
                    procedures and eligibility requirements.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-800 font-bold text-lg">
                No matching employers found
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Please contact your HR department directly to inquire about matching gifts.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer Attribution - Low Profile */}
      <p className="mt-10 text-[10px] text-slate-400 text-center uppercase tracking-[0.25em] font-bold">
        Matching Gift and Volunteer Grant information provided by
      </p>
    </div>
  );
}