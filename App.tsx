
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Converter from './components/Converter';
import WarningSection from './components/WarningSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            구글 드라이브 이미지 링크 변환기
          </h2>
          <p className="text-slate-600 text-lg">
            공유 링크를 넣으면 바로 사용할 수 있는 링크, HTML, 마크다운 코드로 변환해 드립니다.
          </p>
        </div>

        <Converter />

        <WarningSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
