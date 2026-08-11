// app/matching-gifts/page.tsx
import { Metadata } from "next";
import { MatchingSearch } from "@/app/employer/MatchingSearch";

export const metadata: Metadata = {
  title: "Employer Matching Gifts | ChildSave",
  description:
    "Double your impact: Find out if your employer matches charitable donations and learn how to submit a matching gift request to support ChildSave.",
};

export default function MatchingGiftsPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Matching gifts can double your donations
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Matching gift donations for charitable employers
          </p>
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your support for ChildSave helps change everything for children and
            families in poverty. And your gift will go even further if your
            company or organization has a Matching Gift program.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">
              Find out if your employer matches donations
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-8 leading-relaxed">
              More than 24,000+ companies nationwide match employee gifts.
              Enter your employer’s name below to check eligibility.
            </p>
            <MatchingSearch />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                How matching gifts work
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Companies and foundations use several procedures by which
                employees can request matching gifts: online forms, payroll
                deductions or paper forms.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                For every donation you send to ChildSave, most matching programs
                will match it dollar for dollar (and in some cases, even more!).
              </p>
            </div>
            
            <div className="bg-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Need to submit a matching gift form?
              </h3>
              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-100 pb-2">
                  <span className="text-gray-500 font-medium">Our EIN:</span>
                  <span className="text-gray-900 font-bold">44‑6005794</span>
                </div>
                <div className="pt-2">
                  <p className="text-gray-500 font-medium mb-1">By mail:</p>
                  <address className="not-italic text-gray-900 font-semibold leading-relaxed">
                    ChildSave <br />
                    Attn: Matching Gifts <br />
                    P.O. Box 123456 <br />
                    Kansas City, MO 64121
                  </address>
                </div>
                <div className="pt-4">
                  <p className="text-gray-500 font-medium mb-1">By email:</p>
                  <a
                    href="mailto:matching@childsave.org"
                    className="text-blue-600 font-bold hover:underline break-all"
                  >
                    matching@childsave.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Giving */}
      <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Employer giving campaigns
          </h2>
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Employer giving campaigns (also called workplace giving) provide
              employees with the opportunity to make financial donations
              directly from their paycheck. Many employers sponsor matching gift
              programs to match charitable contributions made by their employees.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-6">
              Workplace giving is an easy, safe and cost-efficient way to make
              tax-deductible donations. Since employers often match employee
              contributions, it's like <span className="font-bold text-blue-600">free money</span> for your favorite charitable cause!
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-blue-600 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Questions about matching gifts?
          </h3>
          <p className="text-blue-100 mb-8 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto">
            Our Care Team is ready to help. Contact us for assistance with
            matching gift forms or to learn more about workplace giving.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95"
          >
            Contact Our Care Team
          </a>
        </div>
      </div>
    </main>
  );
}



