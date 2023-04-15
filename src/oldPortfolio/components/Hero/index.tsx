import React from 'react';
import {  Cursor, useTypewriter } from 'react-simple-typewriter';
import BackgroundCircles from '../BackgroundCircles';
import { HashLink as Link } from 'react-router-hash-link';
import { Image } from '../../../type';
import { urlFor } from '../../../sanity';

import './Hero.css';


type Props = {
  heroImage: Image;
  role: string;
  name: string;

}

const Hero = ({heroImage, role, name}: Props) => {
  const [text] = useTypewriter({
    words: [
      `Hi, The Name's ${name}`, 
      'Guy-wh0-loves-Games.tsx', 
      '<ButLovesToCodeMore />'
    ],
    loop: true,
    delaySpeed: 2000,
  })
  
  return (
    <div className='Hero'>
      <BackgroundCircles />
      { heroImage && <img className='Hero__Image' src={urlFor(heroImage).url()} alt=""/>}
      <div className='z-20'>
        <h2 className='Hero__Title'>{role}</h2>
        <h1 className='Hero__Intro'>
          <span className='mr-3'>{text}</span>
          <Cursor  cursorColor='#F7AB0A' cursorBlinking={true} />
        </h1>

        <div className='Hero__Buttons'>
          <Link smooth to='#about'>
            <button className='Hero__Button'>About</button>
          </Link>
          <Link smooth to='#experience'>
            <button className='Hero__Button'>Experience</button>
          </Link>
          <Link smooth to='#skills'>
            <button className='Hero__Button'>Skills</button>
          </Link>
          <Link smooth to='#projects'>
            <button className='Hero__Button'>Projects</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero;