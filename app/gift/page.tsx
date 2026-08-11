import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Planning & Legacy Giving | ChildSave",
  description:
    "Create a lasting legacy by including ChildSave in your will, trust, or other planned giving arrangements.",
};

export default function GiftPlanningPage() {
  return (
    <main className="bg-white overflow-x-hidden selection:bg-[#8A2B59] selection:text-white">
      {/* Hero Section - High-End Editorial Style */}
      <section className="relative py-20 md:py-32 bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#008767] animate-pulse" />
            <span className="text-[10px] font-black text-[#008767] uppercase tracking-[0.2em]">Legacy Division</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase mb-8">
            Create a <br /> <span className="text-[#8A2B59]">lasting legacy</span>
          </h1>
          <p className="text-[#008767] font-black text-sm md:text-lg uppercase tracking-[0.4em] mb-8">
            Gift planning for a better future
          </p>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium italic">
            When you include ChildSave in your estate plans, you ensure that
            children and families will continue to break free from poverty for
            generations to come.
          </p>
        </div>
      </section>

      {/* Quote Section - Impactful & Condensed */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 p-10 md:p-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A2B59]/20 blur-3xl" />
             <p className="text-white text-xl md:text-3xl leading-snug font-light tracking-tight">
              <span className="text-[#8A2B59] text-6xl font-serif leading-none absolute -top-2 -left-2 opacity-50">“</span>
              Planned gifts are a powerful way to support ChildSave’s mission
              while achieving your own financial and philanthropic goals.
              Whether you choose a bequest in your will, a charitable gift
              annuity, or a trust arrangement, your generosity will have a
              lasting impact on children and families around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Options Grid - Modern Card Architecture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <GiftOptionCard
              title="Bequest (Will or Trust)"
              description="Include ChildSave in your will or living trust. You can designate a specific amount, a percentage of your estate, or residual assets."
              icon="📜"
            />
            <GiftOptionCard
              title="Charitable Gift Annuity"
              description="Receive fixed payments for life while making a gift to ChildSave. Enjoy tax benefits and a reliable income stream."
              icon="💰"
            />
            <GiftOptionCard
              title="Charitable Remainder Trust"
              description="Place assets in a trust that pays income to you or your beneficiaries for a set period, after which the remainder goes to ChildSave."
              icon="🤝"
            />
            <GiftOptionCard
              title="Retirement Plan Beneficiary"
              description="Name ChildSave as a beneficiary of your IRA, 401(k), or other retirement plan. This can be a tax‑efficient way to give."
              icon="📈"
            />
            <GiftOptionCard
              title="Life Insurance"
              description="Designate ChildSave as the owner or beneficiary of a life insurance policy. You may receive a charitable deduction."
              icon="🛡️"
            />
            <GiftOptionCard
              title="Donor‑Advised Fund"
              description="Recommend a grant from your DAF to support ChildSave now or in the future. Learn about successor advisors."
              icon="🏦"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark Mode Energy */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-16">
            Benefits of <span className="text-[#008767]">planned giving</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            <BenefitCard
              title="Tax Advantages"
              description="Reduce income, estate, or capital gains taxes depending on the type of gift."
              icon="📊"
            />
            <BenefitCard
              title="Income for Life"
              description="Certain plans, like charitable gift annuities, provide you with guaranteed income for life."
              icon="💵"
            />
            <BenefitCard
              title="Lasting Impact"
              description="Your gift ensures children and families can escape poverty for generations to come."
              icon="🌟"
            />
          </div>
        </div>
      </section>

      {/* Sample Language - The Terminal Look */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-10">Sample bequest language</h2>
          <div className="bg-[#FDFCFD] border border-slate-200 p-8 md:p-12 text-left relative">
            <div className="flex gap-1.5 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            </div>
            <p className="font-mono text-sm md:text-lg text-slate-600 leading-relaxed">
              "I give, devise, and bequeath to ChildSave, a nonprofit
              organization with its principal office at [Address], the sum of
              $______ (or ____% of the residue of my estate) to be used for its
              general purposes."
            </p>
          </div>
          <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Please contact us for our full legal name, tax ID, and specific language tailored to your intent.
          </p>
        </div>
      </section>

      {/* Footer CTA - High Contrast */}
      <section className="py-24 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-6 text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
            Ready to plan <br /> <span className="text-[#8A2B59]">your legacy?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
            Our planned giving team is here to answer your questions and help
            you choose the option that best meets your goals—all in confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#8A2B59] text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-[#a1346a] transition-all text-xs active:scale-95 shadow-2xl">
              Contact Our Team
            </a>
            <a href="#" className="border border-slate-700 text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all text-xs active:scale-95">
              Request Free Brochure
            </a>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <footer className="py-12 bg-white text-center border-t border-slate-100">
        <p className="max-w-4xl mx-auto px-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-loose">
          The information on this page is for educational purposes only and
          does not constitute legal or financial advice. Please consult with
          your professional advisors to determine the best strategy for your
          situation.
        </p>
      </footer>
    </main>
  );
}

function GiftOptionCard({ title, description, icon }: any) {
  return (
    <div className="group bg-white p-10 border border-slate-100 hover:border-[#8A2B59] transition-all duration-300 relative">
      <div className="text-4xl mb-8 transform group-hover:-translate-y-1 transition-transform">{icon}</div>
      <h3 className="text-xl font-black text-slate-900 group-hover:text-[#8A2B59] transition-colors uppercase tracking-tight mb-4">
        {title}
      </h3>
      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
        {description}
      </p>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#8A2B59] group-hover:w-full transition-all duration-500" />
    </div>
  );
}

function BenefitCard({ title, description, icon }: any) {
  return (
    <div className="bg-white p-12 hover:bg-[#FDFCFD] transition-all group">
      <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4">{title}</h3>
      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{description}</p>
    </div>
  );
}