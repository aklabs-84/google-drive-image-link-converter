
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fa-brands fa-google-drive text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            GDrive <span className="text-blue-600">Linker</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">사용 방법</a>
          <a href="#" className="hover:text-blue-600 transition-colors">주의 사항</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
            <i className="fa-brands fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
