import React from 'react';

// ============================================
// MENTOR CARD COMPONENT - WITH SHADOW & 3D HOVER EFFECT
// ============================================

export const MentorCard = ({ name, image, isMobile }) => {
  return (
    <div className="flex justify-center">
      <div className={`${isMobile ? 'w-[280px] p-2.5' : 'w-[350px] p-5'} mx-auto perspective-1000`}>
        <div 
          className={`${isMobile ? 'pt-[30px] h-[300px]' : 'pt-[50px] h-[400px]'} border-2 border-white bg-cover bg-center bg-no-repeat rounded-2xl relative shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.4)] hover:scale-105 hover:rotate-y-5 hover:translate-y-[-5px]`}
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Inner shadow for depth */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none"></div>
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl"></div>
          
          <div className={`absolute bottom-0 left-0 right-0 z-10 text-center ${isMobile ? 'p-[30px_20px_20px_20px]' : 'p-[60px_25px_25px_25px]'}`}>
            <span className={`inline-block text-white font-black ${isMobile ? 'text-[22px]' : 'text-[28px]'} drop-shadow-lg transition-all duration-300 hover:scale-105 hover:text-yellow-200`}>
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



export const TeamMembersSection = ({ members, isMobile }) => {
  const getMemberImage = (member) => {
    if (member.image) return member.image;
    return '/images/members/placeholder.jpg';
  };

  const memberCount = members.length;

  if (memberCount <= 2) {
    if (isMobile) {
      // Mobile view - Centered cards
      return (
        <div className="mt-10 w-full px-4">
          <div className="text-center mb-6 flex flex-col items-center gap-2">
            <h2 className="text-[28px] font-extrabold text-gray-900 dark:text-white m-0">Team Members</h2>
            <span className="text-sm text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/20">
              {memberCount} {memberCount === 1 ? 'member' : 'members'}
            </span>
          </div>
          <div className={`flex flex-col items-center gap-4 ${memberCount === 2 ? 'md:flex-row md:justify-center' : ''}`}>
            {members.map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-white/20 shadow-md w-full max-w-[300px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-full h-[220px] overflow-hidden">
                  <img 
                    src={getMemberImage(member)} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <span className="block text-gray-900 dark:text-white text-base font-bold mb-1">{member.name}</span>
                  <span className="block text-gray-600 dark:text-white/70 text-xs uppercase tracking-wide">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Desktop view - Centered cards for 1-2 members with 3D hover
    return (
      <div className="mt-10 w-full">
        <div className="text-center mb-[30px] flex flex-col items-center gap-2.5">
          <h2 className="text-[36px] font-extrabold text-gray-900 dark:text-white m-0">Team Members</h2>
          <span className="text-base text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/20">
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </span>
        </div>
        <div className={`flex justify-center gap-8 ${memberCount === 1 ? '' : 'flex-wrap'} perspective-1000`}>
          {members.map((member, index) => (
            <div 
              key={index} 
              className={`${memberCount === 1 ? 'w-[350px]' : 'w-[320px]'} rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border-2 border-gray-200 dark:border-white/20 relative group transition-all duration-500 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.4)] hover:scale-105 hover:rotate-y-3 hover:translate-y-[-5px]`}
            >
              <div 
                className="w-full h-[400px] bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${getMemberImage(member)})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-black/50 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10">
                  <span className="block text-xl font-bold mb-2 text-white drop-shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:text-yellow-200">{member.name}</span>
                  <span className="block text-sm font-normal uppercase tracking-[2px] text-white/90">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For projects with 3 or more members - Use original design
  if (isMobile) {
    // Mobile view - Grid layout for 3+ members
    return (
      <div className="mt-10 w-full px-4">
        <div className="text-center mb-6 flex flex-col items-center gap-2">
          <h2 className="text-[28px] font-extrabold text-gray-900 dark:text-white m-0">Team Members</h2>
          <span className="text-sm text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/20">
            {memberCount} members
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {members.map((member, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-white/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full h-[180px] overflow-hidden">
                <img 
                  src={getMemberImage(member)} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-3 text-center">
                <span className="block text-gray-900 dark:text-white text-sm font-bold mb-1 truncate">{member.name}</span>
                <span className="block text-gray-600 dark:text-white/70 text-[11px] uppercase tracking-wide truncate">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view - Original horizontal expandable cards for 3+ members
  return (
    <div className="mt-10 w-full">
      <div className="text-center mb-[30px] flex flex-col items-center gap-2.5">
        <h2 className="text-[36px] font-extrabold text-gray-900 dark:text-white m-0">Team Members</h2>
        <span className="text-base text-gray-600 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/20">
          {memberCount} members
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