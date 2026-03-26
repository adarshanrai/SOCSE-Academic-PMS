import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function News() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
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

  // Sample news data
  const allNews = [
    {
      id: 1,
      title: "Quantum Leap: The New Era of Computational Research in India",
      category: "Innovation",
      date: "October 24, 2023",
      readTime: "5 min read",
      description: "Our university researchers have successfully demonstrated a stable 50-qubit simulation, paving the way for unprecedented data processing capabilities in local infrastructure. This breakthrough positions India at the forefront of quantum computing research globally.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
      isFeatured: true
    },
    {
      id: 2,
      title: "Reimagining the Humanities in the Age of Artificial Intelligence",
      category: "Academic",
      date: "October 22, 2023",
      readTime: "4 min read",
      description: "A cross-disciplinary symposium exploring how LLMs are changing literary analysis and historical preservation techniques. Experts from around the world gathered to discuss the future of humanities education.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 3,
      title: "Annual Innovation Expo 2024: Call for Student Prototypes",
      category: "Events",
      date: "October 19, 2023",
      readTime: "3 min read",
      description: "Showcase your hardware, software, or social innovation at our biggest annual event. Registration for student teams is now open. Prize pool worth ₹10 lakhs awaits winners.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 4,
      title: "Smart City Connectivity: The 5G Testbed Deployment Success",
      category: "Innovation",
      date: "October 15, 2023",
      readTime: "6 min read",
      description: "In collaboration with industrial partners, our campus is now a fully functional live lab for smart traffic and utility systems. This marks a major milestone in smart city research.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 5,
      title: "Breakthrough in Sustainable Energy Storage Solutions",
      category: "Research",
      date: "October 12, 2023",
      readTime: "4 min read",
      description: "Research team develops new graphene-based battery technology that charges 10x faster and lasts 3x longer than current lithium-ion batteries.",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 6,
      title: "International Conference on AI Ethics and Governance",
      category: "Events",
      date: "October 8, 2023",
      readTime: "3 min read",
      description: "MSU hosts global experts to discuss ethical frameworks for responsible AI development and deployment in emerging economies.",
      image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 7,
      title: "New Research Grants Announced for Doctoral Students",
      category: "Academic",
      date: "October 5, 2023",
      readTime: "2 min read",
      description: "MSU announces 25 new research fellowships for PhD candidates working on sustainable development goals.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 8,
      title: "AI-Powered Healthcare Diagnostics: A New Frontier",
      category: "Research",
      date: "October 1, 2023",
      readTime: "5 min read",
      description: "Research collaboration with leading hospitals yields breakthrough in early cancer detection using machine learning algorithms.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    },
    {
      id: 9,
      title: "Annual Tech Summit 2024 Registration Now Open",
      category: "Events",
      date: "September 28, 2023",
      readTime: "2 min read",
      description: "Join industry leaders and innovators at the largest tech summit in Western India. Early bird registration ends November 15.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
      isFeatured: false
    }
  ];

  // Filter news based on search and category
  const filteredNews = allNews.filter(news => {
    const matchesSearch = search === "" || 
      news.title.toLowerCase().includes(search.toLowerCase()) ||
      news.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeFilter === "All" || news.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Get featured news (first item when "All" is selected, otherwise first of filtered)
  const featuredNews = activeFilter === "All" 
    ? filteredNews.find(news => news.isFeatured) || filteredNews[0]
    : filteredNews[0];

  // Get remaining news (excluding featured)
  const remainingNews = activeFilter === "All"
    ? filteredNews.filter(news => news.id !== featuredNews?.id)
    : filteredNews.slice(1);

  const filters = ["All", "Innovation", "Academic", "Events", "Research"];

  return (
    <div className="bg-surface font-body text-on-surface antialiased pb-24 md:pb-0 min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label text-[11px] font-bold tracking-wide text-secondary uppercase">
              Stay Updated
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-primary mb-4">
            Campus Intelligence
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            The pulse of innovation, research breakthroughs, and academic milestones at SOCSE.
          </p>
        </section>

        {/* Search & Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="relative flex-grow max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
                search
              </span>
              <input
                className="w-full bg-surface-container-high border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl pl-12 pr-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 transition-colors"
                placeholder="Search articles, events, or innovations..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-[#fc9d00] text-white shadow-md"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article - Only show if there are results */}
        {filteredNews.length > 0 && featuredNews && (
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg border border-outline-variant/10">
              <div className="relative h-80 lg:h-full min-h-[400px]">
                <img
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                  src={featuredNews.image}
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#fc9d00] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-secondary font-bold text-sm uppercase tracking-wider">
                    {featuredNews.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant text-sm">{featuredNews.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4 leading-tight">
                  {featuredNews.title}
                </h2>
                <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                  {featuredNews.description}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleFeatureClick}
                    className="bg-[#fc9d00] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e58e00] transition-colors shadow-md"
                  >
                    Read Full Story
                  </button>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-sm">{featuredNews.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent News Grid */}
        {remainingNews.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary">
                {activeFilter === "All" ? "Recent Highlights" : `More ${activeFilter} Stories`}
              </h3>
              <button onClick={handleFeatureClick} className="text-secondary font-medium hover:text-[#fc9d00] transition-colors flex items-center gap-1">
                View All
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingNews.map((news) => (
                <div key={news.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant/10">
                  <div className="h-52 overflow-hidden">
                    <img
                      alt={news.title}
                      className="w-full h-full object-cover"
                      src={news.image}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-secondary-container/20 text-secondary text-xs font-bold px-2 py-1 rounded-full">
                        {news.category}
                      </span>
                      <span className="text-on-surface-variant text-xs">{news.date}</span>
                    </div>
                    <h4 className="text-xl font-headline font-bold text-primary mb-2 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">
                      {news.description}
                    </p>
                    <button onClick={handleFeatureClick} className="text-secondary font-medium text-sm hover:text-[#fc9d00] transition-colors flex items-center gap-1">
                      Learn More
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
            <h3 className="text-xl font-bold text-primary mb-2">No articles found</h3>
            <p className="text-on-surface-variant">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Newsletter Subscription Section */}
        <section className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fc9d00]/10 to-secondary-container/20"></div>
          <div className="relative px-8 py-16 md:px-16 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fc9d00]/10 mb-6">
              <span className="material-symbols-outlined text-3xl text-[#fc9d00]">mail</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              The future of research, delivered to your inbox.
            </h2>
            <p className="text-on-surface-variant mb-8 text-lg">
              Join 15,000+ scholars and innovators receiving our bi-weekly digest of breakthroughs and opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                className="flex-grow bg-surface-container-lowest border border-outline-variant/20 focus:border-secondary focus:ring-0 px-6 py-4 rounded-xl text-on-surface placeholder:text-on-surface-variant/60 transition-all"
                placeholder="your.email@university.edu"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="bg-[#fc9d00] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#e58e00] transition-colors shadow-md whitespace-nowrap"
                type="submit"
              >
                Subscribe Now
              </button>
            </form>
            <p className="mt-6 text-xs text-on-surface-variant/60 uppercase tracking-wider">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}