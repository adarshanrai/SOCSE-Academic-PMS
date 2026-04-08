import React, { useState, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, User } from 'lucide-react';
import Modal from '../components/Modal';

export default function StudentGroupsView({ groups, setGroups, projects, globalSearchQuery }) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [formData, setFormData] = useState({ name: '', projectId: '', project: '', teacher: '', mentorImage: null, students: [] });
  const selectedProjectObj = projects?.find(p => p.id === (formData.projectId || editingGroup?.projectId)) || null;
  const mentorFileRef = useRef(null);

  const safeSearch = globalSearchQuery || '';

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(safeSearch.toLowerCase()) || 
    g.leader.toLowerCase().includes(safeSearch.toLowerCase()) ||
    g.teacher.toLowerCase().includes(safeSearch.toLowerCase()) ||
    g.project.toLowerCase().includes(safeSearch.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingGroup(null);
    setFormData({ name: '', projectId: '', project: '', teacher: '', mentorImage: null, students: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (group) => {
    setEditingGroup(group);
    // Directly use the group's saved students
    setFormData({ ...group, students: group.students || [] });
    setIsModalOpen(true);
  };

  const handleMentorImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(f => ({ ...f, mentorImage: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleStudentImage = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newStudents = [...formData.students];
      newStudents[idx].image = reader.result;
      setFormData(f => ({ ...f, students: newStudents }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.name?.trim()) return alert('Group Name is required.');
    if (!formData.projectId) return alert('Please select a project.');
    
    const validStudents = formData.students.filter(s => s.name.trim() !== '');
    if (!validStudents || validStudents.length === 0) return alert('Please add at least 1 student with a name.');
    if (validStudents.length > 8) return alert('You can add a maximum of 8 team members per group.');
    
    const finalData = {
      ...formData,
      students: validStudents,
      leader: validStudents[0]?.name || 'N/A',
      project: selectedProjectObj?.title || formData.project || 'Unknown',
      teacher: formData.teacher?.trim() ? formData.teacher : 'N/A'
    };
    
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup.id ? { ...finalData, id: g.id } : g));
    } else {
      setGroups([...groups, { ...finalData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 justify-end items-start md:items-center">
        <button onClick={openAddModal} className="px-5 py-2.5 bg-[#081e2d] text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap">
          + Create Group
        </button>
      </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_80px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
              <div>Group Name</div>
              <div>Leader</div>
              <div>Guide / Teacher</div>
              <div>Linked Project</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 h-full max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredGroups.map(group => (
                <div key={group.id} className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_80px] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="font-bold text-slate-800 text-sm font-display truncate pr-4">{group.name}</div>
                  <div className="text-sm text-slate-600 font-medium truncate pr-4">{group.leader}</div>
                  <div className="text-sm text-slate-600 font-medium truncate pr-4">{group.teacher}</div>
                  <div className="text-sm text-slate-600 font-medium truncate">{group.project}</div>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors outline-none focus:opacity-100" onClick={() => openEditModal(group)}><Edit2 size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none focus:opacity-100" onClick={() => handleDelete(group.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {filteredGroups.length === 0 && <div className="p-12 text-center text-slate-800 font-display font-bold text-lg opacity-80">Data not found</div>}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingGroup ? 'Edit Group' : 'New Group'} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-semibold text-slate-700">Group Name *</label>
          <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. AI Enthus (G5)" />
        </div>
        
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-semibold text-slate-700">Linked Project *</label>
          <select className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800"
                  value={formData.projectId || ''}
                  onChange={e => {
                    const p = projects.find(pr => pr.id === parseInt(e.target.value, 10));
                    setFormData({
                      ...formData,
                      projectId: p ? p.id : '',
                      project: p ? p.title : '',
                      // DO NOT autofill teacher or students per user request
                      teacher: '',
                      mentorImage: null,
                      students: []
                    });
                  }}
          >
            <option value="">-- Select a Project --</option>
            {projects?.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-semibold text-slate-700">Mentor / Teacher</label>
          <div className="flex items-center gap-3">
            {formData.mentorImage ? (
              <img src={formData.mentorImage} alt="Mentor" className="h-10 w-10 rounded-full object-cover border border-slate-200 shrink-0" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                <User size={20} />
              </div>
            )}
            <div className="flex-1">
              <input type="text" className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none text-sm text-slate-800 transition-all" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} placeholder="Mentor Name" />
            </div>
            <button type="button" onClick={() => mentorFileRef.current?.click()} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold whitespace-nowrap">
              Upload Photo
            </button>
            <input type="file" ref={mentorFileRef} className="hidden" accept="image/*" onChange={handleMentorImage} />
          </div>
        </div>

        {formData.projectId && (
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Add Students (Max 8) *</label>
              <button type="button" 
                      onClick={() => {
                        if (formData.students.length >= 8) {
                          alert('You can only add up to 8 students.');
                          return;
                        }
                        setFormData({...formData, students: [...formData.students, { name: '', role: 'Member', image: null }]});
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline">
                + Add Student
              </button>
            </div>
            <div className="flex flex-col gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-64 overflow-y-auto">
              {formData.students.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-2 bg-white border border-slate-100 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 flex-1">
                    {m.image ? (
                      <img src={m.image} alt="User" className="h-8 w-8 rounded-full object-cover border border-slate-200 shrink-0" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold uppercase">
                        {m.name.charAt(0) || '?'}
                      </div>
                    )}
                    <div className="flex-1 flex flex-col max-w-[200px]">
                      <input type="text" className="text-sm text-slate-800 font-medium bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-slate-50 outline-none w-full truncate transition-colors px-1 py-0.5"
                             value={m.name} 
                             onChange={(e) => {
                               const newStudents = [...formData.students];
                               newStudents[idx].name = e.target.value;
                               setFormData({...formData, students: newStudents});
                             }} 
                             placeholder="Enter Student Name" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
                      Set Photo
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleStudentImage(e, idx)} />
                    </label>
                    <button type="button" onClick={() => {
                      const newStudents = formData.students.filter((_, i) => i !== idx);
                      setFormData({...formData, students: newStudents});
                    }} className="text-slate-400 hover:text-red-500 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {formData.students.length === 0 && (
                <span className="text-xs text-slate-500 italic">No students added yet. Click "+ Add Student"</span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
