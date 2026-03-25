import React, { useState, useEffect } from 'react';
import ResultBox from './ResultBox';
import GasGuide from './GasGuide';
import FolderResult from './FolderResult';

interface DriveFile {
  id: string;
  name: string;
}

const Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fileId, setFileId] = useState<string | null>(null);
  const [isFolder, setIsFolder] = useState(false);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  // 폴더 전용 상태
  const [gasUrl, setGasUrl] = useState('');
  const [folderFiles, setFolderFiles] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  // 로컬 스토리지에서 이전 GAS URL 불러오기
  useEffect(() => {
    const savedGasUrl = localStorage.getItem('gasUrl');
    if (savedGasUrl) {
      setGasUrl(savedGasUrl);
    }
  }, []);

  const extractFileId = (url: string) => {
    const folderRegex = /(?:\/folders\/)([\w-]{25,})/;
    const fileRegex = /(?:\/file\/d\/|\/d\/|id=)([\w-]{25,})/;

    const folderMatch = url.match(folderRegex);
    if (folderMatch) {
      setIsFolder(true);
      return folderMatch[1];
    }

    const fileMatch = url.match(fileRegex);
    if (fileMatch) {
      setIsFolder(false);
      return fileMatch[1];
    }

    setIsFolder(false);
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFolderFiles([]); // 폴더 파일 초기화
    setApiError(null);
    
    const id = extractFileId(value);
    setFileId(id);
    setImgError(false);
  };

  const handleGasUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGasUrl(value);
    localStorage.setItem('gasUrl', value); // 자동 저장
  };

  // 폴더 데이터 로드
  const fetchFolderContents = async () => {
    if (!fileId || !gasUrl) return;

    setIsLoading(true);
    setApiError(null);

    try {
      // GAS URL에 ?id=[FolderID] 형태로 호출
      const response = await fetch(`${gasUrl}${gasUrl.includes('?') ? '&' : '?'}id=${fileId}`);
      
      if (!response.ok) {
        throw new Error('GAS 요청에 실패했습니다.');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setFolderFiles(data.files || []);
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setApiError(err.message || '서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 단일 파일 렌더링용 변수
  const directLink = fileId && !isFolder ? `https://drive.google.com/uc?id=${fileId}` : '';
  const recommendedLink = fileId && !isFolder ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : '';
  const htmlTag = fileId && !isFolder ? `<img src="${recommendedLink}">` : '';
  const markdownTag = fileId && !isFolder ? `![이미지](${recommendedLink})` : '';

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
      {/* 1. 입력 필드 */}
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
          {isFolder ? '구글 드라이브 폴더 공유 링크' : '구글 드라이브 공유 링크를 입력하세요'}
        </label>
        <div className="relative group">
          <input
            type="text"
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 placeholder-slate-400"
            placeholder="https://drive.google.com/file/d/... 또는 /folders/..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
            <i className={`fa-solid ${isFolder ? 'fa-folder' : 'fa-link'} text-lg`}></i>
          </div>
        </div>

        {inputValue && !fileId && (
          <p className="mt-3 text-red-500 text-sm flex items-center">
            <i className="fa-solid fa-circle-exclamation mr-1.5"></i>
            올바른 구글 드라이브 링크 형식이 아닙니다.
          </p>
        )}
      </div>

      {/* 2. 폴더 전용 설정 가이드 & API 실행기 */}
      {fileId && isFolder && folderFiles.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-800 flex items-center">
              <i className="fa-solid fa-circle-info text-blue-500 mr-2"></i>
              폴더 이미지 조회 설정
            </h4>
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center bg-blue-50 px-3 py-1.5 rounded-lg"
            >
              <i className="fa-solid fa-list-check mr-1.5"></i>
              {showGuide ? '가이드 접기' : '설정 방법 보기'}
            </button>
          </div>

          {showGuide && <GasGuide />}

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
              배포된 [웹 앱 URL]을 입력하고 조회를 누르세요.
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={gasUrl}
                onChange={handleGasUrlChange}
              />
              <button
                onClick={fetchFolderContents}
                disabled={isLoading || !gasUrl}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-1.5 ${
                  isLoading || !gasUrl
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-100'
                }`}
              >
                {isLoading ? (
                  <><i className="fa-solid fa-circle-notch animate-spin"></i> <span>조회 중...</span></>
                ) : (
                  <><i className="fa-solid fa-magnifying-glass"></i> <span>조회하기</span></>
                )}
              </button>
            </div>
          </div>

          {apiError && (
            <p className="text-red-500 text-xs flex items-center mt-2">
              <i className="fa-solid fa-circle-exclamation mr-1"></i>
              {apiError}
            </p>
          )}
        </div>
      )}

      {/* 3. 단일 파일 결과 창 */}
      {fileId && !isFolder && (
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

      {/* 4. 폴더 파일 결과 그리드 창 */}
      {fileId && isFolder && folderFiles.length > 0 && (
        <FolderResult files={folderFiles} />
      )}
    </div>
  );
};

export default Converter;
