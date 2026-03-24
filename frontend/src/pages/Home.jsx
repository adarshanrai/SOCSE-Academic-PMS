import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { dummyProjects } from "../data/dummyDetails";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  // Carousel images
  const carouselImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen font-body w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Section: Make for India - Centered with Carousel Background */}
        <section className="relative min-h-[751px] flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
          {/* Background Carousel */}
          <div className="absolute inset-0 z-0">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={image}
                />
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className="max-w-4xl relative z-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6 mx-auto">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              SOCSE Initiative
            </div>
           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-headline">
  <span className="text-[#fc9d00]">Make for India</span> <br />
  <span className="text-white">Start at MSU.</span>
</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
              The SOCSE Academic Project Management Portal is the heartbeat of innovation at MSU. We empower researchers and students to turn bold ideas into impactful solutions for India's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/projects")} className="bg-[#fc9d00] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-ambient active:scale-95 transition-all flex items-center justify-center gap-2">
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button onClick={() => navigate("/projects")} className="bg-transparent border-2 border-white/60 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2">
                Explore Portal
              </button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-[#fc9d00]"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-12 -mt-12 mb-24 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-ambient flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest font-headline">Active Innovations</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-primary font-headline">450+</span>
                <span className="material-symbols-outlined text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-ambient flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest font-headline">Research Funding</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-secondary font-headline">₹12Cr+</span>
                <span className="material-symbols-outlined text-secondary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-ambient flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest font-headline">Patents Filed</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-tertiary font-headline">85+</span>
                <span className="material-symbols-outlined text-tertiary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-ambient flex flex-col gap-2">
              <span className="text-on-surface-variant font-semibold text-sm uppercase tracking-widest font-headline">Industry Partners</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-on-surface font-headline">32</span>
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
                <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-primary font-headline">Featured Innovations</h2>
                <p className="text-on-surface-variant font-body">Highlighting the most promising academic projects currently in development within SOCSE labs.</p>
              </div>
              <Link className="group flex items-center gap-2 text-secondary font-bold text-lg" to="/projects">
                View All Projects
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dummyProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="bg-surface-container-lowest rounded-xl shadow-ambient group hover:shadow-lg hover:bg-surface-bright transition-all cursor-pointer flex flex-col" onClick={() => navigate(`/projects/${project.id}`)}>
                  <div className="h-48 overflow-hidden relative rounded-t-xl">
                    <img alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src={project.heroImage} />
                    <span className="absolute top-4 left-4 bg-secondary text-on-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{project.category}</span>
                  </div>
                  <div className="p-10 pb-0">
                    <h3 className="text-xl font-bold mb-3 text-primary font-headline">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm line-clamp-2 font-body">{project.shortDescription}</p>
                  </div>
                  <div className="p-10 pt-6 mt-auto flex items-center justify-between">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest font-headline">Team: {project.teamSize} Core Members</span>
                    <span className="material-symbols-outlined text-secondary">trending_up</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest from MSU (News) */}
        <section className="px-6 md:px-12 py-24 bg-surface flex justify-center">
          <div className="w-full max-w-7xl">
            <h2 className="text-4xl font-extrabold tracking-tight mb-16 text-center text-primary font-headline">Latest from MSU</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Large Featured News */}
              <div onClick={() => navigate("/news")} className="relative group cursor-pointer overflow-hidden rounded-2xl h-[500px]">
                <img alt="University Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001e40]/90 via-[#001e40]/30 to-transparent flex flex-col justify-end p-10">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 font-headline">Campus Milestone</span>
                  <h3 className="text-3xl font-extrabold text-white mb-4 font-headline">MSU SOCSE signs MoU with International Tech Giant for AI Lab</h3>
                  <p className="text-inverse-primary line-clamp-2 mb-6 font-body">A groundbreaking partnership aimed at fostering research in generative AI and ethical computing frameworks.</p>
                  <button className="w-fit text-white flex items-center gap-2 font-bold group">
                    Read Full Story
                    <span className="material-symbols-outlined text-secondary">keyboard_arrow_right</span>
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
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-on-surface font-headline">Students win National Smart India Hackathon 2024</h4>
                    <p className="text-on-surface-variant text-sm mt-1 font-body">Winning the top prize in the healthcare track with their innovative wearable monitor.</p>
                  </div>
                </div>
                <div onClick={() => navigate("/news")} className="flex gap-6 items-start group cursor-pointer">
                  <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img alt="Science Lab" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=300&auto=format&fit=crop" />
                  </div>
                  <div>
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-tighter">Research</span>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-on-surface font-headline">New Patent filed for Graphene-based Water Filters</h4>
                    <p className="text-on-surface-variant text-sm mt-1 font-body">Research led by Prof. Sharma achieves 99.9% purification efficiency.</p>
                  </div>
                </div>
                <div onClick={() => navigate("/news")} className="flex gap-6 items-start group cursor-pointer">
                  <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img alt="Writing Desk" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=300&auto=format&fit=crop" />
                  </div>
                  <div>
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-tighter">Guidelines</span>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-on-surface font-headline">Summer Internship Project Guidelines Released</h4>
                    <p className="text-on-surface-variant text-sm mt-1 font-body">All final year students are requested to check the updated portal for registration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Website Contributors Section */}
        <section className="px-6 md:px-12 py-20 bg-surface flex justify-center">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                    <span className="text-secondary font-bold text-sm uppercase tracking-[0.2em] mb-3 block">Meet The Team</span>
                    <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Website Contributors</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-surface-container-low p-8 rounded-2xl shadow-ambient text-center hover:shadow-lg hover:bg-surface-bright transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-white text-3xl">terminal</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-2">Sujal Thapa</h3>
                    <p className="text-secondary font-bold text-sm uppercase tracking-wide">Backend Dev</p>
                    </div>
                    <div className="bg-surface-container-low p-8 rounded-2xl shadow-ambient text-center hover:shadow-lg hover:bg-surface-bright transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-2">Bikas Prasad</h3>
                    <p className="text-secondary font-bold text-sm uppercase tracking-wide">Admin Panel Dev</p>
                    </div>
                    <div className="bg-surface-container-low p-8 rounded-2xl shadow-ambient text-center hover:shadow-lg hover:bg-surface-bright transition-all duration-300">
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
  <div className="w-full max-w-6xl primary-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary#fc9d00/10 rounded-full blur-3xl"></div>
    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
    <h2 className="text-4xl md:text-5xl font-extrabold text-[#fc9d00] mb-6 relative z-10 font-headline">Have an Idea that can Change India?</h2>
    <p className="text-primary-fixed text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 opacity-90 font-body">
      We provide the mentorship, funding, and infrastructure to bring your vision to life. Submit your proposal today and start your journey.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
      <button onClick={handleFeatureClick} className="bg-[#fc9d00] text-white px-10 py-5 rounded-xl font-extrabold text-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
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