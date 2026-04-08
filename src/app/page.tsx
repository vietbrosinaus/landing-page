import Image from "next/image";
import ContactForm from "./contact-form";
import ThemeToggle from "./theme-toggle";

const people = [
  {
    name: "Bach Tran",
    handle: "@Theskrtnerd",
    github: "Theskrtnerd",
    role: "xineohperif",
    avatar: "https://avatars.githubusercontent.com/u/88916722?v=4",
    site: "https://theskrtnerd.github.io",
  },
  {
    name: "Elvis Tran",
    handle: "@elvistranhere",
    github: "elvistranhere",
    role: "FDE @lyratechnologies",
    avatar: "https://avatars.githubusercontent.com/u/40386529?v=4",
    site: "https://elvis-tran.is-a.dev",
  },
  {
    name: "Minh Nguyen",
    handle: "@nguyenhoangminh1106",
    github: "nguyenhoangminh1106",
    role: "Founding FDE @Lyra | ex-Microsoft",
    avatar: "https://avatars.githubusercontent.com/u/114249185?v=4",
    site: "https://github.com/nguyenhoangminh1106",
  },
];

const projects = [
  {
    name: "karaoke-room",
    description:
      "Real-time online karaoke rooms. Join with a code, share your audio, and sing with friends.",
    href: "https://github.com/vietbrosinaus/karaoke-room",
  },
  {
    name: "noteshell",
    description: "The interactive note-taking app with agentic intelligence, built for your life.",
    href: "https://github.com/vietbrosinaus/noteshell",
  },
];

type GitHubStats = {
  publicRepos: number;
  followers: number;
  contributions: number;
};

async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const [userRes, profileRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://github.com/users/${username}/contributions`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) return null;
    const user = await userRes.json();

    let contributions = 0;
    if (profileRes.ok) {
      const html = await profileRes.text();
      const match = html.match(
        /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i
      );
      if (match) {
        contributions = parseInt(match[1].replace(/,/g, ""), 10);
      }
    }

    return {
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      contributions,
    };
  } catch {
    return null;
  }
}

export default async function Home() {
  const statsMap = new Map<string, GitHubStats | null>();
  await Promise.all(
    people.map(async (p) => {
      const stats = await getGitHubStats(p.github);
      statsMap.set(p.github, stats);
    })
  );

  return (
    <div className="min-h-dvh">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-sm tracking-tight font-medium">
            vietbrosinaus
          </span>
          <div className="flex items-center gap-8 font-mono text-xs tracking-wide text-muted">
            <a href="#projects" className="nav-link hover:text-foreground transition-colors duration-300">
              Projects
            </a>
            <a href="#people" className="nav-link hover:text-foreground transition-colors duration-300">
              People
            </a>
            <a href="#contact" className="nav-link hover:text-foreground transition-colors duration-300">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-dvh flex flex-col justify-center px-6 max-w-[1200px] mx-auto relative">
        <div className="pt-14">
          <h1 className="animate-fade-up text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] mb-8">
            <span className="hero-title">vietbros</span>
            <br />
            <span className="text-muted">inaus</span>
          </h1>
          <p className="animate-fade-up delay-2 max-w-lg text-lg md:text-xl leading-relaxed text-muted">
            We&apos;re Vietnamese devs based in Australia who believe useful
            software should be free. Everything we build is open-source and
            made for real people.
          </p>
          <div className="animate-fade-up delay-3 mt-12 flex items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 font-mono text-sm border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              See our work
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg
            className="w-5 h-5 text-muted/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 max-w-[1200px] mx-auto py-32">
        <div className="animate-fade-up mb-20">
          <span className="section-number font-mono uppercase text-xs tracking-widest text-muted">
            01
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] mt-2">
            Projects
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-border">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-row animate-fade-up delay-${i + 2} group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 py-10 first:pt-0 pl-0 hover:pl-2 transition-all duration-300`}
            >
              <div className="flex-1">
                <h3 className="font-mono text-2xl md:text-3xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="text-muted mt-2 max-w-md leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 font-mono text-sm text-muted group-hover:text-foreground transition-colors duration-300">
                  View on GitHub
                  <svg
                    className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* People */}
      <section id="people" className="px-6 max-w-[1200px] mx-auto py-32">
        <div className="animate-fade-up mb-20">
          <span className="section-number font-mono uppercase text-xs tracking-widest text-muted">
            02
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] mt-2">
            People
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {people.map((person, i) => {
            const stats = statsMap.get(person.github);
            return (
              <a
                key={person.handle}
                href={person.site}
                target="_blank"
                rel="noopener noreferrer"
                className={`person-card animate-fade-up delay-${i + 2} group block border border-border rounded-xl p-8 hover:border-muted`}
              >
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={96}
                    height={96}
                    className="rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <h3 className="text-2xl font-semibold tracking-tight mt-5 group-hover:underline underline-offset-4 decoration-1">
                    {person.name}
                  </h3>
                  <p className="font-mono text-sm text-muted mt-1">
                    {person.role}
                  </p>
                  <p className="font-mono text-xs text-muted/60 mt-1">
                    {person.handle}
                  </p>
                  {stats && (
                    <div className="flex gap-5 mt-5 pt-5 border-t border-border font-mono text-xs text-muted/80">
                      <div className="flex flex-col items-center">
                        <span className="text-foreground font-medium text-base">
                          {stats.publicRepos}
                        </span>
                        repos
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-foreground font-medium text-base">
                          {stats.contributions.toLocaleString()}
                        </span>
                        contributions
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-foreground font-medium text-base">
                          {stats.followers}
                        </span>
                        followers
                      </div>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 max-w-[1200px] mx-auto py-32">
        <div className="animate-fade-up mb-12">
          <span className="section-number font-mono uppercase text-xs tracking-widest text-muted">
            03
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] mt-2">
            Contact
          </h2>
        </div>

        <div className="animate-fade-up delay-2">
          <p className="text-muted text-lg mb-8 max-w-md">
            Find us where the code lives.
          </p>
          <a
            href="https://github.com/vietbrosinaus"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-mono text-lg hover:text-muted transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            github.com/vietbrosinaus
            <svg
              className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <p className="text-muted mt-10 max-w-md">
            Got ideas? Want in? Just want to talk? We read everything.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 max-w-[1200px] mx-auto py-8 border-t footer-divider">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-muted">
            vietbrosinaus &copy; {new Date().getFullYear()}
          </span>
          <span className="font-mono text-xs text-muted/50">
            built different
          </span>
        </div>
      </footer>
    </div>
  );
}
