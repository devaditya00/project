"use server";

import { Resend } from "resend";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import {
  adminNotificationTemplate,
  userAutoReplyTemplate,
} from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactActionResult> {
  // 1. Validate server-side
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const { name, email, phone, company, service, budget, message } =
    parsed.data;

  try {
    // 2. Send notification to YOU
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_EMAIL!,
      subject: `New Enquiry — ${name} (${service.replace(/-/g, " ")})`,
      html: adminNotificationTemplate({
        name,
        email,
        phone,
        company,
        service,
        budget,
        message,
      }),
      replyTo: email,
    });

    // 3. Send auto-reply to USER
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `We received your enquiry — Roshy's Digital`,
      html: userAutoReplyTemplate({ name }),
    });

    return {
      success: true,
      message: "Your message has been sent. We'll be in touch within 24 hours.",
    };
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return {
      success: false,
      error: "Something went wrong. Please try again or WhatsApp us directly.",
    };
  }
}