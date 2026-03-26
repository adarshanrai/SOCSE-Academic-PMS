import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  // Filter projects based on search
  const filteredProjects = dummyProjects.filter(project => {
    if (search && !project.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  
  const projectsPerSlide = 6;
  const totalSlides = Math.ceil(filteredProjects.length / projectsPerSlide);
  
  // Get current slide projects
  const currentProjects = filteredProjects.slice(
    currentSlide * projectsPerSlide,
    (currentSlide + 1) * projectsPerSlide
  );

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="text-on-surface bg-background min-h-screen font-body">
      <Navbar />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero & Search Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label text-[11px] font-bold tracking-wide text-secondary uppercase">
                  Make for India
                </span>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                Innovations that <br />
                <span className="text-[#fc9d00]">Shape the Future</span>
              </h2>
              <p className="font-body text-on-surface-variant text-lg max-w-xl">
                Explore our comprehensive gallery of student-led projects, research initiatives, and technological
                breakthroughs within the SOCSE ecosystem.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-4 bg-surface-container-lowest p-2 rounded-xl shadow-sm border border-outline-variant/15">
                <div className="flex items-center gap-3 px-4 flex-1 md:w-80">
                  <span className="material-symbols-outlined text-outline">search</span>
                  <input
                    className="w-full border-none focus:ring-0 bg-transparent text-body text-sm py-2"
                    placeholder="Search projects, authors..."
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentSlide(0); // Reset to first slide when searching
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Carousel */}
        <section className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                  currentSlide === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 active:scale-95"
                }`}
              >
                <span className="material-symbols-outlined text-primary">chevron_left</span>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                  currentSlide === totalSlides - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 active:scale-95"
                }`}
              >
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </button>
            </>
          )}

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
              <div key={project.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:bg-surface-bright transition-all duration-300 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={project.heroImage}
                    alt={project.title}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  
                  <h3 className="font-headline text-xl font-bold text-primary mb-3 leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-3">
                    {project.shortDescription}
                  </p>
                  <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-variant overflow-hidden">
                          <img src={member.image} className="w-full h-full object-cover" alt={member.name} />
                        </div>
                      ))}
                    </div>
                    <Link to={`/projects/${project.id}`} className="text-primary font-bold text-sm flex items-center gap-1 group/btn">
                      View Details
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {currentProjects.length === 0 && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
              <h3 className="text-xl font-bold text-primary mb-2">No projects found</h3>
              <p className="text-on-surface-variant">Try adjusting your search terms</p>
            </div>
          )}
        </section>

        {/* Carousel Indicators */}
        {totalSlides > 1 && currentProjects.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-[#fc9d00]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}