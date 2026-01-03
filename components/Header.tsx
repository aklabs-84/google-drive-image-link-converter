import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToWarning = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('warning-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-blue-600 transition-colors"
            >
              사용 방법
            </button>
            <a
              href="#warning-section"
              onClick={scrollToWarning}
              className="hover:text-blue-600 transition-colors"
            >
              주의 사항
            </a>
            <a
              href="https://litt.ly/aklabs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
              title="AKLABS 홈페이지"
            >
              <i className="fa-solid fa-globe text-xl"></i>
            </a>
          </div>
        </div>
      </header>

      {/* How to use Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <i className="fa-solid fa-circle-info text-blue-600 mr-2"></i>
                사용 방법 안내
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    구글 드라이브에서 공유할 이미지 파일을 <span className="font-bold text-slate-800">우클릭</span>합니다.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    <span className="font-bold text-slate-800">[공유]</span> 메뉴를 클릭하고 액세스 권한을 <span className="font-bold text-blue-600">'링크가 있는 모든 사용자'</span>로 변경합니다.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    <span className="font-bold text-slate-800">[링크 복사]</span>를 눌러 주소를 가져옵니다.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    가져온 링크를 <span className="font-bold text-blue-600">GDrive Linker</span> 입력창에 붙여넣으면 즉시 변환됩니다!
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 italic text-sm text-slate-500">
                Tip: 변환된 '직접 링크'는 블로그, 노션, 깃허브 등 외부 서비스에서 이미지를 바로 불러올 때 아주 유용합니다.
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                확인했습니다
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
