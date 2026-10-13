"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: "About",        href: "/#about"        },
  { label: "Work",         href: "/#work"          },
  { label: "Services",     href: "/#services"      },
  { label: "Testimonials", href: "/#testimonials"  },
  { label: "Events",       href: "/events"         },
  { label: "Contact",      href: "/contact"        },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/roshysdigital",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/roshys-digital/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/roshysdigital",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919508452874",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:roshysdigital@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0F2D24",
        overflow: "hidden",
      }}
    >
      {/* ── BIG CTA BAND ── */}
      <div
        className="container-wide"
        style={{
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
          borderBottom: "1px solid rgba(245,244,232,0.08)",
          position: "relative",
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(42,107,87,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          {/* Big headline */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(3rem, 9vw, 10.5rem)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "#F5F4E8",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Let&apos;s start
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "rgba(245,244,232,0.4)",
                }}
              >
                something great.
              </em>
            </motion.h2>
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            {/* CTA button */}
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                color: "#F5F4E8",
                padding: "16px 32px",
                borderRadius: "999px",
                border: "1px solid rgba(245,244,232,0.25)",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F5F4E8";
                e.currentTarget.style.color = "#0F2D24";
                e.currentTarget.style.borderColor = "#F5F4E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#F5F4E8";
                e.currentTarget.style.borderColor = "rgba(245,244,232,0.25)";
              }}
            >
              Let&apos;s Collaborate
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Social icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(245,244,232,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(245,244,232,0.6)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,244,232,0.5)";
                    e.currentTarget.style.color = "#F5F4E8";
                    e.currentTarget.style.backgroundColor = "rgba(245,244,232,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,244,232,0.15)";
                    e.currentTarget.style.color = "rgba(245,244,232,0.6)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="container-wide">
        <div
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Logo */}
          <Link href="/" aria-label="Roshy's Digital">
            <Image
              src="/Roshy-logo.png"
              alt="Roshy's Digital"
              width={120}
              height={40}
              style={{
                objectFit: "contain",
                height: "72px",
                width: "auto",
                filter: "brightness(0) invert(1)",
                opacity: 0.7,
              }}
            />
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245,244,232,0.4)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F5F4E8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,244,232,0.4)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p
            style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "10px",
              color: "rgba(245,244,232,0.25)",
              margin: 0,
              letterSpacing: "0.06em",
            }}
          >
            © {new Date().getFullYear()} Roshy&apos;s Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}