import React from 'react'
import { motion } from 'framer-motion';
import { Image } from '../../../type';
import { urlFor } from '../../../sanity';

import './About.css';


type Props = {
  backgroundInfo: string;
  profilePic: Image;
}

const About = ({backgroundInfo, profilePic}: Props) => {
  return (
    <motion.div 
      className='About'
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
      <h3 className='About__Title'>About</h3>
      {profilePic && 
        <motion.img
          className='About__Image'
          initial={{
            x: -200,
            opacity: 0
          }}
          transition={{
            duration: 1.2
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          src={urlFor(profilePic).url()} 
        />
      }

      <div className='About_Background'>
        <h4> 
          Here is a <span>little</span> background
        </h4>
        <p className='scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>{backgroundInfo}</p>
      </div>

    </motion.div>
  )
}

export default About;