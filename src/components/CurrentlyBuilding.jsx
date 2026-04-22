import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Active side projects. Edit this array (or migrate to Sanity as `currentWork` schema later).
const currentProjects = [
  {
    name: "Guinea Fleet Manager",
    status: "Prototype",
    statusColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    tagline: "Fleet operations for West African logistics operators",
    description:
      "Real-time vehicle tracking, trip assignment, driver management, and fuel logs. Built for operators who need low-bandwidth, offline-tolerant tooling.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    liveLink: "",
    codeLink: "https://github.com/ous-sow/guinea-fleet-manager",
  },
  {
    name: "Medora",
    status: "In development",
    statusColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    tagline: "Clinic operations, simplified",
    description:
      "Lightweight EMR and appointment workflow for small clinics. Focus on fast data entry, offline support, and local-language UI.",
    stack: ["React", "TypeScript", "React Native", "Node.js"],
    liveLink: "",
    codeLink: "https://github.com/broulaye/medora",
  },
  {
    name: "AfriService",
    status: "Live",
    statusColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    tagline: "Local-services marketplace, mobile-first",
    description:
      "Connects households with verified handymen, electricians, plumbers, and cleaners across West Africa. Mobile-first UX with WhatsApp-based communication.",
    stack: ["React Native", "TypeScript", "Node.js", "Expo"],
    liveLink: "https://www.afri-service.com/",
    codeLink: "https://github.com/broulaye/HandyAfrica",
  },
];

const ProjectRow = ({ project, index }) => {
  const { name, status, statusColor, tagline, description, stack, liveLink, codeLink } = project;

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.2, 0.6)}
      className='group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-8 hover:border-[#915EFF]/40 transition-colors'
    >
      <div className='flex flex-wrap items-start justify-between gap-3 mb-3'>
        <div>
          <h3 className='text-white text-[22px] sm:text-[24px] font-bold leading-tight'>
            {name}
          </h3>
          <p className='text-secondary text-[14px] sm:text-[15px] mt-1'>{tagline}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] sm:text-[12px] font-medium ${statusColor}`}
        >
          <span className='h-1.5 w-1.5 rounded-full bg-current' aria-hidden='true' />
          {status}
        </span>
      </div>

      <p className='text-white-100 text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px]'>
        {description}
      </p>

      <div className='mt-5 flex flex-wrap gap-2'>
        {stack.map((tech) => (
          <span
            key={`${name}-${tech}`}
            className='inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[12px] font-medium text-white/80'
          >
            {tech}
          </span>
        ))}
      </div>

      {(liveLink || codeLink) && (
        <div className='mt-5 flex flex-wrap items-center gap-4 text-[14px]'>
          {liveLink && (
            <a
              href={liveLink}
              target='_blank'
              rel='noreferrer noopener'
              className='inline-flex items-center gap-1.5 text-[#915EFF] hover:text-[#b393ff] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded'
            >
              <FiExternalLink aria-hidden='true' />
              Live demo
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target='_blank'
              rel='noreferrer noopener'
              className='inline-flex items-center gap-1.5 text-white/80 hover:text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded'
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

const CurrentlyBuilding = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Now</p>
        <h2 className={`${styles.sectionHeadText}`}>Currently building.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-3 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[28px] sm:leading-[30px]'
      >
        Side projects I'm actively shipping for West African markets. These are works in progress &mdash;
        real code, real users, real constraints (low bandwidth, intermittent connectivity, mobile-first).
      </motion.p>

      <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6'>
        {currentProjects.map((project, index) => (
          <ProjectRow key={project.name} project={project} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(CurrentlyBuilding, "currently-building");
