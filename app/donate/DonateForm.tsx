"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Step = "amount" | "payment" | "success";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ORG_NAME = "Aram Trust";

const DONATE_TOWARDS_OPTIONS = [
  { value: "general", label: "General Fund", icon: "🙏" },
  { value: "construction", label: "Temple Construction", icon: "🏛️" },
  { value: "food_service", label: "Food", icon: "🍱" },
  { value: "education", label: "Education Aid", icon: "📚" },
];

const IMPACT_MESSAGES: Record<string, (amt: number) => string> = {
  food_service:    (a) => a >= 2000 ? "🍱 Feed 100 devotees for a day!" : a >= 500 ? "🍱 Feed 25 devotees!" : "🙏 Every rupee feeds a soul!",
  construction:    (a) => a >= 5000 ? "🏛️ Contribute to temple construction!" : a >= 1001 ? "🧱 Support a brick of dharma!" : "🙏 Every contribution builds faith!",
  education:       (a) => a >= 5001 ? "🎓 Sponsor a child's education for a month!" : a >= 1001 ? "📚 School supplies for 2 children!" : "💛 Every rupee brightens a child's future!",
  general:         (a) => a >= 5001 ? "✨ A generous offering to the cause!" : "🙏 Your contribution serves the community!",
};

const getImpactMessage = (towards: string, amount: number) => {
  const fn = IMPACT_MESSAGES[towards] || IMPACT_MESSAGES["general"];
  return fn(amount);
};

// ── Currency support (USD, EUR, GBP only — min set above NOWPayments' real BTC→USDT-TRC20 floor) ──
const CURRENCY_OPTIONS = [
  { value: "usd", label: "US Dollar", symbol: "$", presets: [25, 50, 100, 250, 500], min: 25 },
  { value: "eur", label: "Euro", symbol: "€", presets: [25, 50, 100, 250, 500], min: 25 },
  { value: "gbp", label: "British Pound", symbol: "£", presets: [25, 50, 100, 250, 500], min: 25 },
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

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1 font-medium">{msg}</p> : null;

/**
 * Compact radio-button "pill" group for currency. Single row, tight
 * padding — no extra label text beyond the code.
 */
const CurrencyField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
      Currency
    </label>
    <div className="flex gap-2">
      {CURRENCY_OPTIONS.map((c) => {
        const isSel = value === c.value;
        return (
          <label
            key={c.value}
            className="relative flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98]"
            style={{
              borderColor: isSel ? T.green : "#e5e7eb",
              background: isSel ? "rgba(21,128,61,0.06)" : "#fff",
            }}
          >
            <input
              type="radio"
              name="currency"
              value={c.value}
              checked={isSel}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span
              className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-xs sm:text-sm font-extrabold flex-shrink-0"
              style={{
                background: isSel ? T.green : "#f1f5f9",
                color: isSel ? "#fff" : "#64748b",
              }}
            >
              {c.symbol}
            </span>
            <span className={`text-xs sm:text-sm font-bold ${isSel ? "text-gray-900" : "text-gray-600"}`}>
              {c.value.toUpperCase()}
            </span>
          </label>
        );
      })}
    </div>
  </div>
);

/**
 * Minimal "Donate Towards" chips — plain buttons, thin border,
 * no checkmark icon. Selection shown via border/bg color only.
 */
const DonateTowardsField = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
      Donate Towards *
    </label>
    <div className="grid grid-cols-2 gap-1.5">
      {DONATE_TOWARDS_OPTIONS.map((o) => {
        const isSel = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-xs font-semibold transition-all active:scale-95 ${
              isSel
                ? "border-green-700 bg-green-50 text-green-800"
                : "border-gray-200 text-gray-600"
            }`}
          >
            <span className="text-sm">{o.icon}</span>
            <span className="truncate">{o.label}</span>
          </button>
        );
      })}
    </div>
    <ErrorMsg msg={error} />
  </div>
);

export function DonateForm() {
  const router = useRouter();
  const [step, setStep]                   = useState<Step>("amount");
  const frequency = "one-time" as const;
  const [currency, setCurrency]           = useState("usd");
  const [amount, setAmount]               = useState<number | "custom">(50);
  const [customAmount, setCustomAmount]   = useState("");
  const [donateTowards, setDonateTowards] = useState("");
  const [donateTowardsError, setDonateTowardsError] = useState("");
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");

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

  const handleCurrencyChange = (code: string) => {
    const meta = getCurrencyMeta(code);
    setCurrency(code);
    setAmount(meta.presets[1]); // default to the second preset (25)
    setCustomAmount("");
    setError("");
  };

  // ── Gate: valid amount AND a chosen cause, or don't move forward ──
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

    if (!donateTowards) {
      setDonateTowardsError("Please select a cause before continuing");
      ok = false;
    } else {
      setDonateTowardsError("");
    }

    return ok;
  };

  // Create the Bitcoin payment directly from the amount step — no donor
  // details are collected or sent.
  const handlePayment = async () => {
    if (!validateAmount()) return;
    setLoading(true); setError("");
    try {
      const btcRes = await fetch(`${API_URL}/api/donations/bitcoin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:     finalAmount,
          currency:   currency,
          message:    `One-time donation towards ${
            DONATE_TOWARDS_OPTIONS.find(o => o.value === donateTowards)?.label || "General Fund"
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
          setStep("amount");
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
      <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-4 sm:py-8 bg-green-50">
        <div className="bg-white rounded-2xl shadow-2xl text-center max-w-md w-full overflow-hidden">

          {/* Header */}
          <div className="px-5 sm:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 text-white"
            style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
            <div className="text-2xl sm:text-3xl mb-1">₿</div>
            <h2 className="text-base sm:text-xl font-extrabold">Send Bitcoin to Complete Donation</h2>
            <p className="text-white/75 text-[11px] sm:text-sm mt-0.5">
              Send exactly the amount below from your wallet
            </p>
          </div>

          <div className="p-4 sm:p-6">

            {/* QR code card */}
            <div className="mx-auto mb-3 w-full max-w-[180px]">
              <div
                className="relative aspect-square rounded-xl p-2.5 bg-white"
                style={{ border: "2px solid rgba(21,128,61,0.15)", boxShadow: "0 4px 20px rgba(21,128,61,0.10)" }}
              >
                {!qrLoaded && (
                  <div className="absolute inset-2.5 flex items-center justify-center rounded-lg bg-slate-50">
                    <div className="w-6 h-6 border-2 border-green-200 border-t-[#15803d] rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={qrUrl}
                  alt="Bitcoin payment QR code"
                  onLoad={() => setQrLoaded(true)}
                  className="w-full h-full rounded-lg transition-opacity duration-300"
                  style={{ opacity: qrLoaded ? 1 : 0 }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 font-medium">Scan with any Bitcoin wallet app</p>
            </div>

            {/* Amount to send */}
            <div className="rounded-xl p-2.5 mb-3" style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}>
              <p className="text-[11px] text-gray-500 mb-0.5">Amount to send</p>
              <p className="text-xl sm:text-2xl font-extrabold" style={{ color: T.green }}>
                {payAmountBTC} BTC
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                ({currencyMeta.symbol}{finalAmount.toLocaleString()} {currency.toUpperCase()})
              </p>
            </div>

            {/* Bitcoin address */}
            <div className="text-left mb-3">
              <p className="text-[11px] font-bold text-gray-600 mb-1 uppercase tracking-wide">Bitcoin Address</p>
              <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-100 rounded-lg px-2.5 py-2">
                <code className="text-[11px] text-gray-700 break-all flex-1">{payAddress}</code>
                <button onClick={copyAddress}
                  className="shrink-0 text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-white transition-transform active:scale-95"
                  style={{ background: T.green }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {secondsLeft !== null && (
              <p className="text-[11px] mb-3" style={{ color: isExpiringSoon ? "#dc2626" : "#9ca3af" }}>
                ⏱ Expires in{" "}
                <span className="font-bold" style={{ color: isExpiringSoon ? "#dc2626" : "#4b5563" }}>
                  {formatCountdown(secondsLeft)}
                </span>
              </p>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-3">
              <div className="w-3.5 h-3.5 border-2 border-green-300 border-t-[#15803d] rounded-full animate-spin" />
              Waiting for payment confirmation...
            </div>

            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

            <button onClick={() => setStep("amount")}
              className="text-gray-400 font-semibold hover:text-gray-700 transition text-xs sm:text-sm py-1">
              ← Back
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
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(21,128,61,0.10)" }}>
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#15803d">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-3xl mb-1">🙏</div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">நன்றி! Thank You!</h2>
          <p className="text-gray-600 text-sm mb-1">
            Your donation of{" "}
            <span className="font-bold text-[#15803d]">{currencyMeta.symbol}{finalAmount.toLocaleString()}</span>{" "}
            towards{" "}
            <span className="font-semibold text-gray-800">
              {DONATE_TOWARDS_OPTIONS.find(o => o.value === donateTowards)?.label || "General Fund"}
            </span>{" "}
            is a blessed contribution.
          </p>
          <button onClick={() => router.push("/")}
            className="text-gray-400 font-semibold hover:text-gray-700 transition text-sm sm:text-base py-1 mt-4">
            ← Return to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── Main Form (Amount only — straight to payment) ── */
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-3 sm:py-6 bg-green-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-green-100 w-full max-w-md sm:max-w-lg mx-auto overflow-hidden">

        {/* Header */}
        <div className="px-5 sm:px-8 py-3 sm:py-4 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
          <div className="text-xl sm:text-2xl mb-0.5">🪔</div>
          <h1 className="text-base sm:text-xl font-extrabold tracking-tight">Make a Donation</h1>
          <p className="text-white/75 text-[11px] sm:text-xs mt-0.5 font-medium">
            உதவி செய்யுங்கள் • 100% goes to the cause
          </p>
        </div>

        <div className="p-3 sm:p-5 space-y-2.5 sm:space-y-3">

          {/* Currency selector — compact pills */}
          <CurrencyField
            value={currency}
            onChange={(code) => handleCurrencyChange(code)}
          />

          {/* Amount presets */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
              Amount
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {currencyMeta.presets.map((amt) => (
                <button key={amt} onClick={() => { setAmount(amt); setError(""); }}
                  className="py-2 rounded-lg border-2 font-bold transition-all text-xs sm:text-sm active:scale-95"
                  style={amount === amt
                    ? { borderColor: T.green, background: "rgba(21,128,61,0.06)", color: T.green }
                    : { borderColor: "#f1f5f9", color: "#475569" }}>
                  {currencyMeta.symbol}{amt.toLocaleString()}
                </button>
              ))}
              <button onClick={() => setAmount("custom")}
                className="py-2 rounded-lg border-2 font-bold transition-all text-xs sm:text-sm active:scale-95"
                style={amount === "custom"
                  ? { borderColor: T.green, background: "rgba(21,128,61,0.06)", color: T.green }
                  : { borderColor: "#f1f5f9", color: "#475569" }}>
                Custom
              </button>
            </div>
          </div>

          {/* Custom amount input */}
          {amount === "custom" && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
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
                className={`w-full border-2 rounded-lg pl-7 pr-3 py-2 outline-none font-bold text-sm text-gray-900 transition-all ${
                  error ? "bg-red-50 border-red-300" : "bg-slate-50 border-slate-100 focus:border-[#15803d]"
                }`} />
            </div>
          )}

          {error && <p className="text-red-500 text-xs text-center -mt-1">{error}</p>}

          {/* Donate Towards — minimal chips */}
          <DonateTowardsField
            value={donateTowards}
            error={donateTowardsError}
            onChange={(v) => { setDonateTowards(v); setDonateTowardsError(""); }}
          />

          {/* Impact message */}
          {finalAmount >= currencyMeta.min && donateTowards && (
            <div className="rounded-lg py-1.5 px-2 text-center text-xs font-medium"
              style={{ background: "rgba(21,128,61,0.06)", color: T.greenDeep, border: `1px solid rgba(21,128,61,0.15)` }}>
              {getImpactMessage(donateTowards, finalAmount)}
            </div>
          )}

          <button
            onClick={handlePayment} disabled={loading}
            className="w-full text-white py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenDeep})` }}>
            {loading
              ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : `🔒 Donate ${currencyMeta.symbol}${finalAmount.toLocaleString()} Now`}
          </button>

          <p className="text-[10px] text-gray-400 text-center">
            Secured by NOWPayments • Bitcoin Network
          </p>
        </div>
      </div>
    </div>
  );
}