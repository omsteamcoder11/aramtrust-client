"use client";

import { useState } from "react";

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#fdf2f8] via-white to-[#f0f9f6] py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our mission and how you can help.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600">
            <p className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-rose-100 shadow-sm text-sm sm:text-base">
              <span className="w-2 h-2 bg-[#8b265a] rounded-full animate-pulse"></span>
              Live Support: Mon-Fri, 8am-5pm CT
            </p>
            <a href="mailto:care@childsave.org" className="text-[#8b265a] font-semibold hover:underline flex items-center gap-1">
              care@childsave.org
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* About us Section */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#8b265a] rounded-full"></span>
            About us (in general)
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="What is ChildSave?"
              answer="We're a top-rated child and youth development organization in Kansas City. For over 85 years, we've helped children and youth around the world break free from poverty through transformative programming provided by trained community members."
            />
            <FaqItem
              question="Why do you focus on children?"
              answer="Most children born into poverty have little control over their lives and futures. We believe the best way to solve poverty is to start with children and youth. By breaking the cycle of poverty for one child, you impact generations to come."
            />
            <FaqItem
              question="What charity ratings has ChildSave earned?"
              answer="ChildSave has received a 4-star rating from Charity Navigator with a perfect 100 in accountability and transparency. We also hold Candid's Platinum Seal of Transparency."
            />
          </div>
        </div>

        {/* About giving Section */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#1e6b52] rounded-full"></span>
            About giving
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="How can I be sure you're putting my donation to good use?"
              answer="In FY 2024, 82% of our total operating expenses supported programs that help children directly. We work hard to keep overhead low. You can review our annual reports on our Accountability page."
            />
            <FaqItem
              question="Is my donation tax-deductible?"
              answer="Yes, if you live in the U.S., all contributions are tax-deductible. You can log into your account to print your tax receipt anytime."
            />
          </div>
        </div>

        {/* About Sponsorship Section */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#8b265a] rounded-full"></span>
            Child Sponsorship
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="What is child sponsorship?"
              answer="Sponsorship ensures access to medical care, education, life skills courses, and job training. You can exchange letters and photos with your child to see the impact firsthand."
            />
            <FaqItem
              question="Will I be my child's only sponsor?"
              answer="Yes, you will be your child's only sponsor. We make a commitment to remain part of their life until they graduate from our program."
            />
            <FaqItem
              question="Can I visit my sponsored child?"
              answer="Absolutely! We'd love for you to visit. Please give at least 8 weeks' notice so our field staff can coordinate the meeting and translation."
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Our Care Team is here to help. Reach out via phone or email and we'll get back to you shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="w-full sm:w-auto bg-[#8b265a] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-rose-200 active:scale-95"
            >
              Contact Us
            </a>
            <a
              href="tel:8005551234"
              className="w-full sm:w-auto border-2 border-gray-200 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              800-555-1234
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`group border rounded-2xl transition-all duration-300 ${
        isOpen ? "border-[#8b265a] bg-[#fdf2f8]/40 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-none"
      >
        <h3 className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#8b265a]" : "text-gray-900"}`}>
          {question}
        </h3>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#8b265a] text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-rose-100/50 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}