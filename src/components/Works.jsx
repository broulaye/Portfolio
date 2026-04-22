import { useState, useEffect } from 'react';
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import useInterval from '../utils/useInterval';
import { REFRESH_TIMER } from '../utils/constants';
import client, { urlFor } from '../sanity';

const ProjectCard = ({
  index,
  title,
  summary,
  technologies,
  image,
  codeLink,
}) => {
  if (!image) return null;
  
  return (
    <motion.div key={index} variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={urlFor(image).url()}
            alt={title ? `${title} screenshot` : 'Project screenshot'}
            className='w-full h-full object-cover rounded-2xl'
          />

          {codeLink && (
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <a
                href={codeLink}
                target='_blank'
                rel='noreferrer noopener'
                aria-label={title ? `Source code for ${title}` : 'Source code'}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]'
              >
                <img
                  src={github}
                  alt=''
                  aria-hidden='true'
                  className='w-1/2 h-1/2 object-contain'
                />
              </a>
            </div>
          )}
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{title}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{summary}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {technologies && technologies.map((tech) => (
            <p
              key={`${title}-${tech?.title || tech}`}
              className={`text-[14px] ${tech?.bgColor || ''}`}
            >
              #{tech?.title || tech}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const ProjectSkeleton = () => (
  <div className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full animate-pulse'>
    <div className='w-full h-[230px] rounded-2xl bg-white/5' />
    <div className='mt-5 h-6 w-2/3 rounded bg-white/10' />
    <div className='mt-3 h-4 w-full rounded bg-white/5' />
    <div className='mt-2 h-4 w-5/6 rounded bg-white/5' />
    <div className='mt-4 flex gap-2'>
      <div className='h-5 w-14 rounded bg-white/5' />
      <div className='h-5 w-16 rounded bg-white/5' />
      <div className='h-5 w-12 rounded bg-white/5' />
    </div>
  </div>
);

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(
      `
      *[_type == "project"] {
        ...,
        technologies[]->
      }
      `
    ).then((data) => {
      setProjects(data);
      setLoading(false);
    }).catch((_error) => {
      // console.error('Error fetching projects:', error);
      setProjects([]);
      setLoading(false);
    });
  }, []);

  useInterval(async () => {
    client.fetch(
      `
      *[_type == "project"] {
        ...,
        technologies[]->
      }
      `
    ).then((data) => {
      setProjects(data);
    }).catch((_error) => {
      // console.error('Error fetching projects:', error);
    });
  }, REFRESH_TIMER);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {loading && projects.length === 0 ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : projects.length === 0 ? (
          <p className='text-secondary text-[15px]'>
            Projects are loading from the CMS &mdash; if this persists, my Sanity project may be
            offline. Meanwhile, check out my {" "}
            <a
              href='https://github.com/broulaye'
              target='_blank'
              rel='noreferrer noopener'
              className='text-[#915EFF] hover:underline'
            >
              GitHub
            </a>
            .
          </p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");