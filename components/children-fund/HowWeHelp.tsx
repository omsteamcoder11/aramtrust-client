export default function HowWeHelp() {
  const steps = [
    {
      step: "01",
      icon: "📚",
      title: "Education Support",
      desc: "We provide school fees, books, uniforms, and stationery to children from families who cannot afford basic education.",
    },
    {
      step: "02",
      icon: "🍱",
      title: "Nutrition Program",
      desc: "Children enrolled in our fund receive daily nutritious meals, ensuring no child studies on an empty stomach.",
    },
    {
      step: "03",
      icon: "🏥",
      title: "Health & Welfare",
      desc: "Regular health checkups, medicines, and medical support are provided to children in need through our network.",
    },
    {
      step: "04",
      icon: "🤝",
      title: "Family Support",
      desc: "We work closely with families to understand their needs and connect them with the right resources and opportunities.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-orange-600" />
          <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
            How We Help
          </h2>
        </div>

        {/* Mobile: stacked cards, Desktop: grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-gray-200">
          {steps.map((s, idx) => (
            <div key={idx}
              className="border-r border-b border-gray-200 p-6 md:p-8 bg-white hover:bg-orange-50 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-3xl font-black text-orange-100 leading-none">
                  {s.step}
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* What we provide — full width on mobile */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-amber-500" />
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
              What We Provide
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "School Fees",
              "Uniforms",
              "Books & Stationery",
              "Daily Meals",
              "Health Checkups",
              "Medicines",
            ].map((item, idx) => (
              <div key={idx}
                className="bg-orange-50 border border-orange-100 p-4 text-center rounded-none">
                <p className="text-xs font-black text-orange-700 uppercase tracking-wide">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}