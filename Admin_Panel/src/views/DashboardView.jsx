import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import msuLogo from '../assets/msu_logo.png';
import { FolderKanban, MessageSquare, Star, Clock, Activity } from 'lucide-react';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end || isNaN(end)) {
      setCount(end || 0);
      return;
    }
    const duration = 800;
    const incrementTime = 20;
    const step = Math.max(1, Math.ceil(end / (duration / incrementTime)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const MODULE_COLORS = {
  project:     { bg: '#dbeafe', text: '#1d4ed8', label: 'Project' },
  testimonial: { bg: '#d1fae5', text: '#065f46', label: 'Testimonial' },
  blog:        { bg: '#fef3c7', text: '#92400e', label: 'Blog' },
  news:        { bg: '#ede9fe', text: '#5b21b6', label: 'News' },
};

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function DashboardView({ projects = [], groups = [], testimonials = [], blogPosts = [], activityLog = [] }) {

  const totalProjects      = projects.length;
  const activeGroups       = groups.length;
  const totalStudents      = groups.length * 4;
  const completedProjects  = projects.filter(p => p.status === 'Completed').length;
  const totalBlogPosts     = blogPosts.length;
  const totalTestimonials  = testimonials.length;
  const pendingApprovals   = blogPosts.filter(b => b.status === 'Draft').length;

  const pieDataRaw = [
    { name: 'Ongoing',   value: projects.filter(p => p.status === 'Ongoing').length,   color: '#2563eb' },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length, color: '#059669' },
    { name: 'Pending',   value: projects.filter(p => p.status === 'Pending').length,   color: '#d97706' },
  ].filter(d => d.value > 0);
  const pieData = pieDataRaw.length > 0 ? pieDataRaw : [{ name: 'No Projects', value: 1, color: '#e2e8f0' }];

  const deptCount = projects.reduce((acc, p) => {
    const dept = p.dept || 'Unassigned';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(deptCount).length > 0
    ? Object.keys(deptCount).map(dept => ({ name: dept, projects: deptCount[dept] }))
    : [{ name: 'None', projects: 0 }];

  const semCount = projects.reduce((acc, p) => {
    const sem = p.semester || 'Unassigned';
    acc[sem] = (acc[sem] || 0) + 1;
    return acc;
  }, {});
  const lineData = Object.keys(semCount).length > 0
    ? Object.keys(semCount).sort().map(sem => ({ semester: sem, count: semCount[sem] }))
    : [{ semester: 'None', count: 0 }];

  const feed = activityLog.slice(0, 8);

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-[#081e2d] p-3 rounded-xl shadow-md shrink-0">
          <img src={msuLogo} alt="MSU Logo" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-2xl font-bold font-display tracking-tight text-[#081e2d]">MEDHAVI SKILLS UNIVERSITY</h2>
          <p className="text-sm text-slate-500 font-medium">Academic Project Console</p>
        </div>
      </div>

      {/* Primary Stats Grid — 4 cards (unchanged) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-start">
          <div className="text-4xl font-display font-bold text-slate-800 tracking-tight"><AnimatedCounter value={totalProjects} /></div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 mb-0.5">Total Projects</div>
          <div className="text-xs text-slate-400 font-medium">Registered in system</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-start">
          <div className="text-4xl font-display font-bold text-slate-800 tracking-tight"><AnimatedCounter value={activeGroups} /></div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 mb-0.5">Active Groups</div>
          <div className="text-xs text-slate-400 font-medium">Student groups formed</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-start">
          <div className="text-4xl font-display font-bold text-slate-800 tracking-tight"><AnimatedCounter value={totalStudents} /></div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 mb-0.5">Total Students</div>
          <div className="text-xs text-slate-400 font-medium">Est. assigned to groups</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-start">
          <div className="text-4xl font-display font-bold text-emerald-600 tracking-tight"><AnimatedCounter value={completedProjects} /></div>
          <div className="text-xs font-bold text-emerald-700/70 uppercase tracking-widest mt-2 mb-0.5">Completed Projects</div>
          <div className="text-xs text-slate-400 font-medium">Successfully finalized</div>
        </div>
      </section>

      {/* Secondary Stats Grid — 3 new dynamic cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <MessageSquare size={22} className="text-blue-600" />
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-slate-800 tracking-tight"><AnimatedCounter value={totalBlogPosts} /></div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Blog / Forum Posts</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Star size={22} className="text-amber-500" />
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-slate-800 tracking-tight"><AnimatedCounter value={totalTestimonials} /></div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Total Testimonials</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Clock size={22} className="text-red-500" />
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-red-600 tracking-tight"><AnimatedCounter value={pendingApprovals} /></div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Pending Approvals</div>
          </div>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold font-display text-slate-800 mb-6 tracking-tight">Status Overview</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={75} outerRadius={100} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }}></div>
                {d.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold font-display text-slate-800 mb-6 tracking-tight">Projects By Department</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="projects" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:col-span-2">
          <h3 className="text-lg font-bold font-display text-slate-800 mb-6 tracking-tight">Timeline Submission Flow</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ stroke: '#e2e8f0' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="count" name="Projects" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <Activity size={20} className="text-slate-500" />
          <h3 className="text-lg font-bold font-display text-slate-800 tracking-tight">Recent Activity Feed</h3>
        </div>
        <div className="flex flex-col gap-3">
          {feed.length > 0 ? feed.map((entry) => {
            const mod = MODULE_COLORS[entry.module] || { bg: '#f1f5f9', text: '#475569', label: entry.module };
            return (
              <div
                key={entry.id}
                className="bg-slate-50/80 hover:bg-slate-50 p-4 rounded-xl flex items-center justify-between border-l-4 transition-colors"
                style={{ borderLeftColor: mod.text }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0" style={{ background: mod.bg, color: mod.text }}>
                    {mod.label}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold font-display text-slate-800 text-sm tracking-tight truncate">
                      <span className="text-slate-500 font-medium">{entry.action}</span> — {entry.entity}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0 ml-4">{timeAgo(entry.timestamp)}</span>
              </div>
            );
          }) : (
            <div className="text-slate-500 text-sm font-medium py-4 text-center">No activity yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
