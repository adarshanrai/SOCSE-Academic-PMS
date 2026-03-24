import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const linkClass = (targetPath) => 
    path === targetPath
      ? "text-[#fc9d00] font-bold hover:text-[#fc9d00] transition-colors border-l-4 border-[#fc9d00] pl-2 ml-[-12px]"
      : "text-on-surface-variant font-semibold hover:text-[#fc9d00] transition-colors";

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-ambient">
      <nav className="flex items-center justify-between px-6 h-16 w-full max-w-none">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white">
            <img alt="MSU Logo" className="w-8 h-8 object-contain" src="/logo/msu-logo.png" />
          </div>
          <span className="text-xl font-extrabold text-primary tracking-tighter font-headline">MSU-Innovates</span>
        </div>
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={path.startsWith("/projects") ? linkClass(path) : linkClass("/projects")} to="/projects">Projects</Link>
          <Link className={linkClass("/news")} to="/news">News</Link>
          <Link className={linkClass("/initiative")} to="/initiative">Make for India</Link>
        </div>
        <div className="invisible">
          {/* Spacer div to maintain layout balance */}
          <div className="w-10 h-10"></div>
        </div>
      </nav>
    </header>
  );
}