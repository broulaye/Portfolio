import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.5)}
    className='rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-colors p-5 flex items-center gap-4'
  >
    <div className='w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0'>
      <img src={icon} alt={`${title} icon`} className='w-6 h-6 object-contain' />
    </div>
    <h3 className='text-white text-[15px] font-medium leading-snug'>{title}</h3>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>01 / About</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a Frontend Software Engineer with{" "}
        <span className='text-white'>5+ years</span> of production experience in{" "}
        <span className='text-white'>React</span> and{" "}
        <span className='text-white'>TypeScript</span>. At{" "}
        <span className='text-white'>IBM Data &amp; AI</span> I build interfaces used by
        enterprise customers across the watsonx platform &mdash; shipping performant, accessible
        components and collaborating across design, product, and backend teams.
        <br />
        <br />
        Outside of IBM, I ship real products for West Africa: fleet management, clinic operations,
        and local-services marketplaces. I care about performance, accessibility, clean component
        APIs, and measuring impact before optimizing.
      </motion.p>

      <div className='mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
