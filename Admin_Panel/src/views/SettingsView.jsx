import React, { useState, useRef } from 'react';
import { Camera, LogOut } from 'lucide-react';

export default function SettingsView({ currentUser, setCurrentUser, onLogout }) {
  const [profile, setProfile] = useState({ 
    name: currentUser?.name || 'Admin User', 
    email: currentUser?.email || 'admin@socse.edu',
    profileAvatar: currentUser?.profileAvatar || null
  });
  const [newPassword, setNewPassword] = useState('');
  
  const fileInputRef = useRef(null);
  
  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, ...profile };
    if (newPassword.trim()) {
      updatedUser.password = newPassword;
    }
    setCurrentUser(updatedUser);
    
    try {
      const authList = JSON.parse(localStorage.getItem('adminAuthList') || '[]');
      const updatedList = authList.map(u => u.email === updatedUser.email ? updatedUser : u);
      localStorage.setItem('adminAuthList', JSON.stringify(updatedList));
    } catch(err) {
      console.error(err);
    }
    
    setNewPassword('');
    alert('Settings and profile saved successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({...profile, profileAvatar: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans">
      
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-800 tracking-tight">System Settings & Profile</h2>
            <p className="text-sm text-slate-500 mt-1">Manage your platform preferences and admin identity.</p>
          </div>
          <button 
            type="button"
            onClick={onLogout}
            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors border border-red-200 outline-none focus:ring-4 focus:ring-red-100 shadow-sm shrink-0"
          >
            <LogOut size={18} /> Secure Logout
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-md font-bold text-slate-800 uppercase tracking-wider text-xs">Profile Identity</h3>
            
            <div className="flex items-center gap-6 mb-2">
               <div className="relative group shrink-0">
                 {profile.profileAvatar ? (
                   <img src={profile.profileAvatar} alt="Profile" className="h-24 w-24 rounded-full object-cover border-4 border-slate-50 shadow-md" />
                 ) : (
                   <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-slate-50 flex items-center justify-center text-3xl font-bold text-slate-400 shadow-sm">
                     {profile.name.charAt(0)}
                   </div>
                 )}
                 <button 
                   type="button"
                   onClick={() => fileInputRef.current?.click()}
                   className="absolute bottom-0 right-0 bg-[#081e2d] text-white p-2 rounded-full shadow-lg hover:bg-[#061622] transition-colors focus:outline-none focus:ring-4 focus:ring-slate-300"
                 >
                   <Camera size={16} />
                 </button>
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   className="hidden" 
                   accept="image/*"
                   onChange={handleImageUpload}
                 />
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-slate-800 text-xl md:text-2xl font-display">{profile.name}</span>
                 <span className="text-slate-500 text-sm font-medium mt-0.5">System Administrator</span>
               </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
               <label className="text-sm font-semibold text-slate-700">Full Name</label>
               <input type="text" className="w-full md:w-2/3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 outline-none transition-all text-sm text-slate-800" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
            </div>

            <div className="flex flex-col gap-1.5">
               <label className="text-sm font-semibold text-slate-700">Email Address</label>
               <input type="email" className="w-full md:w-2/3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 outline-none transition-all text-sm text-slate-800" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} disabled />
               <span className="text-xs text-slate-400 ml-1">Email is locked to LDAP identity.</span>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-2 pt-4 border-t border-slate-100">
               <h4 className="text-sm font-bold text-slate-800">Account Security</h4>
               <label className="text-sm font-semibold text-slate-700 mt-2">New Password <span className="text-xs text-slate-400 font-normal ml-2">(from Registration configuration)</span></label>
               <input type="password" placeholder="Leave blank to keep current configuration" className="w-full md:w-2/3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 outline-none transition-all text-sm text-slate-800" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
          </div>



          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm focus:ring-4 focus:ring-blue-200 outline-none">
              Save Configuration
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
