import React, { useState } from 'react';

export default function RegisterView({ onRegister, navigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('socse_users') || '[]');
    
    if (storedUsers.some(u => u.email === email)) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { id: Date.now(), name, email, password, role: 'Super Admin' };
    storedUsers.push(newUser);
    
    localStorage.setItem('socse_users', JSON.stringify(storedUsers));
    
    onRegister(newUser);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
        
        <div className="text-center mb-2">
          <div className="font-display font-bold text-2xl text-slate-800 tracking-tight mb-2">Create Account</div>
          <div className="text-slate-500 text-sm">Register a new Administrator</div>
        </div>

        {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center font-medium border border-red-100">{error}</div>}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-lg px-4 py-2.5 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
              placeholder="e.g. John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-lg px-4 py-2.5 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
              placeholder="admin@socse.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-lg px-4 py-2.5 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-[#081e2d] text-white font-semibold py-2.5 rounded-lg hover:bg-[#061622] hover:shadow-md transition-all mt-2 focus:ring-4 focus:ring-slate-200 outline-none">
            Register
          </button>
        </form>

        <div className="text-center mt-2 text-sm text-slate-500">
          Already registered? 
          <button onClick={navigateToLogin} className="text-blue-600 font-semibold hover:underline bg-transparent border-none ml-1 cursor-pointer focus:outline-none">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
