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
       image: "/images/person1.jpg",
       name: "Umar Odeh",
       skills: [""],
       location: ", Nigeria",
       bio: "",
       socialLinks: [{ platform: "LinkedIn", url: "" }],
       role: "Team Lead",
       website: "",
    },
    {
       image: "/images/person2.jpg",
       name: "Merit Edafe",
       skills: ["React", "TypeScript", "Figma", "Python"],
       location: "Delta, Nigeria",
       bio: "",
       socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com/in/edafemerit" }],
       role: "Full-Stack Developer, Designer",
       website: "https://meritedafe.vercel.app",
    },
    {
       image: "/images/person3.jpg",
       name: "Kingsley",
       skills: [""],
       location: ", Nigeria",
       bio: "",
       socialLinks: [{ platform: "LinkedIn", url: "" }],
       role: "",
       website: "",
    },
    {
       image: "/images/person4.jpg",
       name: "Gbenga",
       skills: [""],
       location: ", Nigeria",
       bio: "",
       socialLinks: [{ platform: "LinkedIn", url: "" }],
       role: "",
       website: "",
    },
]