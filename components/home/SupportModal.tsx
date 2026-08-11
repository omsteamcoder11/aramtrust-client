"use client";
import { useState, useEffect, useRef } from "react";
import { X, Heart, Phone } from "lucide-react";

type Mode = "choose" | "donate" | "callback" | "payment" | "success";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("choose");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    amount: "", donate_towards: "general",
  });

  // Bitcoin payment state
  const [supportRequestId, setSupportRequestId] = useState<number | null>(null);
  const [paymentId, setPaymentId]                = useState("");
  const [payAddress, setPayAddress]              = useState("");
  const [payAmountBTC, setPayAmountBTC]          = useState<number | null>(null);
  const [expiresAt, setExpiresAt]                = useState<string>("");
  const [copied, setCopied]                      = useState(false);
  const [secondsLeft, setSecondsLeft]            = useState<number | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleClose = () => {
    setMode("choose");
    setForm({ name: "", phone: "", email: "", amount: "", donate_towards: "general" });
    setSupportRequestId(null); setPaymentId(""); setPayAddress("");
    setPayAmountBTC(null); setExpiresAt(""); setSecondsLeft(null);
    if (pollRef.current) clearInterval(pollRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCallbackSubmit = async () => {
    if (!form.name || !form.phone) return alert("Name and phone are required");
    setLoading(true);
    try {
      const res = await fetch("/api/support/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email }),
      });
      if (!res.ok) { alert("Server error. Please try again."); return; }
      const data = await res.json();
      if (data.success) setMode("success");
      else alert(data.message);
    } catch (err) {
      alert("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDonateSubmit = async () => {
    if (!form.name || !form.phone || !form.amount) return alert("All fields are required");
    setLoading(true);
    try {
      const res = await fetch("/api/support/donation/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          amount: form.amount, donate_towards: form.donate_towards,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Server error. Please try again.");
        return;
      }

      setSupportRequestId(data.support_request_id);
      setPaymentId(data.payment_id);
      setPayAddress(data.pay_address);
      setPayAmountBTC(data.pay_amount_btc);
      setExpiresAt(data.expires_at);
      setMode("payment");
    } catch (err) {
      alert("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Poll payment status while on the "payment" step
  useEffect(() => {
    if (mode !== "payment" || !paymentId || !supportRequestId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/support/donation/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ support_request_id: supportRequestId, payment_id: paymentId }),
        });
        if (!res.ok) return; // not confirmed yet — keep polling
        if (pollRef.current) clearInterval(pollRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);
        setMode("success");
      } catch {
        // silent — try again on next tick
      }
    };

    checkStatus();
    pollRef.current = setInterval(checkStatus, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [mode, paymentId, supportRequestId]);

  // Countdown to expiry
  useEffect(() => {
    if (mode !== "payment" || !expiresAt) return;
    const tick = () => {
      const diff = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
      setSecondsLeft(diff > 0 ? diff : 0);
    };
    tick();
    countdownRef.current = setInterval(tick, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [mode, expiresAt]);

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

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #d1d5db', padding: '12px 16px',
    fontSize: 14, color: '#111827', outline: 'none', borderRadius: 6,
    boxSizing: 'border-box', fontFamily: 'inherit', background: 'white',
  };

  const btnPrimary: React.CSSProperties = {
    flex: 1, background: '#ea580c', color: 'white', border: 'none',
    padding: '12px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
    letterSpacing: '0.1em', cursor: 'pointer', borderRadius: 6, fontFamily: 'inherit',
  };

  const btnSecondary: React.CSSProperties = {
    flex: 1, background: 'white', color: '#374151', border: '1px solid #d1d5db',
    padding: '12px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
    letterSpacing: '0.1em', cursor: 'pointer', borderRadius: 6, fontFamily: 'inherit',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', padding: '0 16px' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: 448, borderRadius: 12, boxShadow: '0 25px 50px rgba(0,0,0,0.25)', overflow: 'hidden' }}>

        <div style={{ background: '#ea580c', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: 'white', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Support Us</h2>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>

          {mode === "choose" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: '#374151', fontSize: 14, textAlign: 'center', margin: 0 }}>
                How would you like to support Makal Sevai Margam? 🙏
              </p>
              <button onClick={() => setMode("donate")}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, border: '2px solid #ea580c', color: '#ea580c', padding: '16px 20px', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'white', cursor: 'pointer', borderRadius: 8, fontFamily: 'inherit' }}>
                <Heart size={18} /> Donate Now
              </button>
              <button onClick={() => setMode("callback")}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, border: '2px solid #d1d5db', color: '#374151', padding: '16px 20px', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'white', cursor: 'pointer', borderRadius: 8, fontFamily: 'inherit' }}>
                <Phone size={18} /> Call Me Back
              </button>
            </div>
          )}

          {mode === "donate" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ color: '#6b7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: 0 }}>Donate Now</p>
              {[
                { name: "name",   placeholder: "Your Name *",     type: "text"   },
                { name: "phone",  placeholder: "Phone Number *",   type: "tel"    },
                { name: "email",  placeholder: "Email (optional)", type: "email"  },
                { name: "amount", placeholder: "Amount (₹) *",     type: "number" },
              ].map(f => (
                <input key={f.name} name={f.name} type={f.type}
                  placeholder={f.placeholder} value={(form as any)[f.name]}
                  onChange={handleChange} style={inputStyle} />
              ))}
              <select name="donate_towards" value={form.donate_towards} onChange={handleChange} style={inputStyle}>
                <option value="general">General Fund</option>
                <option value="muthor_illam">Muthor Illam (Elders Home)</option>
                <option value="annadhanam">Annadhanam (Free Meals)</option>
                <option value="education">Education Aid</option>
                <option value="construction">Temple Construction</option>
              </select>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => setMode("choose")} style={btnSecondary}>Back</button>
                <button onClick={handleDonateSubmit} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Processing..." : "Pay Now →"}
                </button>
              </div>
            </div>
          )}

          {mode === "callback" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ color: '#6b7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: 0 }}>Call Me Back</p>
              <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>Leave your number — we will call you within 24 hours 🙏</p>
              {[
                { name: "name",  placeholder: "Your Name *",     type: "text"  },
                { name: "phone", placeholder: "Phone Number *",   type: "tel"   },
                { name: "email", placeholder: "Email (optional)", type: "email" },
              ].map(f => (
                <input key={f.name} name={f.name} type={f.type}
                  placeholder={f.placeholder} value={(form as any)[f.name]}
                  onChange={handleChange} style={inputStyle} />
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => setMode("choose")} style={btnSecondary}>Back</button>
                <button onClick={handleCallbackSubmit} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Submitting..." : "Submit →"}
                </button>
              </div>
            </div>
          )}

          {mode === "payment" && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 32 }}>₿</div>
              <h3 style={{ fontWeight: 900, color: '#111827', fontSize: 16, margin: 0 }}>Send Bitcoin to Complete Donation</h3>
              <p style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>Send exactly the amount below from your wallet</p>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:${payAddress}?amount=${payAmountBTC}`}
                alt="Bitcoin payment QR code"
                style={{ margin: '8px auto', borderRadius: 8, border: '1px solid #f0f0f0' }}
              />

              <div style={{ background: 'rgba(234,88,12,0.06)', border: '1px solid rgba(234,88,12,0.15)', borderRadius: 12, padding: 12 }}>
                <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>Amount to send</p>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#ea580c', margin: '4px 0 0' }}>{payAmountBTC} BTC</p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', margin: '0 0 6px' }}>Bitcoin Address</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 8, padding: 10 }}>
                  <code style={{ fontSize: 11, wordBreak: 'break-all', flex: 1 }}>{payAddress}</code>
                  <button onClick={copyAddress} style={{ ...btnPrimary, flex: 'none', padding: '6px 12px', fontSize: 10 }}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {secondsLeft !== null && (
                <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>
                  ⏱ Expires in <strong>{formatCountdown(secondsLeft)}</strong>
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, color: '#6b7280' }}>
                <div style={{ width: 14, height: 14, border: '2px solid #fdba74', borderTop: '2px solid #ea580c', borderRadius: '50%' }} />
                Waiting for payment confirmation...
              </div>

              <button onClick={() => setMode("donate")} style={btnSecondary}>← Back to details</button>
            </div>
          )}

          {mode === "success" && (
            <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 48 }}>🙏</div>
              <h3 style={{ fontWeight: 900, color: '#111827', fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Thank You!</h3>
              <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>
                Your support means the world to our elders.<br />
                May God bless you always.
              </p>
              <button onClick={handleClose} style={{ ...btnPrimary, flex: 'none', padding: '12px 32px', marginTop: 8 }}>
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}