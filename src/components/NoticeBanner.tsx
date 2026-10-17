import React from 'react';
import { AlertCircle } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  return (
    <aside
      aria-label="Competition Prototype Disclaimer"
      className="bg-[#322319] text-[#fcf9f2] text-xs py-2 px-3 sm:px-6 border-b border-[#49382d] sticky top-0 z-50 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#fc9e7e] shrink-0" />
          <span className="font-medium tracking-wide">
            <strong className="font-semibold text-[#fc9e7e]">Competition Demonstration:</strong> Kora Threads is a fictional business created for the Get Cited hackathon. This website is a prototype, not a real store.
          </span>
        </div>
      </div>
    </aside>
  );
};
