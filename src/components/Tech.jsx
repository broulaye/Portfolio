import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

/**
 * Static logo grid — no WebGL. Kept intentionally simple so this section
 * doesn't steal attention from Projects.
 */
const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>02 / Stack</p>
        <h2 className={styles.sectionHeadText}>Tools I reach for.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[16px] max-w-2xl leading-[26px]'
      >
        Day-to-day toolkit. I optimize for long-term maintainability, strong typing, and shipping
        accessible UI.
      </motion.p>

      <div className='mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3'>
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            variants={fadeIn("up", "spring", index * 0.04, 0.4)}
            className='rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors px-3 py-4 flex flex-col items-center gap-2 text-center'
          >
            <img
              src={tech.icon}
              alt={`${tech.name} logo`}
              className='w-8 h-8 object-contain'
              loading='lazy'
              decoding='async'
            />
            <span className='font-mono text-[11px] text-secondary'>{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
