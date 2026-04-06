import React, { useState, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle, EyeOff, TrendingUp, Flame, Pin, Star, X, Bold, Italic, List } from 'lucide-react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

// ── Lightweight Rich Text Editor (no external deps) ───────────────────────
function RichTextEditor({ value, onChange }) {
  const textareaRef = useRef(null);

  const wrapSelection = (before, after = before) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const selected = value.slice(start, end);
    const newVal = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(newVal);
    // Restore cursor
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length);
    });
  };

  const insertLine = (prefix) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newVal = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(newVal);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length);
    });
  };

  const toolbarBtn = (onClick, icon, title) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-slate-50 border-b border-slate-200">
        {toolbarBtn(() => wrapSelection('**'), <Bold size={15} />, 'Bold')}
        {toolbarBtn(() => wrapSelection('_'),  <Italic size={15} />, 'Italic')}
        <div className="w-px h-4 bg-slate-200 mx-1" />
        {toolbarBtn(() => insertLine('• '),   <List size={15} />, 'Bullet List')}
        {toolbarBtn(() => insertLine('1. '),  <span className="text-xs font-bold">1.</span>, 'Numbered List')}
      </div>
      {/* Editor Area */}
      <textarea
        ref={textareaRef}
        rows={7}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write your post content here... (use toolbar for basic formatting)"
        className="w-full px-3 py-2 text-sm text-slate-800 bg-white outline-none resize-none leading-relaxed"
      />
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────
const BLOG_CATEGORIES = ['Technology', 'Students', 'Academic', 'Research', 'Events', 'Other'];
const STATUSES        = ['Draft', 'Published', 'Hidden'];

const emptyPost = {
  title: '', author: 'Admin', content: '', category: 'Technology', tags: '',
  date: '', status: 'Draft', isTrending: false, isHotTake: false, isFeatured: false, isPinned: false,
  image: null, attachments: [],
};

const STATUS_STYLES = {
  Published: 'bg-emerald-100 text-emerald-800',
  Draft:     'bg-amber-100 text-amber-800',
  Hidden:    'bg-slate-100 text-slate-500',
};

const FlagChip = ({ active, label, icon: Icon, color }) => active ? (
  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 ${color}`}>
    <Icon size={10} />{label}
  </span>
) : null;

// ── Main Component ────────────────────────────────────────────────────────
export default function BlogForumView({ blogPosts, setBlogPosts, logActivity }) {
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [editingPost,  setEditingPost]  = useState(null);
  const [formData,     setFormData]     = useState(emptyPost);
  
  const imageRef = useRef(null);
  const attachmentRef = useRef(null);

  const filtered = blogPosts.filter(p => {
    const q           = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || (p.author || '').toLowerCase().includes(q);
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    if (!window.confirm('Delete this post?')) return;
    const p = blogPosts.find(p => p.id === id);
    setBlogPosts(blogPosts.filter(p => p.id !== id));
    logActivity?.('deleted', p?.title, 'blog');
    toast.success('Post deleted.');
  };

  const handleApprove = (id) => {
    const p = blogPosts.find(p => p.id === id);
    setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, status: 'Published' } : p));
    logActivity?.('published', p?.title, 'blog');
    toast.success('Post published!');
  };

  const handleHide = (id) => {
    const p = blogPosts.find(p => p.id === id);
    setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, status: 'Hidden' } : p));
    logActivity?.('hidden', p?.title, 'blog');
    toast.success('Post hidden.');
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({ ...emptyPost, date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({ ...emptyPost, ...post });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(f => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newAttachments = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
    }));
    setFormData(f => ({ ...f, attachments: [...(f.attachments || []), ...newAttachments] }));
  };

  const removeAttachment = (index) => {
    setFormData(f => ({ ...f, attachments: (f.attachments || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) { toast.error('Title is required.'); return; }
    if (editingPost) {
      setBlogPosts(blogPosts.map(p => p.id === editingPost.id ? { ...formData, id: p.id } : p));
      logActivity?.('updated', formData.title, 'blog');
      toast.success('Post updated!');
    } else {
      setBlogPosts([...blogPosts, { ...formData, id: Date.now() }]);
      logActivity?.('created', formData.title, 'blog');
      toast.success('Post created!');
    }
    setIsModalOpen(false);
  };

  const toggle = (field) => setFormData(f => ({ ...f, [field]: !f[field] }));
  const inp    = 'w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2 outline-none transition-all text-sm text-slate-800';

  return (
    <div className="flex flex-col gap-6 h-full font-sans">

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 shadow-sm">
        <div className="relative flex items-center flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts..."
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none w-full transition-all text-slate-700 placeholder-slate-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>

        {(search || filterStatus) && (
          <button className="text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors" onClick={() => { setSearch(''); setFilterStatus(''); }}>
            <X size={14} /> Clear
          </button>
        )}

        <div className="flex-1" />
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2 outline-none">
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_120px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
              <div>TITLE / FLAGS</div>
              <div>CATEGORY</div>
              <div>AUTHOR</div>
              <div>STATUS</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 max-h-[calc(100vh-260px)] overflow-y-auto">
              {filtered.map(post => (
                <div key={post.id} className="grid grid-cols-[2.5fr_1fr_1fr_1fr_120px] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group">
                  <div className="flex flex-col gap-1.5 min-w-0 pr-4">
                    <span className="font-bold text-slate-800 text-sm font-display truncate">{post.title}</span>
                    <div className="flex items-center gap-1 flex-wrap">
                      <FlagChip active={post.isTrending} label="Trending" icon={TrendingUp} color="bg-blue-100 text-blue-700" />
                      <FlagChip active={post.isHotTake}  label="Hot Take" icon={Flame}      color="bg-red-100 text-red-700" />
                      <FlagChip active={post.isFeatured} label="Featured" icon={Star}       color="bg-amber-100 text-amber-700" />
                      <FlagChip active={post.isPinned}   label="Pinned"   icon={Pin}        color="bg-purple-100 text-purple-700" />
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">{post.category}</div>
                  <div className="text-sm text-slate-600 font-medium truncate">{post.author}</div>
                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${STATUS_STYLES[post.status] || 'bg-slate-100 text-slate-600'}`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-opacity">
                    {post.status !== 'Published' && (
                      <button title="Approve / Publish" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors outline-none" onClick={() => handleApprove(post.id)}>
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {post.status === 'Published' && (
                      <button title="Hide Post" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors outline-none" onClick={() => handleHide(post.id)}>
                        <EyeOff size={16} />
                      </button>
                    )}
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors outline-none" onClick={() => openEditModal(post)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none" onClick={() => handleDelete(post.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div className="p-12 text-center text-slate-800 font-display font-bold text-lg opacity-80">No posts found</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPost ? 'Edit Post' : 'New Post'} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Post Title *</label>
          <input type="text" className={inp} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Category</label>
            <select className={inp} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              {BLOG_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select className={inp} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Author</label>
            <input type="text" className={inp} value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Date</label>
            <input type="date" className={inp} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Tags <span className="text-xs text-slate-400 font-normal">(comma-separated)</span></label>
          <input type="text" className={inp} placeholder="AI, Research, 2025" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
        </div>

        {/* Media & Attachments */}
        <div className="flex flex-col gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <label className="text-sm font-semibold text-slate-700">Media & Attachments</label>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Cover Image</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => imageRef.current?.click()} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors shadow-sm">
                {formData.image ? 'Change Cover' : 'Upload Cover Image'}
              </button>
              {formData.image && (
                <div className="flex items-center gap-2">
                  <img src={formData.image} alt="Cover" className="h-10 w-16 object-cover rounded border border-slate-200" />
                  <button type="button" onClick={() => setFormData({ ...formData, image: null })} className="text-xs text-red-500 hover:text-red-600 hover:underline">Remove</button>
                </div>
              )}
            </div>
            <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          <div className="w-full h-px bg-slate-200 my-1" />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Files & Documents</span>
            <div>
              <button type="button" onClick={() => attachmentRef.current?.click()} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors shadow-sm">
                Add Attachment
              </button>
            </div>
            {formData.attachments?.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-2">
                {formData.attachments.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded-lg text-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="shrink-0 p-1 bg-blue-50 text-blue-600 rounded"><Pin size={14} /></div>
                      <span className="truncate text-slate-700 font-medium">{file.name}</span>
                      <span className="shrink-0 text-slate-400 text-xs">({file.size})</span>
                    </div>
                    <button type="button" onClick={() => removeAttachment(i)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input ref={attachmentRef} type="file" multiple className="hidden" onChange={handleAttachmentUpload} />
          </div>
        </div>

        {/* Custom Rich Text Editor — no external deps */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Content</label>
          <RichTextEditor value={formData.content} onChange={val => setFormData({ ...formData, content: val })} />
        </div>

        {/* Flags */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Post Flags</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              ['isTrending', 'Trending', 'bg-blue-50 border-blue-100 text-blue-800'],
              ['isHotTake',  'Hot Take', 'bg-red-50 border-red-100 text-red-800'],
              ['isFeatured', 'Featured', 'bg-amber-50 border-amber-100 text-amber-800'],
              ['isPinned',   'Pinned',   'bg-purple-50 border-purple-100 text-purple-800'],
            ].map(([field, label, colorClass]) => (
              <div key={field} className={`flex items-center gap-2 rounded-xl border p-3 ${colorClass}`}>
                <input type="checkbox" id={field} checked={formData[field]} onChange={() => toggle(field)} className="h-4 w-4 rounded cursor-pointer" />
                <label htmlFor={field} className="text-sm font-semibold cursor-pointer">{label}</label>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
