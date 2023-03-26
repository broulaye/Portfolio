import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceType } from '../../type';
import { urlFor } from '../../sanity';

import './ExperienceCard.css';


type Props = {
  key: string;
  experience: ExperienceType;
}

const ExperienceCard = ({ key, experience }: Props) => {
  return (
    // 
    //
    <article key={key} className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w[900px] snap-center bg-[#292929] p-10 opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-pointer overflow-hidden'>
      <motion.img 
        initial={{
          y: -100,
          opacity: 0
        }}
        transition={{
          duration: 1.2
        }}
        whileInView={{
          y: 0,
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center'
        src={urlFor(experience.companyImage).url()}
        alt=""
      />
      <div className='px-0 md:px-10'>
        <h4 className='text-4xl font-light'>{experience.jobTitle}</h4>
        <p className='font-bold text-2xl mt-1'>{experience.company}</p>
        <div className='flex space-x-2 my-2 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
          {experience.technologies.map(tech => (
            <img
              className='h-10 w-10 rounded-full object-cover'
              key={tech._id} 
              src={urlFor(tech.image).url()}
              alt=""
            />
          ))}
        </div>
        <p className='uppercase py-5 text-gray-300'> 
          {`Started work ${experience.dateStarted} - ${experience.isCurrentlyWorkingHere ? 'Current' :  `Ended ${experience.dateEnded}.`}`}
        </p>
        <ul className='list-disc space-y-4 ml-5 text-lg h-80 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
          {experience.points.map((point, i) => (<li key={i}>{point}</li>))}
        </ul>
      </div>
    </article>
  )
}

export default ExperienceCard;