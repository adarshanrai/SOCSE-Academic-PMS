import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardView from './views/DashboardView';
import ProjectRegistryView from './views/ProjectRegistryView';
import StudentGroupsView from './views/StudentGroupsView';
import NewsAnnouncementsView from './views/NewsAnnouncementsView';
import AcademicHierarchyView from './views/AcademicHierarchyView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import TestimonialView from './views/TestimonialView';
import BlogForumView from './views/BlogForumView';

// ── JWT-style simulation helpers (frontend-only, no secret needed) ─────────
const JWT_KEY = 'socse_jwt';

function generateToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: user.email, role: user.role, iat: Date.now(), exp: Date.now() + 86400000 }));
  const sig = btoa(`${user.email}:${user.role}:socse_secret`);
  return `${header}.${payload}.${sig}`;
}

function verifyToken(token) {
  try {
    const [, payloadB64] = token.split('.');
    const payload = JSON.parse(atob(payloadB64));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// ── Seed / initial data ───────────────────────────────────────────────────
const initialProjectsData = [
  {
    id: 1, title: 'AI-Based Attendance System', dept: 'Computer Science and Engineering (B.Tech)',
    semester: 'Semester 6', status: 'Ongoing', progress: 75, assignedGroup: 'Alpha Coders (G1)',
    category: 'AI/ML', year: '2025', description: 'Uses computer vision to automate attendance.',
    tags: 'AI,Computer Vision,Attendance',
    mentorInfo: { name: 'Dr. A. Gupta', email: 'agupta@socse.edu', dept: 'CSE' },
    teamMembers: [{ name: 'Rahul Sharma', role: 'Lead', year: '3rd' }],
    gallery: [], methodology: ['Problem Identification', 'Data Collection', 'Model Training'],
    milestones: { phase: 'Development', deadline: '2025-06-01', status: 'In Progress' },
  },
  {
    id: 2, title: 'Student Management Portal', dept: 'Bachelor of Computer Applications (BCA)',
    semester: 'Semester 4 (Mini Project)', status: 'Completed', progress: 100, assignedGroup: 'None',
    category: 'Web', year: '2024', description: 'Portal for managing student data.',
    tags: 'Web,React,Node',
    mentorInfo: { name: 'Prof. S. Kumar', email: 'skumar@socse.edu', dept: 'BCA' },
    teamMembers: [{ name: 'Priya Singh', role: 'Full Stack', year: '2nd' }],
    gallery: [], methodology: ['Requirement Analysis', 'Design', 'Development'],
    milestones: { phase: 'Completed', deadline: '2024-12-15', status: 'Done' },
  },
  {
    id: 3, title: 'Library Resource Tracker', dept: 'Master of Computer Applications (MCA)',
    semester: 'Semester 2', status: 'Pending', progress: 20, assignedGroup: 'Data Miners (G2)',
    category: 'Database', year: '2025', description: 'Track and manage library resources.',
    tags: 'Database,RFID',
    mentorInfo: { name: 'Dr. V. Reddy', email: 'vreddy@socse.edu', dept: 'MCA' },
    teamMembers: [{ name: 'Amit Patel', role: 'Backend', year: '1st' }],
    gallery: [], methodology: ['Research'],
    milestones: { phase: 'Planning', deadline: '2025-08-01', status: 'Pending' },
  },
  {
    id: 4, title: 'Campus Navigation App', dept: 'Computer Science and Engineering (B.Tech)',
    semester: 'Semester 8 (Major Project)', status: 'Ongoing', progress: 45, assignedGroup: 'None',
    category: 'Mobile', year: '2025', description: 'Indoor navigation application for campus.',
    tags: 'Mobile,Maps,GPS',
    mentorInfo: { name: 'Dr. A. Gupta', email: 'agupta@socse.edu', dept: 'CSE' },
    teamMembers: [{ name: 'Sneha Roy', role: 'Mobile Dev', year: '4th' }],
    gallery: [], methodology: ['Survey', 'Prototyping'],
    milestones: { phase: 'Design', deadline: '2025-09-01', status: 'In Progress' },
  },
];

const initialGroupsData = [
  { id: 1, name: 'Alpha Coders (G1)', leader: 'Rahul Sharma', teacher: 'Dr. A. Gupta', project: 'AI-Based Attendance System' },
  { id: 2, name: 'Data Miners (G2)', leader: 'Priya Singh', teacher: 'Prof. S. Kumar', project: 'Library Resource Tracker' },
  { id: 3, name: 'Cyber Sec (G3)', leader: 'Amit Patel', teacher: 'Dr. V. Reddy', project: 'Campus Network Audit' },
];

const initialDepartmentsData = [
  { id: 'dept-1', name: 'Computer Science and Engineering (B.Tech)', semesters: ['Semester 1', 'Semester 2', 'Semester 6', 'Semester 8 (Major Project)'] },
  { id: 'dept-2', name: 'Bachelor of Computer Applications (BCA)', semesters: ['Semester 4 (Mini Project)', 'Semester 6 (Final Project)'] },
  { id: 'dept-3', name: 'Master of Computer Applications (MCA)', semesters: ['Semester 2', 'Semester 4'] },
];

const initialNewsData = [
  { id: 1, title: 'Final Project Submission Deadline Extended', date: '2025-04-15', author: 'Admin', type: 'Announcement', category: 'Academic', readTime: '2 min', image: null, isFeatured: true },
  { id: 2, title: 'New Cloud Computing Lab Available', date: '2025-03-20', author: 'IT Dept', type: 'News', category: 'Infrastructure', readTime: '3 min', image: null, isFeatured: false },
];

const initialTestimonialsData = [
  { id: 1, name: 'Rahul Sharma', role: 'B.Tech CSE, 2024', message: 'The project management system helped us stay organized and deliver on time. Great platform!', rating: 5, avatar: null, date: '2024-12-10', isApproved: true },
  { id: 2, name: 'Priya Singh', role: 'BCA, 2025', message: 'Very intuitive and easy to use. Our team coordination improved significantly.', rating: 4, avatar: null, date: '2025-01-15', isApproved: true },
];

const initialBlogPostsData = [
  { id: 1, title: 'How AI is Transforming Academic Research', author: 'Dr. A. Gupta', content: '<p>Artificial Intelligence is revolutionizing the way academic research is conducted...</p>', category: 'Technology', tags: 'AI,Research,Academia', date: '2025-03-01', status: 'Published', isTrending: true, isHotTake: false, isFeatured: true, isPinned: false },
  { id: 2, title: 'Student Projects That Went Viral in 2024', author: 'Admin', content: '<p>Several student projects from our department gained national attention last year...</p>', category: 'Students', tags: 'Projects,Students,2024', date: '2025-02-15', status: 'Published', isTrending: false, isHotTake: true, isFeatured: false, isPinned: true },
  { id: 3, title: 'Draft: New Semester Project Guidelines', author: 'Admin', content: '<p>This draft outlines the updated guidelines for semester projects...</p>', category: 'Academic', tags: 'Guidelines,Semester', date: '2025-03-10', status: 'Draft', isTrending: false, isHotTake: false, isFeatured: false, isPinned: false },
];

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const [projects, setProjects] = useState(initialProjectsData);
  const [groups, setGroups] = useState(initialGroupsData);
  const [departments, setDepartments] = useState(initialDepartmentsData);
  const [news, setNews] = useState(initialNewsData);
  const [testimonials, setTestimonials] = useState(initialTestimonialsData);
  const [blogPosts, setBlogPosts] = useState(initialBlogPostsData);

  // Activity log for dashboard feed
  const [activityLog, setActivityLog] = useState([
    { id: 1, action: 'created', entity: 'AI-Based Attendance System', module: 'project', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, action: 'approved', entity: 'Rahul Sharma testimonial', module: 'testimonial', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, action: 'published', entity: 'How AI is Transforming...', module: 'blog', timestamp: new Date(Date.now() - 10800000).toISOString() },
  ]);

  const logActivity = (action, entity, module) => {
    setActivityLog(prev => [
      { id: Date.now(), action, entity, module, timestamp: new Date().toISOString() },
      ...prev.slice(0, 49),
    ]);
  };

  // JWT-based session restore
  useEffect(() => {
    const token = localStorage.getItem(JWT_KEY);
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        const storedUsers = JSON.parse(localStorage.getItem('socse_users') || '[]');
        const user = storedUsers.find(u => u.email === payload.sub);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(JWT_KEY);
        }
      } else {
        localStorage.removeItem(JWT_KEY);
      }
    }
  }, []);

  const handleLogin = (user) => {
    const token = generateToken(user);
    localStorage.setItem(JWT_KEY, token);
    localStorage.setItem('socse_current_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem('socse_current_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthView('login');
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard':    return 'Admin Dashboard';
      case 'projects':     return 'Project Registry';
      case 'news':         return 'News & Announcements';
      case 'groups':       return 'Student Groups';
      case 'departments':  return 'Academic Hierarchy';
      case 'testimonials': return 'Testimonials';
      case 'blogs':        return 'Blog / Forum';
      case 'settings':     return 'Settings';
      default:             return 'Dashboard';
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setGlobalSearchQuery('');
  }, [currentView]);

  if (!isAuthenticated) {
    if (authView === 'login') {
      return <LoginView onLogin={handleLogin} navigateToRegister={() => setAuthView('register')} />;
    } else {
      return <RegisterView onRegister={handleLogin} navigateToLogin={() => setAuthView('login')} />;
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-10 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar
          title={getTitle()}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          searchQuery={globalSearchQuery}
          setSearchQuery={setGlobalSearchQuery}
          projects={projects}
          groups={groups}
          news={news}
          setCurrentView={setCurrentView}
        />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6 pb-20">
            {currentView === 'dashboard' && (
              <DashboardView
                projects={projects}
                groups={groups}
                testimonials={testimonials}
                blogPosts={blogPosts}
                activityLog={activityLog}
              />
            )}
            {currentView === 'projects' && (
              <ProjectRegistryView
                projects={projects}
                setProjects={setProjects}
                groups={groups}
                setGroups={setGroups}
                departments={departments}
                globalSearchQuery={globalSearchQuery}
                logActivity={logActivity}
              />
            )}
            {currentView === 'groups' && (
              <StudentGroupsView
                groups={groups}
                setGroups={setGroups}
                projects={projects}
                globalSearchQuery={globalSearchQuery}
              />
            )}
            {currentView === 'news' && (
              <NewsAnnouncementsView
                news={news}
                setNews={setNews}
                globalSearchQuery={globalSearchQuery}
                logActivity={logActivity}
              />
            )}
            {currentView === 'departments' && (
              <AcademicHierarchyView
                departments={departments}
                setDepartments={setDepartments}
                globalSearchQuery={globalSearchQuery}
              />
            )}
            {currentView === 'testimonials' && (
              <TestimonialView
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                logActivity={logActivity}
              />
            )}
            {currentView === 'blogs' && (
              <BlogForumView
                blogPosts={blogPosts}
                setBlogPosts={setBlogPosts}
                logActivity={logActivity}
              />
            )}
            {currentView === 'settings' && (
              <SettingsView
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
