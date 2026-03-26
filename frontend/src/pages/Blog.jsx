import { useState } from "react";
import Navbar from "../components/layout/Navbar";


export default function Blog() {
  const [activeTab, setActiveTab] = useState("all");
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", image: null, imagePreview: null });
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Future of AI in Education: My Thoughts",
      content: "After attending the recent AI workshop, I believe AI will revolutionize how we learn. Personalized learning paths, instant feedback, and intelligent tutoring systems are just the beginning. What are your thoughts on this?",
      author: "Adarshan Rai",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Frontend Developer",
      category: "Hot Takes",
      date: "2 hours ago",
      isTrending: true,
      isHotTake: true,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Why Open Source Matters for Students",
      content: "Started contributing to open source last semester and it's been a game-changer. The learning curve is steep but the community support is incredible. Any other students here contributing to OSS? Let's connect!",
      author: "Sujal Thapa",
      authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      role: "Backend Developer",
      category: "Opinion",
      date: "5 hours ago",
      isTrending: true,
      isHotTake: false,
      image: null
    },
    {
      id: 3,
      title: "The Overrated Hype Around AI: A Critical Look",
      content: "Unpopular opinion: AI is being overhyped. While it's powerful, we need to be realistic about its limitations. Let's discuss the ethical concerns and environmental impact of large language models.",
      author: "Dr. Meera Krishnamurthy",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      role: "AI Researcher",
      category: "Hot Takes",
      date: "1 day ago",
      isTrending: true,
      isHotTake: true,
      image: null
    },
    {
      id: 4,
      title: "Why Literature Matters in a Tech-Driven World",
      content: "As computer science students, we often neglect humanities. But reading literature builds empathy, critical thinking, and storytelling skills - essential for any technologist. Share your favorite books!",
      author: "Ananya Sharma",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Literature Enthusiast",
      category: "Literature",
      date: "2 days ago",
      isTrending: false,
      isHotTake: false,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Best Sci-Fi Books Every Developer Should Read",
      content: "From Neuromancer to Dune, science fiction has predicted so much of our tech reality. Here's my reading list for aspiring developers. What would you add?",
      author: "Vikram Singh",
      authorAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
      role: "Book Club Lead",
      category: "Recommendations",
      date: "3 days ago",
      isTrending: true,
      isHotTake: false,
      image: null
    },
    {
      id: 6,
      title: "Hot Take: JavaScript is Holding Us Back",
      content: "I know I'll get hate for this, but JavaScript's quirks make it a terrible language for large-scale applications. TypeScript is the bare minimum, but we need something better. Change my mind!",
      author: "Tech Enthusiast",
      authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Senior Dev",
      category: "Hot Takes",
      date: "4 days ago",
      isTrending: true,
      isHotTake: true,
      image: null
    },
    {
      id: 7,
      title: "The Beauty of Poetry: Finding Rhythm in Code",
      content: "There's a surprising connection between writing poetry and writing code. Both require precision, creativity, and finding elegant solutions. Anyone else feel this way?",
      author: "Poet Coder",
      authorAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
      role: "Creative Technologist",
      category: "Creative",
      date: "5 days ago",
      isTrending: false,
      isHotTake: false,
      image: "https://i.pinimg.com/736x/f7/55/f3/f755f34a9abf4d69eac68c2f84ef534c.jpg"
    },
    {
      id: 8,
      title: "Campus Life: Best Cafes for Late Night Study Sessions",
      content: "Found some hidden gems near campus that are open late and have great coffee. Perfect for those all-nighters before exams. Share your favorite spots!",
      author: "Bikas Prasad",
      authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Admin Panel Developer",
      category: "Life Hacks",
      date: "6 days ago",
      isTrending: false,
      isHotTake: false,
      image: null
    }
  ]);

  const categories = [
    { id: "all", label: "All Posts", icon: "all_inclusive" },
    { id: "Hot Takes", label: "Hot Takes", icon: "whatshot", color: "text-red-500" },
    { id: "Literature", label: "Literature", icon: "menu_book", color: "text-emerald-500" },
    { id: "Opinion", label: "Opinion", icon: "speaker_notes", color: "text-blue-500" },
    { id: "Reflection", label: "Reflection", icon: "psychology", color: "text-purple-500" },
    { id: "Recommendations", label: "Recommendations", icon: "thumb_up", color: "text-amber-500" },
    { id: "Creative", label: "Creative", icon: "palette", color: "text-pink-500" },
    { id: "Life Hacks", label: "Life Hacks", icon: "lightbulb", color: "text-yellow-500" },
    { id: "Other", label: "Other", icon: "more_horiz", color: "text-gray-500" }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const newPostObj = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: "You",
        authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "Student Contributor",
        category: newPost.category || "Other",
        date: "Just now",
        isTrending: false,
        isHotTake: newPost.category === "Hot Takes",
        image: newPost.imagePreview
      };
      setPosts([newPostObj, ...posts]);
      setNewPost({ title: "", content: "", category: "", image: null, imagePreview: null });
      setShowWriteModal(false);
    }
  };

  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  const trendingPosts = posts.filter(post => post.isTrending);
  const hotTakePosts = posts.filter(post => post.isHotTake);

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.label === category || c.id === category);
    return cat?.color || "text-secondary";
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Navbar />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#fc9d00]/10 to-secondary-container/20 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fc9d00]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fc9d00] text-white mb-6">
              <span className="material-symbols-outlined text-sm">edit_note</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight mb-4">
              The <span className="text-[#fc9d00]">SoCSE</span> Forums
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-6">
              A space for you to share thoughts, experiences, and spark meaningful discussions.
            </p>
            <button 
              onClick={() => setShowWriteModal(true)}
              className="inline-flex items-center gap-2 bg-[#fc9d00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e58e00] transition-all hover:scale-105 shadow-lg"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Share Your Voice
            </button>
          </div>
        </section>

        {/* Category Pills */}
        <section className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id === "all" ? "all" : category.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === category.label || (activeTab === "all" && category.id === "all")
                    ? "bg-[#fc9d00] text-white shadow-md scale-105"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span className={`material-symbols-outlined text-sm ${category.color || ""}`}>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Trending & Hot Takes Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Trending Section */}
          <div className="bg-gradient-to-r from-[#fc9d00]/5 to-transparent rounded-2xl p-5 border-l-4 border-[#fc9d00]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#fc9d00]">trending_up</span>
              <h2 className="text-lg font-bold text-primary">Trending Discussions</h2>
            </div>
            <div className="space-y-3">
              {trendingPosts.slice(0, 3).map(post => (
                <div key={post.id} className="group cursor-pointer hover:pl-2 transition-all">
                  <p className="text-sm font-medium group-hover:text-[#fc9d00] transition-colors">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs ${getCategoryColor(post.category)}`}>{post.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Takes Section */}
          <div className="bg-gradient-to-l from-red-500/5 to-transparent rounded-2xl p-5 border-r-4 border-red-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-red-500">whatshot</span>
              <h2 className="text-lg font-bold text-red-500">Hot Takes</h2>
            </div>
            <div className="space-y-3">
              {hotTakePosts.slice(0, 3).map(post => (
                <div key={post.id} className="group cursor-pointer hover:pl-2 transition-all">
                  <p className="text-sm font-medium group-hover:text-red-500 transition-colors">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-red-400">Hot Take</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Posts Column */}
          <div className="lg:col-span-2 space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-outline-variant/10 hover:border-[#fc9d00]/30">
                {post.image && (
                  <div className="w-full h-56 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#fc9d00]/20 group-hover:ring-[#fc9d00]/50 transition-all">
                        <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface group-hover:text-[#fc9d00] transition-colors">{post.author}</h3>
                        <p className="text-xs text-on-surface-variant">{post.role} • {post.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(post.category)} bg-${post.category === "Hot Takes" ? "red" : "secondary"}-container/10`}>
                        {post.category}
                      </span>
                      {post.isHotTake && (
                        <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">whatshot</span>
                          HOT
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h2 className="text-xl font-headline font-bold text-primary mb-3 group-hover:text-[#fc9d00] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Actions - Removed likes and comments */}
                  <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/10">
                    <button className="flex items-center gap-2 text-on-surface-variant hover:text-[#fc9d00] transition-colors group/btn">
                      <span className="material-symbols-outlined text-lg group-hover/btn:scale-110 transition-transform">share</span>
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-[#fc9d00]/5 to-secondary-container/10 rounded-2xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-3xl text-[#fc9d00]">insights</span>
                <h3 className="font-headline font-bold text-primary">Community Pulse</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Total Posts</span>
                  <span className="font-bold text-[#fc9d00]">{posts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Hot Takes</span>
                  <span className="font-bold text-red-500">{posts.filter(p => p.isHotTake).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Literature Posts</span>
                  <span className="font-bold text-emerald-500">{posts.filter(p => p.category === "Literature").length}</span>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-2xl text-[#fc9d00]">category</span>
                <h3 className="font-headline font-bold text-primary">Categories</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.filter(c => c.id !== "all").map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.label)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high text-sm hover:bg-[#fc9d00] hover:text-white transition-colors"
                  >
                    <span className={`material-symbols-outlined text-sm ${cat.color}`}>{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quote of the Day */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#fc9d00]/10 rounded-full blur-2xl"></div>
              <span className="text-4xl text-[#fc9d00]/30 font-serif absolute top-2 left-2">"</span>
              <p className="text-on-surface italic text-sm leading-relaxed mb-3 relative z-10">
                A thought shared today could spark the innovation of tomorrow. Share your voice, challenge ideas, and grow together.
              </p>
              <p className="text-xs text-secondary font-bold">— SoCSE Community</p>
            </div>
          </div>
        </section>
      </main> 
      
      {/* Write Modal with Image Upload */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowWriteModal(false)}>
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/10 p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fc9d00] text-2xl">edit_note</span>
                <h2 className="text-2xl font-headline font-bold text-primary">Share Your Voice</h2>
              </div>
              <button onClick={() => setShowWriteModal(false)} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmitPost} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Post Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-[#fc9d00] focus:ring-0 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-[#fc9d00] focus:ring-0 transition-colors"
                  required
                >
                  <option value="">Select category</option>
                  {categories.filter(c => c.id !== "all").map(cat => (
                    <option key={cat.id} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">Upload Image (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20 hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[#fc9d00]">upload</span>
                    <span className="text-sm">Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {newPost.imagePreview && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <img src={newPost.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewPost({ ...newPost, image: null, imagePreview: null })}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-2">Upload a cover image for your post (optional)</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">Your Story</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your thoughts, experiences, or discussion topic..."
                  rows="6"
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-[#fc9d00] focus:ring-0 transition-colors resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="px-6 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#fc9d00] text-white font-bold hover:bg-[#e58e00] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}