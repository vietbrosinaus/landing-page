"use client";

import { useRef, useState, useTransition } from "react";
import { sendMessage } from "./actions";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [focused, setFocused] = useState(false);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendMessage(formData);
      if (result.success) {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="mt-4 max-w-md">
      <div
        className={`flex items-stretch border transition-all duration-300 ${
          focused
            ? "border-foreground shadow-[0_0_0_1px_var(--foreground)]"
            : "border-border hover:border-muted"
        }`}
      >
        <input
          name="message"
          type="text"
          required
          placeholder="Say something..."
          disabled={isPending}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted/40 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="font-mono text-xs uppercase tracking-widest px-6 bg-foreground text-background hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 disabled:pointer-events-none shrink-0"
        >
          {isPending ? (
            <span className="inline-block animate-pulse">...</span>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
      <div className="h-6 flex items-center">
        {status === "success" && (
          <p className="font-mono text-xs text-muted animate-fade-up">
            Sent — we&apos;ll read it.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-red-500 animate-fade-up">
            Failed to send. Try again.
          </p>
        )}
      </div>
    </form>
  );
}
