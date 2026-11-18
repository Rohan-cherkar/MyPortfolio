import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/portfolioData';
import { SectionTitle } from './About';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -15;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
      }}
      className="glass-card flex flex-col overflow-hidden group"
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/40 to-purple-950/60 flex-shrink-0">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          /* 
            Screenshot placeholder — replace image at:
            {project.image}
          */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: `linear-gradient(135deg, ${project.color}44, ${project.color}22)` }}
            >
              {project.id === 1 ? '✈️' : project.id === 2 ? '📈' : '🤖'}
            </div>
            <span className="text-purple-lavender/50 text-xs text-center px-4">
              Add screenshot: {project.image}
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${project.color}44, transparent)` }}
          aria-hidden="true"
        />

        {/* Top badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ background: `${project.color}cc` }}
        >
          {project.subtitle}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-purple-lavender/70 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: `${project.color}22`,
                border: `1px solid ${project.color}44`,
                color: '#C4B5FD',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-4 flex-1 justify-center"
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt size={12} aria-hidden="true" /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4 flex-1 justify-center"
              aria-label={`View ${project.title} source on GitHub`}
            >
              <FaGithub size={14} aria-hidden="true" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      {/* Blob accent */}
      <div
        className="blob"
        style={{ width: 400, height: 400, background: '#7C3AED', bottom: '5%', left: '-8%', opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionTitle>
          {'🚀 Projects'}
          {'Featured Projects'}
          {'Things I\'ve built from idea to deployment'}
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
