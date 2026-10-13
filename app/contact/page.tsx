import ContactForm from "@/components/marketing/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Get in touch with Roshy's Digital. Tell us about your brand, event or project and we'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <main style={{ paddingTop: "70px", backgroundColor: "#F5F4E8", minHeight: "100dvh" }}>
      <ContactForm />
    </main>
  );
}