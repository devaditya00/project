"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type WorkItem = {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  gridColumn: string;
  gridRow: string;
  bg: string;
};

const WORKS: WorkItem[] = [
  {
    id: 1,
    title: "McDonald's Brand Activation",
    category: "Brand Activation",
    type: "image",
    src: "",
    gridColumn: "1 / 3",
    gridRow: "1 / 2",
    bg: "linear-gradient(145deg, #1B4D3E 0%, #0F2D24 100%)",
  },
  {
    id: 2,
    title: "Hyphen Ad Shoot",
    category: "Beauty",
    type: "video",
    src: "/videos/ad1.MP4",
    gridColumn: "3 / 4",
    gridRow: "1 / 3",
    bg: "linear-gradient(145deg, #163329 0%, #081912 100%)",
  },
  {
    id: 3,
    title: "Happy Customer",
    category: "Reel Shoots",
    type: "video",
    src: "/videos/ad2.MP4",
    gridColumn: "4 / 5",
    gridRow: "1 / 3",
    bg: "linear-gradient(145deg, #0F2D24 0%, #050f0a 100%)",
  },
  {
    id: 4,
    title: "The Ordinary Brand Shoot",
    category: "Beauty",
    type: "video",
    src: "/videos/ad3.MP4",
    gridColumn: "1 / 2",
    gridRow: "2 / 4",
    bg: "linear-gradient(145deg, #2A6B57 0%, #163329 100%)",
  },
  {
    id: 5,
    title: "Restaurant Campaign",
    category: "F&B Marketing",
    type: "image",
    src: "",
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
    bg: "linear-gradient(145deg, #1B4D3E 0%, #0a1c15 100%)",
  },
  {
    id: 6,
    title: "Cultural Event",
    category: "Events",
    type: "video",
    src: "",
    gridColumn: "2 / 3",
    gridRow: "3 / 4",
    bg: "linear-gradient(145deg, #163329 0%, #0F2D24 100%)",
  },
  {
    id: 7,
    title: "Jewellery Product Launch",
    category: "Jewellery",
    type: "image",
    src: "",
    gridColumn: "3 / 5",
    gridRow: "3 / 4",
    bg: "linear-gradient(145deg, #2A6B57 0%, #0F2D24 100%)",
  },
];

/* ── Shared card shell ── */
const cardShell: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  overflow: "hidden",
};

/* ── Video card – no link, no pointer events ── */
function VideoCard({ work }: { work: WorkItem }) {
  const [err, setErr] = useState(false);

  return (
    <div
      style={{
        ...cardShell,
        cursor: "default",
        pointerEvents: "none",
      }}
    >
      {/* Fallback bg */}
      <div style={{ position: "absolute", inset: 0, background: work.bg, zIndex: 0 }} />

      {/* Video */}
      {work.src && !err && (
        <video
          src={work.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setErr(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 1,
          }}
        />
      )}

      {/* Scrim */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,12,9,0.93) 0%, rgba(5,12,9,0.08) 45%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

      {/* Category pill */}
      <div style={{ position: "absolute", top: 14, left: 14, zIndex: 4 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "7.5px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,244,232,0.6)", backgroundColor: "rgba(245,244,232,0.07)", border: "1px solid rgba(245,244,232,0.12)", borderRadius: 99, padding: "3px 10px", backdropFilter: "blur(6px)" }}>
          {work.category}
        </span>
      </div>

      {/* Title */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.125rem", zIndex: 4 }}>
        <span style={{ display: "block", fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)", fontWeight: 500, color: "#F5F4E8", lineHeight: 1.25 }}>
          {work.title}
        </span>
      </div>
    </div>
  );
}

/* ── Image card – clickable link ── */
function ImageCard({ work }: { work: WorkItem }) {
  const [err, setErr] = useState(false);

  return (
    <Link href={`/work/${work.id}`} style={{ display: "block", height: "100%", textDecoration: "none" }}>
      <div className="group" style={{ ...cardShell, cursor: "pointer" }}>
        {/* Fallback bg */}
        <div style={{ position: "absolute", inset: 0, background: work.bg, zIndex: 0 }} />

        {/* Image */}
        {work.src && !err && (
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <Image
              src={work.src}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
              className="group-hover:scale-[1.04]"
              onError={() => setErr(true)}
            />
          </div>
        )}

        {/* Highlight */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.06) 0%, transparent 55%)", zIndex: 2, pointerEvents: "none" }} />

        {/* Scrim */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,12,9,0.93) 0%, rgba(5,12,9,0.08) 45%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        {/* Category pill */}
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 4 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "7.5px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,244,232,0.6)", backgroundColor: "rgba(245,244,232,0.07)", border: "1px solid rgba(245,244,232,0.12)", borderRadius: 99, padding: "3px 10px", backdropFilter: "blur(6px)" }}>
            {work.category}
          </span>
        </div>

        {/* Arrow on hover */}
        <div style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(245,244,232,0.18)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(245,244,232,0.05)", backdropFilter: "blur(4px)", zIndex: 4, opacity: 0, transform: "scale(0.8)", transition: "opacity 0.3s ease, transform 0.3s ease" }} className="group-hover:!opacity-100 group-hover:!scale-100">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="rgba(245,244,232,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.125rem", zIndex: 4, transform: "translateY(4px)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }} className="group-hover:!translate-y-0">
          <span style={{ display: "block", fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)", fontWeight: 500, color: "#F5F4E8", lineHeight: 1.25 }}>
            {work.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── WorkCard router ── */
function WorkCard({ work, index, inView }: { work: WorkItem; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.06 + index * 0.07, ease: EASE }}
      style={{ gridColumn: work.gridColumn, gridRow: work.gridRow, position: "relative", minHeight: 0 }}
    >
      {work.type === "video" ? <VideoCard work={work} /> : <ImageCard work={work} />}
    </motion.div>
  );
}

/* ── Main ── */
export default function WorkGrid() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  return (
    <section ref={ref} style={{ backgroundColor: "#F5F4E8", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 300px)", gap: "8px" }}>
          {WORKS.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", marginTop: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          <Link
            href="/#work"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#0F2D24", padding: "13px 32px", borderRadius: 4, border: "1px solid #C8C7B4", fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s ease" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0F2D24"; e.currentTarget.style.borderColor = "#0F2D24"; e.currentTarget.style.color = "#F5F4E8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#C8C7B4"; e.currentTarget.style.color = "#0F2D24"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            View All Work
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}