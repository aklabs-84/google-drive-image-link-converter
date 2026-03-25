import React, { useState } from 'react';

interface GasGuideProps {
  onClose?: () => void;
}

const GasGuide: React.FC<GasGuideProps> = ({ onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const gasCode = `function doGet(e) {
  var folderId = e.parameter.id;
  if (!folderId) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Missing folder ID" })).setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var result = [];
    
    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();
      if (mime.indexOf("image/") !== -1) {
        result.push({
          id: file.getId(),
          name: file.getName()
        });
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ files: result })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(gasCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code!', err);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-lg flex items-center">
            <i className="fa-solid fa-circle-question text-blue-500 mr-2"></i>
            구글 드라이브 폴더 설정 가이드
          </h4>
          <p className="text-slate-500 text-sm mt-1">
            폴더 내 이미지 리스트를 조회하기 위해 최초 1회 **구글 스크립트 연결**이 필요합니다.
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <div className="space-y-4 text-sm text-slate-600">
        <div className="flex items-start">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 mr-3">1</span>
          <div>
            <span className="font-semibold text-slate-700">구글 드라이브</span>에 접속 후, 임의의 위치에서 마우스 우클릭 {'>'} <span className="font-semibold">더보기 {'>'} Google Apps Script</span>를 클릭합니다.
          </div>
        </div>

        <div className="flex items-start">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 mr-3">2</span>
          <div className="w-full">
            열린 편집기에 기존 코드를 모두 지우고 **아래 코드를 복사해서 붙여넣습니다.**
            <div className="mt-2 relative bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
              <pre>{gasCode}</pre>
              <button
                onClick={copyCode}
                className={`absolute right-3 top-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCopied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                {isCopied ? (
                  <><i className="fa-solid fa-check mr-1"></i> 복사됨</>
                ) : (
                  <><i className="fa-solid fa-copy mr-1"></i> 코드 복사</>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 mr-3">3</span>
          <div>
            상단의 <span className="font-semibold text-slate-700">배포 {'>'} 새 배포</span>를 누르고 유형을 **[웹 앱]**으로 선택합니다.
          </div>
        </div>

        <div className="flex items-start">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 mr-3">4</span>
          <div>
            설정을 다음과 같이 맞춘 후 <span className="font-semibold text-slate-700">배포</span>를 누릅니다.
            <ul className="list-disc list-inside ml-2 mt-1 text-slate-500 space-y-0.5">
              <li>다음 사용자러 실행: <span className="font-semibold">나 (본인 이메일)</span></li>
              <li>액세스 권한이 있는 사용자: <span className="font-semibold text-blue-600">모든 사용자 (Anyone)</span></li>
            </ul>
          </div>
        </div>

        <div className="flex items-start">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 mr-3">5</span>
          <div>
            배포 완료 후 나오는 **웹 앱 URL**을 복사하여 아래 입력창에 넣어주세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasGuide;
