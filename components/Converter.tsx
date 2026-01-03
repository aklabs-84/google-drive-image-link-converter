
import React, { useState, useEffect } from 'react';
import ResultBox from './ResultBox';

const Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fileId, setFileId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const extractFileId = (url: string) => {
    // Matches patterns:
    // /file/d/[ID]/view
    // /open?id=[ID]
    // /d/[ID]/edit
    const regex = /(?:\/file\/d\/|\/d\/|id=)([\w-]{25,})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const id = extractFileId(value);
    setFileId(id);
    setImgError(false);
  };

  const directLink = fileId ? `https://drive.google.com/uc?id=${fileId}` : '';
  // 마크다운/HTML 등에서 훨씬 더 안정적으로 보이고 보안 검사를 우회하는 Thumbnail API (추천)
  const recommendedLink = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : '';

  const htmlTag = fileId ? `<img src="${recommendedLink}">` : '';
  const markdownTag = fileId ? `![이미지](${recommendedLink})` : '';

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(type);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
          구글 드라이브 공유 링크를 입력하세요
        </label>
        <div className="relative group">
          <input
            type="text"
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 placeholder-slate-400"
            placeholder="https://drive.google.com/file/d/..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
            <i className="fa-solid fa-link text-lg"></i>
          </div>
        </div>

        {inputValue && !fileId && (
          <p className="mt-3 text-red-500 text-sm flex items-center">
            <i className="fa-solid fa-circle-exclamation mr-1.5"></i>
            올바른 구글 드라이브 링크 형식이 아닙니다.
          </p>
        )}
      </div>

      {fileId && (
        <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultBox
            title="직접 링크 (Direct URL)"
            value={directLink}
            onCopy={() => copyToClipboard(directLink, 'url')}
            isCopied={isCopied === 'url'}
          />
          <ResultBox
            title="추천 링크 (Bypass Thumbnail)"
            value={recommendedLink}
            onCopy={() => copyToClipboard(recommendedLink, 'recommended')}
            isCopied={isCopied === 'recommended'}
          />
          <ResultBox
            title="HTML 태그"
            value={htmlTag}
            onCopy={() => copyToClipboard(htmlTag, 'html')}
            isCopied={isCopied === 'html'}
          />
          <ResultBox
            title="마크다운 (Markdown)"
            value={markdownTag}
            onCopy={() => copyToClipboard(markdownTag, 'md')}
            isCopied={isCopied === 'md'}
          />

          {/* 사용자 요청 디자인에 맞춘 이미지 미리보기 섹션 */}
          <div className="bg-[#f2f8ff] border border-[#dae9fb] rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-shrink-0 bg-white rounded-lg shadow-sm overflow-hidden w-28 h-28 flex items-center justify-center border border-[#cfe2f5]">
              {!imgError ? (
                <img
                  src={recommendedLink}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 p-4 text-center">
                  <i className="fa-solid fa-image-slash text-xl mb-1 opacity-50"></i>
                  <span className="text-[11px] font-medium leading-tight text-slate-400">이미지를<br />불러올 수 없음</span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-grow self-center">
              <h4 className="font-bold text-[#23469e] text-[17px] mb-1.5">이미지 미리보기</h4>
              <p className="text-[#4578e6] text-[14px] leading-relaxed">
                위 링크를 사용하면 다른 웹사이트에서도 위와 같이 이미지가 보여집니다.
              </p>
              <p className="text-[#7aa5f0] text-[12px] mt-1">
                * 링크가 유효하지 않거나 비공개 파일이면 미리보기가 표시되지 않을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Converter;
