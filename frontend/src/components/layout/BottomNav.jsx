import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  const linkClass = (targetPath) => {
    const isActive = path === targetPath || (targetPath === "/projects" && path.startsWith("/projects"));
    return isActive
      ? "flex flex-col items-center justify-center text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 rounded-xl px-4 py-1 active:scale-90 transition-all duration-200"
      : "flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-4 py-1 active:scale-90 transition-all duration-200";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-safe h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 z-50 shadow-[0_-4px_20px_rgba(255,109,0,0.05)] rounded-t-2xl">
      <Link className={linkClass("/")} to="/">
        <span className="material-symbols-outlined mb-1">home</span>
        <span className="font-['Manrope'] text-[11px] font-semibold uppercase tracking-widest mt-1">Home</span>
      </Link>
      <Link className={linkClass("/projects")} to="/projects">
        <span className="material-symbols-outlined mb-1">account_tree</span>
        <span className="font-['Manrope'] text-[11px] font-semibold uppercase tracking-widest mt-1">Projects</span>
      </Link>
      <Link className={linkClass("/news")} to="/news">
        <span className="material-symbols-outlined mb-1">newspaper</span>
        <span className="font-['Manrope'] text-[11px] font-semibold uppercase tracking-widest mt-1">News</span>
      </Link>
      <Link className={linkClass("/initiative")} to="/initiative">
        <span className="material-symbols-outlined mb-1">lightbulb</span>
        <span className="font-['Manrope'] text-[11px] font-semibold uppercase tracking-widest mt-1">Initiative</span>
      </Link>
    </nav>
  );
}
