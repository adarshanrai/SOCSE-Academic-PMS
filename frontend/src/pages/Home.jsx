import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen font-body w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Section: Make for India */}
        <section className="relative min-h-[751px] flex items-center px-6 md:px-12 py-20 overflow-hidden bg-surface">
    <div className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none hidden lg:block flex items-center justify-center" style={{ left: '70%', width: '350px', height: '300px', transform: 'translate(-50%, -50%)' }}>
  <img alt="Innovation Background" className="w-full h-full object-contain" src="/bgs/inno.gif" />
</div>
<div className="max-w-4xl relative z-10">
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
    SOCSE Initiative
  </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6">
              Make for India <br />
              <span className="text-transparent bg-clip-text primary-gradient">Start at MSU.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
              The SOCSE Academic Project Management Portal is the heartbeat of innovation at MSU. We empower researchers and students to turn bold ideas into impactful solutions for India's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/projects")} className="primary-gradient text-on-primary px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button onClick={() => navigate("/projects")} className="bg-surface-container-high text-on-surface px-8 py-4 rounded-lg font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                Explore Portal
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-12 -mt-12 mb-24 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-primary-fixed flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest">Active Innovations</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-primary">450+</span>
                <span className="material-symbols-outlined text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-secondary flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest">Research Funding</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-secondary">₹12Cr+</span>
                <span className="material-symbols-outlined text-secondary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-tertiary flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest">Patents Filed</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-tertiary">85+</span>
                <span className="material-symbols-outlined text-tertiary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-on-surface flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest">Industry Partners</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-on-surface">32</span>
                <span className="material-symbols-outlined text-on-surface mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Innovations */}
        <section className="px-6 md:px-12 py-20 bg-surface-container-low flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-on-surface">Featured Innovations</h2>
                <p className="text-on-surface-variant">Highlighting the most promising academic projects currently in development within SOCSE labs.</p>
              </div>
              <Link className="group flex items-center gap-2 text-secondary font-bold text-lg" to="/projects">
                View All Projects
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dummyProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                  <div className="h-48 overflow-hidden relative">
                    <img alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src={project.heroImage} />
                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{project.category}</span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 text-on-surface">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{project.shortDescription}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-surface-container">
                      <span className="text-xs font-bold text-on-surface-variant">Team: {project.teamSize} Core Members</span>
                      <span className="material-symbols-outlined text-secondary">trending_up</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest from MSU (News) */}
        <section className="px-6 md:px-12 py-24 bg-surface flex justify-center">
          <div className="w-full max-w-7xl">
            <h2 className="text-4xl font-extrabold tracking-tight mb-16 text-center text-on-surface">Latest from MSU</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Large Featured News */}
              <div onClick={() => navigate("/news")} className="relative group cursor-pointer overflow-hidden rounded-2xl h-[500px]">
                <img alt="University Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <span className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-2">Campus Milestone</span>
                  <h3 className="text-3xl font-extrabold text-white mb-4">MSU SOCSE signs MoU with International Tech Giant for AI Lab</h3>
                  <p className="text-slate-300 line-clamp-2 mb-6">A groundbreaking partnership aimed at fostering research in generative AI and ethical computing frameworks.</p>
                  <button className="w-fit text-white flex items-center gap-2 font-bold group">
                    Read Full Story
                    <span className="material-symbols-outlined text-orange-500">keyboard_arrow_right</span>
                  </button>
                </div>
              </div>
              {/* News List */}
              <div className="flex flex-col gap-8">
                <div onClick={() => navigate("/news")} className="flex gap-6 items-start group cursor-pointer">
                  <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img alt="Student Achievement" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=300&auto=format&fit=crop" />
                  </div>
                  <div>
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-tighter">Achievement</span>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-on-surface">Students win National Smart India Hackathon 2024</h4>
                    <p className="text-on-surface-variant text-sm mt-1">Winning the top prize in the healthcare track with their innovative wearable monitor.</p>
                  </div>
                </div>
                <div onClick={() => navigate("/news")} className="flex gap-6 items-start group cursor-pointer">
                  <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img alt="Science Lab" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=300&auto=format&fit=crop" />
                  </div>
                  <div>
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-tighter">Research</span>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-on-surface">New Patent filed for Graphene-based Water Filters</h4>
                    <p className="text-on-surface-variant text-sm mt-1">Research led by Prof. Sharma achieves 99.9% purification efficiency.</p>
                  </div>
                </div>
                <div onClick={() => navigate("/news")} className="flex gap-6 items-start group cursor-pointer">
                  <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img alt="Writing Desk" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=300&auto=format&fit=crop" />
                  </div>
                  <div>
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-tighter">Guidelines</span>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-on-surface">Summer Internship Project Guidelines Released</h4>
                    <p className="text-on-surface-variant text-sm mt-1">All final year students are requested to check the updated portal for registration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Website Contributors Section */}
        <section className="px-6 md:px-12 py-20 bg-surface-container flex justify-center">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                    <span className="text-secondary font-bold text-sm uppercase tracking-[0.2em] mb-3 block">Meet The Team</span>
                    <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Website Contributors</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-white text-3xl">terminal</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-2">Sujal Thapa</h3>
                    <p className="text-secondary font-bold text-sm uppercase tracking-wide">Backend Dev</p>
                    </div>
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-2">Bikas Prasad</h3>
                    <p className="text-secondary font-bold text-sm uppercase tracking-wide">Admin Panel Dev</p>
                    </div>
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-white text-3xl">code_blocks</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-2">Adarshan Rai</h3>
                    <p className="text-secondary font-bold text-sm uppercase tracking-wide">Frontend Dev</p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 flex justify-center">
          <div className="w-full max-w-6xl primary-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-orange-900/30">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Have an Idea that can Change India?</h2>
            <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 opacity-90">
              We provide the mentorship, funding, and infrastructure to bring your vision to life. Submit your proposal today and start your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={handleFeatureClick} className="bg-white text-primary px-10 py-5 rounded-xl font-extrabold text-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
                Submit Your Proposal
                <span className="material-symbols-outlined">send</span>
              </button>
              <button onClick={handleFeatureClick} className="bg-transparent border-2 border-white/40 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/10 active:scale-95 transition-all">
                Talk to a Mentor
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <BottomNav />
    </div>
  );
}