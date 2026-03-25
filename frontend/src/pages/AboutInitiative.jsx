import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import React, { useState } from "react";

export default function AboutInitiative() {
  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Navbar />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/10 mb-6 mx-auto w-fit">
            <span className="material-symbols-outlined text-[14px] text-secondary">stars</span>
            <span className="font-label text-[11px] font-bold tracking-wide text-secondary uppercase">
              SOCSE Flagship Initiative
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight mb-6">
            Make for India <br />
            <span className="text-[#fc9d00]">Start at MSU</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto">
            Transforming students from passive learners into active problem-solvers, creating real-world impact through innovation.
          </p>
        </section>

        {/* What is the Initiative? */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#fc9d00]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#fc9d00] text-sm">lightbulb</span>
              </span>
              <span className="text-secondary font-bold text-sm uppercase tracking-wider">The Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
              What is Make for India <br />Start at MSU?
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              <strong className="text-on-surface font-headline">"Make for India Start at MSU"</strong> is a flagship initiative by the School of Computer Science & Engineering at Medhavi Skills University that encourages students to identify and solve real-world problems within their immediate environment.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Instead of focusing on distant or abstract challenges, the initiative promotes the idea that innovation begins with everyday observations—within classrooms, campus systems, and surrounding communities.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fc9d00]/20 to-secondary-container/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10">
                <span className="material-symbols-outlined text-6xl text-[#fc9d00]/30 mb-4">school</span>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">From Classroom to Community</h3>
                <p className="text-on-surface-variant">Empowering students to become innovators who solve real problems, not just theoretical exercises.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Pillars */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#fc9d00]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#fc9d00] text-sm">tune</span>
              </span>
              <span className="text-secondary font-bold text-sm uppercase tracking-wider">Core Elements</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              The Innovation Framework
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto">
              A structured approach that guides students through the complete innovation cycle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fc9d00]">search</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Identify & Observe</h3>
              <p className="text-on-surface-variant text-sm">Students learn to identify practical issues through careful observation of their surroundings and user needs.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fc9d00]">analytics</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Research & Analyze</h3>
              <p className="text-on-surface-variant text-sm">Conduct thorough research and user analysis to understand problems deeply and develop effective solutions.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fc9d00]">design_services</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Design & Prototype</h3>
              <p className="text-on-surface-variant text-sm">Transform ideas into tangible prototypes using modern technologies and iterative design processes.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fc9d00]">rocket_launch</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Implement & Scale</h3>
              <p className="text-on-surface-variant text-sm">Implement workable solutions with support from industry partners and mentorship programs.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fc9d00]">handshake</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Industry Collaboration</h3>
              <p className="text-on-surface-variant text-sm">Connect with industry experts, gain real-world insights, and build solutions that meet market needs.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fc9d00]">startup</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Incubation & Patents</h3>
              <p className="text-on-surface-variant text-sm">Pathways for startup incubation, patent development, and taking ideas from concept to reality.</p>
            </div>
          </div>
        </section>

        {/* Technology Integration */}
        <section className="bg-gradient-to-r from-[#fc9d00]/5 to-secondary-container/10 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#fc9d00]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#fc9d00] text-sm">developer_mode</span>
              </span>
              <span className="text-secondary font-bold text-sm uppercase tracking-wider">Modern Tech Stack</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Technology at the Core
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-4xl text-[#fc9d00] mb-2">smart_toy</span>
              <p className="font-bold text-primary">Artificial Intelligence</p>
            </div>
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-4xl text-[#fc9d00] mb-2">code</span>
              <p className="font-bold text-primary">Software Engineering</p>
            </div>
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-4xl text-[#fc9d00] mb-2">data_usage</span>
              <p className="font-bold text-primary">Data Analytics</p>
            </div>
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-4xl text-[#fc9d00] mb-2">settings_system_daydream</span>
              <p className="font-bold text-primary">Digital Systems</p>
            </div>
          </div>
          <p className="text-center text-on-surface-variant mt-8">
            Students work on projects like smart campus solutions, automation tools, sustainability systems, and digital service platforms, aligning their learning with real industry demands and national priorities.
          </p>
        </section>

        {/* Student Development */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#fc9d00]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#fc9d00] text-sm">psychology</span>
              </span>
              <span className="text-secondary font-bold text-sm uppercase tracking-wider">Mindset Shift</span>
            </div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-6">
              Beyond Technical Skills
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              The initiative emphasizes developing a mindset of empathy, responsibility, and observation. Students are encouraged to understand user needs deeply and build solutions that improve lives, rather than focusing solely on technical complexity.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              This approach helps in shaping well-rounded engineers who are socially aware and innovation-driven, capable of creating meaningful impact in society.
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10">
            <span className="material-symbols-outlined text-5xl text-[#fc9d00] mb-4">diversity_3</span>
            <h3 className="text-2xl font-headline font-bold text-primary mb-4">Pathways to Impact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span className="text-on-surface-variant">Startup Incubation Support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span className="text-on-surface-variant">Patent Development & Filing</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span className="text-on-surface-variant">Industry Collaboration & Mentorship</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span className="text-on-surface-variant">Real-world Project Experience</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                <span className="text-on-surface-variant">Research Publication Opportunities</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Final Message - In Quotes */}
        <section className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fc9d00]/10 to-secondary-container/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-surface-container-lowest rounded-3xl p-12 md:p-16 text-center border border-outline-variant/10 shadow-xl">
            <div className="max-w-4xl mx-auto">
             
              <p className="text-2xl md:text-3xl font-serif italic text-on-surface leading-relaxed mb-8">
                "Ultimately, the initiative reinforces a powerful message: meaningful innovation does not begin in distant labs—it starts with us, our surroundings, and our willingness to act."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#fc9d00]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#fc9d00">school</span>
                </div>
                <div className="text-left">
                  <p className="font-headline font-bold text-primary text-lg">— SOCSE</p>
                  <p className="text-sm text-on-surface-variant">School of Computer Science & Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <button
            onClick={handleFeatureClick}
            className="bg-[#fc9d00] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e58e00] transition-colors shadow-md inline-flex items-center gap-2"
          >
            Start Your Innovation Journey
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </section>
      </main>
    </div>
  );
}