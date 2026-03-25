import React, { useState } from 'react';
import ResultBox from './ResultBox';

interface DriveFile {
  id: string;
  name: string;
}

interface FolderResultProps {
  files: DriveFile[];
}

const FolderResult: React.FC<FolderResultProps> = ({ files }) => {
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  if (files.length === 0) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center mt-6">
        <i className="fa-solid fa-folder-open text-3xl text-slate-300 mb-2"></i>
        <p className="text-slate-500 font-medium">폴더 내에 이미지 파일이 없습니다.</p>
        <p className="text-slate-400 text-xs mt-1">공유 설정이나 이미지 형식(jpg, png 등)을 확인해 주세요.</p>
      </div>
    );
  }

  const getDirectLink = (id: string) => `https://drive.google.com/uc?id=${id}`;
  const getRecommendedLink = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  const getHtmlTag = (id: string) => `<img src="https://drive.google.com/thumbnail?id=${id}&sz=w1000">`;
  const getMarkdownTag = (id: string) => `![이미지](https://drive.google.com/thumbnail?id=${id}&sz=w1000)`;

  // 일괄 복사 핸들러
  const copyAll = async (type: 'url' | 'recommended' | 'html' | 'md') => {
    let text = '';
    files.forEach((file) => {
      if (type === 'url') text += `${getDirectLink(file.id)}\n`;
      if (type === 'recommended') text += `${getRecommendedLink(file.id)}\n`;
      if (type === 'html') text += `${getHtmlTag(file.id)}\n`;
      if (type === 'md') text += `${getMarkdownTag(file.id)}\n`;
    });

    try {
      await navigator.clipboard.writeText(text.trim());
      setIsCopied(type);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy all!', err);
    }
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. 일괄 복사 섹션 */}
      <div className="bg-white p-7 rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-300">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <i className="fa-solid fa-layer-group text-lg"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xl">
                폴더 이미지 일괄 변환 ({files.length}개)
              </h4>
              <p className="text-slate-400 text-xs mt-0.5"> 원하는 형식을 클릭하면 모든 링크가 한 번에 복사됩니다.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          <button
            onClick={() => copyAll('url')}
            className={`group relative overflow-hidden px-4 py-3.5 rounded-2xl text-sm font-bold transition-all border-2 flex items-center justify-center space-x-2 ${
              isCopied === 'url' ? 'bg-green-500 border-green-500 text-white shadow-xl shadow-green-100 scale-[0.98]' : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200 shadow-sm'
            }`}
          >
            <i className={`fa-solid ${isCopied === 'url' ? 'fa-check' : 'fa-link'}`}></i>
            <span>직접 링크 {isCopied === 'url' ? '완료' : '전체복사'}</span>
          </button>
          
          <button
            onClick={() => copyAll('recommended')}
            className={`group relative overflow-hidden px-4 py-3.5 rounded-2xl text-sm font-bold transition-all border-2 flex items-center justify-center space-x-2 ${
              isCopied === 'recommended' ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 scale-[0.98]' : 'bg-blue-50 hover:bg-blue-100 border-blue-100 text-blue-600 shadow-sm'
            }`}
          >
            <i className={`fa-solid ${isCopied === 'recommended' ? 'fa-check' : 'fa-wand-magic-sparkles'}`}></i>
            <span>추천 링크 {isCopied === 'recommended' ? '완료' : '전체복사'}</span>
          </button>

          <button
            onClick={() => copyAll('html')}
            className={`group relative overflow-hidden px-4 py-3.5 rounded-2xl text-sm font-bold transition-all border-2 flex items-center justify-center space-x-2 ${
              isCopied === 'html' ? 'bg-slate-800 border-slate-800 text-white shadow-xl shadow-slate-200 scale-[0.98]' : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200 shadow-sm'
            }`}
          >
            <i className={`fa-solid ${isCopied === 'html' ? 'fa-check' : 'fa-code'}`}></i>
            <span>HTML {isCopied === 'html' ? '완료' : '전체복사'}</span>
          </button>

          <button
            onClick={() => copyAll('md')}
            className={`group relative overflow-hidden px-4 py-3.5 rounded-2xl text-sm font-bold transition-all border-2 flex items-center justify-center space-x-2 ${
              isCopied === 'md' ? 'bg-slate-800 border-slate-800 text-white shadow-xl shadow-slate-200 scale-[0.98]' : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200 shadow-sm'
            }`}
          >
            <i className={`fa-solid ${isCopied === 'md' ? 'fa-check' : 'fa-hashtag'}`}></i>
            <span>마크다운 {isCopied === 'md' ? '완료' : '전체복사'}</span>
          </button>
        </div>
      </div>


      {/* 2. 이미지 그리드 리스트 (벤토 그리드 느낌) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file) => {
          const isFailed = failedImages.includes(file.id);
          const thumb = getRecommendedLink(file.id);
          return (
            <div key={file.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3 relative flex items-center justify-center border border-slate-50">
                {!isFailed ? (
                  <img
                    src={thumb}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(file.id)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-300 p-4 text-center">
                    <i className="fa-solid fa-image-slash text-2xl mb-1 opacity-50"></i>
                    <span className="text-xs font-medium text-slate-400">불러오기 실패</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => navigator.clipboard.writeText(getRecommendedLink(file.id))}
                    className="p-2 bg-white rounded-lg text-slate-700 shadow-md hover:bg-slate-50 transition-all text-xs font-semibold"
                    title="추천 링크 복사"
                  >
                    <i className="fa-solid fa-copy"></i>
                  </button>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700 truncate w-full" title={file.name}>
                {file.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FolderResult;
