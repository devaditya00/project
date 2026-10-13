import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name too long"),
  email: z
    .string()
    .email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(100, "Company name too long")
    .optional()
    .or(z.literal("")),
  service: z.enum([
    "brand-strategy",
    "social-media",
    "performance-marketing",
    "influencer-marketing",
    "email-marketing",
    "event-strategy",
    "event-production",
    "college-fest",
    "corporate-events",
    "brand-activation",
    "event-marketing",
    "event-ticketing",
    "website-development",
    "ticketing-platform",
    "other",
  ], "Please select a service"),  
  budget: z.enum([
    "under-50k",
    "50k-2L",
    "2L-5L",
    "5L-plus",
    "not-sure",
  ]).optional(),
  message: z
    .string()
    .min(10, "Please tell us a bit more")
    .max(2000, "Message too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;