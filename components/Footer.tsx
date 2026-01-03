
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm mb-4">
          © {new Date().getFullYear()} GDrive Linker. All rights reserved. <br />
          본 서비스는 구글 드라이브의 공식 기능이 아닌 URL 파싱을 통한 편의 도구입니다.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center space-x-6 text-slate-400">
            <a href="https://litt.ly/aklabs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 text-sm font-medium">
              <i className="fa-solid fa-house"></i>
              AKLABS 홈페이지
            </a>
            <span className="text-slate-200">|</span>
            <a href="https://github.com/aklabs-84" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
