"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMessage(formData: FormData) {
  const message = formData.get("message");

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { error: "Message is required." };
  }

  try {
    await resend.emails.send({
      from: "VBA Contact <onboarding@resend.dev>",
      to: "tvbbd2@gmail.com",
      subject: "New message from vietbrosinaus.com",
      text: message.trim(),
    });

    return { success: true };
  } catch {
    return { error: "Failed to send. Try again later." };
  }
}
