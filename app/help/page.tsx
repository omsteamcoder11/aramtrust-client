import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Ways to Help | ChildSave",
  description:
    "Explore creative ways to support ChildSave's mission: matching gifts, Facebook fundraisers, writing to a youth, estate planning, and more.",
};

export default function HelpPage() {
  return (
    <main className="bg-white overflow-x-hidden selection:bg-[#8A2B59] selection:text-white">
      {/* Hero Section - Compact & Bold */}
      <section className="bg-[#FDFCFD] py-12 md:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Other ways to <span className="text-[#8A2B59]">help</span>
          </h1>
          <p className="mt-4 text-[10px] md:text-xs font-black text-[#008767] tracking-[0.4em] uppercase">
            More ways you can make a difference
          </p>
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-snug font-medium">
            Ending poverty for good takes support from generous people like you.
            That’s why we’ve made it easy to give to our mission in a variety of ways.
          </p>
        </div>
      </section>

      {/* Main Grid - Zero Gap, Sharp Border Structure */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-slate-100">
            <HelpCard
              title="Matching gifts"
              description="Your gift can go even further if your employer or organization has a Matching Gift program."
              link="#"
              icon="🤝"
              linkText="Check eligibility"
            />
            <HelpCard
              title="Fundraise on Facebook"
              description="Whether for your birthday or a special occasion, start a fundraiser. ChildSave receives 100% of donations."
              link="#"
              icon="📘"
              linkText="Start a fundraiser"
            />
            <HelpCard
              title="Write to a youth"
              description="Write to a young person and send much-needed encouragement. Use our online form or template."
              link="#"
              icon="✉️"
              linkText="Write a message"
            />
            <HelpCard
              title="Estate & gift planning"
              description="Create a lasting legacy of good when you leave a gift for ChildSave in your will or trust."
              link="#"
              icon="📜"
              linkText="Learn about planned giving"
            />
            <HelpCard
              title="Sponsor feedback panel"
              description="All current sponsors are invited to participate! Help create the best experience for sponsors like you."
              link="#"
              icon="🗣️"
              linkText="Join the panel"
            />
            {/* CTA Fill Block to keep grid tight */}
            <div className="bg-slate-50 p-10 flex flex-col justify-center border-r border-b border-slate-100">
               <h4 className="text-sm font-black uppercase tracking-widest text-[#8A2B59]">Ready to act?</h4>
               <p className="text-xs text-slate-500 mt-2 font-medium">Every contribution moves the needle for a child in need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Options - High Density Grid */}
      <section className="py-12 md:py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-slate-800 pb-6">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
              More giving <span className="text-[#008767]">options</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-2 md:mt-0">Uplifting communities of thousands.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Our Mission", desc: "Give to support our mission. Your gift provides critical programs and creates hope for kids living in poverty.", link: "/donate?fund=mission" },
              { title: "Into Employment®", desc: "Help youth secure sustainable employment and break the cycle of poverty through job training.", link: "/donate?fund=into-employment" },
              { title: "Waiting Child Fund", desc: "Your gift provides critical support for children who are waiting for sponsors.", link: "/donate?fund=waiting-child" },
              { title: "Birthday Fund", desc: "Help provide birthday gifts for children on their special day.", link: "/donate?fund=birthday" },
              { title: "Christmas Fund", desc: "Help provide a holiday gift for children in poverty.", link: "/donate?fund=christmas" },
              { title: "Family Gift Fund", desc: "Support entire families with essentials like food, hygiene kits, and household items.", link: "/donate?fund=family" },
            ].map((fund) => (
              <FundCard
                key={fund.title}
                title={fund.title}
                description={fund.desc}
                link={fund.link}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href="/donate"
              className="w-full sm:w-auto text-center bg-[#8A2B59] text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-[#702248] transition-all text-[10px]"
            >
              Make a Recurring Gift
            </a>
            <a
              href="/donate#noncash"
              className="w-full sm:w-auto text-center border border-white text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all text-[10px]"
            >
              Explore Non-Cash Giving
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA - Sharp & Clean */}
      <section className="py-16 md:py-24 bg-white text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            Every action <span className="text-[#008767]">counts</span>
          </h3>
          <p className="text-base md:text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Whether you give financially, advocate, or simply spread the word,
            you're part of a global movement to end child poverty.
          </p>
          <a
            href="/contact"
            className="inline-block bg-slate-900 text-white px-12 py-5 font-black uppercase tracking-[0.2em] hover:bg-[#8A2B59] transition-all text-[10px]"
          >
            Get Involved Today
          </a>
        </div>
      </section>
    </main>
  );
}

function HelpCard({ title, description, link, icon, linkText }: any) {
  return (
    <div className="group bg-white p-8 md:p-10 border-r border-b border-slate-100 hover:bg-[#FDFCFD] transition-all duration-300 flex flex-col relative">
      <div className="absolute top-0 left-0 w-1 h-0 bg-[#8A2B59] group-hover:h-full transition-all duration-500"></div>
      <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#8A2B59] transition-colors uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-slate-500 mt-3 text-sm leading-snug flex-grow font-medium">
        {description}
      </p>
      <a href={link} className="inline-flex items-center mt-8 text-[#008767] font-black text-[10px] uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
        {linkText} <span className="ml-2">→</span>
      </a>
    </div>
  );
}

function FundCard({ title, description, link }: any) {
  return (
    <a href={link} className="group block bg-slate-800 p-6 hover:bg-slate-700 transition-all duration-300 h-full border-l border-slate-700 hover:border-[#008767]">
      <h3 className="text-base font-black text-white mb-2 uppercase tracking-tight group-hover:text-[#008767]">
        {title}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed">
        {description}
      </p>
    </a>
  );
}