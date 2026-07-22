"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMessage(formData: FormData) {
  const message = formData.get("message");

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { error: "Message is required." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "vietbrosinaus <contact@vietbrosinaus.com>",
      to: "tvbbd2@gmail.com",
      subject: "New message from vietbrosinaus.com",
      text: message.trim(),
    });

    if (error) {
      console.error("Resend rejected the email:", error);
      return { error: "Failed to send. Try again later." };
    }

    return { success: true };
  } catch (err) {
    console.error("Resend request failed:", err);
    return { error: "Failed to send. Try again later." };
  }
}
