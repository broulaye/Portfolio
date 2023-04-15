import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { SocialType } from '../../../type';
import { getSocials } from '../../api';
import { REFRESH_TIMER } from '../../utils/constants';
import useInterval from '../../utils/useInterval';

import './Header.css';


type Props = {}

const Header = (props: Props) => {
  const [socials, setSocials] = useState([] as SocialType[]);

  useEffect(() => {
    getSocials().then((res: SocialType[]) => setSocials(res));
  }, []);

  useInterval(async () => {
    getSocials().then((res: SocialType[]) => setSocials(res));
  }, REFRESH_TIMER);

  return (
    <header>
      <motion.div 
        className='Header__SocialIcons'
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5
        }}

        animate={{
          x: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.5
        }}
      >
        {socials.map(social => (
          <SocialIcon 
            key={social._id}
            url={social.url} 
            fgColor='gray' 
            bgColor='transparent'
          />
        ))}
      </motion.div>
      <Link smooth to='#contact'>
        <motion.div 
          className='Header__Email'
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5
          }}

          animate={{
            x: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1.5
          }}
        >
          <SocialIcon 
            className='Header__EmailIcon'
            network='email' 
            fgColor='gray' 
            bgColor='transparent'
          />
          <p>Get In Touch</p>
        </motion.div>
      </Link>
    </header>
  )
}

export default Header;