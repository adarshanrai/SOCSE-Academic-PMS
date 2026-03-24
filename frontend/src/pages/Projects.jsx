import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Status");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    alert(`Filter selected: ${filter}`);
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
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4 leading-tight">
                Innovations that <br />
                <span className="text-secondary">Shape the Future</span>
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
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && alert(`Searching for: ${search}`)}
                  />
                </div>
                <button onClick={() => alert(`Searching for: ${search}`)} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  Explore
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div 
              onClick={() => handleFilterClick("Status")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${activeFilter === "Status" ? "bg-secondary-container/20 text-secondary border border-secondary" : "bg-surface-container hover:bg-surface-container-high"}`}
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span className="text-sm font-medium">Status</span>
            </div>
            <div
              onClick={() => handleFilterClick("Department")} 
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${activeFilter === "Department" ? "bg-secondary-container/20 text-secondary border border-secondary" : "bg-surface-container hover:bg-surface-container-high"}`}
            >
              <span className="text-sm font-medium">Department</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
            <div 
              onClick={() => handleFilterClick("Semester")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${activeFilter === "Semester" ? "bg-secondary-container/20 text-secondary border border-secondary" : "bg-surface-container hover:bg-surface-container-high"}`}
            >
              <span className="text-sm font-medium">Semester</span>
              <span className="material-symbols-outlined text-sm">calendar_today</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-on-surface-variant">
              <span className="text-sm font-medium">Showing 24 Projects</span>
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyProjects.map((project) => (
            <div key={project.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:bg-surface-bright transition-all duration-300 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={project.heroImage}
                  alt={project.title}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-on-secondary-container font-label text-[10px] font-bold uppercase tracking-wider ${project.status === 'Ongoing' ? 'bg-tertiary-container text-on-tertiary-fixed-variant' : 'bg-secondary-container'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`font-label text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${project.status === 'Ongoing' ? 'text-secondary bg-secondary-fixed/30' : 'text-tertiary-fixed-dim bg-tertiary-container'}`}>
                    {project.category}
                  </span>
                </div>
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
        </section>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {[1, 2, 3].map(num => (
            <button 
              key={num} 
              onClick={() => setPage(num)} 
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${page === num ? 'bg-primary text-on-primary' : 'hover:bg-surface-container'}`}
            >
              {num}
            </button>
          ))}
          <span className="px-2">...</span>
          <button onClick={() => setPage(8)} className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${page === 8 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container'}`}>8</button>
          <button onClick={() => setPage(p => Math.min(8, p + 1))} className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
