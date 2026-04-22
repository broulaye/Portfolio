import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import useInterval from '../utils/useInterval';
import { REFRESH_TIMER } from '../utils/constants';
import client, { urlFor } from '../sanity';

const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'short' };
  return new Date(date).toLocaleDateString([], options);
};

const ExperienceRow = ({ experience, index, isLast }) => {
  if (!experience) return null;
  const dateRange = `${formatDate(experience.dateStarted)} — ${
    experience.isCurrentlyWorkingHere ? 'Present' : formatDate(experience.dateEnded)
  }`;

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
      className='relative pl-8 sm:pl-10 pb-12 last:pb-0'
    >
      {/* vertical rail */}
      {!isLast && (
        <span
          className='absolute left-[11px] top-5 bottom-0 w-px bg-white/10'
          aria-hidden='true'
        />
      )}
      {/* node */}
      <span
        className='absolute left-0 top-2 w-[22px] h-[22px] rounded-full border border-white/15 bg-surface flex items-center justify-center'
        aria-hidden='true'
      >
        {experience.companyImage ? (
          <img
            src={urlFor(experience.companyImage).url()}
            alt=''
            aria-hidden='true'
            className='w-3 h-3 object-contain'
          />
        ) : (
          <span className='w-2 h-2 rounded-full bg-accent' />
        )}
      </span>

      <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>{dateRange}</p>
      <h3 className='mt-1 text-white text-[20px] font-medium leading-tight'>
        {experience.jobTitle}
      </h3>
      <p className='mt-0.5 text-accent text-[14px] font-medium'>{experience.company}</p>

      {experience.points?.length ? (
        <ul className='mt-4 space-y-2 text-white-100/75 text-[14px] leading-[24px]'>
          {experience.points.map((point, i) => (
            <li key={`${experience.jobTitle}-${i}`} className='relative pl-5'>
              <span
                className='absolute left-0 top-[10px] w-2.5 h-px bg-white/25'
                aria-hidden='true'
              />
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
};

const ExperienceSkeleton = () => (
  <div className='relative pl-8 sm:pl-10 pb-12 animate-pulse'>
    <span className='absolute left-0 top-2 w-[22px] h-[22px] rounded-full bg-white/10' />
    <div className='h-3 w-24 bg-white/5 rounded' />
    <div className='mt-2 h-5 w-2/3 bg-white/10 rounded' />
    <div className='mt-2 h-4 w-1/3 bg-white/5 rounded' />
    <div className='mt-4 space-y-2'>
      <div className='h-3 w-full bg-white/5 rounded' />
      <div className='h-3 w-11/12 bg-white/5 rounded' />
      <div className='h-3 w-5/6 bg-white/5 rounded' />
    </div>
  </div>
);

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "experience"] | order(dateStarted desc)')
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(() => {
        setExperiences([]);
        setLoading(false);
      });
  }, []);

  useInterval(async () => {
    client
      .fetch('*[_type == "experience"] | order(dateStarted desc)')
      .then((data) => {
        setExperiences(data);
      })
      .catch(() => {
        /* ignore */
      });
  }, REFRESH_TIMER);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>04 / Experience</p>
        <h2 className={styles.sectionHeadText}>Where I&apos;ve worked.</h2>
      </motion.div>

      <div className='mt-12 max-w-3xl'>
        {loading && experiences.length === 0 ? (
          <>
            <ExperienceSkeleton />
            <ExperienceSkeleton />
          </>
        ) : experiences.length === 0 ? (
          <p className='text-secondary text-[15px] leading-[26px]'>
            Experience is pulled from my CMS and isn&apos;t available right now. Meanwhile, you can
            see my full background on{' '}
            <a
              href='https://www.linkedin.com/in/broulaye/'
              target='_blank'
              rel='noreferrer noopener'
              className='text-accent hover:text-accent-hover'
            >
              LinkedIn
            </a>
            .
          </p>
        ) : (
          experiences.map((experience, index) => (
            <ExperienceRow
              key={`experience-${index}`}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
