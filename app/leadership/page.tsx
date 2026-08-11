"use client";

// app/leadership/page.tsx

export default function LeadershipPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">

      {/* ── HERO ── */}
      <section style={{ background: '#ea580c' }} className="pt-[72px] md:pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 inline-block bg-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                Meet the Team
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mb-5">
              Our <span className="text-amber-400">Leadership</span>
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
              Dedicated volunteers and committed leaders serving children and communities
              across Arrakattalai, Tamil Nadu.
            </p>
          </div>
        </div>
        <div className="h-1 w-full bg-amber-600" />
      </section>

      {/* ── CORE TEAM ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-orange-600" />
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
            Core Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-gray-200">
          {leaders.map((leader, idx) => (
            <div key={idx}
              className="border-r border-b border-gray-200 p-6 sm:p-8 bg-white hover:bg-orange-50 transition-colors duration-200">

              <div
                className="w-14 h-14 flex items-center justify-center mb-5 text-white font-black text-xl"
                style={{ background: idx % 2 === 0 ? '#ea580c' : '#d97706' }}>
                {leader.name.charAt(0)}
              </div>

              <span
                className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 mb-3 inline-block"
                style={{
                  background: idx % 2 === 0 ? 'rgba(234,88,12,0.10)' : 'rgba(217,119,6,0.10)',
                  color: idx % 2 === 0 ? '#ea580c' : '#d97706',
                }}>
                {leader.role}
              </span>

              <h3 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight mb-3 mt-2">
                {leader.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{leader.bio}</p>

              {leader.social && (
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
                  {leader.social.email && (
                    <a href={`mailto:${leader.social.email}`}
                      className="text-gray-400 hover:text-orange-600 transition-colors"
                      aria-label="Email">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                  {leader.social.phone && (
                    <a href={`tel:${leader.social.phone}`}
                      className="text-gray-400 hover:text-amber-600 transition-colors"
                      aria-label="Phone">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ADVISORY BOARD ── */}
      <section className="bg-orange-50 border-t border-b border-orange-100 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
              Advisory Board
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-orange-100">
            {advisors.map((advisor, idx) => (
              <div key={idx}
                className="border-r border-b border-orange-100 p-6 sm:p-8 bg-white hover:bg-orange-50 transition-colors duration-200">
                <div className="w-10 h-10 bg-amber-600 flex items-center justify-center text-white font-black text-sm mb-4">
                  {advisor.name.charAt(0)}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 bg-amber-50 px-2 py-1 mb-3 inline-block">
                  {advisor.role}
                </span>
                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-2 mt-3">
                  {advisor.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="bg-orange-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 block mb-3">
                Get Involved
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                Join Our<br />Leadership Team
              </h3>
            </div>
            <div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                We're always looking for passionate volunteers and community leaders to help
                guide our organisation and serve children across Tamil Nadu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/volunteer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
                  Become a Volunteer →
                </a>
                <a href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-amber-600" />
      </section>

    </main>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const leaders = [
  {
    name: "Leader Name",
    role: "Founder & Executive Director",
    bio: "Add a short bio here describing their background and commitment to serving the community.",
    social: { email: "founder@msm.org" },
  },
  {
    name: "Leader Name",
    role: "Programs Director",
    bio: "Oversees all service programs including building construction, food service, and child welfare initiatives.",
    social: { email: "programs@msm.org" },
  },
  {
    name: "Leader Name",
    role: "Finance & Operations",
    bio: "Ensures transparent and responsible use of every donation received from supporters.",
    social: { email: "finance@msm.org" },
  },
  {
    name: "Leader Name",
    role: "Partnerships Lead",
    bio: "Builds relationships with donors, local government, and partner organisations.",
    social: { email: "partnerships@msm.org" },
  },
  {
    name: "Leader Name",
    role: "Volunteer Coordinator",
    bio: "Manages our team of dedicated volunteers across all programs and events.",
    social: { phone: "+91 XXXXX XXXXX" },
  },
  {
    name: "Leader Name",
    role: "Child Welfare Officer",
    bio: "Ensures every child under our care receives the support, nutrition, and education they deserve.",
    social: { email: "welfare@msm.org" },
  },
];

const advisors = [
  {
    name: "Advisor Name",
    role: "Religious & Community Elder",
    bio: "Provides spiritual guidance and community connections for all our programs.",
  },
  {
    name: "Advisor Name",
    role: "Education Expert",
    bio: "Shapes our child education initiatives with years of teaching experience.",
  },
  {
    name: "Advisor Name",
    role: "Legal Advisor",
    bio: "Ensures our organisation operates within the law and protects those we serve.",
  },
];