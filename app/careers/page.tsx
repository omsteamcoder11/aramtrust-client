// app/careers/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Employment | ChildSave",
  description:
    "Join ChildSave's mission to end child poverty. Explore career opportunities at our headquarters and around the world. Make a lasting impact with a compassionate team.",
};

export default function CareersPage() {
  // Job openings data
  const jobOpenings = [
    {
      title: "Global Director of Talent Growth Operations",
      location: "Kansas City, MO (Headquarters)",
      type: "Full-time",
    },
    {
      title: "Talent Growth Global Recruitment Manager",
      location: "Kansas City, MO (Headquarters)",
      type: "Full-time",
    },
    {
      title: "Country Program Director – Colombia",
      location: "Bogotá, Colombia",
      type: "Full-time",
    },
    {
      title: "Monitoring & Evaluation Specialist",
      location: "Nairobi, Kenya",
      type: "Full-time",
    },
    {
      title: "Communications Officer",
      location: "Manila, Philippines",
      type: "Full-time",
    },
    {
      title: "Finance & Operations Manager",
      location: "New Delhi, India",
      type: "Full-time",
    },
    {
      title: "Child Sponsorship Coordinator",
      location: "Remote (US-based)",
      type: "Full-time",
    },
    {
      title: "Volunteer Engagement Associate",
      location: "Kansas City, MO (Hybrid)",
      type: "Full-time",
    },
  ];

  return (
    <main className="bg-white overflow-x-hidden text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-[#fcfcfc] pt-24 pb-16 md:pt-40 md:pb-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8b265a] mb-8 block">
              We’re bringing people together to end poverty for good
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 text-gray-900">
              Careers: Join us <br />
              <span className="text-[#1e6b52]">in our mission</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-600 leading-relaxed max-w-2xl">
              When you join ChildSave, you&apos;re helping us unleash the potential in
              everyone, from employees and supporters to children and their
              families.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Our mission</h2>
              <p className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                We connect people around the world in the fight to end poverty.
                Working together, we invest in the lives of children and youth,
                empowering them to create <span className="italic font-serif text-[#1e6b52]">lasting change</span> in their own lives and
                in their communities.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-8 text-gray-900">
                We&apos;re seeking talented people who:
              </h3>
              <ul className="space-y-6">
                {[
                  "Live the mission",
                  "See potential in everyone",
                  "Believe connections matter",
                  "Are always learning",
                  "Own the impact",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <span className="w-2 h-2 rounded-full bg-[#8b265a] group-hover:scale-150 transition-transform"></span>
                    <span className="text-lg font-semibold text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-24 bg-[#fcfcfc] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900">Explore current <span className="text-[#1e6b52]">openings</span></h2>
              <p className="text-lg text-gray-500 font-medium italic font-serif">Impactful roles around the world</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
            {jobOpenings.map((job, idx) => (
              <div
                key={idx}
                className="bg-white p-10 flex flex-col justify-between group hover:bg-slate-50 transition-all duration-300"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#1e6b52] transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-500 font-medium">
                    <span className="text-sm">📍 {job.location}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-sm text-[#8b265a] font-bold uppercase tracking-wider text-[10px]">{job.type}</span>
                  </div>
                </div>
                <div className="mt-12 flex justify-between items-center">
                  <a href="#" className="inline-flex items-center text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    View Details <span className="ml-2 text-[#1e6b52]">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <button className="bg-[#1e6b52] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#268a69] transition-all shadow-xl shadow-[#1e6b52]/20 active:scale-95">
              View All Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Headquarters Location */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-100 pt-24">
            <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ChildSave Headquarters
              </h3>
              <address className="not-italic text-gray-600 text-lg leading-relaxed mb-8">
                2000 E. Red Bridge Rd.<br />
                Kansas City, MO 64131
              </address>
              <p className="text-gray-400 text-xs font-medium italic">
                Many of our positions offer flexible and remote options. Explore
                current openings to find the right fit for you.
              </p>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Equal Employment Opportunity
              </h2>
              <div className="prose prose-slate text-gray-600 leading-relaxed space-y-6">
                <p className="text-base font-medium">
                  ChildSave is committed to the principles of equal employment. We
                  are dedicated to complying with all federal, state, and local laws
                  providing equal employment opportunities. It is our intent to maintain a work
                  environment that is free of harassment, discrimination, or
                  retaliation.
                </p>
                <p className="text-sm text-gray-400">
                  This policy applies to all aspects of employment, including recruiting, hiring, placement, promotion,
                  compensation, and termination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1a1a1a] py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8b265a]/20 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            Not seeing the <br /> <span className="text-[#1e6b52]">right fit?</span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
            We&apos;re always looking for passionate people. Send us your resume and
            we&apos;ll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="/contact"
              className="bg-[#1e6b52] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#268a69] transition-all shadow-xl shadow-[#1e6b52]/20 active:scale-95"
            >
              Contact Our Talent Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}