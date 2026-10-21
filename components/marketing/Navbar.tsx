"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About",        href: "/#about",       section: "about"   },
  { label: "Work",         href: "/#work",          section: "work"    },
  { label: "Services",     href: "/#services",      section: "services" },
  { label: "Testimonials", href: "/#testimonials",  section: "testimonials" },
  { label: "Events",       href: "/events",        section: null      },
];

/* ── Desktop NavLink ── */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <Link href={href} className="relative flex flex-col items-center gap-[3px] group" style={{ textDecoration: "none" }}>
        <span
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: active ? "#0F2D24" : "#3D5A50",
            transition: "color 0.2s ease",
          }}
          className="group-hover:!text-[#0F2D24]"
        >
          {label}
        </span>
        {active && (
          <motion.span
            layoutId="nav-active-line"
            className="block h-[1.5px] w-full bg-[#1B4D3E]"
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          />
        )}
      </Link>
    </li>
  );
}

/* ── Hamburger ── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4D3E]"
    >
      <span className="sr-only">{open ? "Close" : "Menu"}</span>
      <span style={{ display: "flex", flexDirection: "column", gap: "5px", width: "22px" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              height: "1.5px",
              background: "#0F2D24",
              borderRadius: "999px",
              transformOrigin: "center",
              transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
              transform:
                open && i === 0 ? "translateY(6.5px) rotate(45deg)"
                : open && i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                : "none",
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </span>
    </button>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  /* ── Scroll: border + section detection ── */
  useEffect(() => {
  const SECTIONS = ["about", "work", "services", "testimonials", "events"];

  const onScroll = () => {
    setScrolled(window.scrollY > 24);

    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    let current: string | null = null;
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
        current = id;
      }
    }
    setActiveSection(current);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, [pathname]);

  /* ── Body lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Close on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* ── Active link logic ── */
  const isActive = (link: (typeof NAV_LINKS)[0]): boolean => {
    // Section-based (homepage scroll)
    if (link.section && pathname === "/") {
      return activeSection === link.section;
    }
    // Route-based
    if (!link.section) {
      if (link.href === "/") return pathname === "/";
      return pathname.startsWith(link.href);
    }
    return false;
  };

  return (
    <>
      {/* ── Header ── */}
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 70,
          backgroundColor: "#F5F4E8",
          borderBottom: scrolled ? "1px solid #D4D3C0" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(15,45,36,0.06)" : "none",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div className="container-wide">
          <nav
            aria-label="Main navigation"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "70px",
            }}
          >
            {/* LEFT – Logo */}
            <Link
              href="/"
              className="select-none"
              aria-label="Roshy's Digital – Home"
              style={{ marginLeft: "-40px" }}
            >
              <Image
                src="/Roshy-logo.png"
                alt="Roshy's Digital"
                width={200}
                height={60}
                priority
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                  height: "150px",
                  width: "auto",
                }}
              />
            </Link>

            {/* CENTER – Desktop nav */}
            <ul
              className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
              style={{ listStyle: "none" }}
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={isActive(link)}
                />
              ))}
            </ul>

            {/* RIGHT – CTAs + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/events"
                className="hidden lg:inline-flex items-center"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "#3D5A50",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#0F2D24"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#3D5A50"; }}
              >
                Find Events
              </Link>

              <span
                className="hidden lg:block"
                style={{ width: "1px", height: "16px", backgroundColor: "#D4D3C0" }}
              />

              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "#0F2D24",
                  border: "1px solid #0F2D24",
                  borderRadius: "4px",
                  padding: "9px 18px",
                  textDecoration: "none",
                  transition: "background-color 0.25s ease, color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0F2D24";
                  e.currentTarget.style.color = "#F5F4E8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#0F2D24";
                }}
              >
                Start a Project
              </Link>

              <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 65,
              backgroundColor: "#F5F4E8",
              display: "flex",
              flexDirection: "column",
              paddingTop: "70px",
            }}
          >
            <div
              className="container-wide"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "2.5rem",
                paddingBottom: "3rem",
              }}
            >
              <ul style={{ listStyle: "none" }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ borderBottom: "1px solid #D4D3C0" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "1.25rem",
                        paddingBottom: "1.25rem",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display), Georgia, serif",
                          fontSize: "clamp(2rem, 9vw, 3rem)",
                          fontWeight: 400,
                          color: isActive(link) ? "#1B4D3E" : "#0F2D24",
                          lineHeight: 1,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {link.label}
                      </span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path
                          d="M4 10h12M10 4l6 6-6 6"
                          stroke="#7A9990"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <Link
                  href="/events"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "1rem",
                    border: "1px solid #D4D3C0",
                    borderRadius: "4px",
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#3D5A50",
                    textDecoration: "none",
                  }}
                >
                  Find Events
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "1rem",
                    backgroundColor: "#0F2D24",
                    borderRadius: "4px",
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#F5F4E8",
                    textDecoration: "none",
                  }}
                >
                  Start a Project
                </Link>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", paddingTop: "1rem" }}>
                  {["Instagram", "LinkedIn", "X"].map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A9990",
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}