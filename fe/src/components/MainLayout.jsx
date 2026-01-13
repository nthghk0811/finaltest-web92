import React from 'react';
import { LayoutDashboard, Users, BookOpen, Menu } from 'lucide-react';


const MainLayout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">

      <div className="w-64 bg-white shadow-md flex flex-col">

        <div className="p-5 flex items-center gap-2 border-b">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold">S</div>
          <span className="text-xl font-bold text-blue-900">School System</span>
        </div>


        <nav className="flex-1 p-4 space-y-2">
          <div className="text-gray-500 text-xs font-semibold uppercase mb-2">Quản lý</div>

          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md">
            <LayoutDashboard size={18} /> Tổng quan
          </button>

          <button
            onClick={() => onTabChange('teachers')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${activeTab === 'teachers'
                ? 'bg-purple-50 text-purple-700 font-medium'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
          >
            <Users size={18} /> Giáo viên
          </button>

          <button
            onClick={() => onTabChange('positions')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${activeTab === 'positions'
                ? 'bg-purple-50 text-purple-700 font-medium'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
          >
            <BookOpen size={18} /> Vị trí công tác
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Menu size={20} /> <span>16/10/2024 - Hệ thống giáo dục</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm font-bold">Admin</div>
              <div className="text-xs text-red-500 bg-red-100 px-1 rounded inline-block">ADMIN</div>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>


        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;