"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Roshy's Digital completely transformed how we show up online. Our jewellery campaigns have never looked this premium – the content stops people mid-scroll.",
    author: "Priya Mehta",
    role: "Founder",
    company: "Heer House of Jewellery",
    logo: "", // /logos/heer.png
    featured: true,
    size: "large",
  },
  {
    id: 2,
    quote:
      "They handled our entire college fest – from ticketing to on-ground production. 4,000 attendees, zero chaos. Absolutely professional.",
    author: "Arjun Sharma",
    role: "Cultural Secretary",
    company: "St. Xavier's College",
    logo: "",
    featured: false,
    size: "small",
  },
  {
    id: 3,
    quote:
      "Our real estate project launch was a massive success. The leads we generated in 2 weeks exceeded our 3-month target.",
    author: "Rahul Singhania",
    role: "Marketing Head",
    company: "Pranami Group",
    logo: "",
    featured: false,
    size: "small",
  },
  {
    id: 4,
    quote:
      "The event ticketing platform they built for us is seamless. Real-time check-ins, QR codes, payment integration – exactly what we needed.",
    author: "Sneha Kapoor",
    role: "Operations Manager",
    company: "Mocha Café & Bar",
    logo: "",
    featured: false,
    size: "small",
  },
  {
    id: 5,
    quote:
      "Their social media team understands luxury marketing. Tanishq campaigns require precision – they delivered beyond expectations every single time.",
    author: "Vikram Nair",
    role: "Brand Manager",
    company: "Tanishq",
    logo: "",
    featured: false,
    size: "small",
  },
];

/* ── Star Rating ── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="#1B4D3E" aria-hidden>
          <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5l-3 1.5.6-3.2L1.2 4.5l3.3-.5z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Avatar placeholder ── */
function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "25%",
        backgroundColor: "#1B4D3E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          color: "#F5F4E8",
          letterSpacing: "0.05em",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

/* ── Large featured card ── */
function FeaturedCard({
  t,
  inView,
}: {
  t: (typeof TESTIMONIALS)[0];
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
      style={{
        gridColumn: "1 / 2",
        gridRow: "1 / 3",
        backgroundColor: "#0F2D24",
        border: "1px solid #1E3D30",
        borderRadius: "10px",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        minHeight: "420px",
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 20% 20%, rgba(42,107,87,0.2) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Top – stars + quote mark */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <Stars />
          {/* Big quote mark */}
          <span
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "5rem",
              lineHeight: 0.8,
              color: "rgba(42,107,87,0.3)",
              userSelect: "none",
            }}
          >
            "
          </span>
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            color: "#F5F4E8",
            margin: 0,
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      {/* Bottom – author + company */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(245,244,232,0.1)",
            marginBottom: "1.5rem",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar name={t.author} />
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#F5F4E8",
                marginBottom: "2px",
              }}
            >
              {t.author}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                color: "#7A9990",
                letterSpacing: "0.04em",
              }}
            >
              {t.role} · {t.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small card ── */
function SmallCard({
  t,
  delay,
  inView,
}: {
  t: (typeof TESTIMONIALS)[0];
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D4D3C0",
        borderRadius: "10px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(27,77,62,0.3)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(15,45,36,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#D4D3C0";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div>
        {/* Stars */}
        <div style={{ marginBottom: "1rem" }}>
          <Stars />
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.72,
            color: "#3D5A50",
            margin: "0 0 1.25rem 0",
            fontStyle: "normal",
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      {/* Author row */}
      <div>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#E8E7DA",
            marginBottom: "1rem",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar name={t.author} />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#0F2D24",
                  marginBottom: "2px",
                }}
              >
                {t.author}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "9px",
                  color: "#7A9990",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {t.role} · {t.company}
              </div>
            </div>
          </div>

          {/* Company logo placeholder – replace with <Image> */}
          <div
            style={{
              height: "28px",
              minWidth: "60px",
              border: "1px solid #E8E7DA",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "9px",
                fontWeight: 500,
                color: "#7A9990",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              {t.company.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Trust bar – ratings row ── */


/* ── Main ── */
export default function TestimonialsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const featured = TESTIMONIALS.find((t) => t.featured)!;
  const rest     = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        backgroundColor: "#F5F4E8",
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
      }}
    >
      <div className="container-wide">

        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "clamp(2.5rem, 4vw, 3.5rem)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
            <span className="eyebrow">Client Stories</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "end",
              gap: "4rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#0F2D24",
                margin: 0,
              }}
            >
              Trusted by brands
              <br />
              <em style={{ fontStyle: "italic", color: "#1B4D3E" }}>
                that mean business.
              </em>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "1.2rem",
                lineHeight: 1.75,
                color: "#3D5A50",
                margin: 0,
                maxWidth: "420px",
              }}
            >
              From jewellery brands to college fests, real estate launches to corporate
              events – here&apos;s what our clients say about working with us.
            </p>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "12px",
          }}
        >
          {/* Featured – spans 2 rows left */}
          <FeaturedCard t={featured} inView={inView} />

          {/* 4 small cards – right 2 cols */}
          {rest.map((t, i) => (
            <SmallCard key={t.id} t={t} delay={0.2 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}