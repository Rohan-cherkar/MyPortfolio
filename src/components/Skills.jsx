import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaCode, FaServer, FaDatabase, FaTools, FaAws, FaGit
} from 'react-icons/fa';
import {
  SiJavascript, SiTailwindcss, SiBootstrap, SiExpress, SiMongodb, SiMysql, SiPostman
} from 'react-icons/si';
import { skills } from '../data/portfolioData';
import { SectionTitle } from './About';

const iconMap = {
  FaHtml5: <FaHtml5 className="text-orange-400" />,
  FaCss3Alt: <FaCss3Alt className="text-blue-400" />,
  SiJavascript: <SiJavascript className="text-yellow-400" />,
  FaReact: <FaReact className="text-cyan-400" />,
  SiBootstrap: <SiBootstrap className="text-purple-400" />,
  SiTailwindcss: <SiTailwindcss className="text-sky-400" />,
  FaNodeJs: <FaNodeJs className="text-green-400" />,
  SiExpress: <SiExpress className="text-gray-300" />,
  FaCode: <FaCode className="text-purple-lavender" />,
  SiPassport: <span className="text-green-400 font-bold text-xs">🛂</span>,
  SiJsonwebtokens: <span className="text-pink-400 text-xs font-bold">JWT</span>,
  SiMongodb: <SiMongodb className="text-green-500" />,
  SiMysql: <SiMysql className="text-blue-500" />,
  SiMongoose: <span className="text-red-400 text-xs font-bold">🍃</span>,
  FaGit: <FaGit className="text-orange-500" />,
  FaGithub: <FaGithub className="text-white" />,
  SiVisualstudiocode: <span className="text-blue-500 font-bold text-xs">VS</span>,
  SiPostman: <SiPostman className="text-orange-400" />,
  FaAws: <FaAws className="text-yellow-500" />,
  FaServer: <FaServer className="text-purple-neon" />,
  FaDatabase: <FaDatabase className="text-purple-neon" />,
  FaTools: <FaTools className="text-purple-neon" />,
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardItem = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };
  const chipItem = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  };

  return (
    <section id="skills" className="relative py-24">
      <div className="section-container">
        <SectionTitle>
          {'⚡ Skills'}
          {'Technical Skills'}
          {'Technologies and tools I work with every day'}
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((category, ci) => (
            <motion.div
              key={category.category}
              variants={cardItem}
              className="glass-card-hover p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `linear-gradient(135deg, ${category.color}33, ${category.color}1a)`, border: `1px solid ${category.color}44` }}
                >
                  {iconMap[category.icon] || <FaCode />}
                </div>
                <h3 className="font-bold text-purple-light text-base">{category.category}</h3>
              </div>

              {/* Skill chips */}
              <motion.div
                variants={container}
                initial="hidden"
                animate={controls}
                className="flex flex-wrap gap-2.5"
              >
                {category.items.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={chipItem}
                    whileHover={{ y: -3, scale: 1.08 }}
                    className="skill-chip flex items-center gap-1.5"
                  >
                    <span className="text-sm leading-none">{iconMap[skill.icon] || null}</span>
                    <span>{skill.name}</span>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
