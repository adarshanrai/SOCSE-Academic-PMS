import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";
import { MentorCard, TeamMembersSection } from "../components/projects/ProjectCard";

export default function ProjectDetails() {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  const project = dummyProjects.find(p => p.id === id) || dummyProjects[0];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-4 font-headline">Project not found</h2>
          <Link to="/projects" className="text-primary hover:text-secondary font-bold">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const mentor = project.mentor ? {
    name: project.mentor.name,
    image: project.mentor.image
  } : null;

  const teamMembers = project.team || [];

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-on-surface-variant uppercase font-headline">
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-secondary">{project.id}</span>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-xl">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${project.status === 'Ongoing' ? 'bg-secondary animate-pulse' : 'bg-primary'}`}></span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface font-headline">{project.status}</span>
            </div>
            <div className="h-4 w-[1px] bg-outline-variant/30"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary font-headline">{project.progress}% Complete</span>
              <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Section: Title & YouTube Video */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-headline font-extrabold text-on-surface leading-[1.1] tracking-tight mb-8">
              {project.title}
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-lg font-body">
              {project.fullDescription || project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags && project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">label</span> {tag}
                </span>
              ))}
            </div>
            <button className="primary-gradient text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-ambient hover:scale-[1.02] transition-transform w-fit" onClick={() => alert("Downloading Project Brief...")}>
              <span className="material-symbols-outlined">download</span>
              Download Brief
            </button>
          </div>
          <div className="lg:col-span-7 relative">
            {project.youtubeLink ? (
              <div className="aspect-video rounded-2xl overflow-hidden shadow-ambient relative bg-black border-[4px] border-surface-container-lowest">
                <iframe 
                  className="w-full h-full"
                  src={project.youtubeLink} 
                  title={`${project.title} Video`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-low shadow-ambient relative border-[4px] border-surface-container-lowest">
                <img alt="Project Feature" className="w-full h-full object-cover" src={project.heroImage} />
              </div>
            )}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-[-1]"></div>
          </div>
        </section>

        {/* Project Mentor Section */}
        {mentor && (
          <section className="mb-16">
            <h3 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-8 text-center">Project Mentor</h3>
            <MentorCard 
              name={mentor.name} 
              image={mentor.image}
              isMobile={isMobile}
            />
          </section>
        )}
        
        {/* Team Members Section */}
        <section className="mb-20">
          <TeamMembersSection 
            members={teamMembers} 
            isMobile={isMobile}
          />
        </section>

        {/* Image Gallery */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">Project Gallery</h3>
              <p className="text-on-surface-variant max-w-lg text-sm">Visual documentation of prototypes and application interfaces.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.gallery && project.gallery.map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-surface-container-lowest group relative shadow-ambient transition-all">
                <img alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img.image} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end h-1/2">
                  <span className="text-white font-bold text-lg tracking-tight truncate font-headline">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Research Section */}
        {project.methodology && project.methodology.length > 0 && (
          <section className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-ambient relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <h3 className="text-3xl font-headline font-extrabold text-on-surface mb-8">Core Methodology</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                {project.methodology.map((method) => (
                  <div key={method.id} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-container text-primary flex items-center justify-center font-bold text-lg">{method.id}</div>
                    <div>
                      <h4 className="font-bold text-lg text-on-surface mb-2 font-headline">{method.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{method.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {project.milestone && (
                <div className="bg-surface-container-low p-8 rounded-2xl self-start">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-secondary">flag</span>
                    <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Current Milestone</p>
                  </div>
                  <p className="text-2xl font-headline font-bold text-on-surface mb-4 leading-snug">{project.milestone.phase}</p>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">{project.milestone.desc}</p>
                  <button className="text-primary border border-outline-variant/15 px-6 py-3 rounded-xl font-bold text-sm hover:bg-surface-bright transition-colors w-full flex justify-center items-center gap-2" onClick={handleFeatureClick}>
                    View Project Timeline
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}