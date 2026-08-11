export default function HowToDonate() {
  const tiers = [
    {
      amount: "₹1,000",
      label: "Monthly Meal",
      desc: "Provides daily nutritious meals for one child for an entire month.",
    },
    {
      amount: "₹3,000",
      label: "Book Sponsor",
      desc: "Covers school books, stationery, and supplies for one child for a year.",
    },
    {
      amount: "₹6,000",
      label: "Uniform Fund",
      desc: "Funds school uniform, shoes, and bag for a child to attend school with dignity.",
    },
    {
      amount: "₹15,000",
      label: "Full Sponsor",
      desc: "Fully sponsors one child's education, meals, and health for an entire year.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Choose Your Contribution",
      desc: "Pick a tier that suits you or enter your own amount. Every rupee makes a difference.",
    },
    {
      num: "02",
      title: "Complete Your Donation",
      desc: "Donate online or via bank transfer. You receive a confirmation and tax receipt immediately.",
    },
    {
      num: "03",
      title: "We Support a Child",
      desc: "Your donation goes directly to a child in Arrakattalai — for education, food, or health.",
    },
    {
      num: "04",
      title: "Receive Updates",
      desc: "We send you periodic updates on the impact of your contribution with real stories.",
    },
  ];

  return (
    <section className="bg-orange-50 border-t border-orange-100 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Donation tiers */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-orange-600" />
          <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
            Sponsorship Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-orange-100 mb-12 md:mb-16">
          {tiers.map((tier, idx) => (
            <div key={idx}
              className="border-r border-b border-orange-100 p-6 md:p-8 bg-white hover:bg-orange-50 transition-colors duration-200">
              <p className="text-2xl sm:text-3xl font-black text-orange-600 mb-2">
                {tier.amount}
              </p>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 mb-3 inline-block bg-orange-50 text-orange-600">
                {tier.label}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed mt-2">{tier.desc}</p>
            </div>
          ))}
        </div>

        {/* How to donate steps */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-amber-500" />
          <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
            How to Donate
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-orange-100 mb-10">
          {steps.map((s, idx) => (
            <div key={idx}
              className="border-r border-b border-orange-100 p-6 md:p-8 bg-white hover:bg-orange-50 transition-colors duration-200">
              <span className="text-4xl font-black text-orange-100 leading-none block mb-4">
                {s.num}
              </span>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons — full width on mobile */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="/sponsor-child"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors">
            Sponsor a Child →
          </a>
          <a href="/donate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-orange-300 text-orange-600 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-orange-100 transition-colors">
            Make a Donation
          </a>
          <a href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-orange-200 text-orange-500 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}