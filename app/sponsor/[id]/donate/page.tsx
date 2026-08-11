"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Heart, Info } from 'lucide-react';
import Link from 'next/link';
import { CHILDREN } from '@/app/data/children';
export default function DonationPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.id as string;
  const child = CHILDREN.find((c) => c.id === Number(childId));

  const [amount, setAmount] = useState<number | string>(1500);
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [1500, 3000, 5000, 10000];

  if (!child) return null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] font-sans pb-20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-500 hover:text-[#2199e8] transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Profile
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Checkout</span>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12">
        {/* Child Summary Header */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
            <img src={child.image} alt={child.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
              Sponsoring <span className="text-[#2199e8]">{child.name}</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
              {child.location} • {child.age} Years Old
            </p>
          </div>
        </div>

        {/* Impact Stat */}
        <div className="bg-green-500 text-white rounded-full py-4 px-8 text-center mb-10 shadow-lg shadow-green-100">
           <p className="font-bold uppercase tracking-widest text-xs">
             Raised funds can feed <span className="text-black/20 mx-1">|</span> 275 children / year
           </p>
        </div>

        {/* Donation Form Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2199e8]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-center text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mb-8">
              Choose your donation amount
            </h3>

            {/* Grid of Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setIsCustom(false); }}
                  className={`py-4 rounded-2xl font-black transition-all border-2 ${
                    amount === amt && !isCustom
                      ? "bg-[#2199e8] border-[#2199e8] text-white shadow-lg shadow-blue-100 scale-105"
                      : "bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative mb-10">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-400">Rs.</span>
              <input
                type="number"
                placeholder="Other amount"
                value={isCustom ? amount : ""}
                onChange={(e) => { setAmount(e.target.value); setIsCustom(true); }}
                className={`w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50 border-2 transition-all font-bold focus:ring-0 ${
                  isCustom ? "border-[#2199e8] bg-white shadow-inner" : "border-transparent"
                }`}
              />
            </div>

            {/* Action Button */}
            <button className="w-full bg-green-500 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-green-100 hover:bg-green-600 active:scale-[0.98] transition-all mb-6">
              Continue Donation
            </button>

            {/* Note */}
            <div className="flex items-center justify-center gap-2 text-gray-400 italic font-medium text-sm">
              <Info size={14} className="text-[#2199e8]" />
              <p>Note: Rs. 1500 can feed a child for a year</p>
            </div>
          </div>
        </div>

        {/* Trust Marks */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex justify-center text-[#2199e8] mb-2"><Heart size={20}/></div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">100% Direct</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center text-[#2199e8] mb-2"><ShieldCheck size={20}/></div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Secure Payment</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center text-[#2199e8] mb-2"><Info size={20}/></div>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tax Benefit</p>
          </div>
        </div>
      </main>
    </div>
  );
}



