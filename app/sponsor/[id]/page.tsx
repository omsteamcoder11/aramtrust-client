"use client";

import { useParams } from "next/navigation";
import { Clock, MapPin, ChevronRight, X, CheckCircle, AlertCircle, XCircle, Sparkles, Shield, Heart, Copy } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

type Step = 1 | 2 | "payment";

// ── Currency support ──
const CURRENCY_OPTIONS = [
  { value: "usd", label: "USD ($)", symbol: "$", min: 1 },
  { value: "eur", label: "EUR (€)", symbol: "€", min: 1 },
  { value: "gbp", label: "GBP (£)", symbol: "£", min: 1 },
  { value: "sgd", label: "SGD (S$)", symbol: "S$", min: 1 },
  { value: "chf", label: "CHF (Fr)", symbol: "Fr", min: 1 },
  { value: "jpy", label: "JPY (¥)", symbol: "¥", min: 100 },
  { value: "inr", label: "INR (₹)", symbol: "₹", min: 100 },
];
const getCurrencyMeta = (code: string) =>
  CURRENCY_OPTIONS.find((c) => c.value === code) || CURRENCY_OPTIONS[0];

// Per-currency impact package amounts (approximate, not live FX — same approach as DonateForm)
const IMPACT_PRICES: Record<string, { school: number; medical: number; meals: number; birthday: number }> = {
  usd: { school: 15,   medical: 25,   meals: 15,   birthday: 10 },
  eur: { school: 15,   medical: 25,   meals: 15,   birthday: 10 },
  gbp: { school: 12,   medical: 20,   meals: 12,   birthday: 8  },
  sgd: { school: 20,   medical: 35,   meals: 20,   birthday: 14 },
  chf: { school: 15,   medical: 25,   meals: 15,   birthday: 10 },
  jpy: { school: 2000, medical: 3500, meals: 2000, birthday: 1500 },
  inr: { school: 1000, medical: 2000, meals: 1200, birthday: 800 },
};

const IMPACT_META = [
  { key: "school",   title: "School Supplies",   desc: "Books & Stationery", icon: "📚", color: "from-violet-500 to-purple-600" },
  { key: "medical",  title: "Medical Support",    desc: "Healthcare Help",    icon: "🏥", color: "from-rose-500 to-pink-600" },
  { key: "meals",    title: "Meals for a Month",  desc: "Feed a Child",       icon: "🍱", color: "from-amber-500 to-orange-500" },
  { key: "birthday", title: "Birthday Surprise",  desc: "Make them smile",   icon: "🎁", color: "from-teal-500 to-emerald-500" },
] as const;

interface FormData {
  fullName: string; email: string; phone: string; dob: string; pan: string;
  address: string; city: string; state: string; country: string; pincode: string;
  donorType: "individual" | "corporate" | "csr";
  donorCategory: "indian" | "nri" | "foreign";
  isCompany: boolean; companyName: string; gstNumber: string;
  donationType: "one-time" | "monthly";
  termsAccepted: boolean; declarationAccepted: boolean; dpdpConsent: boolean;
}

interface FormErrors {
  fullName?: string; email?: string; phone?: string; address?: string;
  city?: string; state?: string; country?: string; pincode?: string;
  pan?: string; dob?: string; companyName?: string; gstNumber?: string;
  termsAccepted?: string; declarationAccepted?: string; dpdpConsent?: string; amount?: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];

const WORLD_COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Cambodia","Cameroon",
  "Canada","Chile","China","Colombia","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
  "Ecuador","Egypt","Estonia","Ethiopia","Finland","France","Georgia","Germany","Ghana",
  "Greece","Guatemala","Hong Kong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Malaysia","Maldives","Malta",
  "Mexico","Moldova","Mongolia","Morocco","Mozambique","Myanmar","Namibia","Nepal",
  "Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Palestine","Panama",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","South Africa",
  "South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe"
];

const inputBase = "w-full px-4 py-3 rounded-2xl border-2 text-sm font-medium text-gray-800 bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-200 backdrop-blur-sm";
const inputCls  = (e?: string) => `${inputBase} ${e ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`;
const selectCls = (e?: string) => `${inputBase} cursor-pointer appearance-none ${e ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`;
const ErrorMsg  = ({ msg }: { msg?: string }) => msg ? <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium"><AlertCircle size={11}/>{msg}</p> : null;

const initialForm: FormData = {
  fullName: "", email: "", phone: "", dob: "", pan: "",
  address: "", city: "", state: "", country: "", pincode: "",
  donorType: "individual", donorCategory: "indian",
  isCompany: false, companyName: "", gstNumber: "",
  donationType: "one-time",
  termsAccepted: false, declarationAccepted: false, dpdpConsent: false,
};

export default function ChildDetailsPage() {
  const params = useParams();
  const id     = Number(params.id);

  const [child, setChild]               = useState<any>(null);
  const [childLoading, setChildLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/children/${id}`)
      .then(res => res.json())
      .then(data => { setChild(data.child); setChildLoading(false); })
      .catch(() => setChildLoading(false));
  }, [id]);

  const [currency, setCurrency]           = useState("usd");
  const currencyMeta = getCurrencyMeta(currency);
  const impactPrices = IMPACT_PRICES[currency] || IMPACT_PRICES.usd;

  const [selected, setSelected]           = useState<number | null>(null);
  const [customAmount, setCustomAmount]   = useState("");
  const [showModal, setShowModal]         = useState(false);
  const [step, setStep]                   = useState<Step>(1);
  const [form, setForm]                   = useState<FormData>(initialForm);
  const [errors, setErrors]               = useState<FormErrors>({});
  const [loading, setLoading]             = useState(false);
  const [success, setSuccess]             = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [amountError, setAmountError]     = useState("");

  // Bitcoin payment state
  const [paymentId, setPaymentId]         = useState("");
  const [payAddress, setPayAddress]       = useState("");
  const [payAmountBTC, setPayAmountBTC]   = useState<number | null>(null);
  const [expiresAt, setExpiresAt]         = useState<string>("");
  const [copied, setCopied]               = useState(false);
  const [secondsLeft, setSecondsLeft]     = useState<number | null>(null);
  const [isSandbox, setIsSandbox]         = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setSelected(null);
    setCustomAmount("");
    setAmountError("");
  };

  if (childLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800">Child Not Found</h2>
          <p className="text-gray-500 mt-2 text-sm">The child profile you're looking for doesn't exist.</p>
          <Link href="/sponsor" className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition text-sm">
            Browse Children <ChevronRight size={16}/>
          </Link>
        </div>
      </div>
    );
  }

  const getDonationAmount = (): number | null => {
    const custom = Number(customAmount);
    if (customAmount && custom > 0) return custom;
    if (selected !== null) return impactPrices[IMPACT_META[selected].key];
    return null;
  };

  const validateAmount = (): boolean => {
    const amount = getDonationAmount();
    if (!amount || amount < currencyMeta.min) { setAmountError(`Minimum donation amount is ${currencyMeta.symbol}${currencyMeta.min}.`); return false; }
    setAmountError(""); return true;
  };

  const isIndian = form.donorCategory === "indian";

  const phoneValid = (phone: string, category: string): boolean => {
    if (category === "indian") return /^[6-9]\d{9}$/.test(phone);
    return /^\+?[\d\s\-(). ]{7,20}$/.test(phone);
  };

  const validateField = (name: keyof FormErrors, value: string | boolean) => {
    let error = "";
    const raw = typeof value === "string" ? value.trim() : value;
    const str = typeof raw === "string" ? raw : "";

    if (name === "fullName"   && !str)                                               error = "Full name is required";
    if (name === "email"      && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str))           error = "Valid email is required";
    if (name === "phone"      && !phoneValid(str, form.donorCategory))               error = form.donorCategory === "indian" ? "Valid 10-digit Indian mobile required" : "Valid international phone required";
    if (name === "address"    && !str)                                               error = "Address is required";
    if (name === "city"       && !str)                                               error = "City is required";
    if (name === "state"      && isIndian && !str)                                   error = "State is required";
    if (name === "country"    && !isIndian && !str)                                  error = "Country is required";
    if (name === "pincode") {
      if (isIndian && !/^\d{6}$/.test(str))  error = "Valid 6-digit pincode required";
      else if (!isIndian && !str)            error = "Postal / ZIP code is required";
    }
    if (name === "pan") {
      if (!str)                                                   error = "PAN number is required";
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(str.toUpperCase())) error = "Invalid PAN format (e.g. ABCDE1234F)";
    }
    if (name === "dob"               && !str)    error = "Date of birth is required";
    if (name === "companyName"       && form.isCompany && !str)  error = "Company name is required";
    if (name === "gstNumber"         && form.isCompany) {
      if (!str) error = "GST number is required";
      else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(str.toUpperCase())) error = "Invalid GST number format";
    }
    if (name === "termsAccepted"     && !value)  error = "You must accept the terms & conditions";
    if (name === "declarationAccepted" && !value) error = "You must confirm your details are correct";
    if (name === "dpdpConsent"       && !value)  error = "You must consent to data processing under DPDP Act 2023";

    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const validateStep1 = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim())                                               e.fullName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))                     e.email = "Valid email is required";
    if (!phoneValid(form.phone, form.donorCategory))                         e.phone = form.donorCategory === "indian" ? "Valid 10-digit Indian mobile required" : "Valid international phone required";
    if (!form.address.trim())                                                e.address = "Address is required";
    if (!form.city.trim())                                                   e.city = "City is required";
    if (isIndian && !form.state.trim())                                      e.state = "State is required";
    if (!isIndian && !form.country.trim())                                   e.country = "Country is required";
    if (isIndian && !/^\d{6}$/.test(form.pincode))                          e.pincode = "Valid 6-digit pincode required";
    if (!isIndian && !form.pincode.trim())                                   e.pincode = "Postal / ZIP code is required";
    if (!form.pan.trim())                                                    e.pan = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.toUpperCase()))   e.pan = "Invalid PAN format";
    if (!form.dob)                                                           e.dob = "Date of birth is required";
    if (form.isCompany) {
      if (!form.companyName.trim()) e.companyName = "Company name is required";
      if (!form.gstNumber.trim())   e.gstNumber = "GST number is required";
      else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(form.gstNumber.toUpperCase())) e.gstNumber = "Invalid GST number format";
    }
    if (!form.termsAccepted)      e.termsAccepted = "You must accept the terms & conditions";
    if (!form.declarationAccepted) e.declarationAccepted = "You must confirm your details are correct";
    if (!form.dpdpConsent)         e.dpdpConsent = "You must consent to data processing under DPDP Act 2023";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinueToSummary = () => { if (validateStep1()) setStep(2); };

  const buildDonorData = () => ({
    name: form.fullName, email: form.email, phone: form.phone,
    pan_number: form.pan.toUpperCase(), date_of_birth: form.dob,
    address_line1: form.address, city: form.city,
    state: isIndian ? form.state : null,
    country: !isIndian ? form.country : "India",
    pincode: form.pincode,
    donor_category: form.donorCategory,
    donation_type: form.donationType,
  });

  // Create the Bitcoin payment (replaces old Razorpay handlePayment)
  const handlePayment = async () => {
    const amount = getDonationAmount();
    if (!amount || amount < currencyMeta.min) return;

    setLoading(true); setPaymentFailed(false);

    try {
      const donorRes = await fetch(`${API_URL}/api/donors/by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildDonorData()),
      });
      const donorData = await donorRes.json();
      if (!donorRes.ok) throw new Error(donorData.message);

      const btcRes = await fetch(`${API_URL}/api/donations/bitcoin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:     amount,
          currency:   currency,
          name:       form.fullName,
          email:      form.email,
          phone:      form.phone,
          donor_id:   donorData.donor.id,
          message:    `${form.donationType === "monthly" ? "Monthly" : "One-time"} sponsorship for ${child.name} (child_id: ${child.id})`,
        }),
      });
      const btcData = await btcRes.json();
      if (!btcRes.ok) throw new Error(btcData.error || "Could not start Bitcoin payment.");

      setPaymentId(btcData.paymentId);
      setPayAddress(btcData.payAddress);
      setPayAmountBTC(btcData.payAmountBTC);
      setExpiresAt(btcData.expiresAt);
      setIsSandbox(!!btcData.sandbox);
      setLoading(false);
      setStep("payment");
    } catch {
      setLoading(false);
      setPaymentFailed(true);
    }
  };

  // Poll payment status while on the payment step
  useEffect(() => {
    if (step !== "payment" || !paymentId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/donations/bitcoin/status/${paymentId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === "paid") {
          if (pollRef.current) clearInterval(pollRef.current);
          if (countdownRef.current) clearInterval(countdownRef.current);
          setSuccess(true);
        } else if (data.status === "expired" || data.status === "failed") {
          if (pollRef.current) clearInterval(pollRef.current);
          if (countdownRef.current) clearInterval(countdownRef.current);
          setPaymentFailed(true);
        }
      } catch {
        // silent — try again next tick
      }
    };

    checkStatus();
    pollRef.current = setInterval(checkStatus, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [step, paymentId]);

  // Countdown to expiry
  useEffect(() => {
    if (step !== "payment" || !expiresAt) return;
    const tick = () => {
      const diff = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
      setSecondsLeft(diff > 0 ? diff : 0);
    };
    tick();
    countdownRef.current = setInterval(tick, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [step, expiresAt]);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(payAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenModal = () => {
    if (!validateAmount()) return;
    setShowModal(true); setStep(1); setSuccess(false);
    setPaymentFailed(false); setErrors({});
  };

  const handleCloseModal = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setShowModal(false); setStep(1); setSuccess(false); setPaymentFailed(false);
    setPaymentId(""); setPayAddress(""); setPayAmountBTC(null); setExpiresAt("");
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Hero */}
      <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-4 uppercase">
            <Sparkles size={13}/> Make a Real Difference
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Change a Life <span className="text-blue-600">Today</span>
          </h1>
          <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-lg max-w-xl mx-auto px-2">
            Your sponsorship directly transforms a child's future — education, health, and hope.
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-3">
          {["80G Tax Exemption", "Bitcoin Secured", "1200+ Sponsors", "4.9 ⭐ Rated"].map((badge) => (
            <span key={badge} className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full shadow-sm">{badge}</span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">

          {/* LEFT — Child Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 lg:sticky lg:top-24">
              <div className="relative">
                <img src={child.image_url|| '/children/1.webp'} alt={child.name} className="w-full h-56 sm:h-72 object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{child.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/90 text-xs sm:text-sm font-medium">{child.age} years old</span>
                    <span className="w-1 h-1 bg-white/60 rounded-full"/>
                    <span className="flex items-center gap-1 text-white/90 text-xs sm:text-sm"><MapPin size={12}/>{child.location}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                  <Clock size={11} className="text-amber-500"/> {child.waiting_days} days waiting
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Sponsorship Progress</span>
                    <span className="text-sm font-black text-blue-600">{child.funded}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r bg-[#009270]rounded-full transition-all duration-700" style={{ width: `${child.funded}%` }}/>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-2xl">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Monthly sponsorship</span>
                  <span className="text-lg sm:text-xl font-black text-blue-700">₹{child.price}</span>
                </div>
                <button onClick={handleOpenModal} className="w-full bg-gradient-to-r bg-[#8B235E] hover:bg-[#6b1b48] active:scale-[0.98] text-white py-3 sm:py-3.5 rounded-2xl font-black text-sm transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                  <Heart size={15} className="fill-current"/> Sponsor {child.name}
                </button>
                <Link href="/sponsor-a-child" className="flex items-center justify-center text-blue-500 hover:text-blue-700 font-semibold text-xs mt-4 group transition">
                  View more children <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform"/>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — Donation Panel */}
          <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1">Choose Your Impact</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">Select an impact area or enter a custom amount</p>

              {/* Currency selector */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Currency</label>
                <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)} className={selectCls()}>
                  {CURRENCY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {IMPACT_META.map((item, index) => (
                  <button key={item.key} onClick={() => { setSelected(index); setCustomAmount(""); setAmountError(""); }}
                    className={`relative p-3 sm:p-4 rounded-2xl border-2 text-left transition-all duration-200 ${selected === index ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100" : "border-gray-100 hover:border-blue-200 hover:shadow-sm bg-white"}`}>
                    {selected === index && (
                      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle size={10} className="text-white fill-white"/>
                      </div>
                    )}
                    <div className="text-xl sm:text-2xl mb-1.5 sm:mb-2">{item.icon}</div>
                    <p className="font-black text-gray-800 text-xs sm:text-sm leading-tight">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 mb-1.5 sm:mb-2">{item.desc}</p>
                    <p className="font-black text-[#8B235E] text-base sm:text-lg">{currencyMeta.symbol}{impactPrices[item.key].toLocaleString()}</p>
                  </button>
                ))}
              </div>

              <div className="mt-3 sm:mt-4 relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">{currencyMeta.symbol}</span>
                <input type="number" placeholder={`Enter custom amount (min ${currencyMeta.symbol}${currencyMeta.min})`}
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelected(null); setAmountError(""); }}
                  className="w-full pl-8 pr-4 py-3 sm:py-3.5 rounded-2xl border-2 border-gray-200 focus:border-[#8B235E] focus:outline-none text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-200 bg-gray-50 hover:bg-white"/>
              </div>

              {amountError && <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium"><AlertCircle size={11}/>{amountError}</p>}

              <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3">
                {(["one-time", "monthly"] as const).map((type) => (
                  <button key={type} onClick={() => setForm({ ...form, donationType: type })}
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${form.donationType === type ? "bg-gray-900 text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    {type === "one-time" ? "One-Time" : "Monthly"}
                  </button>
                ))}
              </div>

              {form.donationType === "monthly" && (
                <p className="mt-2 text-xs text-blue-600 bg-blue-50 rounded-xl px-3 py-2 font-medium">
                  ✅ Monthly donations are processed securely via Bitcoin.
                </p>
              )}

              <button onClick={handleOpenModal} className="w-full mt-4 sm:mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-blue-200 transition-all duration-200 flex items-center justify-center gap-2">
                Continue Sponsorship 🎁
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: <Shield size={16} className="text-green-600"/>, title: "100% Secure",   sub: "Bitcoin encrypted" },
                { icon: <Sparkles size={16} className="text-blue-600"/>, title: "80G Eligible",  sub: "Tax exemption" },
                { icon: <Heart size={16} className="text-rose-500"/>,   title: "Direct Impact", sub: "Child-linked funds" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 text-center shadow-sm">
                  <div className="flex justify-center mb-1.5 sm:mb-2">{item.icon}</div>
                  <p className="text-xs font-black text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{item.sub}</p>
                </div>
              ))}
            </div>

            {form.donorCategory === "foreign" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 font-medium leading-relaxed">
                ⚠️ <strong>FCRA Notice:</strong> Foreign contributions are accepted in compliance with the Foreign Contribution (Regulation) Act, 2010.
              </div>
            )}

            <div className="text-center">
              <a href="/refund-policy" className="text-xs text-gray-400 hover:text-blue-600 underline transition">Cancellation & Refund Policy</a>
              <span className="text-gray-300 mx-2">|</span>
              <a href="/privacy" className="text-xs text-gray-400 hover:text-blue-600 underline transition">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MODAL ══════════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-md p-0 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}>
          <div className="bg-white w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden">

            {!success && !paymentFailed && step !== "payment" && (
              <div className="flex-shrink-0 px-5 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Step {step} of 2</p>
                    <p className="text-sm sm:text-base font-black text-gray-800 mt-0.5">{step === 1 ? "Your Details" : "Review & Pay"}</p>
                  </div>
                  <button onClick={handleCloseModal} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"><X size={16}/></button>
                </div>
                <div className="flex gap-2">
                  <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step === 1 || step === 2 ? "bg-blue-600" : "bg-gray-200"}`}/>
                  <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step === 2 ? "bg-blue-600" : "bg-gray-200"}`}/>
                </div>
              </div>
            )}

            <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-4 sm:py-5 overscroll-contain">
              {success ? (
                <div className="flex flex-col items-center text-center py-4 sm:py-6">
                  <button onClick={handleCloseModal} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"><X size={16}/></button>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                    <CheckCircle size={36} className="text-green-500"/>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Thank You! 🎉</h2>
                  <p className="text-gray-500 text-sm mb-1 max-w-xs">
                    Your sponsorship of <span className="font-black text-blue-600">{currencyMeta.symbol}{getDonationAmount()}</span> for <span className="font-black text-gray-800">{child.name}</span> was successful.
                  </p>
                  <p className="text-xs text-gray-400 mb-6">Confirmation will be sent to {form.email}</p>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-sm py-2 font-medium transition">Close</button>
                </div>

              ) : paymentFailed ? (
                <div className="flex flex-col items-center text-center py-4 sm:py-6">
                  <button onClick={handleCloseModal} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"><X size={16}/></button>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                    <XCircle size={36} className="text-red-500"/>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Payment Failed</h2>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">Something went wrong, or the payment window expired. No amount has been charged. Please try again.</p>
                  <div className="flex flex-col gap-2 sm:gap-3 w-full">
                    <button onClick={() => { setPaymentFailed(false); setStep(2); }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:py-3.5 rounded-2xl font-bold text-sm transition active:scale-[0.98]">Try Again</button>
                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-sm py-2 font-medium transition">Cancel</button>
                  </div>
                </div>

              ) : step === "payment" ? (
                <div className="flex flex-col items-center text-center py-2 sm:py-4">
                  {isSandbox && (
                    <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                      🧪 SANDBOX TEST MODE — no real funds involved
                    </div>
                  )}
                  <div className="text-3xl mb-2">₿</div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-1">Send Bitcoin to Complete Sponsorship</h2>
                  <p className="text-gray-500 text-xs sm:text-sm mb-5">Send exactly the amount below from your wallet</p>

                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${payAddress}?amount=${payAmountBTC}`}
                    alt="Bitcoin payment QR code" className="mx-auto mb-4 rounded-xl border border-gray-100"
                  />

                  <div className="rounded-2xl p-4 mb-3 w-full" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
                    <p className="text-xs text-gray-500 mb-1">Amount to send</p>
                    <p className="text-xl sm:text-2xl font-black text-blue-600">{payAmountBTC} BTC</p>
                    <p className="text-xs text-gray-400 mt-1">
                      ({currencyMeta.symbol}{getDonationAmount()?.toLocaleString()} {currency.toUpperCase()})
                    </p>
                  </div>

                  <div className="text-left mb-4 w-full">
                    <p className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Bitcoin Address</p>
                    <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-100 rounded-xl px-3 py-3">
                      <code className="text-xs text-gray-700 break-all flex-1">{payAddress}</code>
                      <button onClick={copyAddress} className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-blue-600 flex items-center gap-1">
                        <Copy size={12}/> {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {secondsLeft !== null && (
                    <p className="text-xs text-gray-400 mb-4">
                      ⏱ This address expires in <span className="font-bold text-gray-600">{formatCountdown(secondsLeft)}</span>
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                    <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                    Waiting for payment confirmation...
                  </div>

                  <button onClick={() => setStep(2)} className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm py-2">
                    ← Back to review
                  </button>
                </div>

              ) : step === 1 ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl mb-4 sm:mb-6">
                    <img src={child.image_url || '/children/1.webp'} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0" alt={child.name}/>
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-gray-800 text-xs sm:text-sm">Sponsoring {child.name}</p>
                      <p className="text-blue-600 font-bold text-xs sm:text-sm">{currencyMeta.symbol}{getDonationAmount()} · {form.donationType === "one-time" ? "One-Time" : "Monthly"}</p>
                    </div>
                  </div>

                  <p className="text-xs mb-4 sm:mb-5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-3 py-2 font-medium">
                    All fields required for 80G tax exemption certificate
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                      <input type="text" placeholder="Rajesh Kumar" value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        onBlur={(e) => validateField("fullName", e.target.value)}
                        className={inputCls(errors.fullName)}/>
                      <ErrorMsg msg={errors.fullName}/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                      <input type="email" placeholder="rajesh@email.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onBlur={(e) => validateField("email", e.target.value)}
                        className={inputCls(errors.email)}/>
                      <ErrorMsg msg={errors.email}/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number *</label>
                      <input type="tel"
                        placeholder={isIndian ? "9876543210" : "+1 234 567 8900"}
                        maxLength={isIndian ? 10 : 20}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: isIndian ? e.target.value.replace(/\D/g, "") : e.target.value })}
                        onBlur={(e) => validateField("phone", e.target.value)}
                        className={inputCls(errors.phone)}/>
                      <ErrorMsg msg={errors.phone}/>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Date of Birth *</label>
                        <input type="date" value={form.dob}
                          onChange={(e) => setForm({ ...form, dob: e.target.value })}
                          onBlur={(e) => validateField("dob", e.target.value)}
                          className={inputCls(errors.dob)}/>
                        <ErrorMsg msg={errors.dob}/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">PAN Number *</label>
                        <input type="text" placeholder="ABCDE1234F" maxLength={10} value={form.pan}
                          onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
                          onBlur={(e) => validateField("pan", e.target.value)}
                          className={inputCls(errors.pan)}/>
                        <ErrorMsg msg={errors.pan}/>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Donor Type *</label>
                        <select value={form.donorType}
                          onChange={(e) => {
                            const val = e.target.value as FormData["donorType"]
                            setForm({ ...form, donorType: val, isCompany: val === "corporate" || val === "csr" })
                          }}
                          className={selectCls()}>
                          <option value="individual">Individual</option>
                          <option value="corporate">Corporate</option>
                          <option value="csr">CSR</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Donor Category *</label>
                        <select value={form.donorCategory}
                          onChange={(e) => setForm({ ...form, donorCategory: e.target.value as FormData["donorCategory"], state: "", country: "", pincode: "", phone: "" })}
                          className={selectCls()}>
                          <option value="indian">Indian</option>
                          <option value="nri">NRI</option>
                          <option value="foreign">Foreign</option>
                        </select>
                      </div>
                    </div>
                    <label className={`flex items-center gap-3 cursor-pointer select-none p-3 rounded-2xl hover:bg-gray-50 transition ${form.donorType !== "individual" ? "opacity-60 pointer-events-none" : ""}`}>
                      <input type="checkbox" checked={form.isCompany}
                        onChange={(e) => setForm({ ...form, isCompany: e.target.checked, companyName: "", gstNumber: "" })}
                        className="accent-blue-600 w-4 h-4 flex-shrink-0 rounded"
                        disabled={form.donorType !== "individual"}/>
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Donating on behalf of a Company / Organisation</span>
                    </label>
                    {form.isCompany && (
                      <div className="grid grid-cols-1 gap-3 p-3 sm:p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Company Name *</label>
                          <input type="text" placeholder="ABC Pvt. Ltd." value={form.companyName}
                            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                            onBlur={(e) => validateField("companyName", e.target.value)}
                            className={inputCls(errors.companyName)}/>
                          <ErrorMsg msg={errors.companyName}/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">GST Number *</label>
                          <input type="text" placeholder="22ABCDE1234F1Z5" maxLength={15} value={form.gstNumber}
                            onChange={(e) => setForm({ ...form, gstNumber: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
                            onBlur={(e) => validateField("gstNumber", e.target.value)}
                            className={inputCls(errors.gstNumber)}/>
                          <ErrorMsg msg={errors.gstNumber}/>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Address *</label>
                      <input type="text" placeholder="123, Street Name, Area" value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        onBlur={(e) => validateField("address", e.target.value)}
                        className={inputCls(errors.address)}/>
                      <ErrorMsg msg={errors.address}/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City *</label>
                      <input type="text" placeholder="Chennai" value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        onBlur={(e) => validateField("city", e.target.value)}
                        className={inputCls(errors.city)}/>
                      <ErrorMsg msg={errors.city}/>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        {isIndian ? (
                          <>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">State *</label>
                            <select value={form.state}
                              onChange={(e) => setForm({ ...form, state: e.target.value })}
                              onBlur={(e) => validateField("state", e.target.value)}
                              className={selectCls(errors.state)}>
                              <option value="" disabled>Select state</option>
                              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ErrorMsg msg={errors.state}/>
                          </>
                        ) : (
                          <>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Country *</label>
                            <select value={form.country}
                              onChange={(e) => setForm({ ...form, country: e.target.value })}
                              onBlur={(e) => validateField("country", e.target.value)}
                              className={selectCls(errors.country)}>
                              <option value="" disabled>Select country</option>
                              {WORLD_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ErrorMsg msg={errors.country}/>
                          </>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">{isIndian ? "Pincode *" : "ZIP Code *"}</label>
                        <input type="text" placeholder={isIndian ? "600001" : "e.g. SW1A 1AA"}
                          maxLength={isIndian ? 6 : 12} value={form.pincode}
                          onChange={(e) => setForm({ ...form, pincode: isIndian ? e.target.value.replace(/\D/g, "") : e.target.value })}
                          onBlur={(e) => validateField("pincode", e.target.value)}
                          className={inputCls(errors.pincode)}/>
                        <ErrorMsg msg={errors.pincode}/>
                      </div>
                    </div>
                    {form.donorCategory === "foreign" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 font-medium leading-relaxed">
                        ⚠️ <strong>FCRA Notice:</strong> Foreign contributions are accepted under the Foreign Contribution (Regulation) Act, 2010.
                      </div>
                    )}
                    <div className="space-y-2 sm:space-y-3 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer select-none p-3 rounded-2xl hover:bg-gray-50 transition">
                        <input type="checkbox" checked={form.termsAccepted}
                          onChange={(e) => { setForm({ ...form, termsAccepted: e.target.checked }); validateField("termsAccepted", e.target.checked); }}
                          className="accent-blue-600 w-4 h-4 mt-0.5 flex-shrink-0 rounded"/>
                        <span className="text-xs text-gray-600 leading-relaxed">
                          I agree to the <a href="/terms" target="_blank" className="text-blue-600 underline font-semibold">Terms & Conditions</a>, <a href="/privacy" target="_blank" className="text-blue-600 underline font-semibold">Privacy Policy</a> and <a href="/refund-policy" target="_blank" className="text-blue-600 underline font-semibold">Refund Policy</a>
                        </span>
                      </label>
                      <ErrorMsg msg={errors.termsAccepted}/>
                      <label className="flex items-start gap-3 cursor-pointer select-none p-3 rounded-2xl hover:bg-gray-50 transition">
                        <input type="checkbox" checked={form.declarationAccepted}
                          onChange={(e) => { setForm({ ...form, declarationAccepted: e.target.checked }); validateField("declarationAccepted", e.target.checked); }}
                          className="accent-blue-600 w-4 h-4 mt-0.5 flex-shrink-0 rounded"/>
                        <span className="text-xs text-gray-600 leading-relaxed">
                          I declare that the above information is correct and true to the best of my knowledge
                        </span>
                      </label>
                      <ErrorMsg msg={errors.declarationAccepted}/>
                      <label className="flex items-start gap-3 cursor-pointer select-none p-3 rounded-2xl hover:bg-gray-50 border border-blue-100 bg-blue-50/50 transition">
                        <input type="checkbox" checked={form.dpdpConsent}
                          onChange={(e) => { setForm({ ...form, dpdpConsent: e.target.checked }); validateField("dpdpConsent", e.target.checked); }}
                          className="accent-blue-600 w-4 h-4 mt-0.5 flex-shrink-0 rounded"/>
                        <span className="text-xs text-gray-600 leading-relaxed">
                          I consent to the collection and processing of my personal data (name, email, PAN, address) for sponsorship and tax receipt purposes under the <strong>Digital Personal Data Protection Act, 2023</strong>
                        </span>
                      </label>
                      <ErrorMsg msg={errors.dpdpConsent}/>
                    </div>
                  </div>
                  <button onClick={handleContinueToSummary} className="w-full mt-5 sm:mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white py-3.5 sm:py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-200 transition-all duration-200">
                    Review Sponsorship →
                  </button>
                  <p className="text-xs text-center mt-3 text-gray-400 pb-2 flex items-center justify-center gap-1.5">
                    <Shield size={11}/> Secured by NOWPayments · Bitcoin Network
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 mb-4 sm:mb-5 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={child.image || '/children/1.webp'} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0" alt={child.name}/>
                      <div className="min-w-0">
                        <p className="font-black text-white text-sm truncate">{child.name}</p>
                        <p className="text-xs text-blue-200">{child.location}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-blue-200 mb-0.5">Sponsorship Amount</p>
                        <p className="text-2xl sm:text-3xl font-black text-white">{currencyMeta.symbol}{getDonationAmount()}</p>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white capitalize">
                        {form.donationType === "one-time" ? "One-Time" : "Monthly"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Sponsor Details</p>
                    <div className="space-y-2">
                      {[
                        { label: "Name",     value: form.fullName },
                        { label: "Email",    value: form.email },
                        { label: "Phone",    value: form.phone },
                        { label: "DOB",      value: form.dob },
                        { label: "PAN",      value: form.pan.toUpperCase() },
                        { label: "Donor Type", value: form.donorType },
                        { label: "Category", value: form.donorCategory.toUpperCase() },
                        ...(form.isCompany ? [
                          { label: "Company", value: form.companyName },
                          { label: "GST",     value: form.gstNumber.toUpperCase() },
                        ] : []),
                        { label: "Address",  value: `${form.address}, ${form.city}, ${isIndian ? form.state : form.country} - ${form.pincode}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between gap-3 text-xs border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <span className="text-gray-400 flex-shrink-0 font-semibold uppercase tracking-wide">{label}</span>
                          <span className="text-gray-800 font-semibold text-right break-all">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="w-full mb-3 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition">
                    ← Edit Details
                  </button>
                  <button onClick={handlePayment} disabled={loading}
                    className={`w-full py-3.5 sm:py-4 rounded-2xl font-black text-white text-sm transition-all duration-200 shadow-lg ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] shadow-blue-200"}`}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Creating payment...
                      </span>
                    ) : `Proceed to Pay ${currencyMeta.symbol}${getDonationAmount()} 🔒`}
                  </button>
                  <p className="text-xs text-center mt-3 text-gray-400 pb-2 flex items-center justify-center gap-1.5">
                    <Shield size={11}/> Secured by NOWPayments · Bitcoin Network
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}