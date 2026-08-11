// app/into-employment/journey/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Journey to Employment | ChildSave India",
  description:
    "See how Into Employment transforms young people in India from childhood to career. Read inspiring stories of confidence, skill development, and lasting change.",
};

export default function JourneyPage() {
  return (
    <main className="bg-white text-gray-800 antialiased selection:bg-[#00966C]/10 selection:text-[#00966C]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#7A1C5D]/5 via-white to-white py-16 md:py-28 border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#7A1C5D_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#7A1C5D]/10 text-[#7A1C5D] mb-4">
            Our Strategy
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight sm:leading-tight">
            Let the transformation begin
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Ending poverty starts with children
          </p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-[#7A1C5D] rounded-full" />
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
              Growing up in poverty, children face tough challenges: hunger and
              malnutrition, limited access to education and medical services,
              social discrimination and isolation.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-6 pt-6 border-t border-gray-200/60 font-normal">
              Local staff and volunteers give children in poverty the tools they
              need to create brighter futures for themselves and their
              communities. With the support of our donors and sponsors, children
              and youth gain the skills and confidence they need to create
              promising futures free from poverty.
            </p>
          </div>
        </div>
      </section>

      {/* Into Employment Transformation */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
              Into Employment® transforms young adults
            </h2>
            <div className="w-12 h-1 bg-[#00966C] mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Into Employment means every young person who wants to has the
                opportunity to attend college, earn technical training
                certificates, upskill their talents or become entrepreneurs.
              </p>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Your support ensures they have the soft skills, too —
                problem-solving, as well as much-needed communication and
                interpersonal skills. Participants practice résumé writing, job
                search and application tactics, and interviewing. You help them
                prepare for and get hired into formal employment.
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-gradient-to-br from-[#7A1C5D]/5 to-[#7A1C5D]/[0.01] border border-[#7A1C5D]/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 text-[#7A1C5D]/5 text-9xl font-serif pointer-events-none select-none">
                ✨
              </div>
              <div>
                <div className="text-2xl text-[#7A1C5D] mb-4">✨</div>
                <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed italic">
                  “Before Into Employment, I didn’t know how to write a resume or
                  what a job interview looked like. Today, I feel confident in my
                  abilities and ready to take on the world.”
                </p>
              </div>
              <p className="text-gray-500 mt-6 text-sm font-semibold tracking-wide uppercase border-t border-gray-200/60 pt-4">
                — Meera, Into Employment graduate, Bengaluru
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Full Story */}
      <section className="py-16 md:py-24 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-100 relative">
            <span className="absolute -top-5 left-8 sm:left-12 text-6xl sm:text-7xl font-serif text-[#00966C]/20 select-none pointer-events-none leading-none">
              “
            </span>
            <blockquote className="text-xl sm:text-2xl text-gray-900 font-medium italic leading-snug tracking-tight relative z-10">
              I feel capable and I know I can do it.
            </blockquote>
            <p className="mt-3 text-sm font-bold text-[#00966C] tracking-wide uppercase">
              — Priya, Chennai, Into Employment graduate
            </p>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Priya began her journey at age 7 when she joined ChildSave. Four
                years ago, she graduated from Into Employment and got her first
                formal job with an IT services company in her community. Priya
                still works for the same company and was recently promoted to a
                team lead position, thanks to her work experience, perseverance
                and the skills she learned in Into Employment.
              </p>
              <p className="text-gray-600 font-medium italic mt-5 pl-4 border-l-2 border-[#7A1C5D] text-base sm:text-lg leading-relaxed">
                “I want to continue growing professionally and personally. I
                want to be proud of myself and to make my parents proud, too.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Journey Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Your support writes their story
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              From childhood to career, your generosity empowers young people at
              every stage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Visual connector line for desktop layout */}
            <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 z-0" />
            
            <StepCard
              number="1"
              title="Childhood support"
              description="Health checkups, nutrition, and educational aid give children a strong foundation."
            />
            <StepCard
              number="2"
              title="Teen empowerment"
              description="Life skills, mentorship, and confidence-building activities prepare them for the future."
            />
            <StepCard
              number="3"
              title="Into Employment"
              description="Job training, career coaching, and placement lead to sustainable careers."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mb-4 tracking-tight">
            Help continue the story for deserving young people
          </h3>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Poverty can be isolating and limiting. For work, your only options
            may be low-wage or temporary jobs. With the support and training
            that Into Employment provides, participants can increase the
            likelihood of a career that could truly take them places. We need
            you to help them write the next chapter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <a
              href="/donate?program=into-employment"
              className="inline-flex justify-center items-center bg-[#7A1C5D] text-white px-7 py-3.5 rounded-xl font-semibold shadow-sm hover:bg-[#63144A] active:bg-[#52103D] transition-colors duration-200 text-base"
            >
              Invest in a young person’s future
            </a>
            <a
              href="/sponsor"
              className="inline-flex justify-center items-center border-2 border-[#00966C] text-[#00966C] px-7 py-3 rounded-xl font-semibold bg-white hover:bg-[#00966C]/5 active:bg-[#00966C]/10 transition-colors duration-200 text-base"
            >
              Sponsor a child
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

// Reusable Step Card
function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-white rounded-2xl p-6 lg:p-8 text-center border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 relative z-10 flex flex-col items-center">
      <div className="w-12 h-12 bg-white text-[#7A1C5D] rounded-full flex items-center justify-center text-lg font-bold shadow-sm border border-gray-100 group-hover:scale-105 group-hover:bg-[#7A1C5D] group-hover:text-white transition-all duration-300 mb-5">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-950 mb-2.5 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-normal max-w-xs md:max-w-none">
        {description}
      </p>
    </div>
  );
}