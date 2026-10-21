"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICES = [
  {
    id: "01",
    title: "Brand Strategy & Identity",
    pillar: "Marketing",
    description:
      "Positioning, messaging, visual identity and brand architecture built to make you impossible to ignore.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Social Media Marketing",
    pillar: "Marketing",
    description:
      "Strategy, content creation, calendar planning and community management. For brands who want presence that converts.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Performance Marketing",
    pillar: "Marketing",
    description:
      "Meta & Google Ads, analytics, lead funnels. Numbers-driven strategies that deliver measurable ROI.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Influencer Marketing",
    pillar: "Marketing",
    description:
      "Collaborations with local and national creators. Authentic voices, amplified reach, real impact.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: "05",
    title: "Email & WhatsApp Marketing",
    pillar: "Marketing",
    description:
      "Direct communication that lands. Campaigns, drip sequences and broadcasts that keep your audience engaged.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: "06",
    title: "Event Strategy & Concept",
    pillar: "Events",
    description:
      "From ideation to blueprint. We concept, plan and structure events that have purpose, flow and impact.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: "07",
    title: "Event Production & Management",
    pillar: "Events",
    description:
      "End-to-end production. Venue, logistics, vendors, AV, décor, coordination – all handled seamlessly.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "08",
    title: "College Fests & Cultural Events",
    pillar: "Events",
    description:
      "High-energy college festivals, cultural programs and youth events. We know what makes crowds show up.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: "09",
    title: "Corporate Events & Conferences",
    pillar: "Events",
    description:
      "Professional corporate gatherings, product launches and conferences executed with precision and polish.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    id: "10",
    title: "Brand Activations",
    pillar: "Events",
    description:
      "Experiential marketing that puts your brand in people's hands. Activations that create lasting impressions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: "11",
    title: "Event Marketing & Promotion",
    pillar: "Events",
    description:
      "Pre-event buzz, ticket sales campaigns, social promotion and post-event amplification that fills venues.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    id: "12",
    title: "Event Ticketing & Registration",
    pillar: "Events",
    description:
      "Seamless ticketing, QR check-ins, attendee management and registration systems built for scale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
      </svg>
    ),
  },
  {
    id: "13",
    title: "Website Design & Development",
    pillar: "Technology",
    description:
      "Cutting-edge websites that combine aesthetic excellence with seamless performance and conversion.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    id: "14",
    title: "Event Ticketing Platforms",
    pillar: "Technology",
    description:
      "Custom-built ticketing infrastructure. Multi-organizer platforms, payment integration and QR validation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
];

/* ── Single service card ── */
/* ── Illustrations – inline SVG per service ── */
const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  "01": ( // Brand Strategy
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person at desk */}
      <circle cx="80" cy="35" r="16" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M55 90c0-13.8 11.2-25 25-25h10c13.8 0 25 11.2 25 90" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Laptop */}
      <rect x="45" y="82" width="70" height="42" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <line x1="35" y1="124" x2="125" y2="124" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Star/brand icon floating */}
      <path d="M118 20l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      {/* Diamond */}
      <path d="M28 40l8-10 8 10-8 10z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      {/* Lines on screen */}
      <line x1="55" y1="97" x2="95" y2="97" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="106" x2="85" y2="106" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "02": ( // Social Media
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Two people */}
      <circle cx="55" cy="32" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M32 85c0-12.7 10.3-23 23-23h4" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="105" cy="35" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M100 62h4c12.7 0 23 10.3 23 23" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Phone */}
      <rect x="70" y="55" width="22" height="38" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <line x1="76" y1="88" x2="86" y2="88" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Instagram icon */}
      <rect x="76" y="62" width="10" height="10" rx="2.5" stroke="#0F2D24" strokeWidth="1.3"/>
      <circle cx="81" cy="67" r="2.5" stroke="#0F2D24" strokeWidth="1"/>
      {/* Heart floating */}
      <path d="M125 60c0-2.5 2-4 4-4s4 1.5 4 4c0 3-4 7-4 7s-4-4-4-7z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      {/* Like icon */}
      <path d="M22 65c0-2 1.5-3.5 3.5-3.5 1 0 1.8.4 2.5 1 .7-.6 1.5-1 2.5-1 2 0 3.5 1.5 3.5 3.5 0 2.5-3.5 6-6 7.5-2.5-1.5-6-5-6-7.5z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  "03": ( // Performance Marketing
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person */}
      <circle cx="72" cy="32" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M50 90c0-12.2 9.8-22 22-22h4c12.2 0 22 9.8 22 22" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Laptop */}
      <rect x="42" y="82" width="60" height="38" rx="3" stroke="#0F2D24" strokeWidth="1.8"/>
      <line x1="30" y1="120" x2="114" y2="120" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* G logo */}
      <circle cx="118" cy="28" r="12" stroke="#0F2D24" strokeWidth="1.5"/>
      <path d="M124 28h-6v4h3.5c-.5 2-2.2 3.5-4.5 3.5-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5c1.4 0 2.6.5 3.6 1.3l2.1-2.1C121.7 22.7 120 22 118 22c-4.4 0-8 3.6-8 8s3.6 8 8 8c4.4 0 8-3.6 8-8v-2z" fill="#0F2D24"/>
      {/* Ads badge */}
      <rect x="100" y="44" width="36" height="22" rx="4" stroke="#0F2D24" strokeWidth="1.5"/>
      <text x="108" y="59" fontSize="9" fill="#0F2D24" fontFamily="sans-serif" fontWeight="600">Ads</text>
      {/* Bar chart on screen */}
      <rect x="52" y="100" width="6" height="14" rx="1" fill="#0F2D24"/>
      <rect x="62" y="94" width="6" height="20" rx="1" fill="#0F2D24"/>
      <rect x="72" y="97" width="6" height="17" rx="1" fill="#0F2D24"/>
      {/* Target */}
      <circle cx="140" cy="38" r="10" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="140" cy="38" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="140" cy="38" r="2" fill="#0F2D24"/>
      {/* Arrow to target */}
      <path d="M132 30l-4-4m4 4l-4 0m4 0l0-4" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "04": ( // Influencer
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Main person */}
      <circle cx="80" cy="30" r="16" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M55 88c0-13.8 11.2-25 25-25h8c13.8 0 25 11.2 25 25" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Phone in hand */}
      <rect x="100" y="60" width="18" height="30" rx="3" stroke="#0F2D24" strokeWidth="1.8"/>
      <line x1="105" y1="85" x2="113" y2="85" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Stars/sparkles */}
      <path d="M28 40l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" stroke="#0F2D24" strokeWidth="1.3" fill="none"/>
      <path d="M130 20l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" stroke="#0F2D24" strokeWidth="1.3" fill="none"/>
      <path d="M140 65l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" stroke="#0F2D24" strokeWidth="1.3" fill="none"/>
      {/* Megaphone */}
      <path d="M20 62l6-4v12l-6-4z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      <rect x="26" y="60" width="8" height="8" rx="1" stroke="#0F2D24" strokeWidth="1.5"/>
      <path d="M34 61l6-3M34 67l6 3" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Wave lines */}
      <path d="M42 58c2-2 4-2 6 0s4 2 6 0" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M42 64c2-2 4-2 6 0s4 2 6 0" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "05": ( // Email & WhatsApp
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person */}
      <circle cx="70" cy="32" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M48 88c0-12.2 9.8-22 22-22h4c12.2 0 22 9.8 22 22" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Email envelope */}
      <rect x="95" y="40" width="48" height="36" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <path d="M95 44l24 16 24-16" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      {/* WhatsApp bubble */}
      <rect x="20" y="55" width="38" height="28" rx="8" stroke="#0F2D24" strokeWidth="1.5"/>
      <path d="M28 83l-6 6v-6" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Chat lines */}
      <line x1="27" y1="65" x2="50" y2="65" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="27" y1="71" x2="45" y2="71" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Notification dots */}
      <circle cx="138" cy="40" r="7" fill="#0F2D24"/>
      <text x="135" y="44" fontSize="8" fill="white" fontFamily="sans-serif">3</text>
    </svg>
  ),
  "06": ( // Event Strategy
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person thinking */}
      <circle cx="75" cy="32" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M52 88c0-12.7 10.3-23 23-23h8c12.7 0 23 10.3 23 23" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Clipboard / plan */}
      <rect x="100" y="25" width="44" height="55" rx="3" stroke="#0F2D24" strokeWidth="1.8"/>
      <rect x="112" y="20" width="18" height="10" rx="2" stroke="#0F2D24" strokeWidth="1.5"/>
      <line x1="108" y1="42" x2="136" y2="42" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="108" y1="51" x2="130" y2="51" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="108" y1="60" x2="136" y2="60" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="108" y1="69" x2="126" y2="69" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Checkmarks */}
      <path d="M104 42.5l2 2 3.5-3.5" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M104 51.5l2 2 3.5-3.5" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Lightbulb */}
      <path d="M22 38c0-7 5.5-12 12-12s12 5 12 12c0 4-2 7.5-5 9.5v4.5h-14v-4.5c-3-2-5-5.5-5-9.5z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      <line x1="29" y1="54" x2="37" y2="54" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="30" y1="58" x2="36" y2="58" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  "07": ( // Event Production
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Stage/screen */}
      <rect x="20" y="20" width="120" height="65" rx="4" stroke="#0F2D24" strokeWidth="2"/>
      <line x1="20" y1="70" x2="140" y2="70" stroke="#0F2D24" strokeWidth="1.3"/>
      {/* Stage lights */}
      <path d="M45 20l-10-12M80 20v-12M115 20l10-12" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="35" cy="8" r="4" stroke="#0F2D24" strokeWidth="1.3"/>
      <circle cx="80" cy="8" r="4" stroke="#0F2D24" strokeWidth="1.3"/>
      <circle cx="125" cy="8" r="4" stroke="#0F2D24" strokeWidth="1.3"/>
      {/* Person on stage */}
      <circle cx="80" cy="45" r="10" stroke="#0F2D24" strokeWidth="1.8"/>
      <path d="M65 70c0-8.3 6.7-15 15-15h2c8.3 0 15 6.7 15 15" stroke="#0F2D24" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Audience dots */}
      <circle cx="35" cy="100" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="55" cy="95" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="75" cy="100" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="95" cy="95" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="115" cy="100" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
      <circle cx="135" cy="95" r="5" stroke="#0F2D24" strokeWidth="1.5"/>
    </svg>
  ),
  "08": ( // College Fests
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* 3 people celebrating */}
      <circle cx="45" cy="35" r="12" stroke="#0F2D24" strokeWidth="2"/>
      <circle cx="80" cy="28" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <circle cx="115" cy="35" r="12" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M25 90c0-11 9-20 20-20h4" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M58 90c0-13.8 11.2-25 22-25h2c10.8 0 22 11.2 22 25" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M111 70h4c11 0 20 9 20 20" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Raised arms */}
      <path d="M35 55l-8-12M55 55l8-12" stroke="#0F2D24" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M115 55l8-12M125 55l-8-12" stroke="#0F2D24" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Confetti */}
      <rect x="20" y="15" width="5" height="5" rx="1" transform="rotate(30 20 15)" stroke="#0F2D24" strokeWidth="1.2"/>
      <rect x="130" y="10" width="5" height="5" rx="1" transform="rotate(-20 130 10)" stroke="#0F2D24" strokeWidth="1.2"/>
      <rect x="70" y="5" width="4" height="4" rx="1" transform="rotate(45 70 5)" stroke="#0F2D24" strokeWidth="1.2"/>
      <circle cx="140" cy="30" r="3" stroke="#0F2D24" strokeWidth="1.2"/>
      <circle cx="18" cy="28" r="3" stroke="#0F2D24" strokeWidth="1.2"/>
    </svg>
  ),
  "09": ( // Corporate Events
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person in suit */}
      <circle cx="80" cy="28" r="14" stroke="#0F2D24" strokeWidth="2"/>
      {/* Suit jacket */}
      <path d="M58 90c0-12.2 9.8-22 22-22h8c12.2 0 22 9.8 22 22" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M72 68l8 10 8-10" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="80" y1="68" x2="80" y2="78" stroke="#0F2D24" strokeWidth="1.5"/>
      {/* Briefcase */}
      <rect x="24" y="55" width="36" height="28" rx="3" stroke="#0F2D24" strokeWidth="1.8"/>
      <path d="M32 55v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" stroke="#0F2D24" strokeWidth="1.5"/>
      <line x1="24" y1="69" x2="60" y2="69" stroke="#0F2D24" strokeWidth="1.3"/>
      <rect x="38" y="65" width="8" height="8" rx="1" stroke="#0F2D24" strokeWidth="1.3"/>
      {/* Trophy */}
      <path d="M108 40h24M112 40v12c0 5.5 4.5 10 10 10s10-4.5 10-10v-12" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M108 38c0-2 2-4 4-2M132 38c0-2-2-4-4-2" stroke="#0F2D24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="122" y1="62" x2="122" y2="72" stroke="#0F2D24" strokeWidth="1.5"/>
      <line x1="115" y1="72" x2="129" y2="72" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "10": ( // Brand Activations
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person with megaphone */}
      <circle cx="75" cy="30" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M52 88c0-12.7 10.3-23 23-23h8" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Megaphone */}
      <path d="M90 50l28-14v36l-28-14z" stroke="#0F2D24" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <rect x="82" y="46" width="10" height="20" rx="2" stroke="#0F2D24" strokeWidth="1.5"/>
      <path d="M90 70l4 16" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Sound waves */}
      <path d="M122 45c4 3 4 9 0 12" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M127 40c7 6 7 16 0 22" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Stars */}
      <path d="M22 50l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" stroke="#0F2D24" strokeWidth="1.2" fill="none"/>
      <path d="M30 25l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" stroke="#0F2D24" strokeWidth="1.2" fill="none"/>
      <path d="M18 75l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" stroke="#0F2D24" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  "11": ( // Event Marketing
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person */}
      <circle cx="70" cy="30" r="14" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M48 88c0-12.2 9.8-22 22-22h6" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Chart going up */}
      <rect x="96" y="30" width="48" height="60" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <polyline points="104,78 116,62 126,68 140,44" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="140" cy="44" r="3" fill="#0F2D24"/>
      <line x1="104" y1="82" x2="140" y2="82" stroke="#0F2D24" strokeWidth="1" strokeLinecap="round"/>
      <line x1="104" y1="37" x2="104" y2="82" stroke="#0F2D24" strokeWidth="1" strokeLinecap="round"/>
      {/* Ticket icon */}
      <path d="M20 58c0-3 2.5-5.5 5.5-5.5h24c3 0 5.5 2.5 5.5 5.5v0c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5v0c0 3-2.5 5.5-5.5 5.5h-24c-3 0-5.5-2.5-5.5-5.5v0c3 0 5.5-2.5 5.5-5.5S20 61 20 58z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      <line x1="35" y1="52.5" x2="35" y2="74.5" stroke="#0F2D24" strokeWidth="1" strokeDasharray="3 2"/>
    </svg>
  ),
  "12": ( // Ticketing
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person */}
      <circle cx="65" cy="30" r="13" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M44 85c0-11.6 9.4-21 21-21h6" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* QR Code */}
      <rect x="92" y="22" width="52" height="52" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <rect x="98" y="28" width="16" height="16" rx="1" stroke="#0F2D24" strokeWidth="1.5"/>
      <rect x="122" y="28" width="16" height="16" rx="1" stroke="#0F2D24" strokeWidth="1.5"/>
      <rect x="98" y="52" width="16" height="16" rx="1" stroke="#0F2D24" strokeWidth="1.5"/>
      <rect x="102" y="32" width="8" height="8" rx="0.5" fill="#0F2D24"/>
      <rect x="126" y="32" width="8" height="8" rx="0.5" fill="#0F2D24"/>
      <rect x="102" y="56" width="8" height="8" rx="0.5" fill="#0F2D24"/>
      <rect x="124" y="52" width="4" height="4" fill="#0F2D24"/>
      <rect x="130" y="52" width="4" height="4" fill="#0F2D24"/>
      <rect x="124" y="58" width="4" height="4" fill="#0F2D24"/>
      <rect x="130" y="64" width="4" height="4" fill="#0F2D24"/>
      {/* Phone scanning */}
      <rect x="24" y="50" width="38" height="55" rx="5" stroke="#0F2D24" strokeWidth="1.8"/>
      <line x1="24" y1="62" x2="62" y2="62" stroke="#0F2D24" strokeWidth="1.2"/>
      <line x1="24" y1="95" x2="62" y2="95" stroke="#0F2D24" strokeWidth="1.2"/>
      {/* Scan line */}
      <line x1="28" y1="78" x2="58" y2="78" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2"/>
      <circle cx="43" cy="102" r="3" stroke="#0F2D24" strokeWidth="1.2"/>
    </svg>
  ),
  "13": ( // Website Dev
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Person */}
      <circle cx="65" cy="28" r="13" stroke="#0F2D24" strokeWidth="2"/>
      <path d="M44 82c0-11.6 9.4-21 21-21h4" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      {/* Browser window */}
      <rect x="88" y="18" width="58" height="70" rx="5" stroke="#0F2D24" strokeWidth="1.8"/>
      <line x1="88" y1="32" x2="146" y2="32" stroke="#0F2D24" strokeWidth="1.3"/>
      <circle cx="96" cy="25" r="2.5" stroke="#0F2D24" strokeWidth="1.2"/>
      <circle cx="104" cy="25" r="2.5" stroke="#0F2D24" strokeWidth="1.2"/>
      <circle cx="112" cy="25" r="2.5" stroke="#0F2D24" strokeWidth="1.2"/>
      {/* Code brackets */}
      <path d="M100 50l-6 6 6 6M130 50l6 6-6 6" stroke="#0F2D24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="121" y1="46" x2="113" y2="68" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Bottom lines */}
      <line x1="96" y1="72" x2="140" y2="72" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="96" y1="78" x2="130" y2="78" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Laptop base */}
      <line x1="20" y1="108" x2="80" y2="108" stroke="#0F2D24" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 82v26h50V82" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  "14": ( // Ticketing Platform
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Server/platform */}
      <rect x="25" y="20" width="60" height="18" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <rect x="25" y="44" width="60" height="18" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <rect x="25" y="68" width="60" height="18" rx="4" stroke="#0F2D24" strokeWidth="1.8"/>
      <circle cx="74" cy="29" r="4" stroke="#0F2D24" strokeWidth="1.3"/>
      <circle cx="74" cy="53" r="4" stroke="#0F2D24" strokeWidth="1.3"/>
      <circle cx="74" cy="77" r="4" fill="#0F2D24"/>
      <line x1="33" y1="29" x2="62" y2="29" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="33" y1="53" x2="62" y2="53" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="33" y1="77" x2="62" y2="77" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Connecting line */}
      <path d="M85 57h18" stroke="#0F2D24" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
      {/* Ticket */}
      <path d="M103 38c0-3.5 2.8-6.5 6.5-6.5h32c3.5 0 6.5 3 6.5 6.5v0c-3.5 0-6.5 3-6.5 6.5s3 6.5 6.5 6.5v0c0 3.5-3 6.5-6.5 6.5h-32c-3.5 0-6.5-3-6.5-6.5v0c3.5 0 6.5-3 6.5-6.5s-3-6.5-6.5-6.5z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
      <line x1="120" y1="31.5" x2="120" y2="57.5" stroke="#0F2D24" strokeWidth="1.2" strokeDasharray="3 2"/>
      {/* Multiple tickets stacked */}
      <path d="M106 68c0-3 2.5-5.5 5.5-5.5h28c3 0 5.5 2.5 5.5 5.5" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M108 74c0-3 2.5-5.5 5.5-5.5h24c3 0 5.5 2.5 5.5 5.5" stroke="#0F2D24" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M103 80c0-3.5 2.8-6.5 6.5-6.5h32c3.5 0 6.5 3 6.5 6.5v12c0 3.5-3 6.5-6.5 6.5h-32c-3.5 0-6.5-3-6.5-6.5z" stroke="#0F2D24" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
};

/* ── Updated ServiceCard with illustration ── */
function ServiceCard({ service }: { service: (typeof SERVICES)[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(280px, 28vw, 360px)",
        height: "400px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #D4D3C0",
        borderRadius: "8px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(27,77,62,0.3)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(15,45,36,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#D4D3C0";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* ── TOP ── */}
      <div>
        {/* Number + Icon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <span style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", color: "#7A9990",
          }}>
            {service.id}
          </span>
          <div style={{
            width: "38px", height: "38px", borderRadius: "25%",
            border: "1px solid #D4D3C0", display: "flex",
            alignItems: "center", justifyContent: "center", color: "#3D5A50",
          }}>
            {service.icon}
          </div>
        </div>

        {/* Pillar */}
        <span style={{
          display: "block",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#7A9990", marginBottom: "0.4rem",
        }}>
          {service.pillar}
        </span>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "#0F2D24", lineHeight: 1.2,
          letterSpacing: "-0.01em",
          margin: "0 0 0.75rem 0",
        }}>
          {service.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "0.75rem", lineHeight: 1.65,
          color: "#3D5A50", margin: 0,
          textTransform: "uppercase", letterSpacing: "0.03em",
        }}>
          {service.description}
        </p>
      </div>

      {/* ── ILLUSTRATION ── */}
      <div style={{
        height: "130px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        marginTop: "1rem",
        opacity: 0.85,
      }}>
        {ILLUSTRATIONS[service.id] ?? null}
      </div>
    </div>
  );
}

/* ── Marquee strip ── */
function ServicesMarquee() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const posRef      = useRef(0);
  const speedRef    = useRef(0);        // current speed
  const targetSpeed = useRef(2.5);     // target speed
  const isHovered   = useRef(false);
  const CARD_WIDTH  = 396;             // card width + gap

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = SERVICES.length * CARD_WIDTH;

    const animate = () => {
      // Smoothly interpolate speed toward target
      speedRef.current += (targetSpeed.current - speedRef.current) * 0.04;

      posRef.current += speedRef.current;

      // Reset for seamless loop
      if (posRef.current >= totalWidth) {
        posRef.current -= totalWidth;
      }

      track.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => {
    isHovered.current = true;
    targetSpeed.current = 0; // slow to stop
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    targetSpeed.current = 2.5; // resume
  };

  // Duplicate for seamless loop
  const doubled = [...SERVICES, ...SERVICES];

  return (
    <div
      style={{ overflow: "hidden", width: "100%", cursor: "grab" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map((service, i) => (
          <ServiceCard key={`${service.id}-${i}`} service={service} />
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function ServicesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        backgroundColor: "#F5F4E8",
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
        overflow: "hidden",
      }}
    >
     {/* ── Top header ── */}
<div className="container-wide">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, ease: EASE }}
    style={{
      marginBottom: "clamp(3rem, 5vw, 4.5rem)",
      paddingBottom: "clamp(2rem, 3.5vw, 3rem)",
      borderBottom: "1px solid #D4D3C0",
    }}
  >
    {/* Eyebrow */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "clamp(1.25rem, 2vw, 1.75rem)",
      }}
    >
      <span className="eyebrow">What We Do</span>
    </div>

    {/* Main row – headline left, content right */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.7fr 1fr",
        alignItems: "end",
        gap: "clamp(3rem, 6vw, 8rem)",
      }}
    >
      {/* LEFT – Headline */}
      <h2
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "clamp(3.5rem, 7vw, 8rem)",
          fontWeight: 400,
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          color: "#0F2D24",
          margin: 0,
        }}
      >
        Built to
        <br />
        <em
          style={{
            fontStyle: "italic",
            color: "#1B4D3E",
          }}
        >
          perform.
        </em>
      </h2>

      {/* RIGHT – 3 columns of info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {[
          {
            number: "14",
            label: "Services",
            desc: "From brand strategy to event production – every discipline under one roof.",
          },
          {
            number: "3",
            label: "Pillars",
            desc: "Marketing. Events. Technology. Three pillars. One unified approach.",
          },
          {
            number: "∞",
            label: "Possibilities",
            desc: "Mix and match what you need. Build the engagement that works for you.",
          },
        ].map((item, i) => (
          <div key={i}>
            {/* Big number */}
            <div
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(3rem, 4vw, 4.5rem)",
                fontWeight: 400,
                color: "#0F2D24",
                lineHeight: 1,
                marginBottom: "0.35rem",
              }}
            >
              {item.number}
            </div>
            {/* Label */}
            <div
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#1B4D3E",
                marginBottom: "0.6rem",
              }}
            >
              {item.label}
            </div>
            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "#D4D3C0",
                marginBottom: "0.75rem",
              }}
            />
            {/* Desc */}
            <p
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "0.75rem",
                lineHeight: 1.65,
                color: "#7A9990",
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom row – CTA right aligned */}
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "2rem",
      }}
    >
      <Link
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          color: "#0F2D24",
          padding: "11px 22px",
          borderRadius: "4px",
          border: "1px solid #C8C7B4",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0F2D24";
          e.currentTarget.style.borderColor = "#0F2D24";
          e.currentTarget.style.color = "#F5F4E8";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "#C8C7B4";
          e.currentTarget.style.color = "#0F2D24";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        See All Services
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2 6h8M6 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  </motion.div>
</div>
      {/* ── Scrolling cards ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        style={{ paddingLeft: "clamp(1.25rem, 5vw, 4rem)" }}
      >
        <ServicesMarquee />
      </motion.div>
    </section>
  );
}