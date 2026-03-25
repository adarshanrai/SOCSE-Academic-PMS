import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => setIsMenuOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMenuOpen]);

  const linkClass = (targetPath) =>
    path === targetPath
      ? "text-[#001e40] font-bold hover:text-[#fc9d00] transition-colors"
      : "text-on-surface-variant font-semibold hover:text-[#fc9d00] transition-colors";

  const mobileLinkClass = (targetPath) =>
    path === targetPath
      ? "block px-4 py-3 text-[#fc9d00] font-bold border-l-4 border-[#fc9d00]"
      : "block px-4 py-3 text-[#fc9d00]/80 font-semibold hover:text-[#fc9d00] hover:bg-gray-100 transition-colors";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/news", label: "News" },
    { path: "/initiative", label: "Make for India" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-ambient">
      <nav className="flex items-center justify-between px-4 md:px-6 h-16 w-full max-w-none">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden bg-white">
            <img
              alt="MSU Logo"
              className="w-7 h-7 md:w-8 md:h-8 object-contain"
              src="/logo/msu-logo.png"
            />
          </div>
          <span className="text-lg md:text-xl font-extrabold text-[#001e40] tracking-tighter font-headline">
            CSE Build Lab
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {navLinks.map((link) => (
            <Link key={link.path} className={linkClass(link.path)} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors z-50"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 w-full h-0.5 bg-[#fc9d00] rounded-full transition-all duration-300 ${
                isMenuOpen ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-[#fc9d00] rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-[#fc9d00] rounded-full transition-all duration-300 ${
                isMenuOpen ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-0"
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <span className="text-lg font-extrabold text-[#fc9d00] tracking-tighter font-headline">
              CSE Build Lab
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[#fc9d00]">close</span>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                className={mobileLinkClass(link.path)}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  {link.path === "/" && (
                    <span className="material-symbols-outlined text-sm text-[#fc9d00]/70">home</span>
                  )}
                  {link.path === "/projects" && (
                    <span className="material-symbols-outlined text-sm text-[#fc9d00]/70">science</span>
                  )}
                  {link.path === "/news" && (
                    <span className="material-symbols-outlined text-sm text-[#fc9d00]/70">newspaper</span>
                  )}
                  {link.path === "/initiative" && (
                    <span className="material-symbols-outlined text-sm text-[#fc9d00]/70">stars</span>
                  )}
                  {link.path === "/testimonials" && (
                    <span className="material-symbols-outlined text-sm text-[#fc9d00]/70">rate_review</span>
                  )}
                  {link.path === "/blog" && (
                    <span className="material-symbols-outlined text-sm text-[#fc9d00]/70">edit_note</span>
                  )}
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-[#fc9d00]/70 text-xs">
              <span>This one took a  while</span>
              <span className="w-1 h-1 rounded-full bg-[#fc9d00]/30"></span>
             
            </div>
          </div>
        </div>

        {/* Invisible spacer */}
        <div className="invisible w-10 h-10 hidden md:block"></div>
      </nav>
    </header>
  );
}