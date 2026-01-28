import React from 'react';
import { GitBranch, Wifi, Bell, Check } from 'lucide-react';

const StatusBar = () => {
  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between text-xs px-2 select-none z-30">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-white/20 px-1 cursor-pointer">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/20 px-1 cursor-pointer">
           <span className="hidden sm:inline">0 errors</span>
           <span className="hidden sm:inline">0 warnings</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hover:bg-white/20 px-1 cursor-pointer hidden sm:block">
           Use "contact.json" to connect
        </div>
        <div className="hover:bg-white/20 px-1 cursor-pointer flex items-center gap-1">
          <Check className="w-3 h-3" />
          Prettier
        </div>
        <div className="hover:bg-white/20 px-1 cursor-pointer">
          Next.js
        </div>
        <div className="hover:bg-white/20 px-1 cursor-pointer">
          UTF-8
        </div>
        <div className="hover:bg-white/20 px-1 cursor-pointer">
          <Bell className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
