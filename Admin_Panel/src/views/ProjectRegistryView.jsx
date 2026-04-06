import React, { useState, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronDown, X } from 'lucide-react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const CATEGORIES = ['AI/ML', 'Web', 'Mobile', 'Database', 'IoT', 'Security', 'Cloud', 'Other'];
const STATUSES   = ['Ongoing', 'Completed', 'Pending'];
const YEARS      = ['2023', '2024', '2025', '2026'];

const emptyProject = {
  title: '', dept: '', semester: '', status: 'Ongoing', assignedGroup: 'None',
  category: 'Other', year: new Date().getFullYear().toString(), description: '', tags: '',
  attachments: [],
  mentorInfo:  { name: '', email: '', dept: '' },
  teamMembers: [{ name: '', role: '', year: '' }],
  gallery: [], methodology: [''], milestones: { phase: '', deadline: '', status: 'Pending' },
};

export default function ProjectRegistryView({ projects, setProjects, groups, setGroups, departments, globalSearchQuery, logActivity }) {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData]         = useState(emptyProject);
  const [error, setError]               = useState('');
  const fileRef                         = useRef(null);

  // ── Filters ───────────────────────────────────────────────────────────────
  const [filterStatus,   setFilterStatus]   = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterYear,     setFilterYear]     = useState('');
  const [localSearch,    setLocalSearch]    = useState('');

  const safeGlobal = globalSearchQuery || '';

  const filteredProjects = projects.filter(p => {
    const q = (localSearch || safeGlobal).toLowerCase();
    const matchSearch   = !q || p.title.toLowerCase().includes(q) || (p.dept || '').toLowerCase().includes(q) || (p.semester || '').toLowerCase().includes(q);
    const matchStatus   = !filterStatus   || p.status   === filterStatus;
    const matchCategory = !filterCategory || p.category === filterCategory;
    const matchYear     = !filterYear     || p.year     === filterYear;
    return matchSearch && matchStatus && matchCategory && matchYear;
  });

  // ── CRUD helpers ──────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (!window.confirm('Delete this project?')) return;
    const p = projects.find(p => p.id === id);
    setProjects(projects.filter(p => p.id !== id));
    if (p?.assignedGroup && p.assignedGroup !== 'None') {
      setGroups(groups.map(g => g.name === p.assignedGroup ? { ...g, project: 'Unassigned' } : g));
    }
    logActivity?.('deleted', p?.title || 'Project', 'project');
    toast.success('Project deleted.');
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({ ...emptyProject, dept: departments[0]?.name || '', semester: departments[0]?.semesters?.[0] || '' });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      ...emptyProject, ...project,
      mentorInfo:  project.mentorInfo  || { name: '', email: '', dept: '' },
      teamMembers: project.teamMembers?.length ? project.teamMembers : [{ name: '', role: '', year: '' }],
      methodology: project.methodology?.length ? project.methodology : [''],
      milestones:  project.milestones  || { phase: '', deadline: '', status: 'Pending' },
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) { setError('Project Title is required.'); return; }
    setError('');

    const updatedGroups = groups.map(g => {
      if (formData.assignedGroup !== 'None' && g.name === formData.assignedGroup) return { ...g, project: formData.title };
      if (editingProject?.assignedGroup === g.name && formData.assignedGroup !== g.name) return { ...g, project: 'Unassigned' };
      return g;
    });
    setGroups(updatedGroups);

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...formData, id: p.id } : p));
      logActivity?.('updated', formData.title, 'project');
      toast.success('Project updated successfully!');
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
      logActivity?.('created', formData.title, 'project');
      toast.success('Project created successfully!');
    }
    setIsModalOpen(false);
  };

  // ── Team member helpers ───────────────────────────────────────────────────
  const addMember    = () => setFormData(f => ({ ...f, teamMembers: [...f.teamMembers, { name: '', role: '', year: '' }] }));
  const removeMember = (i) => setFormData(f => ({ ...f, teamMembers: f.teamMembers.filter((_, idx) => idx !== i) }));
  const updateMember = (i, field, val) => setFormData(f => ({
    ...f, teamMembers: f.teamMembers.map((m, idx) => idx === i ? { ...m, [field]: val } : m),
  }));

  const addMethod    = () => setFormData(f => ({ ...f, methodology: [...f.methodology, ''] }));
  const removeMethod = (i) => setFormData(f => ({ ...f, methodology: f.methodology.filter((_, idx) => idx !== i) }));
  const updateMethod = (i, val) => setFormData(f => ({ ...f, methodology: f.methodology.map((m, idx) => idx === i ? val : m) }));

  // ── Attachments helpers ───────────────────────────────────────────────────
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newAttachments = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
    }));
    setFormData(f => ({ ...f, attachments: [...(f.attachments || []), ...newAttachments] }));
  };
  const removeAttachment = (i) => setFormData(f => ({ ...f, attachments: (f.attachments || []).filter((_, idx) => idx !== i) }));

  // ── Input style (reused) ──────────────────────────────────────────────────
  const inp = 'w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800';

  return (
    <div className="flex flex-col gap-6 h-full font-sans">

      {/* Filter / Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 shadow-sm">
        {/* Local search */}
        <div className="relative flex items-center flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none w-full transition-all text-slate-700 placeholder-slate-400"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <select className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>

        {/* Category filter */}
        <select className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Year filter */}
        <select className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          <option value="">All Years</option>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </select>

        {/* Clear filters */}
        {(filterStatus || filterCategory || filterYear || localSearch) && (
          <button className="text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors" onClick={() => { setFilterStatus(''); setFilterCategory(''); setFilterYear(''); setLocalSearch(''); }}>
            <X size={14} /> Clear
          </button>
        )}

        <div className="flex-1" />
        <button onClick={openAddModal} className="px-5 py-2.5 bg-[#081e2d] text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap">
          + Add Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[960px]">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr_0.8fr_80px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
              <div>Project Title</div>
              <div>Department</div>
              <div>Semester</div>
              <div>Category</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 h-full max-h-[calc(100vh-280px)] overflow-y-auto">
              {filteredProjects.map(project => (
                <div key={project.id} className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr_0.8fr_80px] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="flex flex-col gap-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm font-display truncate">{project.title}</span>
                      {project.assignedGroup && project.assignedGroup !== 'None' ? (
                        <span className="px-2 py-0.5 rounded border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-bold tracking-wide uppercase whitespace-nowrap">Assigned: {project.assignedGroup}</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-bold tracking-wide uppercase whitespace-nowrap">Unassigned</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium truncate pr-4">{project.dept}</div>
                  <div className="text-sm text-slate-600 font-medium truncate">{project.semester}</div>
                  <div className="text-xs text-slate-500 font-medium">{project.category || '—'}</div>
                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : project.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors outline-none" onClick={() => openEditModal(project)}><Edit2 size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none" onClick={() => handleDelete(project.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && <div className="p-12 text-center text-slate-800 font-display font-bold text-lg opacity-80">No projects found</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Extended Project Modal */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setError(''); }} title={editingProject ? 'Edit Project' : 'New Project'} onSubmit={handleSubmit}>
        {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium border border-red-100">{error}</div>}

        <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Project Title *</label>
              <input type="text" className={inp} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select className={inp} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Year</label>
                <select className={inp} value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })}>
                  {YEARS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Department</label>
              <select className={inp} value={formData.dept} onChange={e => {
                const d = departments.find(d => d.name === e.target.value);
                setFormData({ ...formData, dept: e.target.value, semester: d?.semesters?.[0] || '' });
              }}>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Semester</label>
              <select className={inp} value={formData.semester} onChange={e => setFormData({ ...formData, semester: e.target.value })}>
                {(departments.find(d => d.name === formData.dept)?.semesters || []).map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select className={inp} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Assign To Group</label>
                <select className={inp} value={formData.assignedGroup || 'None'} onChange={e => setFormData({ ...formData, assignedGroup: e.target.value })}>
                  <option value="None">None</option>
                  {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Project Files</label>
                <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-blue-600 font-semibold hover:underline">
                  + Upload Document
                </button>
              </div>
              {formData.attachments?.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {formData.attachments.map((file, i) => (
                    <div key={i} className="flex flex-row items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                      <div className="flex items-center gap-2 truncate pr-4">
                        <span className="truncate text-slate-700 font-medium">{file.name}</span>
                        <span className="text-slate-400 text-xs shrink-0">({file.size})</span>
                      </div>
                      <button type="button" onClick={() => removeAttachment(i)} className="text-slate-400 hover:text-red-500 shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea rows={3} className={inp + ' resize-none'} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Tags <span className="text-xs text-slate-400 font-normal">(comma-separated)</span></label>
              <input type="text" className={inp} placeholder="AI, React, Node" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
            </div>
          </div>
      </Modal>
    </div>
  );
}
