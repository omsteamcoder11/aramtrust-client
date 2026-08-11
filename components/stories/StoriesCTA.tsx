export default function StoriesCTA() {
  const ways = [
    {
      title: "Donate",
      desc: "Your donation directly funds homes, meals, and education for families in Arrakattalai.",
      action: "Donate Now →",
      href: "/donate",
    },
    {
      title: "Sponsor a Child",
      desc: "Sponsor one child's full education, nutrition, and health for an entire year.",
      action: "Sponsor Now →",
      href: "/sponsor-child",
    },
    {
      title: "Volunteer",
      desc: "Join our team on the ground — in the kitchen, construction site, or community outreach.",
      action: "Volunteer →",
      href: "/volunteer",
    },
  ];

  return (
    <section className="bg-orange-600 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-amber-400" />
          <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
            Be Part of the Next Story
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-l border-t border-orange-500 mb-10">
          {ways.map((w, idx) => (
            <div key={idx}
              className="border-r border-b border-orange-500 p-6 md:p-8 hover:bg-orange-700 transition-colors duration-200">
              <h3 className="text-base font-black text-white uppercase tracking-tight mb-3">
                {w.title}
              </h3>
              <p className="text-orange-100 text-sm leading-relaxed mb-6">{w.desc}</p>
              <a href={w.href}
                className="inline-flex items-center justify-center w-full gap-2 bg-white text-orange-600 px-5 py-3 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
                {w.action}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="h-1 w-full bg-amber-400" />
    </section>
  );
}