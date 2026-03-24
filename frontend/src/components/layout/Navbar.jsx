import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  const linkClass = (targetPath) => 
    path === targetPath
      ? "text-orange-600 dark:text-orange-400 font-bold hover:text-orange-500 transition-colors"
      : "text-slate-500 dark:text-slate-400 font-semibold hover:text-orange-500 transition-colors";

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm shadow-orange-900/5">
      <nav className="flex items-center justify-between px-6 h-16 w-full max-w-none">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
            <img alt="MSU Logo" className="w-8 h-8 object-contain" src="/logo/msu-logo.png" />
          </div>
          <span className="text-xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter font-['Manrope']">MSU-Innovates</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={path.startsWith("/projects") ? linkClass(path) : linkClass("/projects")} to="/projects">Projects</Link>
          <Link className={linkClass("/news")} to="/news">News</Link>
          <Link className={linkClass("/initiative")} to="/initiative">Make for India</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-orange-600 dark:text-orange-500 active:scale-95 transition-transform" onClick={handleFeatureClick}>notifications</button>
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs cursor-pointer" onClick={handleFeatureClick}>JD</div>
        </div>
      </nav>
    </header>
  );
}
