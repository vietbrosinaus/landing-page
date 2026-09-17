export type App = {
  name: string;
  category: string;
  image: string;
  description: string;
  href: string;
  domain: string;
  featured?: boolean;
  screenshotPatch?: string;
};

export const apps: App[] = [
  {
    name: "Bàn Bài",
    category: "Game",
    image: "/project-screenshots/ban-bai.svg",
    description:
      "Create a private card table, invite friends by link, and play with a classic deck or Tam Quốc Sát cards.",
    href: "https://ban-bai.vercel.app",
    domain: "ban-bai.vercel.app",
  },
  {
    name: "Sanguosha Online",
    category: "Game",
    image: "/project-screenshots/sanguosha-live.jpg",
    description:
      "Play Tam Quốc Sát Nội Chiến with friends in a bilingual Vietnamese and English web experience.",
    href: "https://sanguosha-online.vercel.app",
    domain: "sanguosha-online.vercel.app",
    featured: false,
  },
  {
    name: "Karaoke Now",
    category: "Entertainment",
    image: "/project-screenshots/karaoke-live.jpg",
    screenshotPatch:
      "linear-gradient(135deg, rgb(7 8 12) 0%, rgb(10 10 17) 100%)",
    description:
      "Open a room, queue a song, and sing together from anywhere.",
    href: "https://karaokenow.vietbrosinaus.com",
    domain: "karaokenow.vietbrosinaus.com",
  },
  {
    name: "PriceCheck AU",
    category: "Shopping",
    image: "/project-screenshots/price.png",
    description:
      "Compare Australian grocery prices side by side and find the best value per unit.",
    href: "https://price-check-au.vercel.app",
    domain: "price-check-au.vercel.app",
  },
  {
    name: "Plan2Go",
    category: "Travel",
    image: "/project-screenshots/travel.png",
    description:
      "Build a realistic multi-day itinerary with travel time, opening hours, and maps.",
    href: "https://plan2go-sandy.vercel.app",
    domain: "plan2go-sandy.vercel.app",
  },
  {
    name: "What I Mean",
    category: "Productivity",
    image: "/project-screenshots/what-i-mean.jpg",
    screenshotPatch: "rgb(247 248 252)",
    description:
      "Think out loud by text or voice while a thoughtful AI helps you find what really matters.",
    href: "https://voice-debrief.vercel.app",
    domain: "voice-debrief.vercel.app",
  },
];
