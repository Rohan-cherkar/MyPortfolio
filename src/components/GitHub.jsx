import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from 'react-icons/fa';
import { personalInfo, featuredRepos, languages } from '../data/portfolioData';
import { SectionTitle } from './About';

function LangBar({ name, percent, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} aria-hidden="true" />
      <span className="text-purple-lavender/80 text-sm w-28 flex-shrink-0">{name}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(124,58,237,0.2)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency ${percent}%`}
        />
      </div>
      <span className="text-purple-lavender/50 text-xs w-8">{percent}%</span>
    </div>
  );
}

function GitHubContribGraph() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const graphUrl = `https://ghchart.rshah.org/${personalInfo.githubUsername}`;

  return (
    <div className="relative overflow-hidden rounded-xl">
      {!loaded && !error && (
        <div className="shimmer rounded-xl h-36 w-full" aria-label="Loading GitHub contributions" />
      )}
      {!error ? (
        <img
          src={graphUrl}
          alt={`GitHub contribution graph for ${personalInfo.githubUsername}`}
          className={`w-full rounded-xl transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setError(true); }}
          style={{ filter: 'hue-rotate(260deg) saturate(1.5) brightness(1.1)' }}
        />
      ) : (
        <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(124,58,237,0.1)' }}>
          <FaGithub className="text-purple-lavender/40 mx-auto mb-2" size={32} aria-hidden="true" />
          <p className="text-purple-lavender/50 text-sm">
            GitHub activity graph loads with network access.{' '}
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-purple-neon hover:underline">
              View on GitHub →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <section id="github" className="relative py-24">
      <div
        className="blob"
        style={{ width: 300, height: 300, background: '#6D28D9', bottom: '0%', right: '5%', opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionTitle>
          {'🐙 GitHub'}
          {'GitHub Activity'}
          {'Code, contributions, and open source'}
        </SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left: Contribution graph + profile link */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-purple-light flex items-center gap-2">
                  <FaGithub aria-hidden="true" /> Contribution Activity
                </h3>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-neon hover:text-purple-light text-sm flex items-center gap-1 transition-colors"
                  aria-label="View Rohan's GitHub profile"
                >
                  @{personalInfo.githubUsername} <FaExternalLinkAlt size={10} aria-hidden="true" />
                </a>
              </div>
              <GitHubContribGraph />
            </div>

            {/* Featured Repos */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-purple-light mb-4 flex items-center gap-2">
                <FaStar aria-hidden="true" /> Featured Repositories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card-hover p-4 block group"
                    aria-label={`View ${repo.name} on GitHub`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-white text-sm group-hover:text-purple-neon transition-colors">
                        {repo.name}
                      </span>
                      <FaExternalLinkAlt className="text-purple-lavender/40 group-hover:text-purple-neon transition-colors" size={10} aria-hidden="true" />
                    </div>
                    <p className="text-purple-lavender/60 text-xs leading-relaxed">{repo.description}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: repo.color }} aria-hidden="true" />
                      <span className="text-purple-lavender/50 text-xs">{repo.language}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Languages */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-purple-light mb-5 flex items-center gap-2">
              <FaCode aria-hidden="true" /> Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <LangBar key={lang.name} {...lang} />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <h4 className="text-purple-lavender/70 text-xs font-semibold uppercase tracking-wider mb-3">
                Coding Practice
              </h4>
              <div className="space-y-2">
                {[
                  { label: 'LeetCode', note: 'DSA Practice' },
                  { label: 'GeeksForGeeks', note: 'Problem Solving' },
                  { label: 'HackerRank', note: 'Java Certified' },
                ].map((p) => (
                  <div key={p.label} className="flex items-center justify-between text-sm">
                    <span className="text-purple-lavender/70">{p.label}</span>
                    <span className="text-purple-lavender/40 text-xs">{p.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
