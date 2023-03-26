import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '../../type';

import './Skill.css';
import { urlFor } from '../../sanity';


type Props = {
  key: string;
  directionLeft?: boolean;
  image: Image;
  progression: number;
}

const Skill = ({ key, directionLeft, image, progression }: Props) => {
  return (
    <div key={key} className='Skill'>
      <motion.img
        className='Skill__Logo'
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0
        }}
        whileInView={{
          x: 0,
          opacity: 1
        }}
        transition={{
          duration: 1,
        }}
        src={urlFor(image).url()}
      />
      <div className='Skill__ProgressionWrapper'>
        <div className='Skill__Progression'>
          <p>{progression}%</p>
        </div>
      </div>
      
    </div>
    
  )
}

export default Skill;