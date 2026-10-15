"use server";

import type {
  BookingInquiryInput,
  ContactMessageInput,
  EventInquiryInput,
  InquiryResult,
  JobApplicationInput,
  ServiceReservationInput,
} from "@/types/resort";

/*
 * Server Actions for client inquiries. Phase 3: persist with
 *   prisma.bookingInquiry.create({ data: input })
 * and notify the sales inbox. The validation and return contract stay as-is.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function referenceCode(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `SM-${prefix}-${stamp}${random}`;
}

function isBlank(value: string | undefined | null): boolean {
  return !value || value.trim().length === 0;
}

export async function submitBookingInquiry(input: BookingInquiryInput): Promise<InquiryResult> {
  if (isBlank(input.fullName)) return { ok: false, errorField: "fullName" };
  if (isBlank(input.contactValue)) return { ok: false, errorField: "contactValue" };
  if (!EMAIL_PATTERN.test(input.email)) return { ok: false, errorField: "email" };
  if (isBlank(input.checkIn) || isBlank(input.checkOut) || input.checkOut <= input.checkIn) {
    return { ok: false, errorField: "checkOut" };
  }
  if (input.adults < 1) return { ok: false, errorField: "adults" };

  return { ok: true, referenceCode: referenceCode("BK") };
}

export async function submitEventInquiry(input: EventInquiryInput): Promise<InquiryResult> {
  if (isBlank(input.fullName)) return { ok: false, errorField: "fullName" };
  if (isBlank(input.phone)) return { ok: false, errorField: "phone" };
  if (!EMAIL_PATTERN.test(input.email)) return { ok: false, errorField: "email" };
  if (isBlank(input.eventDate)) return { ok: false, errorField: "eventDate" };

  return { ok: true, referenceCode: referenceCode("EV") };
}

export async function submitServiceReservation(
  input: ServiceReservationInput,
): Promise<InquiryResult> {
  if (isBlank(input.date)) return { ok: false, errorField: "date" };
  if (isBlank(input.time)) return { ok: false, errorField: "time" };
  if (input.people < 1) return { ok: false, errorField: "people" };
  if (isBlank(input.fullName)) return { ok: false, errorField: "fullName" };
  if (isBlank(input.phone)) return { ok: false, errorField: "phone" };

  const isSports = input.kind === "PICKLEBALL" || input.kind === "TENNIS" || input.kind === "GOLF";
  return { ok: true, referenceCode: referenceCode(isSports ? "SP" : "DN") };
}

export async function submitJobApplication(input: JobApplicationInput): Promise<InquiryResult> {
  if (isBlank(input.jobSlug)) return { ok: false, errorField: "jobSlug" };
  if (isBlank(input.fullName)) return { ok: false, errorField: "fullName" };
  if (isBlank(input.phone)) return { ok: false, errorField: "phone" };
  if (!EMAIL_PATTERN.test(input.email)) return { ok: false, errorField: "email" };
  if (!isBlank(input.cvUrl) && !/^https?:\/\/\S+$/i.test(input.cvUrl.trim())) {
    return { ok: false, errorField: "cvUrl" };
  }

  return { ok: true, referenceCode: referenceCode("HR") };
}

export async function submitContactMessage(input: ContactMessageInput): Promise<InquiryResult> {
  if (isBlank(input.fullName)) return { ok: false, errorField: "fullName" };
  if (isBlank(input.phone)) return { ok: false, errorField: "phone" };
  if (!isBlank(input.email) && !EMAIL_PATTERN.test(input.email)) {
    return { ok: false, errorField: "email" };
  }
  if (isBlank(input.message)) return { ok: false, errorField: "message" };

  return { ok: true, referenceCode: referenceCode("CT") };
}
