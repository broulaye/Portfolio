import { useState, useEffect } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import useInterval from '../utils/useInterval';
import { REFRESH_TIMER } from '../utils/constants';
import client, { urlFor } from '../sanity';

const ExperienceCard = ({ experience }) => {
  const formatDate = (date) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString([],options);
  }
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={`${formatDate(experience.dateStarted)} - ${experience.isCurrentlyWorkingHere ? 'Present' : formatDate(experience.dateEnded)}`}
      iconStyle={{ background: experience.bgColor}}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={urlFor(experience.companyImage).url()}
            alt={experience.company}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.jobTitle}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "experience"]').then((data) => {
      setExperiences(data);
    });
  }, []);

  useInterval(async () => {
    client.fetch('*[_type == "experience"]').then((data) => {
      setExperiences(data);
    });
  }, REFRESH_TIMER);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");