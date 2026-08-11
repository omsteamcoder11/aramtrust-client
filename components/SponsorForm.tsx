"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Step = "amount" | "details" | "payment" | "success";

interface SponsorDetails {
  name: string; email: string; phone: string; pan_number: string; dob: string;
  address_line1: string; city: string; state: string; pincode: string;
  country: string; passport_number: string;
  donor_category: "indian" | "nri" | "foreign";
  donation_type: "one-time" | "monthly";
  message: string;
  termsAccepted: boolean; declarationAccepted: boolean; dpdpConsent: boolean;
}

interface FormErrors {
  name?: string; email?: string; phone?: string; pan_number?: string;
  dob?: string; address_line1?: string; city?: string; state?: string;
  pincode?: string; country?: string; passport_number?: string;
  termsAccepted?: string; declarationAccepted?: string; dpdpConsent?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ORG_NAME = "Uthamar Thiru Kovil Arrakattalai Makal Sevai Margam";

const SPONSOR_TYPES = [
  { value: "meal",         label: "🍱 Sponsor a Meal (Annadhanam)",     presets: [501, 1001, 2001, 5001] },
  { value: "education",    label: "📚 Sponsor Education Aid",           presets: [501, 1001, 2001, 5001] },
  { value: "construction", label: "🏛️ Sponsor Construction",            presets: [2001, 5001, 10001, 25001] },
  { value: "festival",     label: "🪔 Sponsor a Festival",              presets: [1001, 5001, 10001, 25001] },
];

const IMPACT_MESSAGES: Record<string, (amt: number) => string> = {
  meal:         (a) => a >= 5001 ? "🍱 Feed 250+ devotees for a day!" : a >= 1001 ? "🍱 Feed 50 devotees!" : "🙏 Every rupee feeds a soul!",
  education:    (a) => a >= 10001 ? "🎓 Sponsor a child's full year!" : a >= 2001 ? "📚 Cover school supplies for 2 children!" : "💛 Brighten a child's future!",
  construction: (a) => a >= 10001 ? "🏛️ Major contribution to temple!" : a >= 5001 ? "🧱 Sponsor a section of construction!" : "🙏 Every brick builds dharma!",
  festival:     (a) => a >= 10001 ? "🪔 Be the main sponsor of a festival!" : a >= 5001 ? "✨ Sponsor festival decorations!" : "🙏 Help celebrate the divine!",
};

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const WORLD_COUNTRIES = [
  "Afghanistan","Australia","Bahrain","Bangladesh","Belgium","Bhutan","Canada","China",
  "Denmark","Egypt","Finland","France","Germany","Ghana","Greece","Hong Kong","Indonesia",
  "Iran","Ireland","Israel","Italy","Japan","Jordan","Kenya","Kuwait","Malaysia","Maldives",
  "Mexico","Morocco","Myanmar","Nepal","Netherlands","New Zealand","Nigeria","Norway","Oman",
  "Pakistan","Philippines","Poland","Portugal","Qatar","Russia","Saudi Arabia","Singapore",
  "South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Taiwan","Thailand",
  "Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Vietnam",
];

const T = {
  saffron:     "#ea580c",
  saffronDeep: "#c2410c",
  gold:        "#d97706",
  green:       "#15803d",
};

const inputBase = "w-full px-4 py-3 rounded-2xl border-2 text-sm font-medium text-gray-800 bg-white placeholder-gray-400 focus:outline-none transition-all duration-200";
const inputCls  = (e?: string) => `${inputBase} ${e ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#ea580c] hover:border-orange-300"}`;
const selectCls = (e?: string) => `${inputBase} cursor-pointer appearance-none ${e ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#ea580c] hover:border-orange-300"}`;
const ErrorMsg = ({ msg }: { msg?: string }) => msg ? <p className="text-red-500 text-xs mt-1.5 font-medium">{msg}</p> : null;

const initialDetails: SponsorDetails = {
  name: "", email: "", phone: "", pan_number: "", dob: "",
  address_line1: "", city: "", state: "", pincode: "", country: "",
  passport_number: "", donor_category: "indian", donation_type: "one-time", message: "",
  termsAccepted: false, declarationAccepted: false, dpdpConsent: false,
};

export function SponsorForm() {
  const router = useRouter();
  const [step, setStep]                 = useState<Step>("amount");
  const [sponsorType, setSponsorType]   = useState(SPONSOR_TYPES[0].value);
  const [amount, setAmount]             = useState<number | "custom">(1001);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [errors, setErrors]             = useState<FormErrors>({});
  const [details, setDetails]           = useState<SponsorDetails>(initialDetails);
  const [sponsorId, setSponsorId]       = useState<number | null>(null);

  // Bitcoin payment state
  const [paymentId, setPaymentId]         = useState("");
  const [payAddress, setPayAddress]       = useState("");
  const [payAmountBTC, setPayAmountBTC]   = useState<number | null>(null);
  const [expiresAt, setExpiresAt]         = useState<string>("");
  const [copied, setCopied]               = useState(false);
  const [secondsLeft, setSecondsLeft]     = useState<number | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentType = SPONSOR_TYPES.find(t => t.value === sponsorType)!;
  const finalAmount = amount === "custom"
    ? (parseFloat(customAmount.replace(/,/g, "")) || 0)
    : Number(amount);

  const isIndian  = details.donor_category === "indian";
  const isNRI     = details.donor_category === "nri";
  const isForeign = details.donor_category === "foreign";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setDetails(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validateAmount = () => {
    if (!finalAmount || isNaN(finalAmount) || finalAmount < 100) {
      setError("Minimum sponsorship amount is ₹100."); return false;
    }
    setError(""); return true;
  };

  const validateDetails = (): boolean => {
    const e: FormErrors = {};
    if (!details.name.trim())                                                                           e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))                                             e.email = "Valid email is required";
    if (isIndian ? !/^[6-9]\d{9}$/.test(details.phone) : details.phone.length < 7)                     e.phone = "Valid phone number is required";
    if (!details.dob)                                                                                   e.dob = "Date of birth is required";
    if ((isIndian || isNRI) && !details.pan_number.trim())                                              e.pan_number = "PAN number is required";
    if ((isIndian || isNRI) && details.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(details.pan_number.toUpperCase())) e.pan_number = "Invalid PAN format (e.g. ABCDE1234F)";
    if ((isNRI || isForeign) && !details.passport_number.trim())                                        e.passport_number = "Passport number is required";
    if (!details.address_line1.trim())                                                                  e.address_line1 = "Address is required";
    if (!details.city.trim())                                                                           e.city = "City is required";
    if (isIndian && !details.state.trim())                                                              e.state = "State is required";
    if (!isIndian && !details.country.trim())                                                           e.country = "Country is required";
    if (isIndian && !/^\d{6}$/.test(details.pincode))                                                   e.pincode = "Valid 6-digit pincode required";
    if (!isIndian && !details.pincode.trim())                                                           e.pincode = "ZIP / Postal code is required";
    if (!details.termsAccepted)                                                                         e.termsAccepted = "You must accept terms & conditions";
    if (!details.declarationAccepted)                                                                   e.declarationAccepted = "You must confirm your details are correct";
    if (!details.dpdpConsent)                                                                           e.dpdpConsent = "You must consent to data processing under DPDP Act 2023";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Create the Bitcoin payment (replaces old Razorpay handlePayment)
  const handlePayment = async () => {
    if (!validateDetails()) return;
    if (!finalAmount || finalAmount < 100) {
      setError("Please enter a valid amount (minimum ₹100)."); return;
    }
    setLoading(true); setError("");
    try {
      const orderRes = await fetch(`${API_URL}/api/sponsors/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:            details.name,
          email:           details.email,
          phone:           details.phone,
          pan_number:      details.pan_number.toUpperCase(),
          passport_number: details.passport_number || null,
          date_of_birth:   details.dob,
          donor_category:  details.donor_category,
          sponsor_type:    sponsorType,
          donation_type:   details.donation_type,
          amount:          finalAmount,
          address_line1:   details.address_line1,
          city:            details.city,
          state:           isIndian ? details.state : null,
          country:         isIndian ? "India" : details.country,
          pincode:         details.pincode,
          message:         details.message || null,
          dpdp_consent:    details.dpdpConsent,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message);

      setSponsorId(orderData.sponsor_id);
      setPaymentId(orderData.payment_id);
      setPayAddress(orderData.pay_address);
      setPayAmountBTC(orderData.pay_amount_btc);
      setExpiresAt(orderData.expires_at);
      setStep("payment");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Poll payment status while on the "payment" step
  useEffect(() => {
    if (step !== "payment" || !paymentId || !sponsorId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/sponsors/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id: paymentId, sponsor_id: sponsorId }),
        });
        if (!res.ok) return; // not confirmed yet — keep polling
        if (pollRef.current) clearInterval(pollRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);
        setStep("success");
      } catch {
        // silent — try again on next tick
      }
    };

    checkStatus();
    pollRef.current = setInterval(checkStatus, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [step, paymentId, sponsorId]);

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

  // ── Payment Screen (Bitcoin) ──
  if (step === "payment") {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=bitcoin:${payAddress}?amount=${payAmountBTC}`;
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-orange-50">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-3xl mb-2">₿</div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">Send Bitcoin to Complete Sponsorship</h2>
          <p className="text-gray-500 text-sm mb-6">Send exactly the amount below from your wallet</p>

          <img src={qrUrl} alt="Bitcoin payment QR code" className="mx-auto mb-5 rounded-xl border border-gray-100" />

          <div className="rounded-2xl p-4 mb-3" style={{ background: "rgba(234,88,12,0.06)", border: "1px solid rgba(234,88,12,0.15)" }}>
            <p className="text-xs text-gray-500 mb-1">Amount to send</p>
            <p className="text-2xl font-extrabold" style={{ color: T.saffron }}>{payAmountBTC} BTC</p>
          </div>

          <div className="text-left mb-4">
            <p className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Bitcoin Address</p>
            <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-100 rounded-xl px-3 py-3">
              <code className="text-xs text-gray-700 break-all flex-1">{payAddress}</code>
              <button onClick={copyAddress}
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                style={{ background: T.saffron }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {secondsLeft !== null && (
            <p className="text-xs text-gray-400 mb-4">
              ⏱ This address expires in <span className="font-bold text-gray-600">{formatCountdown(secondsLeft)}</span>
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-4 h-4 border-2 border-orange-300 border-t-[#ea580c] rounded-full animate-spin" />
            Waiting for payment confirmation...
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button onClick={() => setStep("details")}
            className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm py-2">
            ← Back to details
          </button>
        </div>
      </div>
    );
  }

  // ── Success ──
  if (step === "success") return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-orange-50">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-md w-full">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(234,88,12,0.10)" }}>
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#ea580c">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-4xl mb-2">🙏</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">நன்றி! Thank You!</h2>
        <p className="text-gray-600 text-base mb-1">
          Dear <span className="font-bold text-gray-900">{details.name}</span>,
        </p>
        <p className="text-gray-600 text-base mb-2">
          Your sponsorship of{" "}
          <span className="font-bold text-[#ea580c]">₹{finalAmount.toLocaleString()}</span>{" "}
          for{" "}
          <span className="font-semibold text-gray-800">{currentType.label}</span>{" "}
          is a blessed contribution.
        </p>
        <p className="text-xs text-gray-400 mb-8">A receipt has been sent to {details.email}</p>
        <button onClick={() => router.push("/")}
          className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm py-2">
          ← Return to Home
        </button>
      </div>
    </div>
  );

  // ── Main Form ──
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-8 sm:py-12 bg-orange-50">
      <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 w-full max-w-lg mx-auto overflow-hidden">

        <div className="px-6 sm:px-8 py-6 sm:py-8 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${T.saffron}, ${T.saffronDeep})` }}>
          <div className="text-3xl mb-2">🪔</div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Become a Sponsor</h1>
          <p className="text-white/75 text-xs sm:text-sm mt-1 font-medium">
            ஆதரவு செய்யுங்கள் • 100% goes to the cause • 80G Tax Exemption
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8">

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {["amount", "details"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 sm:gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  step === s ? "text-white shadow-lg" : step === "details" && i === 0 ? "text-white" : "bg-slate-100 text-slate-400"
                }`}
                  style={step === s
                    ? { background: `linear-gradient(135deg, ${T.saffron}, ${T.saffronDeep})` }
                    : step === "details" && i === 0 ? { background: T.green } : {}}>
                  {step === "details" && i === 0 ? "✓" : i + 1}
                </div>
                <span className={`text-xs sm:text-sm font-bold ${step === s ? "text-gray-900" : "text-gray-400"}`}>
                  {s === "amount" ? "Sponsorship" : "Your Details"}
                </span>
                {i === 0 && <div className="w-8 sm:w-12 h-1 rounded-full bg-slate-100" />}
              </div>
            ))}
          </div>

          {step === "amount" && (
            <div className="space-y-4 sm:space-y-5">

              <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl w-full">
                {(["one-time", "monthly"] as const).map((f) => (
                  <button key={f} onClick={() => setDetails(d => ({ ...d, donation_type: f }))}
                    className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all"
                    style={details.donation_type === f
                      ? { background: "#fff", color: T.saffron, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                      : { color: "#64748b" }}>
                    {f.replace("-", " ")}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Sponsor Type *</label>
                <div className="grid grid-cols-1 gap-2">
                  {SPONSOR_TYPES.map(t => (
                    <button key={t.value} onClick={() => { setSponsorType(t.value); setAmount(t.presets[1]); }}
                      className="py-3 px-4 rounded-2xl border-2 font-bold text-left text-sm transition-all"
                      style={sponsorType === t.value
                        ? { borderColor: T.saffron, background: "rgba(234,88,12,0.06)", color: T.saffron }
                        : { borderColor: "#f1f5f9", color: "#475569" }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Amount *</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {currentType.presets.map(amt => (
                    <button key={amt} onClick={() => setAmount(amt)}
                      className="py-3 sm:py-4 rounded-2xl border-2 font-bold transition-all text-xs sm:text-sm"
                      style={amount === amt
                        ? { borderColor: T.saffron, background: "rgba(234,88,12,0.06)", color: T.saffron }
                        : { borderColor: "#f1f5f9", color: "#475569" }}>
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                  <button onClick={() => setAmount("custom")}
                    className="py-3 sm:py-4 rounded-2xl border-2 font-bold transition-all text-xs sm:text-sm"
                    style={amount === "custom"
                      ? { borderColor: T.saffron, background: "rgba(234,88,12,0.06)", color: T.saffron }
                      : { borderColor: "#f1f5f9", color: "#475569" }}>
                    Custom
                  </button>
                </div>
              </div>

              {amount === "custom" && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                  <input type="number" value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-10 pr-5 py-4 outline-none font-bold text-lg text-gray-900 transition-all"
                    onFocus={e => (e.currentTarget.style.borderColor = T.saffron)}
                    onBlur={e  => (e.currentTarget.style.borderColor = "transparent")} />
                </div>
              )}

              {finalAmount >= 100 && (
                <div className="rounded-xl p-3 text-center text-xs sm:text-sm font-medium"
                  style={{ background: "rgba(234,88,12,0.06)", color: T.saffronDeep, border: `1px solid rgba(234,88,12,0.15)` }}>
                  {(IMPACT_MESSAGES[sponsorType] || IMPACT_MESSAGES.meal)(finalAmount)}
                </div>
              )}

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button onClick={() => { if (validateAmount()) setStep("details"); }}
                className="w-full text-white py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-lg active:scale-95"
                style={{ background: `linear-gradient(135deg, ${T.saffron}, ${T.saffronDeep})` }}>
                Continue to Details →
              </button>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-3 sm:space-y-4">

              <div className="text-xs rounded-xl px-3 py-2 font-medium"
                style={{ background: "#fef3c7", border: "1px solid #fcd34d", color: "#92400e" }}>
                📋 All fields are required for your 80G tax exemption certificate
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input name="name" value={details.name} onChange={handleChange}
                  placeholder="Rajesh Kumar" className={inputCls(errors.name)} />
                <ErrorMsg msg={errors.name} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                <input name="email" type="email" value={details.email} onChange={handleChange}
                  placeholder="rajesh@email.com" className={inputCls(errors.email)} />
                <ErrorMsg msg={errors.email} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number *</label>
                <input name="phone" value={details.phone} onChange={handleChange}
                  placeholder={isIndian ? "9876543210" : "+1 234 567 8900"}
                  maxLength={isIndian ? 10 : 20}
                  className={inputCls(errors.phone)} />
                <ErrorMsg msg={errors.phone} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Date of Birth *</label>
                <input name="dob" type="date" value={details.dob} onChange={handleChange}
                  className={inputCls(errors.dob)} />
                <ErrorMsg msg={errors.dob} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Donor Category *</label>
                <select name="donor_category" value={details.donor_category}
                  onChange={e => setDetails({ ...details, donor_category: e.target.value as any, state: "", country: "", pincode: "", pan_number: "", passport_number: "" })}
                  className={selectCls()}>
                  <option value="indian">Indian (Resident)</option>
                  <option value="nri">NRI (Non-Resident Indian)</option>
                  <option value="foreign">Foreign National</option>
                </select>
              </div>

              {(isIndian || isNRI) && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">PAN Number *</label>
                  <input name="pan_number" value={details.pan_number}
                    onChange={e => setDetails({ ...details, pan_number: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
                    placeholder="ABCDE1234F" maxLength={10}
                    className={inputCls(errors.pan_number)} />
                  <ErrorMsg msg={errors.pan_number} />
                </div>
              )}

              {(isNRI || isForeign) && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Passport Number *</label>
                  <input name="passport_number" value={details.passport_number}
                    onChange={e => setDetails({ ...details, passport_number: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
                    placeholder="A1234567" maxLength={12}
                    className={inputCls(errors.passport_number)} />
                  <ErrorMsg msg={errors.passport_number} />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Address *</label>
                <input name="address_line1" value={details.address_line1} onChange={handleChange}
                  placeholder="123, Street Name, Area" className={inputCls(errors.address_line1)} />
                <ErrorMsg msg={errors.address_line1} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City *</label>
                <input name="city" value={details.city} onChange={handleChange}
                  placeholder="Chennai" className={inputCls(errors.city)} />
                <ErrorMsg msg={errors.city} />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  {isIndian ? (
                    <>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">State *</label>
                      <select name="state" value={details.state} onChange={handleChange} className={selectCls(errors.state)}>
                        <option value="" disabled>Select state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ErrorMsg msg={errors.state} />
                    </>
                  ) : (
                    <>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Country *</label>
                      <select name="country" value={details.country} onChange={handleChange} className={selectCls(errors.country)}>
                        <option value="" disabled>Select country</option>
                        {WORLD_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ErrorMsg msg={errors.country} />
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">{isIndian ? "Pincode *" : "ZIP Code *"}</label>
                  <input name="pincode" value={details.pincode}
                    onChange={e => setDetails({ ...details, pincode: isIndian ? e.target.value.replace(/\D/g, "") : e.target.value })}
                    placeholder={isIndian ? "600001" : "e.g. SW1A 1AA"}
                    maxLength={isIndian ? 6 : 12}
                    className={inputCls(errors.pincode)} />
                  <ErrorMsg msg={errors.pincode} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Message (Optional)</label>
                <textarea name="message" value={details.message} onChange={handleChange}
                  placeholder="Any special message or dedication..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-sm font-medium text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:border-[#ea580c] hover:border-orange-300 transition-all duration-200 resize-none" />
              </div>

              <div className="rounded-xl p-3 sm:p-4 flex justify-between items-center"
                style={{ background: "rgba(234,88,12,0.05)", border: "1px solid rgba(234,88,12,0.12)" }}>
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-lg font-bold" style={{ color: T.saffron }}>₹{finalAmount.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Sponsoring</p>
                  <p className="font-bold text-gray-700 text-xs">{currentType.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-bold text-gray-700 capitalize text-sm">{details.donation_type}</p>
                </div>
                <button onClick={() => setStep("amount")}
                  className="text-xs font-bold hover:underline" style={{ color: T.saffron }}>Edit</button>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-gray-50 transition">
                  <input type="checkbox" checked={details.termsAccepted}
                    onChange={e => setDetails({ ...details, termsAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-orange-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <a href="/terms" target="_blank" className="font-semibold underline" style={{ color: T.saffron }}>Terms & Conditions</a>,{" "}
                    <a href="/privacy" target="_blank" className="font-semibold underline" style={{ color: T.saffron }}>Privacy Policy</a> and{" "}
                    <a href="/refund-policy" target="_blank" className="font-semibold underline" style={{ color: T.saffron }}>Refund Policy</a>
                  </span>
                </label>
                <ErrorMsg msg={errors.termsAccepted} />

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-gray-50 transition">
                  <input type="checkbox" checked={details.declarationAccepted}
                    onChange={e => setDetails({ ...details, declarationAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-orange-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I declare that the above information is correct and true to the best of my knowledge
                  </span>
                </label>
                <ErrorMsg msg={errors.declarationAccepted} />

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl transition"
                  style={{ border: "1px solid rgba(234,88,12,0.12)", background: "rgba(234,88,12,0.04)" }}>
                  <input type="checkbox" checked={details.dpdpConsent}
                    onChange={e => setDetails({ ...details, dpdpConsent: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-orange-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I consent to collection and processing of my personal data for sponsorship and tax receipt purposes under the{" "}
                    <strong>Digital Personal Data Protection Act, 2023</strong>
                  </span>
                </label>
                <ErrorMsg msg={errors.dpdpConsent} />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="pt-2 border-t border-slate-100">
                <button onClick={handlePayment} disabled={loading}
                  className="w-full text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${T.saffron}, ${T.saffronDeep})` }}>
                  {loading
                    ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : `🔒 Complete ₹${finalAmount.toLocaleString()} Sponsorship`}
                </button>
                <button onClick={() => setStep("amount")}
                  className="w-full mt-3 text-slate-400 font-bold text-sm py-2 hover:text-slate-600 transition">
                  ← Edit Sponsorship
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Secured by NOWPayments • Bitcoin Network • 80G Tax Exemption
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SponsorForm