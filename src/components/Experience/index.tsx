import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { ExperienceType } from '../../type';
import { getExperiences } from '../../api';
import useInterval from '../../utils/useInterval';
import { REFRESH_TIMER } from '../../utils/constants';

import './Experience.css';

type Props = {}

const Experience = (props: Props) => {
  const [experiences, setExperiences] = useState([] as ExperienceType[]);

  useEffect(() => {
    getExperiences().then((res: ExperienceType[]) => setExperiences(res));
  }, []);

  useInterval(async () => {
    getExperiences().then((res: ExperienceType[]) => setExperiences(res));
  }, REFRESH_TIMER);

  return (
    <motion.div 
      className='h-screen flex relative overflow-hidden flex-col text-clip md:flex-row max-w-full px-10 justify-evenly mx-auto items-center'
      initial={{
        opacity: 0
      }}
      transition={{
        duration: 1.5
      }}
      whileInView={{
        opacity: 1
      }}
    >
      <h3 className='absolute top-24 uppercase tracking=[20px] text-gray-500 text-2xl'>Experience</h3>
      <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
        {experiences.map(experience => <ExperienceCard key={experience._id} experience={experience} />)}
      </div>
    </motion.div>
  )
}

export default Experience;