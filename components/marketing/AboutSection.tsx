"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: "#F5F4E8",
        paddingTop: "clamp(2.5rem, 4.5vw, 4rem)",
        paddingBottom: "clamp(2.5rem, 4.5vw, 4rem)",
      }}
    >
      <div className="container-wide">

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "clamp(1rem, 1.75vw, 1.5rem)",
          }}
        >
          <span className="eyebrow">About Us</span>
        </motion.div>

        {/* ── BIG HEADLINE ── */}
        <div
  style={{
    marginBottom: "clamp(3rem, 5vw, 5rem)",
    overflow: "hidden",
  }}
>
  <motion.div
    initial={{ opacity: 0, y: 56 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
    style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: "clamp(2rem, 4vw, 5rem)",
    }}
  >
    {/* LEFT — Headline */}
    <h2
      style={{
        fontFamily: "var(--font-display), Georgia, serif",
        fontSize: "clamp(1.8rem, 4vw, 4.5rem)",
        fontWeight: 400,
        lineHeight: 1.1,
        letterSpacing: "-0.025em",
        color: "#0F2D24",
        margin: 0,
      }}
    >
      <span style={{ display: "block", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
        We are a{" "}
        <em style={{ fontStyle: "italic", textTransform: "none", color: "#1B4D3E", letterSpacing: "-0.025em" }}>
          creative marketing
        </em>
      </span>
      <span style={{ display: "block", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
        <em style={{ fontStyle: "italic", textTransform: "none", letterSpacing: "-0.025em" }}>
          & event company
        </em>{" "}
        built for
      </span>
      <span style={{ display: "block", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
        brands that{" "}
        <em style={{ fontStyle: "italic", textTransform: "none", color: "#1B4D3E", letterSpacing: "-0.025em" }}>
          demand attention
        </em>
      </span>
      <span style={{ display: "block", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
        and experiences that{" "}
        <em style={{ fontStyle: "italic", textTransform: "none", letterSpacing: "-0.025em" }}>
          leave a mark.
        </em>
      </span>
    </h2>

    {/* RIGHT — Logo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      style={{
        flexShrink: 0,
        width: "clamp(240px, 20vw, 320px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        border: "1px solid #D4D3C0",
        aspectRatio: "1/1",
      }}
    >
      <Image
        src="/Roshy-logo.png"
        alt="Roshy's Digital"
        width={300}
        height={300}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "auto",
          opacity: 0.9,
        }}
      />
    </motion.div>
  </motion.div>
</div>
        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          style={{
            width: "100%",
            height: "1px",
            background: "#D4D3C0",
            transformOrigin: "left",
            marginBottom: "clamp(3rem, 5vw, 4.5rem)",
          }}
        />

        {/* ── Bottom two columns ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 6vw, 7rem)",
            alignItems: "start",
          }}
        >
          {/* LEFT — Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                lineHeight: 1.72,
                color: "#3D5A50",
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              We combine digital marketing, creative strategy and event
              experiences to help ambitious brands grow — and create moments
              people talk about long after they&apos;re over.
            </p>

            <Link
              href="/#about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "#0F2D24",
                padding: "13px 28px",
                borderRadius: "999px",
                border: "1px solid #C8C7B4",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.25s ease",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0F2D24";
                e.currentTarget.style.borderColor = "#0F2D24";
                e.currentTarget.style.color = "#F5F4E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#C8C7B4";
                e.currentTarget.style.color = "#0F2D24";
              }}
            >
              Learn More
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

          {/* RIGHT — Who We Are + Vision */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.48, ease: EASE }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
          >
            {/* Who we are */}
            <div>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7A9990",
                  marginBottom: "0.75rem",
                }}
              >
                Who We Are
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "clamp(0.875rem, 1.05vw, 0.9375rem)",
                  lineHeight: 1.75,
                  color: "#3D5A50",
                  margin: 0,
                }}
              >
                We are a team of strategists, creatives and event specialists
                helping jewellery brands, colleges, real estate companies and
                ambitious businesses grow through bold campaigns and
                unforgettable experiences.
              </p>
            </div>

            {/* Divider */}
            <div style={{ width: "100%", height: "1px", background: "#D4D3C0" }} />

            {/* Vision */}
            <div>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7A9990",
                  marginBottom: "0.75rem",
                }}
              >
                Our Vision
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "clamp(0.875rem, 1.05vw, 0.9375rem)",
                  lineHeight: 1.75,
                  color: "#3D5A50",
                  margin: 0,
                }}
              >
                To become India&apos;s most trusted creative partner for brands
                that want substance over noise — combining marketing strategy
                with world-class event experiences.
              </p>
            </div>

            {/* Divider */}
            <div style={{ width: "100%", height: "1px", background: "#D4D3C0" }} />

            {/* Mission */}
            <div>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7A9990",
                  marginBottom: "0.75rem",
                }}
              >
                Our Mission
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "clamp(0.875rem, 1.05vw, 0.9375rem)",
                  lineHeight: 1.75,
                  color: "#3D5A50",
                  margin: 0,
                }}
              >
                Build brands that get noticed. Produce events people remember.
                Deliver results that actually move the needle.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}