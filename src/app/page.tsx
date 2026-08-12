import Image from "next/image";
import ContactForm from "./contact-form";
import KnotVortex from "./knot-vortex";
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

const support = [
  {
    number: "01",
    title: "Weekly catch-ups",
    description:
      "Regular sessions to unblock you, review progress, and work out what to build next.",
  },
  {
    number: "02",
    title: "Product & UI/UX",
    description:
      "Honest feedback to make your app easier to use, easier to explain, and ready for real people.",
  },
  {
    number: "03",
    title: "Tech direction",
    description:
      "Practical advice on your stack, architecture, infrastructure, and the trade-offs that come with them.",
  },
  {
    number: "04",
    title: "Launch support",
    description:
      "Help with deployment, domains, production setup, and the details that turn a project into a product.",
  },
];

const faqs = [
  {
    question: "Is this only for Vietnamese developers in Australia?",
    answer:
      "Nope! Most of us happen to be Vietnamese developers right now, but everyone’s welcome. VietBrosInAus is where we started—and as the community grows, we might even change the name to better reflect everyone in it.",
  },
  {
    question: "What costs can you help with?",
    answer:
      "We’ll try to cover all the infrastructure and deployment costs—from platforms like Vercel and Cloudflare to finding and registering a solid domain name. You shouldn’t have to worry about the finances; you can just focus on building something great.",
  },
  {
    question: "Can you help with AI development costs?",
    answer:
      "Yep. If your project needs AI tools or API credits to get off the ground, we may be able to help with those too.",
  },
  {
    question: "Do I need to have an app already?",
    answer:
      "Not at all. You just need a clear idea and the commitment and ability to build it. A prototype, repo, or rough proof of concept definitely helps, but it’s not required.",
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
            <span className="sm:hidden">vbia</span>
            <span className="hidden sm:inline">vietbrosinaus</span>
          </span>
          <div className="flex items-center gap-8 font-mono text-xs tracking-wide text-muted">
            <a href="#projects" className="nav-link hover:text-foreground transition-colors duration-300">
              Projects
            </a>
            <a href="#people" className="nav-link hover:text-foreground transition-colors duration-300">
              People
            </a>
            <a href="#build" className="nav-link hidden sm:inline hover:text-foreground transition-colors duration-300">
              Build
            </a>
            <a href="#contact" className="nav-link hover:text-foreground transition-colors duration-300">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section min-h-dvh flex flex-col justify-center px-6 max-w-[1200px] mx-auto relative">
        <div className="hero-copy relative z-10 pt-14">
          <h1 className="animate-fade-up text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] mb-8">
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

        <div className="hero-vortex" aria-hidden="true">
          <KnotVortex />
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
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em]">
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
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em]">
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

      {/* Build with us */}
      <section id="build" className="px-6 max-w-[1200px] mx-auto py-32">
        <div className="animate-fade-up grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-end mb-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-5">
              Build with us
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[0.95]">
              Bring the idea.
              <br />
              Build the product.
            </h2>
          </div>
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-muted">
              If you&apos;ve got an idea and the skills to build it, we&apos;ll
              help you turn it from a personal project into a production-ready
              app.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 font-mono text-sm border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Pitch your idea
              <svg
                className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 border-t border-l border-border mb-28">
          {support.map((item, i) => (
            <div
              key={item.title}
              className={`animate-fade-up delay-${i + 2} min-h-60 p-7 md:p-9 border-r border-b border-border`}
            >
              <span className="font-mono text-xs text-muted/60">
                {item.number}
              </span>
              <h3 className="text-xl font-semibold tracking-tight mt-10">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed mt-3 max-w-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="animate-fade-up border border-border bg-surface/40 p-7 md:p-12 mb-28">
          <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-8 lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4">
                Our approach
              </p>
              <h3 className="text-3xl md:text-4xl font-bold tracking-[-0.03em]">
                Free to start.
                <br />
                Built to grow.
              </h3>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                We want the apps we support to be free or freemium, so people
                can get real value from them without having to pay upfront.
              </p>
              <p>
                In exchange, builders get the space, support, and technical
                experience to ship something real. Building software is more
                accessible than ever, and we want that to mean more useful
                products are accessible to everyone too.
              </p>
              <p>
                If an app takes off, it can always add thoughtful premium
                features later to support its growth—the useful core should
                still stay open to everyone.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4">
              The details
            </p>
            <h3 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">
              FAQs
            </h3>
          </div>
          <div className="mt-12 md:mt-16 divide-y divide-border border-y border-border">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                className={`faq-item animate-fade-up delay-${i + 2} group`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 md:py-8 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg md:text-xl font-medium leading-relaxed">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative h-5 w-5 shrink-0 text-muted group-hover:text-foreground transition-colors duration-300"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-5 bg-current" />
                    <span className="faq-plus absolute left-1/2 top-0 h-5 w-px bg-current transition-transform duration-300" />
                  </span>
                </summary>
                <div className="faq-answer grid">
                  <p className="overflow-hidden max-w-3xl pb-7 md:pb-8 text-muted text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 max-w-[1200px] mx-auto py-32">
        <div className="animate-fade-up mb-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em]">
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
