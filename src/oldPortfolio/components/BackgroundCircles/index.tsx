import React from 'react';
import { motion } from 'framer-motion';
import './BackgroundCircles.css';

type Props = {}

const BackgroundCircles = (props: Props) => {
  return (
    <motion.div 
      initial={{
        opacity: 0
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 0.1],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"]
      }}
      transition={{
        duration: 2.5
      }}
      className='BackgroundCircles'
    >
      <div className='Circle'/>
      <div className='Circle'/>
      <div className='Circle'/>
      <div className='Circle'/>
      <div className='Circle'/>
    </motion.div>
  )
}

export default BackgroundCircles;