// Cafe-wide config: name, tagline, contact, and primary navigation.
export const site = {
  name: "Brew Haven",
  tagline: "Small-batch coffee & fresh bakes",
  address: "42 Filter Lane, Bengaluru",
  hours: "Mon–Sun · 7:00 AM – 10:00 PM",
  phone: "+91 98765 43210",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
] as const;
