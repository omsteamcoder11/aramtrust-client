// app/accountability/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accountability & Financial Transparency | ChildSave",
  description:
    "See how ChildSave ensures every donation is managed with care, independent audits, and rigorous oversight. We're committed to maximizing impact for children.",
};

export default function AccountabilityPage() {
  // Brand Color Guide:
  // Plum: text-[#8b265a] / bg-[#8b265a]
  // Green: text-[#1e6b52] / bg-[#1e6b52]

  return (
    <main className="bg-white overflow-x-hidden text-slate-800">
      {/* Hero Section - Updated with brand-aligned gradient */}
      <section className="bg-gradient-to-br from-[#fdf2f8] via-white to-[#f0f9f6] py-12 md:py-20 lg:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold text-[#8b265a] uppercase tracking-[0.2em]">
            Smart Giving
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Accountability: Maximizing the Benefit of your Funds
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            At ChildSave, every dollar you give is managed with care, backed by
            independent audits, rigorous financial oversight and a commitment to
            ethical practices.
          </p>
        </div>
      </section>

      {/* Charity Ratings Section - Cards updated to be cleaner & brand-focused */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              ChildSave charity ratings
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Some of the most trusted names in the industry have taken notice
              of how efficiently we use your donations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Rating Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#8b265a]">Charity Navigator</h3>
                  <span className="text-2xl sm:text-3xl">⭐️⭐️⭐️⭐️</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  ChildSave has received <strong>4 out of 4 stars</strong> from Charity Navigator, with the highest score of 100 in accountability.
                </p>
              </div>
            </div>

            {/* Rating Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#8b265a]">CharityWatch</h3>
                <span className="text-2xl sm:text-3xl font-black text-[#1e6b52]">A-</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                CharityWatch named ChildSave as a top-rated charity with an <strong>“A-” grade</strong> based on financial efficiency.
              </p>
            </div>

            {/* Rating Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#8b265a]">Great Nonprofits</h3>
                <span className="text-2xl sm:text-3xl">🏆</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Great Nonprofits has recognized ChildSave as a <strong>Top-Rated Charity</strong> based on community feedback.
              </p>
            </div>

            {/* Rating Card 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#8b265a]">Candid</h3>
                <span className="text-2xl sm:text-3xl">💎</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                ChildSave has earned Candid's <strong>Platinum Seal of Transparency</strong>, the highest level offered.
              </p>
            </div>

            {/* Rating Card 5 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#8b265a] leading-tight">BBB Wise Giving</h3>
                <span className="text-2xl sm:text-3xl text-[#1e6b52]">✓</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                ChildSave meets the Better Business Bureau standards for charity accountability on all <strong>20 categories</strong>.
              </p>
            </div>

            {/* Quote Card - Updated with Plum background */}
            <div className="bg-[#8b265a] rounded-xl p-6 shadow-sm border-none flex items-center justify-center text-center text-white">
              <div>
                <p className="italic text-sm sm:text-base opacity-90">
                  “ChildSave’s dedication to transparency sets a benchmark for child-focused organizations.”
                </p>
                <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  — Independent Review Panel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Financial Docs - Subtle Background shift */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Looking for more?</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Resources you can use to check out ChildSave:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "📘", title: "Annual Report (PDF)", desc: "Review of facts and financials." },
              { icon: "📄", title: "Form 990 (PDF)", desc: "Tax return showing income/expenses." },
              { icon: "🔍", title: "Audited Financials", desc: "Independently audited statements." },
              { icon: "📊", title: "Candid Profile", desc: "Leading source of nonprofit info." },
              { icon: "🏷️", title: "Tax ID / EIN", desc: "ChildSave's ID: XX-XXXXXXX" },
            ].map((item, idx) => (
              <a key={idx} href="#" className="block bg-white rounded-lg p-5 md:p-6 shadow-sm hover:border-[#8b265a] transition-all border border-gray-200 group">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#8b265a] text-sm sm:text-base transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Where your donation goes - Text focus with brand accent */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Where your donation goes
            </h2>
            <div className="bg-[#f0f9f6] border-l-4 border-[#1e6b52] rounded-r-2xl p-6 md:p-10">
              <p className="text-gray-800 text-base sm:text-lg font-medium leading-relaxed mb-4">
                Your confidence in our work is extremely important to us. We’ve
                established stringent accounting and financial reporting
                procedures.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Your sponsorship contributions are transferred
                directly to the field agencies to provide
                benefits tailored to each child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checks and balances */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Checks and balances
            </h2>
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: "✓", text: "Thorough system of checks and balances to ensure funds are spent as planned." },
                { icon: "🔍", text: "Independent audits of every agency align funds with approved budgets." },
                { icon: "🌍", text: "HQ representatives perform frequent reviews of facilities and conduct field interviews." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-200 flex items-start gap-4 hover:border-[#1e6b52] transition-colors">
                  <div className="text-xl sm:text-2xl shrink-0 text-[#1e6b52] font-bold">{item.icon}</div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Efficiency Stat - Large brand-colored spotlight */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#8b265a] to-[#5a183a] rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-xl">
            <div className="text-5xl sm:text-7xl font-black text-white mb-4">82%</div>
            <p className="text-lg sm:text-xl text-pink-100 font-semibold tracking-wide">
              of our total operating expenses supported programs for children in FY 2024.
            </p>
          </div>
          <div className="mt-10 sm:mt-12 max-w-2xl mx-auto">
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              Thank you for choosing <span className="text-[#8b265a] font-bold italic uppercase tracking-tighter">Child</span><span className="text-[#1e6b52] font-bold italic uppercase tracking-tighter">Save</span>. Your support delivers positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist and refined */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 text-center">
        <p className="max-w-7xl mx-auto text-xs sm:text-sm text-gray-400 font-medium tracking-wide uppercase">
          ChildSave is a registered 501(c)(3) nonprofit organization. <br className="sm:hidden" /> All
          donations are tax-deductible.
        </p>
      </footer>
    </main>
  );
}