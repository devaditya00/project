"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { submitContactForm } from "@/app/actions/contact";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICES = [
  { value: "brand-strategy",       label: "Brand Strategy & Identity"         },
  { value: "social-media",         label: "Social Media Marketing"            },
  { value: "performance-marketing",label: "Performance Marketing"             },
  { value: "influencer-marketing", label: "Influencer Marketing"              },
  { value: "email-marketing",      label: "Email & WhatsApp Marketing"        },
  { value: "event-strategy",       label: "Event Strategy & Concept"          },
  { value: "event-production",     label: "Event Production & Management"     },
  { value: "college-fest",         label: "College Fests & Cultural Events"   },
  { value: "corporate-events",     label: "Corporate Events & Conferences"    },
  { value: "brand-activation",     label: "Brand Activations"                 },
  { value: "event-marketing",      label: "Event Marketing & Promotion"       },
  { value: "event-ticketing",      label: "Event Ticketing & Registration"    },
  { value: "website-development",  label: "Website Design & Development"      },
  { value: "ticketing-platform",   label: "Event Ticketing Platforms"         },
  { value: "other",                label: "Something Else"                    },
];

const BUDGETS = [
  { value: "under-50k",  label: "Under ₹50,000"      },
  { value: "50k-2L",     label: "₹50K – ₹2 Lakhs"    },
  { value: "2L-5L",      label: "₹2L – ₹5 Lakhs"     },
  { value: "5L-plus",    label: "₹5 Lakhs+"           },
  { value: "not-sure",   label: "Not sure yet"        },
];

/* ── Field wrapper ── */
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: error ? "#B84C4C" : "#3D5A50",
        }}
      >
        {label}
        {required && <span style={{ color: "#B84C4C", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "11px",
            color: "#B84C4C",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  backgroundColor: "#FFFFFF",
  border: `1px solid ${hasError ? "#B84C4C" : "#D4D3C0"}`,
  borderRadius: "4px",
  padding: "12px 16px",
  fontFamily: "var(--font-sans), system-ui, sans-serif",
  fontSize: "14px",
  color: "#0F2D24",
  outline: "none",
  transition: "border-color 0.2s ease",
});

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultMsg, setResultMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    const result = await submitContactForm(data);
    if (result.success) {
      setStatus("success");
      setResultMsg(result.message);
      reset();
    } else {
      setStatus("error");
      setResultMsg(result.error);
    }
  };

  return (
    <section
      style={{
        minHeight: "calc(100dvh - 70px)",
        backgroundColor: "#F5F4E8",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "clamp(4rem, 8vw, 10rem)",
            alignItems: "start",
          }}
        >
          {/* ── LEFT – Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
              <span className="eyebrow">Start a Project</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#0F2D24",
                margin: "0 0 clamp(1.5rem, 3vw, 2.5rem) 0",
              }}
            >
              Let&apos;s build
              <br />
              <em style={{ fontStyle: "italic", color: "#1B4D3E" }}>
                something great.
              </em>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "0.9375rem",
                lineHeight: 1.75,
                color: "#3D5A50",
                marginBottom: "clamp(2rem, 4vw, 3.5rem)",
                maxWidth: "380px",
              }}
            >
              Tell us about your brand, project or event. We&apos;ll review your
              enquiry and get back to you within 24 hours.
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                {
                  label: "Email",
                  value: "roshysdigital@gmail.com",
                  href: "mailto:roshysdigital@gmail.com",
                },
                {
                  label: "WhatsApp",
                  value: "+91 95084 52874",
                  href: "https://wa.me/919508452874",
                },
                {
                  label: "Based in",
                  value: "India · Available Worldwide",
                  href: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid #D4D3C0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#7A9990",
                      minWidth: "70px",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        fontSize: "13.5px",
                        fontWeight: 500,
                        color: "#0F2D24",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#1B4D3E"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#0F2D24"; }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        fontSize: "13.5px",
                        color: "#0F2D24",
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT – Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            {status === "success" ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D4D3C0",
                  borderRadius: "8px",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#1B4D3E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="#F5F4E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#0F2D24",
                    margin: "0 0 0.75rem",
                  }}
                >
                  Message sent.
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "0.9rem",
                    color: "#3D5A50",
                    lineHeight: 1.7,
                    margin: "0 0 2rem",
                  }}
                >
                  {resultMsg}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#3D5A50",
                    border: "1px solid #D4D3C0",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D4D3C0",
                  borderRadius: "8px",
                  padding: "clamp(1.75rem, 3vw, 2.5rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {/* Row 1 – Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Full Name" error={errors.name?.message} required>
                    <input
                      {...register("name")}
                      placeholder="Rahul Sharma"
                      style={inputStyle(!!errors.name)}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? "#B84C4C" : "#D4D3C0"; }}
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email?.message} required>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="rahul@company.com"
                      style={inputStyle(!!errors.email)}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? "#B84C4C" : "#D4D3C0"; }}
                    />
                  </Field>
                </div>

                {/* Row 2 – Phone + Company */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Phone Number" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="9876543210"
                      style={inputStyle(!!errors.phone)}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.phone ? "#B84C4C" : "#D4D3C0"; }}
                    />
                  </Field>
                  <Field label="Company / Brand" error={errors.company?.message}>
                    <input
                      {...register("company")}
                      placeholder="Your Brand Name"
                      style={inputStyle(!!errors.company)}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#D4D3C0"; }}
                    />
                  </Field>
                </div>

                {/* Row 3 – Service */}
                <Field label="Service You Need" error={errors.service?.message} required>
                  <select
                    {...register("service")}
                    style={{
                      ...inputStyle(!!errors.service),
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%237A9990' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.service ? "#B84C4C" : "#D4D3C0"; }}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </Field>

                {/* Row 4 – Budget */}
                <Field label="Budget Range" error={errors.budget?.message}>
                  <select
                    {...register("budget")}
                    style={{
                      ...inputStyle(false),
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%237A9990' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#D4D3C0"; }}
                  >
                    <option value="">Select budget range...</option>
                    {BUDGETS.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </Field>

                {/* Row 5 – Message */}
                <Field label="Tell Us About Your Project" error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Describe your project, goals, timeline or anything else we should know..."
                    style={{
                      ...inputStyle(!!errors.message),
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#1B4D3E"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? "#B84C4C" : "#D4D3C0"; }}
                  />
                </Field>

                {/* Error message */}
                {status === "error" && (
                  <div
                    style={{
                      padding: "12px 16px",
                      backgroundColor: "rgba(184,76,76,0.06)",
                      border: "1px solid rgba(184,76,76,0.2)",
                      borderRadius: "4px",
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "12px",
                      color: "#B84C4C",
                    }}
                  >
                    {resultMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "15px 24px",
                    backgroundColor: status === "loading" ? "#3D5A50" : "#0F2D24",
                    color: "#F5F4E8",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "background-color 0.25s ease, transform 0.2s ease",
                    boxShadow: "0 4px 20px rgba(15,45,36,0.18)",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.backgroundColor = "#1B4D3E";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = status === "loading" ? "#3D5A50" : "#0F2D24";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        aria-hidden
                        style={{ animation: "spin 1s linear infinite" }}
                      >
                        <circle cx="12" cy="12" r="10" stroke="rgba(245,244,232,0.3)" strokeWidth="3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#F5F4E8" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                <p
                  style={{
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "10px",
                    color: "#7A9990",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  We respond within 24 hours · No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}