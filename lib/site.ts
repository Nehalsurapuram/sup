// Cafe-wide config: name, tagline, contact, and primary navigation.
export const site = {
  name: "Caffora",
  tagline: "Your cozy corner, every day.",
  blurb:
    "Caffora creates warm, inspiring spaces where community, creativity, and quality coffee come together.",
  address: "42 Filter Lane, Bengaluru",
  hours: "Mon–Sun · 7:00 AM – 10:00 PM",
  phone: "+91 98765 43210",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#favorites", label: "About" },
  { href: "/#visit", label: "Contact" },
] as const;
