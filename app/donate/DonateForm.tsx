"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Step = "amount" | "details" | "payment" | "processing" | "success";

interface DonorDetails {
  name: string; email: string; phone: string; pan_number: string; dob: string;
  address_line1: string; city: string; state: string; pincode: string;
  country: string;
  passport_number: string;
  donor_category: "indian" | "nri" | "foreign";
  donate_towards: string;
  termsAccepted: boolean; declarationAccepted: boolean; dpdpConsent: boolean;
}

interface FormErrors {
  name?: string; email?: string; phone?: string; pan_number?: string; dob?: string;
  address_line1?: string; city?: string; state?: string; pincode?: string;
  country?: string; passport_number?: string; donate_towards?: string;
  termsAccepted?: string; declarationAccepted?: string; dpdpConsent?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ORG_NAME = "Aram Trust";

const DONATE_TOWARDS_OPTIONS = [
  { value: "", label: "Select a cause" },
  { value: "general", label: "General Fund" },
  { value: "construction", label: "Temple Building Construction" },
  { value: "food_service", label: "Food Service (Annadhanam)" },
  { value: "education", label: "Education Aid" }
];

const IMPACT_MESSAGES: Record<string, (amt: number) => string> = {
  food_service:    (a) => a >= 2000 ? "🍱 Feed 100 devotees for a day!" : a >= 500 ? "🍱 Feed 25 devotees!" : "🙏 Every rupee feeds a soul!",
  construction:    (a) => a >= 5000 ? "🏛️ Contribute to temple construction!" : a >= 1001 ? "🧱 Support a brick of dharma!" : "🙏 Every contribution builds faith!",
  children_fund:   (a) => a >= 5001 ? "🎓 Sponsor a child's education for a month!" : a >= 1001 ? "📚 School supplies for 2 children!" : "💛 Every rupee brightens a child's future!",
  general:         (a) => a >= 5001 ? "✨ A generous offering to the cause!" : "🙏 Your contribution serves the community!",
};

const getImpactMessage = (towards: string, amount: number) => {
  const fn = IMPACT_MESSAGES[towards] || IMPACT_MESSAGES["general"];
  return fn(amount);
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
  "Afghanistan","Albania","Algeria","Australia","Austria","Bangladesh","Belgium","Bhutan",
  "Brazil","Canada","China","Denmark","Egypt","Finland","France","Germany","Ghana",
  "Greece","Hong Kong","Hungary","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Japan","Jordan","Kenya","Kuwait","Malaysia","Maldives","Mexico","Morocco","Myanmar",
  "Nepal","Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Singapore","South Africa",
  "South Korea","Spain","Sri Lanka","Sweden","Switzerland","Taiwan","Thailand","Turkey",
  "Ukraine","United Arab Emirates","United Kingdom","United States","Vietnam","Zimbabwe",
];

// ── Currency support (USD, EUR, GBP only — min set above NOWPayments' real BTC→USDT-TRC20 floor) ──
const CURRENCY_OPTIONS = [
  { value: "usd", label: "USD ($)", symbol: "$", presets: [25, 50, 100, 250, 500], min: 25 },
  { value: "eur", label: "EUR (€)", symbol: "€", presets: [25, 50, 100, 250, 500], min: 25 },
  { value: "gbp", label: "GBP (£)", symbol: "£", presets: [25, 50, 100, 250, 500], min: 25 },
];

const getCurrencyMeta = (code: string) =>
  CURRENCY_OPTIONS.find((c) => c.value === code) || CURRENCY_OPTIONS[0];

/* ── Theme ── */
const T = {
  green:      "#15803d",
  greenDeep:  "#166534",
  gold:       "#d97706",
  goldLight:  "#fbbf24",
};

const inputBase =
  "w-full px-4 py-3 rounded-2xl border-2 text-sm font-medium text-gray-800 bg-white placeholder-gray-400 focus:outline-none transition-all duration-200";
const inputCls  = (e?: string) =>
  `${inputBase} ${e ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#15803d] hover:border-green-300"}`;
const selectCls = (e?: string) =>
  `${inputBase} cursor-pointer appearance-none pr-10 ${e ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#15803d] hover:border-green-300"}`;

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1.5 font-medium">{msg}</p> : null;

/* Small chevron so every <select> (native appearance removed) still visibly
   reads as a dropdown — applies uniformly across currency / cause / state /
   country / donor-category selects. */
const SelectField = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {children}
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  </div>
);

const MONTHS_SHORT = [
  { value: "01", label: "Jan" }, { value: "02", label: "Feb" }, { value: "03", label: "Mar" },
  { value: "04", label: "Apr" }, { value: "05", label: "May" }, { value: "06", label: "Jun" },
  { value: "07", label: "Jul" }, { value: "08", label: "Aug" }, { value: "09", label: "Sep" },
  { value: "10", label: "Oct" }, { value: "11", label: "Nov" }, { value: "12", label: "Dec" },
];

const pad2 = (n: number | string) => String(n).padStart(2, "0");

/** Days in a given month/year. Falls back to a leap year (so Feb shows 29)
 *  when the year hasn't been picked yet, then re-clamps once it is. */
const daysInMonthOf = (monthStr: string, yearStr: string) => {
  if (!monthStr) return 31;
  const y = yearStr ? Number(yearStr) : 2024;
  return new Date(y, Number(monthStr), 0).getDate();
};

interface PillOption { value: string; label: string; }

/**
 * One "Day" / "Month" / "Year" pill. Closed, it shows the placeholder in grey
 * or the chosen value in bold once picked. Tapping it drops open a scrollable
 * list (auto-scrolled to the current selection) — works the same with a mouse
 * or a thumb, so no behavioural difference between desktop and mobile.
 */
function PillDropdown({
  placeholder, options, selected, isOpen, onOpen, onClose, onSelect, hasError,
}: {
  placeholder: string;
  options: PillOption[];
  selected: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (v: string) => void;
  hasError?: boolean;
}) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "center" });
    }
  }, [isOpen]);

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  return (
    <div className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-1 px-3 sm:px-4 py-3 rounded-2xl border-2 transition-all text-sm sm:text-base font-medium active:scale-[0.98]"
        style={{
          borderColor: isOpen ? T.green : selectedLabel ? "#bbf7d0" : hasError ? "#f87171" : "#e5e7eb",
          background: isOpen ? "rgba(21,128,61,0.05)" : hasError && !selectedLabel ? "#fef2f2" : "#fff",
          color: selectedLabel ? "#111827" : "#9ca3af",
        }}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="3"
          className={`shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white rounded-2xl border border-slate-100 shadow-2xl max-h-52 sm:max-h-60 overflow-y-auto py-1.5"
        >
          {options.length === 0 && (
            <p className="px-4 py-3 text-xs text-gray-400">Pick month &amp; year first</p>
          )}
          {options.map((o) => {
            const isSel = o.value === selected;
            return (
              <button
                key={o.value}
                type="button"
                ref={isSel ? selectedRef : undefined}
                role="option"
                aria-selected={isSel}
                onClick={() => onSelect(o.value)}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isSel ? "text-white" : "text-gray-700 hover:bg-green-50"
                }`}
                style={isSel ? { background: T.green } : undefined}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const formatDobDisplay = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

/**
 * Date-of-Birth picker as three tappable pills — Day, Month, Year — each
 * opening its own short scrollable list. Matches the compact "Day / Month"
 * pill style, shows the picked number right on the pill, and behaves
 * identically on phone and desktop (no native date-input quirks).
 */
function DateOfBirthPicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (iso: string) => void;
  error?: string;
}) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentYearStr = String(currentYear);
  const currentMonthStr = pad2(today.getMonth() + 1);
  const currentDayStr = pad2(today.getDate());

  const [yearVal, setYearVal]   = useState(value ? value.split("-")[0] : "");
  const [monthVal, setMonthVal] = useState(value ? value.split("-")[1] : "");
  const [dayVal, setDayVal]     = useState(value ? value.split("-")[2] : "");
  const [openField, setOpenField] = useState<"day" | "month" | "year" | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Keep local pills in sync if the value is cleared/changed from outside
  useEffect(() => {
    const [y, m, d] = value ? value.split("-") : ["", "", ""];
    setYearVal(y || ""); setMonthVal(m || ""); setDayVal(d || "");
  }, [value]);

  useEffect(() => {
    if (!openField) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpenField(null);
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenField(null); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openField]);

  // Re-clamp day/month so an impossible or future date can never be selected
  // (e.g. switching from Jan 31 to Feb, or picking this year + a future month)
  const clamp = (d: string, m: string, y: string) => {
    let month = m;
    if (y === currentYearStr && month && Number(month) > Number(currentMonthStr)) {
      month = currentMonthStr;
    }
    let day = d;
    const maxDays = daysInMonthOf(month, y);
    if (day && Number(day) > maxDays) day = pad2(maxDays);
    if (y === currentYearStr && month === currentMonthStr && day && Number(day) > Number(currentDayStr)) {
      day = currentDayStr;
    }
    return { day, month };
  };

  const emit = (d: string, m: string, y: string) => {
    if (d && m && y) onChange(`${y}-${m}-${d}`); else onChange("");
  };

  const yearOptions: PillOption[] = Array.from({ length: 111 }, (_, i) => {
    const y = String(currentYear - i);
    return { value: y, label: y };
  });

  const monthOptions: PillOption[] =
    yearVal === currentYearStr
      ? MONTHS_SHORT.filter((m) => Number(m.value) <= Number(currentMonthStr))
      : MONTHS_SHORT;

  const dayOptions: PillOption[] = Array.from(
    { length: yearVal === currentYearStr && monthVal === currentMonthStr ? Number(currentDayStr) : daysInMonthOf(monthVal, yearVal) },
    (_, i) => { const d = pad2(i + 1); return { value: d, label: d }; }
  );

  const handleSelectDay = (d: string) => {
    setDayVal(d); setOpenField(null); emit(d, monthVal, yearVal);
  };
  const handleSelectMonth = (m: string) => {
    const { day } = clamp(dayVal, m, yearVal);
    setMonthVal(m); setDayVal(day); setOpenField(null); emit(day, m, yearVal);
  };
  const handleSelectYear = (y: string) => {
    const { day, month } = clamp(dayVal, monthVal, y);
    setYearVal(y); setMonthVal(month); setDayVal(day); setOpenField(null); emit(day, month, y);
  };

  const hasAny = !!(yearVal || monthVal || dayVal);

  return (
    <div ref={wrapperRef}>
      <div className="flex gap-1">
        <PillDropdown
          placeholder="Day"
          options={dayOptions}
          selected={dayVal}
          isOpen={openField === "day"}
          onOpen={() => setOpenField("day")}
          onClose={() => setOpenField(null)}
          onSelect={handleSelectDay}
          hasError={!!error && !dayVal}
        />
        <PillDropdown
          placeholder="Month"
          options={monthOptions}
          selected={monthVal}
          isOpen={openField === "month"}
          onOpen={() => setOpenField("month")}
          onClose={() => setOpenField(null)}
          onSelect={handleSelectMonth}
          hasError={!!error && !monthVal}
        />
        <PillDropdown
          placeholder="Year"
          options={yearOptions}
          selected={yearVal}
          isOpen={openField === "year"}
          onOpen={() => setOpenField("year")}
          onClose={() => setOpenField(null)}
          onSelect={handleSelectYear}
          hasError={!!error && !yearVal}
        />
      </div>

      {hasAny && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] font-semibold" style={{ color: T.greenDeep }}>
            {value ? formatDobDisplay(value) : ""}
          </span>
          <button
            type="button"
            onClick={() => { setYearVal(""); setMonthVal(""); setDayVal(""); setOpenField(null); onChange(""); }}
            className="text-[11px] font-bold text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

const initialDonor: DonorDetails = {
  name: "", email: "", phone: "", pan_number: "", dob: "",
  address_line1: "", city: "", state: "", pincode: "", country: "",
  passport_number: "",
  donor_category: "indian",
  donate_towards: "",
  termsAccepted: false, declarationAccepted: false, dpdpConsent: false,
};

export function DonateForm() {
  const router = useRouter();
  const [step, setStep]                   = useState<Step>("amount");
  const frequency = "one-time" as const;
  const [currency, setCurrency]           = useState("usd");
  const [amount, setAmount]               = useState<number | "custom">(50);
  const [customAmount, setCustomAmount]   = useState("");
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [errors, setErrors]               = useState<FormErrors>({});
  const [receiptUrl, setReceiptUrl]       = useState("");
  const [donor, setDonor]                 = useState<DonorDetails>(initialDonor);

  // Bitcoin payment state
  const [paymentId, setPaymentId]         = useState("");
  const [payAddress, setPayAddress]       = useState("");
  const [payAmountBTC, setPayAmountBTC]   = useState<number | null>(null);
  const [expiresAt, setExpiresAt]         = useState<string>("");
  const [copied, setCopied]               = useState(false);
  const [secondsLeft, setSecondsLeft]     = useState<number | null>(null);
  const [qrLoaded, setQrLoaded]           = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sandbox test mode state
  const [isSandbox, setIsSandbox]         = useState(false);

  const currencyMeta = getCurrencyMeta(currency);

  const finalAmount = amount === "custom"
    ? (parseFloat(customAmount.replace(/,/g, "")) || 0)
    : Number(amount);

  const isIndian  = donor.donor_category === "indian";
  const isNRI     = donor.donor_category === "nri";
  const isForeign = donor.donor_category === "foreign";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setDonor((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCurrencyChange = (code: string) => {
    const meta = getCurrencyMeta(code);
    setCurrency(code);
    setAmount(meta.presets[1]); // default to the second preset (25)
    setCustomAmount("");
    setError("");
  };

  // ── Step 1 gate: valid amount AND a chosen cause, or don't move forward ──
  const validateAmount = () => {
    const parsed = amount === "custom"
      ? parseFloat(customAmount.replace(/,/g, ""))
      : Number(amount);

    let ok = true;

    if (!parsed || isNaN(parsed) || parsed < currencyMeta.min) {
      setError(`Please enter at least ${currencyMeta.symbol}${currencyMeta.min} — that's the minimum for a ${currency.toUpperCase()} donation.`);
      ok = false;
    } else {
      setError("");
    }

    if (!donor.donate_towards) {
      setErrors((prev) => ({ ...prev, donate_towards: "Please select a cause before continuing" }));
      ok = false;
    }

    return ok;
  };

  // ── Step 2 gate: full details form. On failure this also writes a
  // visible summary into `error` (rendered just above the submit button)
  // so users don't miss why the button "did nothing" when they're
  // scrolled past the specific field that's wrong. ──
  const validateDetails = (): boolean => {
    const e: FormErrors = {};
    if (!donor.name.trim())                                                                      e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email))                                        e.email = "Valid email is required";
    if (isIndian ? !/^[6-9]\d{9}$/.test(donor.phone) : donor.phone.length < 7)                  e.phone = "Valid phone number is required";
    if (!donor.dob)                                                                              e.dob = "Date of birth is required";
    if (!donor.donate_towards)                                                                   e.donate_towards = "Please select a cause";
    if ((isIndian || isNRI) && !donor.pan_number.trim())                                         e.pan_number = "PAN number is required";
    if ((isIndian || isNRI) && donor.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(donor.pan_number.toUpperCase())) e.pan_number = "Invalid PAN format (e.g. ABCDE1234F)";
    if ((isNRI || isForeign) && !donor.passport_number.trim())                                   e.passport_number = "Passport number is required";
    if (!donor.address_line1.trim())                                                             e.address_line1 = "Address is required";
    if (!donor.city.trim())                                                                      e.city = "City is required";
    if (isIndian && !donor.state.trim())                                                         e.state = "State is required";
    if (!isIndian && !donor.country.trim())                                                      e.country = "Country is required";
    if (isIndian && !/^\d{6}$/.test(donor.pincode))                                              e.pincode = "Valid 6-digit pincode required";
    if (!isIndian && !donor.pincode.trim())                                                      e.pincode = "ZIP / Postal code is required";
    if (!donor.termsAccepted)                                                                    e.termsAccepted = "You must accept terms & conditions";
    if (!donor.declarationAccepted)                                                              e.declarationAccepted = "You must confirm your details are correct";
    if (!donor.dpdpConsent)                                                                       e.dpdpConsent = "You must consent to data processing under DPDP Act 2023";
    setErrors(e);

    const errCount = Object.keys(e).length;
    if (errCount > 0) {
      const first = Object.values(e)[0] as string;
      setError(
        errCount === 1
          ? first
          : `Please fix ${errCount} fields above before continuing — first: ${first}`
      );
    } else {
      setError("");
    }

    return errCount === 0;
  };

  // Create the Bitcoin payment
  const handlePayment = async () => {
    if (!validateDetails()) {
      // Scroll the visible error summary into view so users notice it
      // even if they're scrolled up near the top of a long form.
      document.getElementById("form-error-summary")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!finalAmount || isNaN(finalAmount) || finalAmount < currencyMeta.min) {
      setError(`Please enter a valid donation amount (minimum ${currencyMeta.symbol}${currencyMeta.min}).`);
      document.getElementById("form-error-summary")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true); setError("");
    try {
      const donorRes = await fetch(`${API_URL}/api/donors/by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:            donor.name,
          email:           donor.email,
          phone:           donor.phone,
          pan_number:      donor.pan_number.toUpperCase(),
          date_of_birth:   donor.dob,
          address_line1:   donor.address_line1,
          city:            donor.city,
          state:           isIndian ? donor.state : null,
          country:         isIndian ? "India" : donor.country,
          pincode:         donor.pincode,
          donor_category:  donor.donor_category,
          passport_number: donor.passport_number || null,
          donation_type:   frequency,
        }),
      });
      const donorData = await donorRes.json();
      if (!donorRes.ok) throw new Error(donorData.message);

      const btcRes = await fetch(`${API_URL}/api/donations/bitcoin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:     finalAmount,
          currency:   currency,
          name:       donor.name,
          email:      donor.email,
          phone:      donor.phone,
          donor_id:   donorData.donor.id,
          message:    `One-time donation towards ${
            DONATE_TOWARDS_OPTIONS.find(o => o.value === donor.donate_towards)?.label || "General Fund"
          }`,
        }),
      });
      const btcData = await btcRes.json();
      if (!btcRes.ok) throw new Error(btcData.error || "Could not start Bitcoin payment.");

      setPaymentId(btcData.paymentId);
      setPayAddress(btcData.payAddress);
      setPayAmountBTC(btcData.payAmountBTC);
      setExpiresAt(btcData.expiresAt);
      setIsSandbox(!!btcData.sandbox);
      setQrLoaded(false);
      setStep("payment");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Poll payment status while on the "payment" step
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
          setStep("success");
        } else if (data.status === "expired" || data.status === "failed") {
          if (pollRef.current) clearInterval(pollRef.current);
          if (countdownRef.current) clearInterval(countdownRef.current);
          setError("This payment expired or failed. Please try again.");
          setStep("details");
        }
      } catch {
        // silent — try again on next tick
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

  /* ── Payment Screen (Bitcoin) ── */
  if (step === "payment") {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&data=${encodeURIComponent(`bitcoin:${payAddress}?amount=${payAmountBTC}`)}`;
    const isExpiringSoon = secondsLeft !== null && secondsLeft < 120;

    return (
      <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 bg-green-50">
        <div className="bg-white rounded-3xl shadow-2xl text-center max-w-md w-full overflow-hidden">

          {/* Header */}
          <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-5 sm:pb-6 text-white"
            style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
            <div className="text-3xl mb-2">₿</div>
            <h2 className="text-lg sm:text-xl font-extrabold">Send Bitcoin to Complete Donation</h2>
            <p className="text-white/75 text-xs sm:text-sm mt-1">
              Send exactly the amount below from your wallet
            </p>
          </div>

          <div className="p-5 sm:p-8">

            {/* QR code card */}
            <div className="mx-auto mb-5 w-full max-w-[240px] sm:max-w-[260px]">
              <div
                className="relative aspect-square rounded-2xl p-3 sm:p-4 bg-white"
                style={{ border: "2px solid rgba(21,128,61,0.15)", boxShadow: "0 4px 20px rgba(21,128,61,0.10)" }}
              >
                {!qrLoaded && (
                  <div className="absolute inset-3 sm:inset-4 flex items-center justify-center rounded-xl bg-slate-50">
                    <div className="w-8 h-8 border-2 border-green-200 border-t-[#15803d] rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={qrUrl}
                  alt="Bitcoin payment QR code"
                  onLoad={() => setQrLoaded(true)}
                  className="w-full h-full rounded-xl transition-opacity duration-300"
                  style={{ opacity: qrLoaded ? 1 : 0 }}
                />
                {/* corner accents for a premium framed look */}
                <div className="pointer-events-none absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: T.green }} />
                <div className="pointer-events-none absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: T.green }} />
                <div className="pointer-events-none absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: T.green }} />
                <div className="pointer-events-none absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: T.green }} />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 font-medium">Scan with any Bitcoin wallet app</p>
            </div>

            {/* Amount to send */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}>
              <p className="text-xs text-gray-500 mb-1">Amount to send</p>
              <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: T.green }}>
                {payAmountBTC} BTC
              </p>
              <p className="text-xs text-gray-400 mt-1">
                ({currencyMeta.symbol}{finalAmount.toLocaleString()} {currency.toUpperCase()})
              </p>
            </div>

            {/* Bitcoin address */}
            <div className="text-left mb-4">
              <p className="text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Bitcoin Address</p>
              <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-100 rounded-xl px-3 py-3">
                <code className="text-xs text-gray-700 break-all flex-1">{payAddress}</code>
                <button onClick={copyAddress}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-transform active:scale-95"
                  style={{ background: T.green }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {secondsLeft !== null && (
              <p className="text-xs mb-4" style={{ color: isExpiringSoon ? "#dc2626" : "#9ca3af" }}>
                ⏱ This address expires in{" "}
                <span className="font-bold" style={{ color: isExpiringSoon ? "#dc2626" : "#4b5563" }}>
                  {formatCountdown(secondsLeft)}
                </span>
              </p>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
              <div className="w-4 h-4 border-2 border-green-300 border-t-[#15803d] rounded-full animate-spin" />
              Waiting for payment confirmation...
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button onClick={() => setStep("details")}
              className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm py-2">
              ← Back to details
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Success Screen ── */
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-green-50">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(21,128,61,0.10)" }}>
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#15803d">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-4xl mb-2">🙏</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">நன்றி! Thank You!</h2>
          <p className="text-gray-600 text-base mb-1">
            Dear <span className="font-bold text-gray-900">{donor.name}</span>,
          </p>
          <p className="text-gray-600 text-base mb-2">
            Your donation of{" "}
            <span className="font-bold text-[#15803d]">{currencyMeta.symbol}{finalAmount.toLocaleString()}</span>{" "}
            towards{" "}
            <span className="font-semibold text-gray-800">
              {DONATE_TOWARDS_OPTIONS.find(o => o.value === donor.donate_towards)?.label || "General Fund"}
            </span>{" "}
            is a blessed contribution.
          </p>
          <p className="text-xs text-gray-400 mb-8">A confirmation has been sent to {donor.email}</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => router.push("/")}
              className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm py-2">
              ← Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-8 sm:py-12 bg-green-50">
      <div className="bg-white rounded-3xl shadow-2xl border border-green-100 w-full max-w-lg mx-auto overflow-hidden">

        {/* Header */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
          <div className="text-3xl mb-2">🪔</div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Make a Donation</h1>
          <p className="text-white/75 text-xs sm:text-sm mt-1 font-medium">
            உதவி செய்யுங்கள் • 100% goes to the cause
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8">

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {["amount", "details"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 sm:gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  step === s
                    ? "text-white shadow-lg"
                    : step === "details" && i === 0
                    ? "text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
                  style={
                    step === s
                      ? { background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }
                      : step === "details" && i === 0
                      ? { background: T.greenDeep }
                      : {}
                  }>
                  {step === "details" && i === 0 ? "✓" : i + 1}
                </div>
                <span className={`text-xs sm:text-sm font-bold ${step === s ? "text-gray-900" : "text-gray-400"}`}>
                  {s === "amount" ? "Gift Amount" : "Your Details"}
                </span>
                {i === 0 && <div className="w-8 sm:w-12 h-1 rounded-full bg-slate-100" />}
              </div>
            ))}
          </div>

          {/* ══ STEP 1: AMOUNT ══ */}
          {step === "amount" && (
            <div className="space-y-4 sm:space-y-5">

              {/* Currency selector */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Currency
                </label>
                <SelectField>
                  <select
                    value={currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className={selectCls()}
                  >
                    {CURRENCY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </SelectField>
              </div>

              {/* Amount presets */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {currencyMeta.presets.map((amt) => (
                  <button key={amt} onClick={() => { setAmount(amt); setError(""); }}
                    className="py-3 sm:py-4 rounded-2xl border-2 font-bold transition-all text-xs sm:text-sm"
                    style={amount === amt
                      ? { borderColor: T.green, background: "rgba(21,128,61,0.06)", color: T.green }
                      : { borderColor: "#f1f5f9", color: "#475569" }}>
                    {currencyMeta.symbol}{amt.toLocaleString()}
                  </button>
                ))}
                <button onClick={() => setAmount("custom")}
                  className="py-3 sm:py-4 rounded-2xl border-2 font-bold transition-all text-xs sm:text-sm"
                  style={amount === "custom"
                    ? { borderColor: T.green, background: "rgba(21,128,61,0.06)", color: T.green }
                    : { borderColor: "#f1f5f9", color: "#475569" }}>
                  Custom
                </button>
              </div>

              {/* Custom amount input */}
              {amount === "custom" && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
                    {currencyMeta.symbol}
                  </span>
                  <input type="number" value={customAmount}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCustomAmount(v);
                      const parsed = parseFloat(v.replace(/,/g, ""));
                      if (v && (!parsed || isNaN(parsed) || parsed < currencyMeta.min)) {
                        setError(`Please enter at least ${currencyMeta.symbol}${currencyMeta.min} — that's the minimum for a ${currency.toUpperCase()} donation.`);
                      } else {
                        setError("");
                      }
                    }}
                    placeholder={`Minimum ${currencyMeta.symbol}${currencyMeta.min}`}
                    className={`w-full border-2 rounded-2xl pl-10 pr-5 py-4 outline-none font-bold text-lg text-gray-900 transition-all ${
                      error ? "bg-red-50 border-red-300" : "bg-slate-50 border-slate-100 focus:border-[#15803d]"
                    }`} />
                </div>
              )}

              {error && <p className="text-red-500 text-sm text-center -mt-1">{error}</p>}

              {/* Donate Towards */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Donate Towards *
                </label>
                <SelectField>
                  <select name="donate_towards" value={donor.donate_towards}
                    onChange={handleChange}
                    className={selectCls(errors.donate_towards)}>
                    {DONATE_TOWARDS_OPTIONS.map(o => (
                      <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>
                    ))}
                  </select>
                </SelectField>
                <ErrorMsg msg={errors.donate_towards} />
              </div>

              {/* Impact message */}
              {finalAmount >= currencyMeta.min && (
                <div className="rounded-xl p-3 text-center text-xs sm:text-sm font-medium"
                  style={{ background: "rgba(21,128,61,0.06)", color: T.greenDeep, border: `1px solid rgba(21,128,61,0.15)` }}>
                  {getImpactMessage(donor.donate_towards, finalAmount)}
                </div>
              )}

              <button
                onClick={() => { if (validateAmount()) setStep("details"); }}
                className="w-full text-white py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-lg active:scale-95"
                style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
                Continue to Details →
              </button>
            </div>
          )}

          {/* ══ STEP 2: DETAILS ══ */}
          {step === "details" && (
            <div className="space-y-3 sm:space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input name="name" value={donor.name} onChange={handleChange}
                  placeholder="Rajesh Kumar" className={inputCls(errors.name)} />
                <ErrorMsg msg={errors.name} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                <input name="email" type="email" value={donor.email} onChange={handleChange}
                  placeholder="rajesh@email.com" className={inputCls(errors.email)} />
                <ErrorMsg msg={errors.email} />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number *</label>
                <input name="phone" value={donor.phone} onChange={handleChange}
                  placeholder={isIndian ? "9876543210" : "+1 234 567 8900"}
                  maxLength={isIndian ? 10 : 20}
                  className={inputCls(errors.phone)} />
                <ErrorMsg msg={errors.phone} />
              </div>

              {/* DOB — custom responsive calendar picker (dropdown on desktop, bottom sheet on mobile) */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Date of Birth *</label>
                <DateOfBirthPicker
                  value={donor.dob}
                  error={errors.dob}
                  onChange={(iso) => {
                    setDonor((prev) => ({ ...prev, dob: iso }));
                    if (errors.dob) setErrors((prev) => ({ ...prev, dob: undefined }));
                  }}
                />
                <ErrorMsg msg={errors.dob} />
              </div>

              {/* Donor Category */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Donor Category *</label>
                <SelectField>
                  <select name="donor_category" value={donor.donor_category}
                    onChange={(e) => setDonor({
                      ...donor,
                      donor_category: e.target.value as DonorDetails["donor_category"],
                      state: "", country: "", pincode: "", pan_number: "", passport_number: "",
                    })}
                    className={selectCls()}>
                    <option value="indian">Indian (Resident)</option>
                    <option value="nri">NRI (Non-Resident Indian)</option>
                    <option value="foreign">Foreign National</option>
                  </select>
                </SelectField>
              </div>

              {/* PAN — Indian & NRI */}
              {(isIndian || isNRI) && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    PAN Number * {isNRI && <span className="normal-case text-green-600">(Indian PAN)</span>}
                  </label>
                  <input name="pan_number" value={donor.pan_number}
                    onChange={(e) => setDonor({ ...donor, pan_number: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
                    placeholder="ABCDE1234F" maxLength={10}
                    className={inputCls(errors.pan_number)} />
                  <ErrorMsg msg={errors.pan_number} />
                </div>
              )}

              {/* Passport — NRI & Foreign */}
              {(isNRI || isForeign) && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Passport Number *
                  </label>
                  <input name="passport_number" value={donor.passport_number}
                    onChange={(e) => setDonor({ ...donor, passport_number: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
                    placeholder="A1234567" maxLength={12}
                    className={inputCls(errors.passport_number)} />
                  <ErrorMsg msg={errors.passport_number} />
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Address *</label>
                <input name="address_line1" value={donor.address_line1} onChange={handleChange}
                  placeholder="123, Street Name, Area" className={inputCls(errors.address_line1)} />
                <ErrorMsg msg={errors.address_line1} />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">City *</label>
                <input name="city" value={donor.city} onChange={handleChange}
                  placeholder="Chennai" className={inputCls(errors.city)} />
                <ErrorMsg msg={errors.city} />
              </div>

              {/* State / Country + Pincode */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  {isIndian ? (
                    <>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">State *</label>
                      <SelectField>
                        <select name="state" value={donor.state} onChange={handleChange} className={selectCls(errors.state)}>
                          <option value="" disabled>Select state</option>
                          {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </SelectField>
                      <ErrorMsg msg={errors.state} />
                    </>
                  ) : (
                    <>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Country *</label>
                      <SelectField>
                        <select name="country" value={donor.country} onChange={handleChange} className={selectCls(errors.country)}>
                          <option value="" disabled>Select country</option>
                          {WORLD_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </SelectField>
                      <ErrorMsg msg={errors.country} />
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {isIndian ? "Pincode *" : "ZIP Code *"}
                  </label>
                  <input name="pincode" value={donor.pincode}
                    onChange={(e) => setDonor({ ...donor, pincode: isIndian ? e.target.value.replace(/\D/g, "") : e.target.value })}
                    placeholder={isIndian ? "600001" : "e.g. SW1A 1AA"}
                    maxLength={isIndian ? 6 : 12}
                    className={inputCls(errors.pincode)} />
                  <ErrorMsg msg={errors.pincode} />
                </div>
              </div>

              {/* FCRA notice for foreign donors */}
              {isForeign && (
                <div className="rounded-xl p-3 text-xs font-medium"
                  style={{ background: "#fef3c7", border: "1px solid #fcd34d", color: "#92400e" }}>
                  ⚠️ <strong>FCRA Notice:</strong> Foreign contributions are accepted under the Foreign Contribution (Regulation) Act, 2010.
                </div>
              )}

              {/* Amount summary */}
              <div className="rounded-xl p-3 sm:p-4 flex flex-wrap justify-between items-center gap-2"
                style={{ background: "rgba(21,128,61,0.05)", border: "1px solid rgba(21,128,61,0.12)" }}>
                <div>
                  <p className="text-xs text-gray-500">Donating</p>
                  <p className="text-lg font-bold" style={{ color: T.green }}>
                    {currencyMeta.symbol}{finalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Towards</p>
                  <p className="font-bold text-gray-700 text-xs">
                    {DONATE_TOWARDS_OPTIONS.find(o => o.value === donor.donate_towards)?.label || "—"}
                  </p>
                </div>
                <button onClick={() => setStep("amount")}
                  className="text-xs font-bold hover:underline" style={{ color: T.green }}>
                  Edit
                </button>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-gray-50 transition">
                  <input type="checkbox" checked={donor.termsAccepted}
                    onChange={(e) => setDonor({ ...donor, termsAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-green-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <a href="/terms" target="_blank" className="font-semibold underline" style={{ color: T.green }}>Terms & Conditions</a>,{" "}
                    <a href="/privacy" target="_blank" className="font-semibold underline" style={{ color: T.green }}>Privacy Policy</a> and{" "}
                    <a href="/refund-policy" target="_blank" className="font-semibold underline" style={{ color: T.green }}>Refund Policy</a>
                  </span>
                </label>
                <ErrorMsg msg={errors.termsAccepted} />

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-gray-50 transition">
                  <input type="checkbox" checked={donor.declarationAccepted}
                    onChange={(e) => setDonor({ ...donor, declarationAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-green-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I declare that the above information is correct and true to the best of my knowledge
                  </span>
                </label>
                <ErrorMsg msg={errors.declarationAccepted} />

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl transition"
                  style={{ border: "1px solid rgba(21,128,61,0.12)", background: "rgba(21,128,61,0.04)" }}>
                  <input type="checkbox" checked={donor.dpdpConsent}
                    onChange={(e) => setDonor({ ...donor, dpdpConsent: e.target.checked })}
                    className="w-4 h-4 mt-0.5 flex-shrink-0 accent-green-600" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I consent to collection and processing of my personal data for donation purposes under the{" "}
                    <strong>Digital Personal Data Protection Act, 2023</strong>
                  </span>
                </label>
                <ErrorMsg msg={errors.dpdpConsent} />
              </div>

              {/* Visible error summary — sits right above the submit button so
                  it's always noticed regardless of scroll position, in addition
                  to the inline per-field errors above. */}
              {error && (
                <p id="form-error-summary" className="text-red-500 text-sm text-center font-semibold bg-red-50 border border-red-200 rounded-xl py-2 px-3">
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="pt-2 border-t border-slate-100">
                <button onClick={() => handlePayment()} disabled={loading}
                  className="w-full text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
                  {loading
                    ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : `🔒 Complete ${currencyMeta.symbol}${finalAmount.toLocaleString()} Donation`}
                </button>

                <button onClick={() => setStep("amount")}
                  className="w-full mt-3 text-slate-400 font-bold text-sm py-2 hover:text-slate-600 transition">
                  ← Edit Amount
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Secured by NOWPayments • Bitcoin Network
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}