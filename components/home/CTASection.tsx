export default function CTASection() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div
        className="relative overflow-hidden rounded-2xl px-6 sm:px-10 lg:px-14 py-10 sm:py-12 text-center"
        style={{
          background: "#ffffff",
          border: "1px solid #a7f3d0",
          boxShadow: "0 20px 40px -12px rgba(5, 150, 105, 0.05)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "#059669" }}
        />

        {/* Decorative leaf icon - subtle */}
        <div className="absolute top-4 right-4 opacity-10 text-3xl">
          🌿
        </div>

        <div className="relative flex flex-col items-center gap-5">
          {/* Badge */}
          <span
            className="inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{
              background: "#f0fdf4",
              border: "1px solid #a7f3d0",
              color: "#059669",
            }}
          >
            Aram Trust · Hunger Relief Initiative
          </span>

          {/* Heading */}
          <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Your Support Can Change
            <br />
            <span style={{ color: "#059669" }}>A Life Forever.</span>
          </h2>

          {/* Description */}
          <p className="max-w-xl text-sm sm:text-base text-gray-600 leading-relaxed">
            Ending the struggle for food by serving wholesome meals, fresh produce,
            and essential care to the poor, needy, and sick across communities.
          </p>

          {/* Stats row */}
          <div
            className="flex flex-wrap justify-center gap-8 sm:gap-12 py-4 border-y w-full max-w-lg"
            style={{ borderColor: "#a7f3d0" }}
          >
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 leading-none">5000+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">Meals Served</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 leading-none">1000+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">Beneficiaries</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 leading-none">100%</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">Dedicated Support</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "#059669",
                boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
              }}
            >
              🤝 Donate Now
            </a>

            <a
              href="/volunteer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-emerald-50 active:scale-95"
              style={{
                border: "1.5px solid #059669",
                color: "#059669",
              }}
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}