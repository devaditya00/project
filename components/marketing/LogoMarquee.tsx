"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Logo placeholder data — replace src with real logos ── */
const ROW_ONE = [
  { id: 1,  name: "Jerry Land"           },
  { id: 2,  name: "FirstCry"             },
  { id: 3,  name: "Mocha Café & Bar"     },
  { id: 4,  name: "Pranami"              },
  { id: 5,  name: "Tanishq"              },
  { id: 6,  name: "Heer Jewellery"       },
  { id: 7,  name: "Revolt"               },
  { id: 8,  name: "Jerry Land"           }, // duplicate for seamless loop
  { id: 9,  name: "FirstCry"             },
  { id: 10, name: "Mocha Café & Bar"     },
  { id: 11, name: "Pranami"              },
];

const ROW_TWO = [
  { id: 1,  name: "Revolt"               },
  { id: 2,  name: "Heer Jewellery"       },
  { id: 3,  name: "Tanishq"              },
  { id: 4,  name: "Pranami"              },
  { id: 5,  name: "Mocha Café & Bar"     },
  { id: 6,  name: "FirstCry"             },
  { id: 7,  name: "Jerry Land"           },
  { id: 8,  name: "Revolt"               }, // duplicate for seamless loop
  { id: 9,  name: "Heer Jewellery"       },
  { id: 10, name: "Tanishq"              },
  { id: 11, name: "Pranami"              },
];

/* ── Single logo cell ── */
function LogoCell({ name }: { name: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(160px, 16vw, 240px)",
        height: "clamp(80px, 8vw, 110px)",
        border: "1px solid #D4D3C0",
        borderRadius: "6px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem 1.75rem",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(27,77,62,0.3)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,45,36,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#D4D3C0";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Replace this with <Image> when you have real logos */}
      <span
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
          fontWeight: 500,
          color: "#3D5A50",
          letterSpacing: "-0.01em",
          textAlign: "center",
          lineHeight: 1.2,
          userSelect: "none",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/* ── Marquee row ── */
function MarqueeRow({
  items,
  direction,
  speed = 35,
}: {
  items: { id: number; name: string }[];
  direction: "left" | "right";
  speed?: number;
}) {
  // Duplicate items for seamless infinite loop
  const doubled = [...items, ...items];
  const totalWidth = items.length * (240 + 12); // approx width per item + gap

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        animate={{
          x: direction === "left"
            ? [0, -totalWidth]
            : [-totalWidth, 0],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
        style={{
          display: "flex",
          gap: "12px",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <LogoCell key={`${item.id}-${i}`} name={item.name} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main Section ── */
export default function LogoMarquee() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section 
      ref={ref}
      style={{
        backgroundColor: "#F5F4E8",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
        overflow: "hidden",
      }}
    >
      {/* ── Headline ── */}
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          style={{ marginBottom: "clamp(2.5rem, 4vw, 4rem)", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#0F2D24",
              margin: 0,
            }}
          >
            RESULTS THAT{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#1B4D3E",
              }}
            >
              actually matters!
            </em>
          </h2>
        </motion.div>
      </div>

      {/* ── Marquee rows ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {/* Row 1 — scrolls LEFT */}
        <MarqueeRow items={ROW_ONE} direction="left" speed={40} />

        {/* Row 2 — scrolls RIGHT */}
        <MarqueeRow items={ROW_TWO} direction="right" speed={35} />
      </motion.div>
    </section>
  );
}