
import React from 'react';

const WarningSection: React.FC = () => {
  const warnings = [
    {
      icon: "fa-solid fa-traffic-light",
      text: "트래픽이 너무 많으면 구글에서 일시적으로 차단할 수 있습니다.",
      color: "text-amber-600"
    },
    {
      icon: "fa-solid fa-store-slash",
      text: "상업용이나 대량 노출이 필요한 서비스 이미지로는 권장하지 않습니다.",
      color: "text-red-600"
    },
    {
      icon: "fa-solid fa-hourglass-half",
      text: "가끔 로딩이 느리거나 네트워크 상태에 따라 이미지가 안 뜰 수 있습니다.",
      color: "text-slate-600"
    },
    {
      icon: "fa-solid fa-lock-open",
      text: "파일 공유 설정이 '링크가 있는 모든 사용자에게 공개'로 되어 있어야 합니다.",
      color: "text-blue-600"
    }
  ];

  return (
    <div id="warning-section" className="mt-16 border-t border-slate-200 pt-10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
          <i className="fa-solid fa-triangle-exclamation text-xl"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800">⚠️ 사용 전 주의할 점</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warnings.map((w, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start space-x-4 shadow-sm">
            <div className={`${w.color} mt-1`}>
              <i className={`${w.icon} text-lg`}></i>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {w.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-800 text-white rounded-2xl p-6 shadow-xl">
        <h4 className="font-bold mb-3 flex items-center">
          <i className="fa-solid fa-circle-question mr-2 text-blue-400"></i>
          구글 드라이브 권한 설정 방법
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm ml-1">
          <li>구글 드라이브에서 이미지 우클릭 &gt; <span className="text-blue-400">공유</span> 클릭</li>
          <li>일반 액세스를 <span className="text-blue-400">'링크가 있는 모든 사용자'</span>로 변경</li>
          <li>권한을 '뷰어'로 유지한 후 <span className="text-blue-400">'링크 복사'</span> 클릭</li>
          <li>복사한 링크를 위 입력창에 붙여넣으세요!</li>
        </ol>
      </div>
    </div>
  );
};

export default WarningSection;
