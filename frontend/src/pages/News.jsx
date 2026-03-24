import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function News() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [activeFilter, setActiveFilter] = useState("Innovation");
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing, ${email}! You will now receive news updates.`);
      setEmail("");
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased pb-24 md:pb-0 min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Search & Filter Bar */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Campus Intelligence</h2>
              <p className="text-on-surface-variant max-w-md">The pulse of innovation, research breakthroughs, and academic milestones.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input 
                  className="w-full bg-surface-container-highest border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-10 py-3 text-sm transition-all" 
                  placeholder="Search insights..." 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && alert(`Searching for news: ${search}`)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                <button onClick={() => setActiveFilter("Innovation")} className={`${activeFilter === "Innovation" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors`}>Innovation</button>
                <button onClick={() => setActiveFilter("Academic")} className={`${activeFilter === "Academic" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors`}>Academic</button>
                <button onClick={() => setActiveFilter("Events")} className={`${activeFilter === "Events" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors`}>Events</button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News Item */}
        <section className="mb-20">
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
            <div className="asymmetric-grid items-center">
              <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                <img alt="Featured Lab" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" />
                <div className="absolute top-6 left-6">
                  <span className="bg-primary px-3 py-1 rounded text-[10px] font-bold text-on-primary uppercase tracking-[0.2em]">Featured Insight</span>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest">Innovation</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant text-xs">October 24, 2023</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface leading-tight mb-6">Quantum Leap: The New Era of Computational Research in India</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-10">Our university researchers have successfully demonstrated a stable 50-qubit simulation, paving the way for unprecedented data processing capabilities in local infrastructure.</p>
                <button onClick={handleFeatureClick} className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg shadow-orange-900/10 hover:shadow-orange-900/20 active:scale-95 transition-all">
                  Read Full Story
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary News Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {/* News Item 1 */}
          <article className="flex flex-col group cursor-pointer" onClick={handleFeatureClick}>
            <div className="aspect-video mb-6 overflow-hidden rounded-xl bg-surface-container-highest">
              <img alt="Academic Meeting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">Academic</span>
              <span className="text-on-surface-variant text-[10px]">Oct 22, 2023</span>
            </div>
            <h4 className="text-xl font-headline font-bold text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2">Reimagining the Humanities in the Age of Artificial Intelligence</h4>
            <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">A cross-disciplinary symposium exploring how LLMs are changing literary analysis and historical preservation techniques.</p>
            <div className="mt-auto">
              <span className="text-secondary font-bold text-xs inline-flex items-center group/link">
                Learn More
                <span className="w-0 group-hover:w-4 h-[2px] bg-secondary ml-0 group-hover:ml-2 transition-all"></span>
              </span>
            </div>
          </article>
          {/* News Item 2 */}
          <article className="flex flex-col group border-l-4 border-primary-fixed pl-6 py-2 cursor-pointer" onClick={handleFeatureClick}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">Events</span>
              <span className="text-on-surface-variant text-[10px]">Oct 19, 2023</span>
            </div>
            <h4 className="text-xl font-headline font-bold text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2">Annual Innovation Expo 2024: Call for Student Prototypes</h4>
            <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">Showcase your hardware, software, or social innovation at our biggest annual event. Registration for student teams is now open.</p>
            <div className="mt-auto">
              <span className="text-secondary font-bold text-xs inline-flex items-center group/link">
                Registration Details
                <span className="w-0 group-hover:w-4 h-[2px] bg-secondary ml-0 group-hover:ml-2 transition-all"></span>
              </span>
            </div>
          </article>
          {/* News Item 3 */}
          <article className="flex flex-col group cursor-pointer" onClick={handleFeatureClick}>
            <div className="aspect-video mb-6 overflow-hidden rounded-xl bg-surface-container-highest">
              <img alt="Graduation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">Innovation</span>
              <span className="text-on-surface-variant text-[10px]">Oct 15, 2023</span>
            </div>
            <h4 className="text-xl font-headline font-bold text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2">Smart City Connectivity: The 5G Testbed Deployment Success</h4>
            <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">In collaboration with industrial partners, our campus is now a fully functional live lab for smart traffic and utility systems.</p>
            <div className="mt-auto">
              <span className="text-secondary font-bold text-xs inline-flex items-center group/link">
                Case Study
                <span className="w-0 group-hover:w-4 h-[2px] bg-secondary ml-0 group-hover:ml-2 transition-all"></span>
              </span>
            </div>
          </article>
        </section>

        {/* Newsletter Subscription Box */}
        <section className="relative rounded-2xl bg-surface-container-low overflow-hidden mt-10 mb-20 shadow-sm border border-outline-variant/5">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
          </div>
          <div className="relative px-8 py-16 md:px-20 text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Stay Connected</span>
            <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface mb-6">The future of research, delivered to your inbox.</h2>
            <p className="text-on-surface-variant mb-10 text-lg">Join 15,000+ scholars and innovators receiving our bi-weekly digest of breakthroughs and opportunities.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                className="flex-grow bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-6 py-4 rounded-lg text-on-surface placeholder:text-outline transition-all" 
                placeholder="academic@university.edu" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary-dim transition-colors shadow-lg active:scale-95 whitespace-nowrap" type="submit">Subscribe Now</button>
            </form>
            <p className="mt-6 text-[10px] text-outline uppercase tracking-widest font-semibold italic">We respect your privacy. No spam, ever.</p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
