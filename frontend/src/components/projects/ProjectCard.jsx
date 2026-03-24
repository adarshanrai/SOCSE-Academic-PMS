import React from 'react';

// ============================================
// MENTOR CARD COMPONENT with 3D Hover Effect
// ============================================

export const MentorCard = ({ name, image, isMobile }) => {
  return (
    <div className="flex justify-center">
      <div className={`${isMobile ? 'w-[280px] p-2.5' : 'w-[350px] p-5'} mx-auto group perspective-1000`}>
        <div 
          className={`${isMobile ? 'pt-[30px] h-[300px]' : 'pt-[50px] h-[400px]'} border-2 border-white bg-cover bg-center bg-no-repeat transition-all duration-500 rounded-2xl relative shadow-[0_30px_30px_-10px_rgba(142,142,142,0.3)] group-hover:transform group-hover:rotate-y-10 group-hover:scale-105 group-hover:shadow-2xl`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-2xl z-0 transition-all duration-500 group-hover:bg-black/50"></div>
          <div className={`transition-all duration-500 absolute bottom-0 left-0 right-0 z-10 text-center ${isMobile ? 'p-[30px_20px_20px_20px]' : 'p-[60px_25px_25px_25px]'} transform-gpu group-hover:translate-y-[-10px]`}>
            <span className={`inline-block text-white font-black ${isMobile ? 'text-[22px]' : 'text-[28px]'} drop-shadow-lg transition-all duration-500 group-hover:text-yellow-300 group-hover:scale-110`}>
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TEAM MEMBERS SECTION COMPONENT
// ============================================

export const TeamMembersSection = ({ members, isMobile }) => {
  const getMemberImage = (member) => {
    if (member.image) return member.image;
    return '/images/members/placeholder.jpg';
  };

  if (isMobile) {
    // Mobile view - Grid layout
    return (
      <div className="mt-10 w-full px-4">
        <div className="text-center mb-6 flex flex-col items-center gap-2">
          <h2 className="text-[28px] font-extrabold text-gray-900 dark:text-white m-0">Team Members</h2>
          <span className="text-sm text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/20">
            {members.length} members
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-white/20 transition-transform active:scale-95 shadow-md hover:shadow-lg"
            >
              <div 
                className="w-full h-[180px] bg-cover bg-center relative"
                style={{ 
                  backgroundImage: `url(${getMemberImage(member)})`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center">
                  <span className="block text-white text-sm font-bold mb-1">{member.name}</span>
                  <span className="block text-white/70 text-[11px] uppercase tracking-wide">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view - Horizontal expandable cards
  return (
    <div className="mt-10 w-full">
      <div className="text-center mb-[30px] flex flex-col items-center gap-2.5">
        <h2 className="text-[36px] font-extrabold text-gray-900 dark:text-white m-0">Team Members</h2>
        <span className="text-base text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/20">
          {members.length} members
        </span>
      </div>
      <div className="h-[400px] w-full max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-[-20px_30px_40px_rgba(0,0,0,0.3)] border-2 border-gray-200 dark:border-white/20">
        <div className="flex h-full w-full">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="h-full flex-1 flex flex-col items-center justify-center text-white font-semibold transition-all duration-300 cursor-pointer relative bg-cover bg-center hover:flex-[2.5] group"
              style={{ 
                backgroundImage: `url(${getMemberImage(member)})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/60 z-0"></div>
              <div className="opacity-0 transition-all duration-300 relative z-10 text-center group-hover:opacity-100">
                <span className="block text-xl font-bold mb-2 text-white drop-shadow-lg">{member.name}</span>
                <span className="block text-sm font-normal uppercase tracking-[2px] text-white/90">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};