import React, { useState, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const emptyTestimonial = {
  name: '', role: '', message: '', avatar: null, date: '', isApproved: false,
};

export default function TestimonialView({ testimonials, setTestimonials, logActivity }) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyTestimonial);
  const avatarRef = useRef(null);

  const filtered = testimonials.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.role || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.message || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const t = testimonials.find(t => t.id === id);
    setTestimonials(testimonials.filter(t => t.id !== id));
    logActivity?.('deleted', t?.name + ' testimonial', 'testimonial');
    toast.success('Testimonial deleted.');
  };

  const toggleApprove = (id) => {
    const t = testimonials.find(t => t.id === id);
    const updated = testimonials.map(t => t.id === id ? { ...t, isApproved: !t.isApproved } : t);
    setTestimonials(updated);
    const action = t?.isApproved ? 'hidden' : 'approved';
    logActivity?.(action, t?.name + ' testimonial', 'testimonial');
    toast.success(t?.isApproved ? 'Testimonial hidden.' : 'Testimonial approved!');
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ ...emptyTestimonial, date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...emptyTestimonial, ...item });
    setIsModalOpen(true);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(f => ({ ...f, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) { toast.error('Name is required.'); return; }
    if (!formData.message.trim()) { toast.error('Message is required.'); return; }

    if (editingItem) {
      setTestimonials(testimonials.map(t => t.id === editingItem.id ? { ...formData, id: t.id } : t));
      logActivity?.('updated', formData.name + ' testimonial', 'testimonial');
      toast.success('Testimonial updated!');
    } else {
      setTestimonials([...testimonials, { ...formData, id: Date.now() }]);
      logActivity?.('created', formData.name + ' testimonial', 'testimonial');
      toast.success('Testimonial added!');
    }
    setIsModalOpen(false);
  };

  const inp = 'w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800';

  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none w-64 md:w-80 transition-all text-slate-700 placeholder-slate-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2 outline-none"
          onClick={openAddModal}
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_100px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
              <div>Author</div>
              <div>Message</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 max-h-[calc(100vh-260px)] overflow-y-auto">
              {filtered.map(item => (
                <div key={item.id} className="grid grid-cols-[2fr_1.5fr_1fr_100px] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">
                  {/* Author */}
                  <div className="flex items-center gap-3 min-w-0">
                    {item.avatar ? (
                      <img src={item.avatar} alt={item.name} className="h-9 w-9 rounded-full object-cover border border-slate-200 shrink-0" />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
                        {item.name?.charAt(0) || '?'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 text-sm truncate">{item.name}</div>
                      <div className="text-xs text-slate-400 truncate">{item.role}</div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="text-sm text-slate-600 truncate pr-4">{item.message}</div>

                  {/* Status */}
                  <div>
                    {item.isApproved ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Approved</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-opacity">
                    <button
                      title={item.isApproved ? 'Hide' : 'Approve'}
                      className={`p-2 rounded-lg transition-colors outline-none ${item.isApproved ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                      onClick={() => toggleApprove(item.id)}
                    >
                      {item.isApproved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors outline-none" onClick={() => openEditModal(item)}><Edit2 size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div className="p-12 text-center text-slate-800 font-display font-bold text-lg opacity-80">No testimonials found</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'} onSubmit={handleSubmit}>
        {/* Avatar upload */}
        <div className="flex items-center gap-4">
          {formData.avatar ? (
            <img src={formData.avatar} alt="Avatar" className="h-14 w-14 rounded-full object-cover border-2 border-slate-200 shrink-0" />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-400 shrink-0">
              {formData.name?.charAt(0) || '?'}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <button type="button" onClick={() => avatarRef.current?.click()} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors">
              {formData.avatar ? 'Change Photo' : 'Upload Photo'}
            </button>
            {formData.avatar && <button type="button" onClick={() => setFormData(f => ({ ...f, avatar: null }))} className="text-xs text-red-400 hover:underline">Remove</button>}
          </div>
          <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Full Name *</label>
          <input type="text" className={inp} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Role / Batch</label>
          <input type="text" className={inp} placeholder="e.g. B.Tech CSE, 2024" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Testimonial Message *</label>
          <textarea rows={4} className={inp + ' resize-none'} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Date</label>
          <input type="date" className={inp} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
          <input
            type="checkbox"
            id="isApproved"
            checked={formData.isApproved}
            onChange={e => setFormData({ ...formData, isApproved: e.target.checked })}
            className="h-4 w-4 rounded accent-emerald-600 cursor-pointer"
          />
          <label htmlFor="isApproved" className="text-sm font-semibold text-emerald-800 cursor-pointer">Mark as Approved</label>
        </div>
      </Modal>
    </div>
  );
}
