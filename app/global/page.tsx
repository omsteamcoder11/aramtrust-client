import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Philanthropy | ChildSave",
  description:
    "Ignite potential and break the cycle of poverty through strategic giving. Learn how your philanthropy creates lasting impact for children and youth worldwide.",
};

export default function GlobalPhilanthropyPage() {
  return (
    <main className="bg-white selection:bg-emerald-50 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-28 md:pb-32 overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center">
          <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 md:mb-6 block">
            Ignite this generation’s potential
          </span>
          
          <h1 className="text-3xl md:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-tight mb-6 md:mb-8">
            Join us to help break the <br className="hidden md:block" /> cycle of poverty 
            <span className="text-[#008767] block md:inline md:ml-4">for thousands</span>
          </h1>

          <div className="max-w-3xl mx-auto mt-8 md:mt-12">
            <p className="text-base md:text-xl text-slate-600 font-medium mb-6">
              ChildSave’s ultimate goal for all children and youth:
            </p>
            <div className="relative inline-block w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8A2B59] to-[#008767] rounded-3xl md:rounded-[2.5rem] opacity-10 blur-xl"></div>
                <p className="relative text-lg md:text-3xl text-slate-800 font-semibold italic leading-relaxed px-6 py-8 md:px-10 md:py-12 bg-white border border-slate-100 rounded-3xl md:rounded-[2.5rem] shadow-sm">
                  "A confident young adult who is sustainably employed and has the
                  mindset, skills and tools to reach their goals and positively
                  influence their community."
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Into Employment Fall Report Card */}
      <section className="py-8 md:py-12 bg-white relative z-10 -mt-6 md:-mt-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#8A2B59] rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
                Into Employment Fall Report
              </h2>
              <p className="text-white/90 text-base md:text-lg font-medium">
                Discover how your generosity ignites hope and opportunity globally.
              </p>
            </div>
            
            <a
              href="#"
              className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#008767] text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#00755a] transition-all active:scale-95 shadow-lg"
            >
              <span>Read Report (PDF)</span>
              <span className="text-xl">📄</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why ChildSave */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 uppercase tracking-tight">
              Why ChildSave?
            </h2>
            <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#008767] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <FeatureCard 
              icon="📈" 
              title="Proven Workforce" 
              text="84% of participants find jobs within six months, often tripling family incomes." 
            />
            <FeatureCard 
              icon="⭐" 
              title="Trusted Impact" 
              text="Top-rated by Charity Navigator and BBB for transparency and accountability." 
            />
            <FeatureCard 
              icon="🌍" 
              title="Locally Led" 
              text="In-country teams follow development frameworks to create holistic initiatives." 
            />
            <FeatureCard 
              icon="💡" 
              title="Continuous Innovation" 
              text="Impacting over 1 million children since 1936 through data-driven learning." 
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-12 md:mb-20 uppercase tracking-tight">
            The problem we are solving
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <StatCard value="1B" label="CHILDREN" detail="Living in multidimensional poverty lacking basic necessities." />
            <StatCard value="1 in 4" label="YOUTH" detail="Unemployed or lacking access to formal education/training." />
            <StatCard value="3 in 5" label="WOMEN" detail="Over-represented in informal and vulnerable employment sectors." />
          </div>
          <p className="text-[10px] md:text-xs text-slate-400 mt-12 md:mt-20 font-bold uppercase tracking-[0.2em]">
            Sources: Social Policy: Child Poverty, UNICEF, 2024; ILO/SIDA, 2020; UN Women, 2024.
          </p>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12 md:mb-20 uppercase tracking-tight">
            Ways to make a difference
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <GivingCard title="Give to our mission" description="Maintain critical programs for children in poverty." icon="💝" />
            <GivingCard title="Invest in Employment" description="Help youth secure sustainable jobs and escape poverty." icon="💼" />
            <GivingCard title="Estate Planning" description="Create a lasting legacy through your will or trust." icon="📜" />
            <GivingCard title="Gifts of Stock" description="A tax-efficient way to support global change." icon="📈" />
            <GivingCard title="Donor-Advised Fund" description="Support families through your personal DAF grant." icon="🏦" />
            <GivingCard title="Matching Gifts" description="Double your impact through corporate matching." icon="🤝" />
            <GivingCard title="Cryptocurrency" description="Donate via Bitcoin or Ether for modern change." icon="₿" />
            <GivingCard title="Pathfinders" description="Join visionary investors solving global poverty." icon="🧭" />
          </div>
        </div>
      </section>

      {/* Pathfinders Society */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#008767] opacity-20 blur-[80px]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8 leading-tight">Join the ChildSave Pathfinders Society</h3>
            <p className="text-slate-300 mb-8 md:mb-12 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              Be part of a visionary group of investors dedicated to solving global poverty at scale.
            </p>
            <button className="w-full md:w-auto bg-[#008767] text-white px-10 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#00755a] transition-all active:scale-95 shadow-lg">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Donor Spotlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-10 md:mb-16 uppercase tracking-tight">Donor spotlights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <SpotlightCard 
              initials="MI" 
              color="bg-[#8A2B59] text-white" 
              name="Marvin Irby" 
              title="Board Member, 24-year supporter"
              quote="An investment in ChildSave is more than providing goods and services. It’s providing an opportunity for a better life for entire communities."
              description="Marvin witnessed the transformative effect of ChildSave’s support in the Philippines, profoundly touched by the commitment of alumni."
            />
            <SpotlightCard 
              initials="GB" 
              color="bg-[#008767] text-white" 
              name="Gordon & Donna Bailey" 
              title="30-year supporters"
              quote="It’s about trying to become a complete human being and giving in recognition of our blessings."
              description="Beginning with two children, they expanded their impact by building community centers and seeding the Into Employment program."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 py-20 md:py-32 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8 uppercase tracking-tight leading-tight">
            Ready to ignite potential?
          </h3>
          <p className="text-slate-600 mb-10 md:mb-12 text-lg md:text-xl font-medium">
            Your philanthropy today creates lasting change for generations.
          </p>
          <button className="w-full md:w-auto bg-[#8A2B59] text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-[#72234a] transition-all shadow-xl active:scale-95">
            Make a Difference Now
          </button>
        </div>
      </section>
    </main>
  );
}

/* UI Helper Components - Height & Padding Optimized for Mobile */

function FeatureCard({ icon, title, text }: any) {
  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 hover:border-[#008767]/30 transition-all hover:shadow-lg flex flex-col items-start text-left h-auto">
      <div className="text-4xl md:text-5xl mb-4 md:mb-8">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-4 uppercase tracking-tight leading-tight">{title}</h3>
      <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">{text}</p>
    </div>
  );
}

function StatCard({ value, label, detail }: any) {
  return (
    <div className="text-center">
      <div className="text-5xl md:text-7xl font-bold text-[#8A2B59] mb-2 md:mb-4">{value}</div>
      <p className="text-[#008767] font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase mb-3 md:mb-6">{label}</p>
      <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-[280px] mx-auto font-medium">{detail}</p>
    </div>
  );
}

function SpotlightCard({ initials, color, name, title, quote, description }: any) {
  return (
    <div className="bg-slate-50/50 rounded-2xl md:rounded-[2.5rem] p-6 md:p-14 border border-slate-100 transition-all hover:bg-white flex flex-col h-auto">
      <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-10">
        <div className={`w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold shadow ${color}`}>
          {initials}
        </div>
        <div>
          <h3 className="text-lg md:text-2xl font-bold text-slate-900 uppercase tracking-tight">{name}</h3>
          <p className="text-[#008767] font-bold text-[10px] md:text-xs tracking-widest uppercase mt-1">{title}</p>
        </div>
      </div>
      <blockquote className="text-slate-800 font-bold text-lg md:text-2xl mb-4 md:mb-8 leading-relaxed border-l-4 border-[#8A2B59] pl-4 md:pl-8 italic">
        “{quote}”
      </blockquote>
      <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function GivingCard({ title, description, icon }: any) {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-100 hover:border-[#8A2B59]/30 transition-all shadow-sm flex flex-col h-auto">
      <div className="text-3xl md:text-4xl mb-4 md:mb-6">{icon}</div>
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight leading-tight">{title}</h3>
      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{description}</p>
    </div>
  );
}