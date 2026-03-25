// omponents/testimonials/TestimonialCard.jsx
import { useState } from "react";

export default function TestimonialCard({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  // Guard clause - if no testimonials, show nothing or loading state
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-on-surface-variant">No testimonials available.</p>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  
  // Get current page testimonials
  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative px-12">
      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#001e40] shadow-lg flex items-center justify-center transition-all ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#002b5c] active:scale-95 hover:shadow-xl"
            }`}
          >
            <span className="material-symbols-outlined text-white text-2xl">chevron_left</span>
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === totalPages - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#001e40] shadow-lg flex items-center justify-center transition-all ${
              currentIndex === totalPages - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#002b5c] active:scale-95 hover:shadow-xl"
            }`}
          >
            <span className="material-symbols-outlined text-white text-2xl">chevron_right</span>
          </button>
        </>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {currentTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-outline-variant/10"
          >
            <div className="p-8">
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container-high ring-4 ring-[#fc9d00]/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Name and Designation */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-secondary font-medium text-sm">
                  {testimonial.designation}
                </p>
              </div>
              
              {/* Testimonial Text - More italic and quote-like */}
              <div className="mt-4 relative">
                {/* Large opening quote */}
                <div className="absolute -top-4 -left-2 text-6xl text-[#fc9d00]/20 font-serif">
                  "
                </div>
                <p className="text-on-surface text-base leading-relaxed text-center font-serif italic tracking-wide px-2">
                  {testimonial.testimonial}
                </p>
                {/* Small closing quote */}
                <div className="absolute -bottom-6 -right-2 text-6xl text-[#fc9d00]/20 font-serif">
                  "
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-[#fc9d00]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-on-surface-variant">
            Page {currentIndex + 1} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}