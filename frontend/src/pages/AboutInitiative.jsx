import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import Footer from "../components/layout/Footer";
import React, { useState } from "react";

export default function AboutInitiative() {
  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Navbar />

      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
        <section className="bg-surface-container-lowest rounded-3xl p-8 md:p-16 shadow-xl border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-8 relative z-10">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              SOCSE Flagship
            </div>
            
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface leading-tight tracking-tight mb-12 relative z-10">
              What is <span className="text-transparent bg-clip-text primary-gradient">Make for India</span> Start at MSU?
            </h2>

            <div className="space-y-8 text-lg text-on-surface-variant leading-relaxed relative z-10 font-medium">
                <p>
                    <strong className="text-on-surface">“Make for India Start at MSU”</strong> is a flagship initiative by the School of Computer Science & Engineering at Medhavi Skills University that encourages students to identify and solve real-world problems within their immediate environment. Instead of focusing on distant or abstract challenges, the initiative promotes the idea that innovation begins with everyday observations—within classrooms, campus systems, and surrounding communities.
                </p>
                <p>
                    The program is designed to transform students from passive learners into active problem-solvers. It guides them through the complete innovation cycle, starting from identifying practical issues, conducting research and user analysis, to designing prototypes and implementing workable solutions. This hands-on approach ensures that students gain not only technical knowledge but also the ability to apply it in meaningful and impactful ways.
                </p>
                <p>
                    A key strength of the initiative lies in its integration of modern technologies such as artificial intelligence, software engineering, data analytics, and digital systems. Students work on projects like smart campus solutions, automation tools, sustainability systems, and digital service platforms, aligning their learning with real industry demands and national priorities.
                </p>
                <p className="p-6 bg-primary-container/30 border-l-4 border-primary rounded-r-2xl italic text-on-surface shadow-sm">
                    The initiative also emphasizes developing a mindset of empathy, responsibility, and observation. Students are encouraged to understand user needs deeply and build solutions that improve lives, rather than focusing solely on technical complexity. This helps in shaping well-rounded engineers who are socially aware and innovation-driven.
                </p>
                <p>
                    Beyond academic learning, “Make for India Start at MSU” creates pathways for students to take their ideas further through startup incubation, patent development, and industry collaboration. It builds an ecosystem where innovation can evolve into real-world impact, preparing students to contribute to India’s vision of becoming a global leader in technology and development.
                </p>
                <p className="text-xl font-bold text-primary mt-12 bg-surface-container border border-primary/20 p-8 rounded-2xl text-center shadow-md">
                    Ultimately, the initiative reinforces a powerful message: meaningful innovation does not begin in distant labs—it starts with us, our surroundings, and our willingness to act.
                </p>
            </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
