import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";
import { MentorCard, TeamMembersSection } from "../components/projects/ProjectCard";
import styled from 'styled-components';

// Styled Gallery Card Component
const GalleryCard = styled.div`
  .gallery-card {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #f2f2f2;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .gallery-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .gallery-card:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(255, 255, 255, 0.2);
  }

  .gallery-card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 16px;
  }

  .gallery-card:hover .gallery-card__content {
    transform: rotateX(0deg);
  }

  .gallery-card:hover img {
    scale: 1.1;
  }

  .gallery-card__description {
    margin: 0;
    font-size: 14px;
    color: #ffffff;
    line-height: 1.6;
    text-align: center;
    font-weight: 400;
  }
`;

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
    image: project.mentor.image,
    faculty: project.mentor.faculty || "Faculty of Computer Science & Engineering"
  } : null;

  const teamMembers = project.team || [];

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-on-surface-variant uppercase font-headline">
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-secondary">{project.id}</span>
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
              image={mentor.image}
              isMobile={isMobile}
            />
            {/* Mentor Name and Faculty Below the Card */}
            <div className="text-center mt-6">
              <h4 className="text-2xl font-headline font-bold text-primary mb-2">
                {mentor.name}
              </h4>
              <p className="text-secondary font-medium text-base">
                {mentor.faculty}
              </p>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.gallery && project.gallery.map((img, i) => (
              <GalleryCard key={i}>
                <div className="gallery-card">
                  <img alt={img.title} src={img.image} />
                  <div className="gallery-card__content">
                    <p className="gallery-card__description">{img.description || "No description available"}</p>
                  </div>
                </div>
              </GalleryCard>
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
    </div>
  );
}