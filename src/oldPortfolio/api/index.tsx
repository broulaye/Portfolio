import sanityClient from '../../sanity';
import { ExperienceType, PageInfoType, ProjectType, SkillType, SocialType } from '../../type';


export const getSocials = async (): Promise<SocialType[]>  => await sanityClient.fetch(
  `
  *[_type == "social"] {
    ...,
  }
  `
);

export const getPageInfo = async (): Promise<PageInfoType>  => await sanityClient.fetch(
  `
  *[_type == "pageInfo"] {
    ...,
  }[0]
  `
);

export const getProjects = async (): Promise<ProjectType[]>  => await sanityClient.fetch(
  `
  *[_type == "project"] {
    ...,
    technologies[]->
  }
  `
);

export const getExperiences = async (): Promise<ExperienceType[]>  => await sanityClient.fetch(
  `
  *[_type == "experience"] {
    ...,
    technologies[]->
  }
  `
);

export const getSkills = async (): Promise<SkillType[]>  => await sanityClient.fetch(
  `
  *[_type == "skill"] {
    ...,
  }
  `
);