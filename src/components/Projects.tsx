import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import FlagshipProject from "./FlagshipProject";
import ProjectModal from "./ProjectModal";
import TechOrbit from "./TechOrbit";
import { featuredProjects, flagshipProjects, otherProjects, clientWorkProjects, type Project } from "../data/projects";

export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold tracking-tight text-graphite-bright sm:text-4xl"
        >
          Things I've built
        </motion.h2>
        <p className="prose-measure mt-4 text-graphite">
          Not tutorial projects — real systems with real engineering
          problems, presented honestly: what's built, what's in progress,
          and what's still on the roadmap.
        </p>

        <p className="mono-label mt-14 mb-6 text-xs text-graphite-dim">
          FEATURED PROJECTS
        </p>
        {flagshipProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <FlagshipProject project={project} />
          </motion.div>
        ))}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <ProjectCard project={project} onOpen={setOpenProject} large />
            </motion.div>
          ))}
        </div>

        <p className="mono-label mb-6 mt-16 text-xs text-graphite-dim">
          OTHER BUILDS
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ProjectCard project={project} onOpen={setOpenProject} />
            </motion.div>
          ))}
        </div>

        <TechOrbit />

        {clientWorkProjects.length > 0 && (
          <div className="mt-20 border-t border-obsidian-line pt-16">
            <p className="mono-label text-xs text-graphite-dim">CLIENT WORK</p>
            <p className="prose-measure mt-3 text-graphite">
              Work built for someone else's business, not my own products —
              shown separately for that reason.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {clientWorkProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ProjectCard project={project} onOpen={setOpenProject} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
