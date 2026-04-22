import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Edit this list to add/remove projects. No CMS dependency — what you see here
// is what ships to production.
const projects = [
  {
    name: "AfriService",
    status: "Live",
    statusTone: "live",
    tagline: "Local-services marketplace, mobile-first",
    description:
      "Connects households with verified handymen, electricians, plumbers, and cleaners across West Africa. Mobile-first UX with WhatsApp-based communication.",
    stack: ["React Native", "TypeScript", "Node.js", "Expo"],
    liveLink: "https://www.afri-service.com/",
    codeLink: "https://github.com/broulaye/HandyAfrica",
  },
  {
    name: "Medora",
    status: "In development",
    statusTone: "dev",
    tagline: "Clinic operations, simplified",
    description:
      "Lightweight EMR and appointment workflow for small clinics. Focus on fast data entry, offline support, and local-language UI.",
    stack: ["React", "TypeScript", "React Native", "Node.js"],
    liveLink: "",
    codeLink: "",
  },
  {
    name: "Guinea Fleet Manager",
    status: "Prototype",
    statusTone: "proto",
    tagline: "Fleet operations for West African logistics operators",
    description:
      "Real-time vehicle tracking, trip assignment, driver management, and fuel logs. Built for operators who need low-bandwidth, offline-tolerant tooling.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    liveLink: "",
    codeLink: "https://github.com/ous-sow/guinea-fleet-manager",
  },
];

const statusStyles = {
  live: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  dev: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  proto: "bg-sky-500/10 text-sky-300 border-sky-500/30",
};

const ProjectCard = ({ project, index }) => {
  const { name, status, statusTone, tagline, description, stack, liveLink, codeLink } = project;

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.15, 0.55)}
      className='group relative rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-white/[0.04] transition-colors p-6 sm:p-7 flex flex-col'
    >
      <div className='flex items-start justify-between gap-3 mb-3'>
        <div>
          <h3 className='text-white text-[20px] font-medium leading-tight'>{name}</h3>
          <p className='text-secondary text-[14px] mt-1'>{tagline}</p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusStyles[statusTone]}`}
        >
          <span className='h-1.5 w-1.5 rounded-full bg-current' aria-hidden='true' />
          {status}
        </span>
      </div>

      <p className='text-white-100/70 text-[14px] leading-[24px] flex-1'>{description}</p>

      <div className='mt-5 flex flex-wrap gap-1.5'>
        {stack.map((tech) => (
          <span
            key={`${name}-${tech}`}
            className='font-mono text-[11px] text-secondary px-2 py-0.5 rounded bg-white/[0.04] border border-white/5'
          >
            {tech}
          </span>
        ))}
      </div>

      {(liveLink || codeLink) && (
        <div className='mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-4 text-[13px] font-mono'>
          {liveLink && (
            <a
              href={liveLink}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${name} live demo`}
              className='inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors'
            >
              <FiExternalLink aria-hidden='true' />
              Live
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${name} source code`}
              className='inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors'
            >
              <FiGithub aria-hidden='true' />
              Source
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>03 / Projects</p>
        <h2 className={styles.sectionHeadText}>Selected work.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Following projects showcases my skills and experience through real-world examples of my
        work. Each project is briefly described with links to code repositories and live demos in
        it. It reflects my ability to solve complex problems, work with different technologies, and
        manage projects effectively.
      </motion.p>

      <div className='mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
