import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Skill from './Skill';
import { SkillType } from '../../type';
import { getSkills } from '../../api';
import { REFRESH_TIMER } from '../../utils/constants';
import useInterval from '../../utils/useInterval';

import './Skills.css';

type Props = {}

const Skills = (props: Props) => {
  const [skills, setSkills] = useState([] as SkillType[]);

  useEffect(() => {
    getSkills().then((res: SkillType[]) => setSkills(res));
  }, []);

  useInterval(async () => {
    getSkills().then((res: SkillType[]) => setSkills(res));
  }, REFRESH_TIMER);

  const skillNum = skills.length;
  return (
    <motion.div 
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      transition={{ duration: 1.5 }}
      className='Skills'
    >
      <h3 className='Skills__Title'>Skills</h3>

      <h3 className='Skills__SubTitle'>Hover over a skill for current proeficiency</h3>

      <div className='Skills__List'>
        {skills.map((skill, i) => (
          <Skill key={skill._id} directionLeft={Math.floor(skillNum/2) < i} image={skill.image} progression={skill.progress} />
        ))}
      </div>
    </motion.div>
  )
}

export default Skills;