"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CARDS = [
  {
    id: 1,
    category: "Brands",
    title: "Luxury Brand Campaign",
    bg: "linear-gradient(150deg, #2A6B57 0%, #0F2D24 100%)",
    gridArea: "1 / 1 / 3 / 2",
    video: "/videos/luxury-campaign.mp4",
  },
  {
    id: 2,
    category: "Festivals",
    title: "College Fest 2026",
    bg: "linear-gradient(150deg, #1B4D3E 0%, #081912 100%)",
    gridArea: "1 / 2 / 2 / 3",
    image: "/images/fest-post.png",
  },
  {
    id: 3,
    category: "Real Estate",
    title: "Property Launch",
    bg: "linear-gradient(150deg, #163329 0%, #0a1c15 100%)",
    gridArea: "2 / 2 / 3 / 3",
    image: "/images/property-launch.png",
  },
] satisfies {
  id: number;
  category: string;
  title: string;
  bg: string;
  gridArea: string;
  video?: string;
  image?: string;
}[];

function Card({
  card,
  delay,
}: {
  card: (typeof CARDS)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      whileHover={{
        scale: 1.025,
        zIndex: 20,
        transition: { duration: 0.3, ease: EASE },
      }}
      style={{
        gridArea: card.gridArea,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow:
          "0 8px 32px rgba(10,28,22,0.16), 0 2px 6px rgba(10,28,22,0.08)",
      }}
    >
      {/* Background: video, image, or gradient */}
      {card.video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/luxury-campaign-poster.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={card.video} type="video/mp4" />
        </video>
      ) : card.image ? (
        <Image
          src={card.image}
          alt={card.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1024px) 0px, 20vw"
          priority
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: card.bg }} />
      )}

      {/* Inner highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 25% 20%, rgba(255,255,255,0.09) 0%, transparent 55%)",
        }}
      />

      {/* Bottom scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(5,15,11,0.92) 0%, rgba(5,15,11,0.08) 45%, transparent 100%)",
        }}
      />

      {/* Top left — category */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(245,244,232,0.5)",
          }}
        >
          {card.category}
        </span>
      </div>

      {/* Top right — arrow */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: "1px solid rgba(245,244,232,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2 10L10 2M10 2H4M10 2V8"
            stroke="rgba(245,244,232,0.65)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom — title */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.125rem",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "#F5F4E8",
            lineHeight: 1.25,
          }}
        >
          {card.title}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "680px",
        backgroundColor: "#F5F4E8",
        overflow: "hidden",
        paddingTop: "70px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 55% 65% at 80% 45%, rgba(27,77,62,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        className="container-wide"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(3rem, 5vw, 6rem)",
            width: "100%",
            alignItems: "center",
            paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {/* ═══════════════════════════════
              LEFT — Text
          ═══════════════════════════════ */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "clamp(1.5rem, 2.5vw, 2rem)",
              }}
            >
              <span className="eyebrow">
                Digital Marketing &amp; Event Experiences
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.13, ease: EASE }}
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2.75rem, 5.2vw, 5.75rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: "#0F2D24",
                margin: 0,
                marginBottom: "clamp(1.25rem, 2vw, 1.75rem)",
              }}
            >
              Brands that{" "}
              <em style={{ fontStyle: "italic", color: "#1B4D3E" }}>
                get noticed.
              </em>
              <br />
              Events people{" "}
              <em style={{ fontStyle: "italic" }}>remember.</em>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                lineHeight: 1.78,
                color: "#3D5A50",
                maxWidth: "420px",
                marginBottom: "clamp(1.75rem, 3vw, 2.5rem)",
              }}
            >
              We combine digital marketing, creative strategy and event
              experiences to help ambitious brands grow — and create moments
              people talk about long after they&apos;re over.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginBottom: "clamp(1rem, 1.5vw, 2rem)",
              }}
            >
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#0F2D24",
                  color: "#F5F4E8",
                  padding: "13px 26px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background-color 0.25s ease, transform 0.22s ease",
                  boxShadow: "0 4px 18px rgba(15,45,36,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1B4D3E";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0F2D24";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start a Project
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

              <Link
                href="/events"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#0F2D24",
                  padding: "13px 26px",
                  borderRadius: "4px",
                  border: "1px solid #C8C7B4",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#1B4D3E";
                  e.currentTarget.style.backgroundColor = "rgba(27,77,62,0.04)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#C8C7B4";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Explore Events
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "clamp(0.75rem, 1vw, 1rem)",
                borderTop: "1px solid #D4D3C0",
              }}
            >
              {[
                { value: "50+",   label: "Projects"   },
                { value: "12+",   label: "Industries" },
                { value: "200K+", label: "Attendees"  },
              ].map((stat, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ paddingRight: i < arr.length - 1 ? "1.75rem" : "0" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "clamp(1.4rem, 1.9vw, 1.9rem)",
                        fontWeight: 500,
                        color: "#0F2D24",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A9990",
                        marginTop: "5px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        height: "28px",
                        background: "#D4D3C0",
                        marginRight: "1.75rem",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ═══════════════════════════════
              RIGHT — Project cards
              Layout:
              [ Card 1 (tall) ] [ Card 2 ]
              [ Card 1 (tall) ] [ Card 3 ]
          ═══════════════════════════════ */}
          <div
            className="hidden lg:grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "10px",
              height: "clamp(380px, 52vh, 540px)",
            }}
          >
            {CARDS.map((card, i) => (
              <Card key={card.id} card={card} delay={0.38 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "7px",
          zIndex: 2,
        }}
      />
    </section>
  );
}