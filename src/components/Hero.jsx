import { motion } from "framer-motion";
import { BsDownload } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";

import { styles } from "../styles";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const line = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
};

const Hero = () => {
  return (
    <section className='relative w-full min-h-[92vh] flex items-center'>
      {/* Subtle dot grid background, no heavy image */}
      <div
        className='absolute inset-0 bg-grid opacity-60 pointer-events-none'
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 pointer-events-none'
        aria-hidden='true'
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(127,119,221,0.12), transparent 60%)",
        }}
      />

      <div className={`relative max-w-7xl mx-auto w-full ${styles.paddingX} pt-28 pb-20`}>
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='max-w-4xl'
        >
          {/* Availability chip */}
          <motion.div variants={line}>
            <span className='inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[12px] font-mono text-[#C5C0F5]'>
              <span className='live-dot' aria-hidden='true' />
              Open to remote frontend / full-stack roles
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={line}
            className={`${styles.heroHeadText} mt-6`}
          >
            Frontend engineer <br className='hidden sm:block' />
            <span className='text-accent'>building web &amp; mobile</span> <br className='hidden sm:block' />
            interfaces that ship.
          </motion.h1>

          {/* Subhead / body */}
          <motion.p
            variants={line}
            className={`${styles.heroSubText} mt-6 max-w-2xl`}
          >
            5+ years in React and TypeScript. Currently at{" "}
            <span className='text-white'>IBM Data &amp; AI</span>, shipping enterprise UI across the
            watsonx platform. Outside IBM, I ship real products for West Africa in fleet management,
            healthcare, and local services.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={line}
            className='mt-10 flex flex-wrap items-center gap-3'
          >
            <a
              href='#projects'
              className='group inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-hover transition-colors px-5 py-3 text-primary text-[14px] font-medium'
            >
              View projects
              <HiArrowRight
                aria-hidden='true'
                className='transition-transform group-hover:translate-x-0.5'
              />
            </a>
            <a
              href='/pdf/Resume.pdf'
              download=''
              className='inline-flex items-center gap-2 rounded-md border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors px-5 py-3 text-white text-[14px] font-medium'
            >
              <BsDownload aria-hidden='true' />
              Download resume
            </a>
            <a
              href='#contact'
              className='inline-flex items-center gap-2 rounded-md px-4 py-3 text-secondary hover:text-white text-[14px] font-medium'
            >
              Get in touch
              <span aria-hidden='true'>→</span>
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.dl
            variants={line}
            className='mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-white/10 pt-8 max-w-3xl'
          >
            <div>
              <dt className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Experience
              </dt>
              <dd className='mt-1 text-white text-[18px] font-medium'>5+ years</dd>
            </div>
            <div>
              <dt className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Current
              </dt>
              <dd className='mt-1 text-white text-[18px] font-medium'>IBM Data &amp; AI</dd>
            </div>
            <div>
              <dt className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Focus
              </dt>
              <dd className='mt-1 text-white text-[18px] font-medium'>React · TS · RN</dd>
            </div>
            <div>
              <dt className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Location
              </dt>
              <dd className='mt-1 text-white text-[18px] font-medium'>Remote</dd>
            </div>
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
