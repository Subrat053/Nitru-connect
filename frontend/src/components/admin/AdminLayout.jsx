import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Inbox, Layers, Settings, LogOut, ShieldCheck, Menu, MessageSquare, Users, BookOpen, Folder } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <BarChart3 size={16} /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <Inbox size={16} /> },
    { name: 'Services', path: '/admin/services', icon: <Layers size={16} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare size={16} /> },
    { name: 'Partners', path: '/admin/partners', icon: <Users size={16} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <BookOpen size={16} /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings size={16} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 gap-2 shrink-0">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 shadow-sm shrink-0">
          <ShieldCheck className="text-primary" size={18} />
        </div>
        <span className="font-bold text-sm tracking-tight text-neutral">Nitru Control Center</span>
      </div>

      {/* Sidebar Navigation Links */}
      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-white/40 hover:text-primary'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-primary/75'}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/5 transition-all active:scale-95"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fc] flex font-montserrat relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-[90px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none float-medium" />

      {/* Desktop Sidebar - Sticky Left Column */}
      <aside className="hidden md:flex md:flex-col w-64 glass-panel sticky top-0 h-screen self-start shrink-0 border-y-0 border-l-0 border-r border-white/50 bg-white/40 shadow-lg overflow-y-auto no-scrollbar">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-neutral/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Mobile Drawer Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-64 glass-panel z-50 md:hidden flex flex-col border-y-0 border-l-0 border-r border-white/50 bg-white/80 shadow-2xl transition-transform duration-300 transform ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto no-scrollbar relative z-10">
        {/* Admin Page Header */}
        <header className="h-20 bg-white/40 border-b border-white/50 flex items-center justify-between px-6 md:px-8 shadow-sm shrink-0 backdrop-blur-md">
          <div className="flex items-center">
            {/* Mobile Sidebar Toggle Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden text-neutral hover:text-primary mr-4 focus:outline-none p-1.5 rounded-xl hover:bg-white/80 border border-transparent hover:border-white shadow-sm transition-all bg-white/40"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm md:text-base font-extrabold text-neutral truncate">
              {navItems.find((item) => item.path === location.pathname || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path)))?.name || 'Admin Panel'}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center font-bold text-primary text-xs shrink-0 border border-primary/10">
              A
            </div>
            <span className="text-[10px] font-bold text-gray-500 hidden sm:inline truncate max-w-[150px] uppercase">
              {localStorage.getItem('admin_email') || 'admin@nitruconnect.com'}
            </span>
          </div>
        </header>

        {/* Content Page Outlet */}
        <div className="p-4 md:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
