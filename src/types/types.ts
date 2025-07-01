interface socials{
  socials: {
    _id: string;
    name: string;
    link: string;
    icon: React.ElementType;
    color: string;
    __v: number;
    createdAt: string;
  }[];
}


// API Response interfaces
export interface ApiResponse {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  users: User[];
  socials: Social[];
  data?: socials
}

export interface Project {
  createdAt: string;
  description: string;
  githubLink: string;
  image: string;
  liveLink?: string;
  skills: string[];
  title: string;
  updatedAt: string;
  views?: number;
  __v: number;
  _id: string;
  status?: "Live" | "In Progress" | "Draft";
  featured?: boolean;
}

export interface Skill {
  createdAt: string;
  image: string;
  skillName: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Experience {
  createdAt: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibility: string;
  technologies: string[];
  image: string;
  liveLink: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface User {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

// socials maped data

export interface SocialsData {
  message?: string;
  status?: string;
  data?: socials;
}

export interface Social {
  _id: string;
  name: string;
  link: string;
  icon: React.ElementType;
  color: string;
  __v: number;
  createdAt: string;
}

export interface SocialMapedData {
  githubIcon: React.ElementType;
  linkedinIcon: React.ElementType;
  twitterIcon: React.ElementType;
  githubColor: string;
  linkedinColor: string;
  twitterColor: string;
  websiteIcon: React.ElementType;
  websiteColor: string;
}

// Mapped Data interface for the overview stats
export interface MappedData {
  projects: { name: string; value: string; change: string };
  skills: { name: string; value: string; change: string };
  experience: { name: string; value: string; change: string };
}
