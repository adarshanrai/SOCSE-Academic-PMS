import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Department");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showDropdown, setShowDropdown] = useState({
    department: false,
    semester: false
  });
  const [message, setMessage] = useState("");

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setShowDropdown({ ...showDropdown, department: false });
    showMessage(`Department filter set to: ${dept || "All"}`);
  };

  const handleSemesterSelect = (sem) => {
    setSelectedSemester(sem);
    setShowDropdown({ ...showDropdown, semester: false });
    showMessage(`Semester filter set to: ${sem || "All"}`);
  };

  const handleClearAllFilters = () => {
    setSelectedDepartment("");
    setSelectedSemester("");
    setSearch("");
    showMessage("All filters cleared!");
  };

  const handleShowAll = () => {
    handleClearAllFilters();
  };

  const departments = ["BCA", "B.Tech", "DCE"];
  const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];

  // Filter projects based on selections
  const filteredProjects = dummyProjects.filter(project => {
    let matches = true;
    if (selectedDepartment && project.department !== selectedDepartment) matches = false;
    if (selectedSemester && project.semester !== selectedSemester) matches = false;
    if (search && !project.title.toLowerCase().includes(search.toLowerCase())) matches = false;
    return matches;
  });

  // Display only 6 projects
  const displayedProjects = filteredProjects.slice(0, 6);
  const totalProjects = dummyProjects.length;
  const hasActiveFilters = selectedDepartment || selectedSemester || search;

  return (
    <div className="text-on-surface bg-background min-h-screen font-body">
      <Navbar />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Message Toast */}
        {message && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
            <div className="bg-secondary text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-sm">info</span>
              <span className="text-sm font-medium">{message}</span>
            </div>
          </div>
        )}

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
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && showMessage(`Searching for: ${search}`)}
                  />
                </div>
                <button onClick={handleShowAll} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  Show All
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Department Filter with Dropdown */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown({ ...showDropdown, department: !showDropdown.department })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${selectedDepartment ? "bg-secondary-container/20 text-secondary border border-secondary" : "bg-surface-container hover:bg-surface-container-high"}`}
              >
                <span className="text-sm font-medium">Department: {selectedDepartment || "All"}</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
              {showDropdown.department && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/20 z-10 overflow-hidden">
                  <div className="py-2">
                    <div 
                      onClick={() => handleDepartmentSelect("")}
                      className="px-4 py-2 text-sm hover:bg-surface-container cursor-pointer transition-colors"
                    >
                      All
                    </div>
                    {departments.map((dept) => (
                      <div 
                        key={dept}
                        onClick={() => handleDepartmentSelect(dept)}
                        className="px-4 py-2 text-sm hover:bg-surface-container cursor-pointer transition-colors"
                      >
                        {dept}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Semester Filter with Dropdown */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown({ ...showDropdown, semester: !showDropdown.semester })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${selectedSemester ? "bg-secondary-container/20 text-secondary border border-secondary" : "bg-surface-container hover:bg-surface-container-high"}`}
              >
                <span className="text-sm font-medium">Semester: {selectedSemester || "All"}</span>
                <span className="material-symbols-outlined text-sm">calendar_today</span>
              </div>
              {showDropdown.semester && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/20 z-10 overflow-hidden">
                  <div className="py-2">
                    <div 
                      onClick={() => handleSemesterSelect("")}
                      className="px-4 py-2 text-sm hover:bg-surface-container cursor-pointer transition-colors"
                    >
                      All
                    </div>
                    {semesters.map((sem) => (
                      <div 
                        key={sem}
                        onClick={() => handleSemesterSelect(sem)}
                        className="px-4 py-2 text-sm hover:bg-surface-container cursor-pointer transition-colors"
                      >
                        {sem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAllFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
              >
                <span className="material-symbols-outlined text-sm">clear_all</span>
                <span className="text-sm font-medium">Clear All Filters</span>
              </button>
            )}

            <div className="ml-auto flex items-center gap-2 text-on-surface-variant">
              <span className="text-sm font-medium">
                Showing {displayedProjects.length} out of {totalProjects} projects
                {hasActiveFilters && (
                  <span className="ml-2 text-secondary text-xs">
                    (Filtered)
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDepartment || selectedSemester || search) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-on-surface-variant">Active filters:</span>
              {selectedDepartment && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-xs">
                  Department: {selectedDepartment}
                  <button onClick={() => handleDepartmentSelect("")} className="ml-1 hover:bg-secondary-container/30 rounded-full">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              )}
              {selectedSemester && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-xs">
                  Semester: {selectedSemester}
                  <button onClick={() => handleSemesterSelect("")} className="ml-1 hover:bg-secondary-container/30 rounded-full">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-xs">
                  Search: {search}
                  <button onClick={() => setSearch("")} className="ml-1 hover:bg-secondary-container/30 rounded-full">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              )}
            </div>
          )}
        </section>

        {/* Project Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
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

        {/* No Results Message */}
        {displayedProjects.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
            <h3 className="text-xl font-bold text-primary mb-2">No projects found</h3>
            <p className="text-on-surface-variant">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        {displayedProjects.length > 0 && (
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
        )}
      </main>

      <BottomNav />
    </div>
  );
}