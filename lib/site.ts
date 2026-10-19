export const siteConfig = {
  name: "Gali",
  legalName: "Gali Digital",
  rc: "RC 8662494",
  url: "https://gali.com.ng",
  tagline: "The Campus Marketplace with Escrow",
  description:
    "Buy and sell safely within your university. Gali locks payments in escrow until you inspect items in person at your campus handoff spot. Nigeria's campus marketplace for verified students.",
  email: "hello@gali.com.ng",
  phone: "",
  twitter: "@abdulsoburrr",
  socials: {
    snapchat: "https://www.snapchat.com/@abdulsoburrr",
    twitter: "https://twitter.com/abdulsoburrr",
    instagram: "",
    tiktok: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },
};

export const sameAs = Object.values(siteConfig.socials).filter(Boolean) as string[];
