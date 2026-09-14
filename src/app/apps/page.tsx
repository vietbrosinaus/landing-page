import type { Metadata } from "next";
import Link from "next/link";
import AppCard from "../app-card";
import { apps } from "../apps";
import ThemeToggle from "../theme-toggle";

export const metadata: Metadata = {
  title: "All apps — vietbrosinaus",
  description: "Explore all free and open-source apps built by vietbrosinaus.",
};

export default function AppsPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-16 sm:h-[4.5rem] flex items-center justify-between">
          <Link
            href="/"
            aria-label="Viet Bros in Australia home"
            className="flex items-center gap-2.5 sm:gap-3 font-mono text-sm sm:text-base tracking-tight font-medium"
          >
            <span className="brand-mark sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">vietbrosinaus</span>
          </Link>
          <div className="flex items-center gap-5 sm:gap-9 font-mono text-xs sm:text-sm tracking-wide text-muted">
            <Link href="/" className="nav-link hover:text-foreground transition-colors duration-300">
              Home
            </Link>
            <Link href="/#contact" className="nav-link hover:text-foreground transition-colors duration-300">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="flex-1 px-6 max-w-[1200px] w-full mx-auto pt-36 sm:pt-44 pb-24 md:pb-32">
        <header className="animate-fade-up border-b border-border pb-12 md:pb-16 mb-12 md:mb-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-foreground transition-colors duration-300"
          >
            <svg
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back home
          </Link>
          <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-[-0.03em]">
            All apps
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted">
            Free, useful software made for real people. This collection will
            keep growing as we build and launch more ideas.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {apps.map((app, i) => (
            <AppCard key={app.name} app={app} index={i} />
          ))}
        </div>
      </main>

      <footer className="px-6 max-w-[1200px] w-full mx-auto py-8 border-t footer-divider">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-muted">
            vietbrosinaus &copy; {new Date().getFullYear()}
          </span>
          <p className="flex items-center gap-1 font-mono text-xs text-muted">
            <span>Made with</span>
            <span className="footer-heart" aria-hidden="true" />
            <span>in Australia</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
