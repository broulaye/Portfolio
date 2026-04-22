import { motion } from "framer-motion";
import { BsDownload } from "react-icons/bs";

import { styles } from "../styles";
import { ComputersCanvas, LazyCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-4 sm:gap-5`}
      >
        <div className='hidden xs:flex flex-col justify-center items-center mt-5' aria-hidden='true'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className='flex-1'>
          {/* Availability chip */}
          <div className='inline-flex items-center gap-2 rounded-full border border-[#915EFF]/40 bg-[#915EFF]/10 px-3 py-1 text-[12px] sm:text-[13px] font-medium text-[#d6c6ff] mb-4'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#915EFF] opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-[#915EFF]'></span>
            </span>
            Open to remote Frontend / Full-stack roles
          </div>

          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Broulaye</span>
          </h1>

          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-2xl`}>
            <span className='font-semibold text-white'>Frontend Software Engineer</span>{" "}
            building performant, accessible<br className='sm:block hidden' />
            React &amp; TypeScript interfaces.
          </p>

          <p className='mt-4 text-secondary text-[15px] sm:text-[17px] leading-[26px] sm:leading-[30px] max-w-2xl'>
            5+ years shipping production UI &mdash; currently at{" "}
            <span className='text-white font-medium'>IBM Data &amp; AI</span>. I also ship
            real products for West Africa in fleet management, healthcare, and local services.
          </p>

          {/* CTAs */}
          <div className='mt-6 flex flex-wrap items-center gap-3 sm:gap-4'>
            <a
              href='#work'
              className='inline-flex items-center justify-center rounded-xl bg-[#915EFF] hover:bg-[#7d4cea] transition-colors px-5 sm:px-6 py-2.5 sm:py-3 text-white text-[14px] sm:text-[15px] font-semibold shadow-md shadow-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary'
            >
              View projects
            </a>
            <a
              href='/pdf/Resume.pdf'
              download=''
              className='inline-flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-colors px-5 sm:px-6 py-2.5 sm:py-3 text-white text-[14px] sm:text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary'
            >
              <BsDownload aria-hidden='true' />
              Download resume
            </a>
            <a
              href='#contact'
              className='inline-flex items-center justify-center rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-white/80 hover:text-white text-[14px] sm:text-[15px] font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded'
            >
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </div>

      <LazyCanvas className='absolute inset-0 w-full h-full' rootMargin='0px'>
        <ComputersCanvas />
      </LazyCanvas>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about' aria-label='Scroll to About section'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
