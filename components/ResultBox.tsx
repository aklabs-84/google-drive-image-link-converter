
import React from 'react';

interface ResultBoxProps {
  title: string;
  value: string;
  onCopy: () => void;
  isCopied: boolean;
}

const ResultBox: React.FC<ResultBoxProps> = ({ title, value, onCopy, isCopied }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{title}</h3>
        {isCopied ? (
          <span className="text-xs font-bold text-emerald-600 animate-pulse">
            <i className="fa-solid fa-check mr-1"></i> 복사됨!
          </span>
        ) : (
          <span className="text-xs text-slate-400">클릭하여 복사</span>
        )}
      </div>
      <div className="p-4 relative group cursor-pointer" onClick={onCopy}>
        <code className="block break-all bg-slate-900 text-emerald-400 p-4 rounded-lg text-sm font-mono leading-relaxed min-h-[50px] transition-all group-hover:bg-slate-800">
          {value}
        </code>
        <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <i className="fa-regular fa-copy text-white/50 text-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default ResultBox;
