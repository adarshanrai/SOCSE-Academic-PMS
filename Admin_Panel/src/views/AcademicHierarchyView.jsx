import React, { useState } from 'react';
import { Plus, Building, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';

export default function AcademicHierarchyView({ departments, setDepartments, globalSearchQuery }) {
  
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [deptForm, setDeptForm] = useState({ name: '' });

  const handleAddDept = () => {
    if (!deptForm.name) return;
    setDepartments([...departments, { id: `dept-${Date.now()}`, name: deptForm.name, semesters: [] }]);
    setIsDeptModalOpen(false);
  };

  const removeDept = (id) => {
    if (window.confirm("Delete this entire department?")) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  const [semText, setSemText] = useState('');

  const addSemester = (deptId) => {
    if(!semText.trim()) return;
    setDepartments(departments.map(d => {
      if (d.id === deptId) {
        return { ...d, semesters: [...d.semesters, semText] };
      }
      return d;
    }));
    setSemText('');
  };

  const removeSemester = (deptId, semIndex) => {
    setDepartments(departments.map(d => {
      if (d.id === deptId) {
         const newSems = [...d.semesters];
         newSems.splice(semIndex, 1);
         return { ...d, semesters: newSems };
      }
      return d;
    }));
  };
  
  const safeSearch = globalSearchQuery || '';
  const filteredDepartments = departments.filter(d => 
    d.name.toLowerCase().includes(safeSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
           <Building className="text-blue-600" size={24} />
           <span className="font-bold text-slate-800 font-display">Academic Structure</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2 focus:ring-4 focus:ring-blue-200 outline-none" onClick={() => { setDeptForm({name: ''}); setIsDeptModalOpen(true); }}>
          <Plus size={18} /> Add Department
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[1fr_2fr_80px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
              <div>DEPARTMENT</div>
              <div>SEMESTERS & PHASES</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 h-full max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredDepartments.map((dept) => (
                <div key={dept.id} className="grid grid-cols-[1fr_2fr_80px] gap-4 px-6 py-4 items-start hover:bg-slate-50/50 transition-colors group">
                  <div className="font-bold text-slate-800 text-sm font-display pt-1">
                    {dept.name}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {dept.semesters.map((sem, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm">
                          {sem}
                          <button className="text-slate-400 hover:text-red-500 focus:outline-none" onClick={() => removeSemester(dept.id, idx)}>
                            <Trash2 size={12} />
                          </button>
                        </span>
                      ))}
                      {dept.semesters.length === 0 && <span className="text-xs text-slate-400 font-medium italic">No semesters defined</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input 
                        type="text" 
                        placeholder="E.g. Semester 8" 
                        className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-1.5 outline-none transition-all text-sm text-slate-800 placeholder-slate-400 max-w-xs" 
                        onKeyDown={(e) => { 
                          if(e.key === 'Enter') { 
                            setSemText(e.target.value); 
                            if(e.target.value.trim()) {
                              setDepartments(departments.map(d => d.id === dept.id ? { ...d, semesters: [...d.semesters, e.target.value] } : d));
                              e.target.value = '';
                            }
                          } 
                        }}
                        onBlur={(e) => setSemText(e.target.value)}
                      />
                      <button className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors shrink-0" onClick={() => { addSemester(dept.id); }}>
                        + Add
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-opacity pt-1">
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none focus:opacity-100" onClick={() => removeDept(dept.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {filteredDepartments.length === 0 && <div className="p-12 text-center text-slate-800 font-display font-bold text-lg opacity-80">Data not found</div>}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isDeptModalOpen} onClose={() => setIsDeptModalOpen(false)} title="Add Core Department" onSubmit={handleAddDept}>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm font-semibold text-slate-700">Department Name</label>
          <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800" value={deptForm.name} onChange={e => setDeptForm({name: e.target.value})} placeholder="e.g. Mechanical Engineering" />
        </div>
      </Modal>
    </div>
  );
}
