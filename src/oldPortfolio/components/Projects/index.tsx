import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../../api';
import { ProjectType } from '../../../type';
import { REFRESH_TIMER } from '../../utils/constants';
import useInterval from '../../utils/useInterval';
import { urlFor } from '../../../sanity';

import './Projects.css';

type Props = {}

const Projects = (props: Props) => {
  const [projects, setProjects] = useState([] as ProjectType[]);

  useEffect(() => {
    getProjects().then((res: ProjectType[]) => setProjects(res));
  }, []);

  useInterval(async () => {
    getProjects().then((res: ProjectType[]) => setProjects(res));
  }, REFRESH_TIMER);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 1.5 }}
      className='Projects'
    >
      <h3 className='Projects__Title'>Projects</h3>
      <div className='Projects_List scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
        {projects.map((project, i) => (
          <div key={i} className='Projects__Project'>
            <motion.img 
              initial={{
                y: -300,
                opacity: 0,
              }}
              transition={{ duration: 1.2 }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              src={urlFor(project?.image).url()}
            />
            <div className='Projects__ProjectTitle'>
              <h4>
                <span className=''>Case Study {i+1} of {projects.length}:</span>  {project.title}
              </h4>

              <div className='flex items-center space-x-2 justify-center'>
                {project?.technologies.map(technology => (
                  <img
                    className='h-10 w-10 rounded-full object-cover'
                    key={technology._id}
                    src={urlFor(technology.image).url()}
                    alt=''
                  />
                ))}
              </div>

              <p>{project?.summary}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='Projects__Background' />
    </motion.div>
  )
}

export default Projects;