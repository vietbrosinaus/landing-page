import Image from "next/image";
import type { App } from "./apps";

type AppCardProps = {
  app: App;
  index: number;
};

export default function AppCard({ app, index }: AppCardProps) {
  return (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${app.name}`}
      className={`project-card animate-fade-up delay-${(index % 5) + 2} group`}
    >
      <div className="project-preview">
        <Image
          src={app.image}
          alt={`${app.name} app interface`}
          width={1280}
          height={720}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover object-top"
        />
        {app.screenshotPatch && (
          <span
            aria-hidden="true"
            className="project-preview-patch"
            style={{ background: app.screenshotPatch }}
          />
        )}
      </div>

      <div className="project-card-copy">
        <div className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          <span>{app.category}</span>
        </div>
        <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em]">
          {app.name}
        </h3>
        <p className="text-muted mt-3 max-w-md leading-relaxed">
          {app.description}
        </p>

        <div className="mt-8 pt-5 border-t border-border flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted truncate">
            {app.domain}
          </span>
          <span className="shrink-0 inline-flex items-center gap-2 font-mono text-sm font-medium">
            Open app
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
