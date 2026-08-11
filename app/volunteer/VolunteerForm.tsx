"use client";

import { useState } from "react";

type Step = "step1" | "step2" | "step3" | "success";

interface VolunteerDetails {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  city: string;
  occupation: string;
  languages: string[];
  area_of_interest: string;
  availability: string;
  special_skills: string;
  message: string;
  how_did_you_hear: string;
  dpdpConsent: boolean;
  ageDeclaration: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  area_of_interest?: string;
  availability?: string;
  dpdpConsent?: string;
  ageDeclaration?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const T = {
  green:     "#059669",
  greenDeep: "#047857",
};

const AREAS = [
  { value: "annadhanam",   label: "🍱 Annadhanam" },
  { value: "construction", label: "📦 Relief Distribution" },
  { value: "medical",      label: "🏥 Medical Camp" },
  { value: "festival",     label: "🪔 Community" },
  { value: "teaching",     label: "📚 Teaching" },
  { value: "admin",        label: "🗂️ Admin" },
];

const AVAILABILITY = [
  { value: "weekdays",  label: "Weekdays" },
  { value: "weekends",  label: "Weekends" },
  { value: "both",      label: "Both" },
  { value: "flexible",  label: "Flexible" },
];

const LANGUAGES = ["Tamil", "English", "Hindi", "Telugu", "Kannada", "Malayalam"];

const HOW_DID_YOU_HEAR = [
  { value: "",             label: "Select an option" },
  { value: "friend",       label: "Friend / Family" },
  { value: "social_media", label: "Social Media" },
  { value: "temple",       label: "Temple Notice Board" },
  { value: "website",      label: "Website" },
  { value: "other",        label: "Other" },
];

const inputBase = "w-full px-4 py-3 rounded-2xl border-2 text-sm font-medium text-gray-800 bg-white placeholder-gray-400 focus:outline-none transition-all duration-200";
const inputCls  = (e?: string) => `${inputBase} ${e ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#059669] hover:border-emerald-300"}`;
const selectCls = (e?: string) => `${inputBase} cursor-pointer appearance-none ${e ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#059669] hover:border-emerald-300"}`;

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1.5 font-medium">{msg}</p> : null;

const initialDetails: VolunteerDetails = {
  name: "", email: "", phone: "", age: "", gender: "",
  city: "", occupation: "", languages: [], area_of_interest: "",
  availability: "", special_skills: "", message: "",
  how_did_you_hear: "", dpdpConsent: false, ageDeclaration: false,
};

const STEPS = ["Personal", "Interests", "Submit"];

export function VolunteerForm() {
  const [step, setStep]       = useState<Step>("step1");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [errors, setErrors]   = useState<FormErrors>({});
  const [details, setDetails] = useState<VolunteerDetails>(initialDetails);

  const currentStepIndex = step === "step1" ? 0 : step === "step2" ? 1 : step === "step3" ? 2 : 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setDetails((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleLanguage = (lang: string) => {
    setDetails((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const validateStep1 = (): boolean => {
    const e: FormErrors = {};
    if (!details.name.trim())                                  e.name  = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))    e.email = "Valid email is required";
    if (!/^[6-9]\d{9}$/.test(details.phone))                  e.phone = "Valid 10-digit phone required";
    if (!details.age || Number(details.age) < 15 || Number(details.age) > 80)
                                                               e.age   = "Age between 15–80 required";
    if (!details.gender)                                       e.gender = "Please select gender";
    if (!details.city.trim())                                  e.city  = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: FormErrors = {};
    if (!details.area_of_interest) e.area_of_interest = "Please select area of interest";
    if (!details.availability)     e.availability     = "Please select availability";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: FormErrors = {};
    if (!details.dpdpConsent)    e.dpdpConsent    = "You must consent to data processing";
    if (!details.ageDeclaration) e.ageDeclaration = "You must confirm age declaration";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === "step1" && validateStep1()) { setErrors({}); setStep("step2"); }
    if (step === "step2" && validateStep2()) { setErrors({}); setStep("step3"); }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/volunteers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:             details.name,
          email:            details.email,
          phone:            details.phone,
          age:              Number(details.age),
          gender:           details.gender,
          city:             details.city,
          occupation:       details.occupation || null,
          languages:        details.languages,
          area_of_interest: details.area_of_interest,
          availability:     details.availability,
          special_skills:   details.special_skills || null,
          message:          details.message || null,
          how_did_you_hear: details.how_did_you_hear || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStep("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success ── */
  if (step === "success") return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-emerald-50">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-md w-full">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(5,150,105,0.10)" }}>
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#059669">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-4xl mb-2">🙏</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">நன்றி! Thank You!</h2>
        <p className="text-gray-600 text-sm mb-1">
          Dear <span className="font-bold text-gray-900">{details.name}</span>,
        </p>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Your registration is received. We will contact you at{" "}
          <span className="font-semibold text-gray-700">{details.email}</span> within 2–3 working days.
        </p>
        <a href="/" className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm">
          ← Return to Home
        </a>
      </div>
    </div>
  );

  /* ── Shell ── */
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-10 bg-emerald-50">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-md mx-auto overflow-hidden">

        {/* Header */}
        <div className="px-6 py-6 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
          <div className="text-2xl mb-1">🤝</div>
          <h1 className="text-lg font-extrabold tracking-tight">Volunteer Registration</h1>
          <p className="text-white/70 text-xs mt-0.5">சேவை செய்யுங்கள் • Serve with Purpose</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 px-6 py-4 border-b border-emerald-100">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all"
                  style={i < currentStepIndex
                    ? { background: T.green, color: "#fff" }
                    : i === currentStepIndex
                    ? { background: T.green, color: "#fff", boxShadow: "0 0 0 3px rgba(5,150,105,0.20)" }
                    : { background: "#f1f5f9", color: "#94a3b8" }}>
                  {i < currentStepIndex ? "✓" : i + 1}
                </div>
                <span className="text-[10px] font-bold"
                  style={{ color: i <= currentStepIndex ? T.green : "#94a3b8" }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-16 h-0.5 mx-1 mb-4 transition-all"
                  style={{ background: i < currentStepIndex ? T.green : "#e2e8f0" }} />
              )}
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-6 space-y-4">

          {/* ── Step 1: Personal Info ── */}
          {step === "step1" && (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Details</p>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input name="name" value={details.name} onChange={handleChange}
                  placeholder="Rajesh Kumar" className={inputCls(errors.name)} />
                <ErrorMsg msg={errors.name} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
                <input name="email" type="email" value={details.email} onChange={handleChange}
                  placeholder="rajesh@email.com" className={inputCls(errors.email)} />
                <ErrorMsg msg={errors.email} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone *</label>
                <input name="phone" value={details.phone} onChange={handleChange}
                  placeholder="9876543210" maxLength={10} className={inputCls(errors.phone)} />
                <ErrorMsg msg={errors.phone} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Age *</label>
                  <input name="age" value={details.age} onChange={handleChange}
                    placeholder="25" type="number" maxLength={2} className={inputCls(errors.age)} />
                  <ErrorMsg msg={errors.age} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Gender *</label>
                  <select name="gender" value={details.gender} onChange={handleChange} className={selectCls(errors.gender)}>
                    <option value="" disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ErrorMsg msg={errors.gender} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City *</label>
                <input name="city" value={details.city} onChange={handleChange}
                  placeholder="Chennai" className={inputCls(errors.city)} />
                <ErrorMsg msg={errors.city} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Occupation <span className="normal-case text-gray-400">(Optional)</span>
                </label>
                <input name="occupation" value={details.occupation} onChange={handleChange}
                  placeholder="e.g. Teacher, Engineer, Student" className={inputCls()} />
              </div>
            </>
          )}

          {/* ── Step 2: Interests ── */}
          {step === "step2" && (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Interests</p>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Area of Interest *</label>
                <div className="grid grid-cols-2 gap-2">
                  {AREAS.map((area) => (
                    <button key={area.value} type="button"
                      onClick={() => setDetails((p) => ({ ...p, area_of_interest: area.value }))}
                      className="py-2.5 px-3 rounded-2xl border-2 font-bold text-left text-xs transition-all"
                      style={details.area_of_interest === area.value
                        ? { borderColor: T.green, background: "rgba(5,150,105,0.06)", color: T.green }
                        : { borderColor: "#f1f5f9", color: "#475569" }}>
                      {area.label}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.area_of_interest} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Availability *</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABILITY.map((a) => (
                    <button key={a.value} type="button"
                      onClick={() => setDetails((p) => ({ ...p, availability: a.value }))}
                      className="py-2.5 px-3 rounded-2xl border-2 font-bold text-sm transition-all"
                      style={details.availability === a.value
                        ? { borderColor: T.green, background: "rgba(5,150,105,0.06)", color: T.green }
                        : { borderColor: "#f1f5f9", color: "#475569" }}>
                      {a.label}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.availability} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                  Languages <span className="normal-case text-gray-400">(Optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button key={lang} type="button" onClick={() => toggleLanguage(lang)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all"
                      style={details.languages.includes(lang)
                        ? { borderColor: T.green, background: "rgba(5,150,105,0.08)", color: T.green }
                        : { borderColor: "#f1f5f9", color: "#64748b" }}>
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Special Skills <span className="normal-case text-gray-400">(Optional)</span>
                </label>
                <input name="special_skills" value={details.special_skills} onChange={handleChange}
                  placeholder="e.g. Cooking, Driving, Medical" className={inputCls()} />
              </div>
            </>
          )}

          {/* ── Step 3: Submit ── */}
          {step === "step3" && (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Final Details</p>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  How Did You Hear? <span className="normal-case text-gray-400">(Optional)</span>
                </label>
                <select name="how_did_you_hear" value={details.how_did_you_hear}
                  onChange={handleChange} className={selectCls()}>
                  {HOW_DID_YOU_HEAR.map((o) => (
                    <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Message <span className="normal-case text-gray-400">(Optional)</span>
                </label>
                <textarea name="message" value={details.message} onChange={handleChange}
                  placeholder="Tell us why you want to volunteer..." rows={3}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-sm font-medium text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:border-[#059669] hover:border-emerald-300 transition-all duration-200 resize-none" />
              </div>

              {/* Review summary */}
              <div className="rounded-2xl p-4 text-xs space-y-1.5"
                style={{ background: "rgba(5,150,105,0.04)", border: "1px solid rgba(5,150,105,0.12)" }}>
                <p className="font-extrabold text-gray-700 mb-2 text-sm">📋 Review Your Details</p>
                {[
                  ["Name",         details.name],
                  ["Email",        details.email],
                  ["Phone",        details.phone],
                  ["City",         details.city],
                  ["Area",         details.area_of_interest],
                  ["Availability", details.availability],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400 font-semibold">{k}</span>
                    <span className="font-bold text-gray-700 capitalize">{v || "—"}</span>
                  </div>
                ))}
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-gray-50 transition">
                  <input type="checkbox" checked={details.ageDeclaration}
                    onChange={(e) => setDetails({ ...details, ageDeclaration: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-emerald-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I declare that I am 15 years or older, or have guardian consent to volunteer
                  </span>
                </label>
                <ErrorMsg msg={errors.ageDeclaration} />

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl transition"
                  style={{ border: "1px solid rgba(5,150,105,0.12)", background: "rgba(5,150,105,0.04)" }}>
                  <input type="checkbox" checked={details.dpdpConsent}
                    onChange={(e) => setDetails({ ...details, dpdpConsent: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-emerald-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I consent to processing of my data under the{" "}
                    <strong>Digital Personal Data Protection Act, 2023</strong>
                  </span>
                </label>
                <ErrorMsg msg={errors.dpdpConsent} />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </>
          )}

          {/* ── Navigation ── */}
          <div className="pt-2 flex gap-3">
            {step !== "step1" && (
              <button
                onClick={() => setStep(step === "step3" ? "step2" : "step1")}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all"
                style={{ borderColor: "rgba(5,150,105,0.25)", color: T.green }}>
                ← Back
              </button>
            )}
            {step !== "step3" ? (
              <button onClick={nextStep}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white transition active:scale-95"
                style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : "🙏 Register as Volunteer"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}