import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [currentProject, setCurrentProject] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with advanced filtering and seamless checkout",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tech: ["React", "Node.js", "MongoDB"],
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "Analytics platform with real-time data visualization and machine learning insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tech: ["Python", "TensorFlow", "React"],
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Secure financial management with biometric authentication and smart notifications",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      tech: ["React Native", "Firebase", "Stripe"],
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Creative Portfolio",
      description: "Interactive showcase for digital artists with 3D galleries and AR preview",
      image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop",
      tech: ["Three.js", "WebXR", "GSAP"],
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "Task Management Suite",
      description: "Collaborative workspace with advanced project tracking and team analytics",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      github: "#",
      live: "#"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentProject + i + projects.length) % projects.length;
      visible.push({ ...projects[index], position: i });
    }
    return visible;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f5f1eb 0%, #e8ddd4 50%, #ddd0c4 100%)'
    }}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-gray-900/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/20 rounded-full blur-xl" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-thin text-gray-900 mb-6 tracking-tight">
              Your Name
            </h1>
            <div className="inline-block px-8 py-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
              <p className="text-xl md:text-2xl text-gray-800 font-light">
                Creative Developer & Designer
              </p>
            </div>
            <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences that blend innovative technology with 
              thoughtful design. Specialized in creating beautiful, functional solutions 
              that make a lasting impact.
            </p>
          </motion.div>

          {/* Project Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 tracking-wide">
              Featured Work
            </h2>

            {/* Carousel Container */}
            <div className="relative h-96 mb-8">
              <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                <AnimatePresence mode="wait">
                  {getVisibleProjects().map((project) => {
                    const isCenter = project.position === 0;
                    const isAdjacent = Math.abs(project.position) === 1;
                    const isVisible = Math.abs(project.position) <= 2;

                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={`${project.id}-${project.position}`}
                        className="absolute cursor-pointer"
                        style={{
                          zIndex: 5 - Math.abs(project.position),
                        }}
                        animate={{
                          x: project.position * 280,
                          scale: isCenter ? 1 : isAdjacent ? 0.8 : 0.6,
                          opacity: isCenter ? 1 : isAdjacent ? 0.7 : 0.4,
                          rotateY: project.position * 15,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOutCubic"
                        }}
                        onClick={() => {
                          if (!isCenter) {
                            setCurrentProject(projects.findIndex(p => p.id === project.id));
                          }
                        }}
                        onHoverStart={() => setHoveredProject(project.id)}
                        onHoverEnd={() => setHoveredProject(null)}
                        whileHover={isCenter ? { scale: 1.05 } : {}}
                      >
                        <div className={`
                          w-72 h-80 rounded-2xl overflow-hidden
                          backdrop-blur-xl bg-white/20 border border-white/30
                          shadow-2xl transition-all duration-300
                          ${hoveredProject === project.id && isCenter ? 'shadow-3xl bg-white/30' : ''}
                        `}>
                          {/* Project Image */}
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500"
                              style={{
                                transform: hoveredProject === project.id && isCenter ? 'scale(1.1)' : 'scale(1)'
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>

                          {/* Project Info */}
                          <div className="p-6 h-32">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.slice(0, 3).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded-full bg-gray-900/10 text-gray-700 backdrop-blur-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <button
                onClick={prevProject}
                className="p-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 
                         hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl
                         hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex gap-2">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProject(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentProject 
                        ? 'bg-gray-700 w-8' 
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextProject}
                className="p-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 
                         hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl
                         hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Project Details for Center Item */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-light text-gray-900">
                      {projects[currentProject].title}
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href={projects[currentProject].github}
                        className="p-2 rounded-full bg-gray-900/10 hover:bg-gray-900/20 
                                 transition-colors duration-200"
                      >
                        <Github className="w-5 h-5 text-gray-700" />
                      </a>
                      <a
                        href={projects[currentProject].live}
                        className="p-2 rounded-full bg-gray-900/10 hover:bg-gray-900/20 
                                 transition-colors duration-200"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-700" />
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {projects[currentProject].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projects[currentProject].tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-gray-900/10 text-gray-700 
                                 text-sm backdrop-blur-sm border border-gray-900/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 pb-20 px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Let's Create Something Amazing Together
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ready to bring your vision to life? I'm always excited to work on new projects 
              and collaborate with forward-thinking teams.
            </p>
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full 
                       bg-gray-900 text-white hover:bg-gray-800 
                       transition-all duration-200 shadow-lg hover:shadow-xl
                       hover:scale-105 active:scale-95"
            >
              Get In Touch
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}