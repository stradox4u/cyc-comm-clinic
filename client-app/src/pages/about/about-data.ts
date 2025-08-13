export type AboutProp = {
    image: string;
    name: string;
    skills: string[];
    location: string;
    bio?: string;
    socialLinks?: { platform: string; url: string }[];
    role?: string;
    website?: string;
};

export const teamArray: AboutProp[] = [
    {
       image: "/images/odeh.png",
       name: "Umar Odeh",
       skills: ["Full Stack Developer"],
       location: "Abuja, Nigeria",
       bio: "",
       socialLinks: [{ platform: "linkedIn", url: "https://www.linkedin.com/in/umar-adejoh-b8595a59" }],
       role: "Team Lead & Project Manager",
       website: "https://arcodeh.pro",
    },
    {
       image: "/images/edafe.png",
       name: "Merit Edafe",
       skills: ["React", "TypeScript", "Figma", "Python"],
       location: "Delta, Nigeria",
       bio: "",
       socialLinks: [{ platform: "linkedIn", url: "https://linkedin.com/in/edafemerit" }],
       role: "Full Stack Developer, Design",
       website: "https://meritedafe.vercel.app",
    },
    {
       image: "/images/person3.jpg",
       name: "Oghuanlan Kingsley",
       skills: ["Full Stack Developer"],
       location: "Lagos, Nigeria",
       bio: "",
       socialLinks: [
         { platform: "linkedIn", url: "https://www.linkedin.com/in/kingsley-oghuanlan-a329111a4" },
         {platform: "X", url:"https://twitter.com/meme_agbero"}
      ],
       role: "Frontend Developer",
       website: "https://kvng-dev.netlify.app",
    },
    {
       image: "/images/person4.jpg",
       name: "Gbenga Balogun",
       skills: ["Full Stack Developer"],
       location: "Osun, Nigeria",
       bio: "",
       socialLinks: [
         { platform: "linkedIn", url: "https://www.linkedin.com/in/gbenga-balogun-68500119a" },
         { platform: "X", url: "https://x.com/GbengaPeace" }
      ],
       role: "Backend Developer",
       website: "",
    },
]