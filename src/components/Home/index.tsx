import React, { useEffect, useState } from 'react';
import About from '../About';
import Contact from '../Contact';
import Experience from '../Experience';
import Header from '../Header';
import Hero from '../Hero';
import Projects from '../Projects';
import Skills from '../Skills';
import { HashLink as Link } from 'react-router-hash-link';
import { PageInfoType } from '../../type';
import { getPageInfo } from '../../api';
import useInterval from '../../utils/useInterval';
import { REFRESH_TIMER } from '../../utils/constants';

import './Home.css';


type Props = {}

const Home = (props: Props) => {
  const [pageInfo, setPageInfo] = useState({} as PageInfoType);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      element?.scrollIntoView();
    }

    getPageInfo().then((res: PageInfoType) => setPageInfo(res));
  }, []);

  useInterval(async () => {
    getPageInfo().then((res: PageInfoType) => setPageInfo(res));
  }, REFRESH_TIMER);

  return (
    <div className='Home scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
      <Header />
      <section id='hero'>
        <Hero heroImage={pageInfo.heroImage} role={pageInfo.role} name={pageInfo.name} />
      </section>
      <section id="about" className='Home__Section'>
        <About backgroundInfo={pageInfo.backgroundInfo} profilePic={pageInfo.profilePic} />
      </section>
      <section id="experience" className='Home__Section'>
        <Experience />
      </section>
      <section id="skills" className='Home__Section'>
        <Skills />
      </section>
      <section id="projects" className='Home__Section'>
        <Projects />
      </section>
      <section id="contact">
        <Contact phoneNumber={pageInfo.phoneNumber} email={pageInfo.email} address={pageInfo.address} />
      </section>
      <Link smooth to='#hero'>
        <footer className='Home__Footer'>
          <div className='Home__FooterImageCont'>
            <img src="https://i.imgur.com/e2yvD6A.png" alt='' />
          </div>
        </footer>
        
      </Link>
    </div>
  )
}

export default Home;