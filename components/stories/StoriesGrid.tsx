export default function StoriesGrid() {
  const stories = [
    {
      initial: "M",
      name: "Family Name",
      location: "Arrakattalai, Tamil Nadu",
      category: "Housing",
      since: "2015",
      story: "This family had been living in a damaged home for years with no means to repair it. Through our building construction program, they now have a safe and sturdy home built by our volunteers.",
      impact: "A safe home built for the entire family.",
    },
    {
      initial: "R",
      name: "Child Name",
      location: "Arrakattalai, Tamil Nadu",
      category: "Education",
      since: "2018",
      story: "This child could not afford school fees or books. Through our Poor Children Fund, they received full sponsorship and are now excelling in school with dreams of becoming a teacher.",
      impact: "Fully sponsored education — fees, books and uniform.",
    },
    {
      initial: "K",
      name: "Elder Name",
      location: "Arrakattalai, Tamil Nadu",
      category: "Food Service",
      since: "2019",
      story: "An elderly resident with no family support was going without meals regularly. Our daily food service now ensures they receive nutritious meals every single day.",
      impact: "Daily nutritious meals delivered every day.",
    },
    {
      initial: "S",
      name: "Family Name",
      location: "Arrakattalai, Tamil Nadu",
      category: "Children Fund",
      since: "2020",
      story: "A single mother with two children struggled to keep them in school. Our fund covered all their school expenses and health checkups, giving them a stable future.",
      impact: "Two children kept in school with full support.",
    },
    {
      initial: "V",
      name: "Volunteer Name",
      location: "Arrakattalai, Tamil Nadu",
      category: "Volunteer",
      since: "2017",
      story: "A young local volunteer joined our construction team and has since helped build over 10 homes. Volunteering here changed their perspective on service and community.",
      impact: "10+ homes built through dedicated volunteering.",
    },
    {
      initial: "T",
      name: "Donor Name",
      location: "Chennai, Tamil Nadu",
      category: "Donor",
      since: "2016",
      story: "A donor from Chennai funded a room in memory of their late mother. Seeing the family move in brought them immense peace and they have been donating every year since.",
      impact: "One full room funded — family now sheltered.",
    },
  ];

  const categoryColors: Record<string, { bg: string; text: string }> = {
    Housing:       { bg: 'rgba(234,88,12,0.10)',  text: '#ea580c' },
    Education:     { bg: 'rgba(217,119,6,0.10)',  text: '#d97706' },
    'Food Service':{ bg: 'rgba(234,88,12,0.08)',  text: '#c2410c' },
    'Children Fund':{ bg: 'rgba(251,191,36,0.15)', text: '#b45309' },
    Volunteer:     { bg: 'rgba(217,119,6,0.12)',  text: '#92400e' },
    Donor:         { bg: 'rgba(234,88,12,0.10)',  text: '#ea580c' },
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-orange-600" />
          <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
            Stories of Change
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-gray-200">
          {stories.map((s, idx) => (
            <div key={idx}
              className="border-r border-b border-gray-200 p-6 md:p-8 bg-white hover:bg-orange-50 transition-colors duration-200">

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 flex items-center justify-center text-white font-black text-base flex-shrink-0"
                    style={{ background: idx % 2 === 0 ? '#ea580c' : '#d97706' }}>
                    {s.initial}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                      {s.name}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">{s.location}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 flex-shrink-0"
                  style={{
                    background: categoryColors[s.category]?.bg,
                    color: categoryColors[s.category]?.text,
                  }}>
                  {s.category}
                </span>
              </div>

              {/* Since */}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-3">
                Since {s.since}
              </p>

              {/* Story */}
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.story}</p>

              {/* Impact */}
              <div className="bg-orange-50 border-l-2 border-orange-400 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-400 mb-1">
                  Impact
                </p>
                <p className="text-sm font-black text-gray-800">{s.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}