interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: 'image';
  asset: {
    _ref: string;
    _type: string;
  }
}

interface workExperience {
  name: string;
  company: string;
  desc: string;
}

export interface AboutType extends SanityBody {
  _type: 'about';
  title: string;
  description: string;
  imgUrl: Image;
}

export interface PageInfoType extends SanityBody {
  _type: 'pageInfo';
  address: string;
  backgroundInfo: string;
  email: string;
  role: string;
  heroImage: Image;
  name: string;
  phoneNumber: string;
  profilePic: Image;
}

export interface TechnologyType extends SanityBody {
  _type: 'skill';
  image: Image;
  progress: number;
  title: string;
}

export interface SkillType extends SanityBody {
  _type: 'skill';
  image: Image;
  progress: number;
  title: string;
  bgColor: string;
}

export interface SocialType extends SanityBody {
  _type: 'social';
  title: string;
  url: string;
}

export interface ProjectType extends SanityBody {
  _type: 'project';
  title: string;
  image: Image;
  linkToBuild: string;
  codeLink: string;
  summary: string;
  technologies: Technology[];
  tags: string[];
}

export interface ExperienceType extends SanityBody {
  _type: 'experience';
  company: string;
  companyImage: Image;
  dateStarted: Date;
  dateEnded: Date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
  works: workExperience[];
}