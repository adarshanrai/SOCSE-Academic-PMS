import React, { useState, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, Star, X } from 'lucide-react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const NEWS_CATEGORIES = ['Academic', 'Infrastructure', 'Events', 'Research', 'Administration', 'Other'];

export default function NewsAnnouncementsView({ news, setNews, globalSearchQuery, logActivity }) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '', date: '', author: '', type: 'News',
    category: 'Academic', readTime: '2 min', image: null, isFeatured: false, documents: [],
  });

  const fileRef = useRef(null);
  const docRef = useRef(null);
  const safeGlobalSearch = globalSearchQuery || '';

  const filteredNews = news.filter(item => {
    const matchesGlobal = item.title.toLowerCase().includes(safeGlobalSearch.toLowerCase()) ||
                          (item.author || '').toLowerCase().includes(safeGlobalSearch.toLowerCase());
    const matchesLocal  = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesGlobal && matchesLocal;
  });

  const handleDelete = (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    const item = news.find(n => n.id === id);
    setNews(news.filter(n => n.id !== id));
    logActivity?.('deleted', item?.title || 'News item', 'news');
    toast.success('Announcement deleted.');
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], author: 'Admin', type: 'News', category: 'Academic', readTime: '2 min', image: null, isFeatured: false, documents: [] });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(f => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newDocs = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
    }));
    setFormData(f => ({ ...f, documents: [...(f.documents || []), ...newDocs] }));
  };

  const removeDocument = (index) => {
    setFormData(f => ({ ...f, documents: (f.documents || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) { toast.error('Title is required.'); return; }
    if (editingItem) {
      setNews(news.map(n => n.id === editingItem.id ? { ...formData, id: n.id } : n));
      logActivity?.('updated', formData.title, 'news');
      toast.success('Announcement updated!');
    } else {
      setNews([...news, { ...formData, id: Date.now() }]);
      logActivity?.('created', formData.title, 'news');
      toast.success('Announcement created!');
    }
    setIsModalOpen(false);
  };

  const inp = 'w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800';

  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search news..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none w-64 md:w-80 transition-all text-slate-700 placeholder-slate-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2 focus:ring-4 focus:ring-blue-200 outline-none"
          onClick={openAddModal}
        >
          <Plus size={18} /> New Notice
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[750px]">
            <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr_80px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
              <div>TITLE / HEADLINE</div>
              <div>DATE</div>
              <div>AUTHOR</div>
              <div>READ TIME</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 h-full max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredNews.map(item => (
                <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_0.8fr_80px] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-2 pr-4 min-w-0">
                    {item.isFeatured && (
                      <Star size={14} className="text-amber-400 shrink-0 fill-amber-400" />
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider hidden sm:block shrink-0 ${item.type === 'Announcement' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.type}
                    </span>
                    <span className="font-bold text-slate-800 text-sm font-display truncate">{item.title}</span>
                  </div>
                  <div className="text-sm text-slate-600 font-medium truncate">{item.date}</div>
                  <div className="text-sm text-slate-600 font-medium truncate">{item.author}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.readTime || '—'}</div>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors outline-none" onClick={() => { setEditingItem(item); setFormData({ ...item }); setIsModalOpen(true); }}><Edit2 size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {filteredNews.length === 0 && <div className="p-12 text-center text-slate-800 font-display font-bold text-lg opacity-80">Data not found</div>}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Notice' : 'New Notice'} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Headline *</label>
          <input type="text" className={inp} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Type</label>
            <select className={inp} value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
              <option>News</option>
              <option>Announcement</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Category</label>
            <select className={inp} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              {NEWS_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Date</label>
            <input type="date" className={inp} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Read Time</label>
            <input type="text" className={inp} placeholder="e.g. 3 min" value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Author</label>
          <input type="text" className={inp} value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
        </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Cover Image</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => fileRef.current?.click()} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                {formData.image ? 'Change Image' : 'Upload Image'}
              </button>
              {formData.image && (
                <div className="flex items-center gap-2">
                  <img src={formData.image} alt="Cover" className="h-10 w-16 object-cover rounded-lg border border-slate-200" />
                  <button type="button" onClick={() => setFormData({ ...formData, image: null })} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
          
          <div className="p-px bg-slate-200 my-1" />

          {/* Files */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Attachments / Documents</label>
              <button type="button" onClick={() => docRef.current?.click()} className="text-xs text-blue-600 font-semibold hover:underline">
                + Upload File
              </button>
            </div>
            {formData.documents?.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {formData.documents.map((file, i) => (
                  <div key={i} className="flex flex-row items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <div className="flex items-center gap-2 truncate pr-4">
                      <span className="truncate text-slate-700 font-medium">{file.name}</span>
                      <span className="text-slate-400 text-xs shrink-0">({file.size})</span>
                    </div>
                    <button type="button" onClick={() => removeDocument(i)} className="text-slate-400 hover:text-red-500 shrink-0">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input ref={docRef} type="file" multiple className="hidden" onChange={handleDocumentUpload} />
          </div>

        {/* Featured toggle */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="h-4 w-4 rounded accent-amber-500 cursor-pointer"
          />
          <label htmlFor="isFeatured" className="text-sm font-semibold text-amber-800 cursor-pointer flex items-center gap-1.5">
            <Star size={14} className="text-amber-500 fill-amber-400" /> Mark as Featured
          </label>
        </div>
      </Modal>
    </div>
  );
}
