// src/pages/Testimonials.jsx
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import TestimonialCard from "../components/layout/testimonials/TestimonialCard";
import { testimonialsData } from "../data/testimonialsData";

export default function Testimonials() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased pb-24 md:pb-0 min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label text-[11px] font-bold tracking-wide text-secondary uppercase">
              Voices of Excellence
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-primary mb-4">
            Faculty Testimonials
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-body">
            Discover what our esteemed faculty members have to say about the CSE Build Lab experience and its impact on student innovation.
          </p>
        </section>

        {/* Testimonials Carousel */}
        <section className="mb-16">
          <TestimonialCard testimonials={testimonialsData} />
        </section>

        {/* Call to Action */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#fc9d00]/5 to-secondary-container/10 p-12 text-center">
          <div className="relative max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-5xl text-[#fc9d00] mb-4">
              school
            </span>
            <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">
              Join the Innovation Journey
            </h3>
            <p className="text-on-surface-variant mb-6">
              Be part of a community that's shaping the future of technology and education.
            </p>
            <button
              onClick={() => alert("This feature is under development")}
              className="inline-flex items-center gap-2 bg-[#fc9d00] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e58e00] transition-colors shadow-md"
            >
              Explore Projects
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}