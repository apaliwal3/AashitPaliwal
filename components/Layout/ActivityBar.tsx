"use client";

import React from 'react';
import { Files, Search, Github, Mail, Settings, User, Puzzle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ActivityBar = () => {
  const { toggleExplorer, explorerVisible, activeSidebarView, setActiveSidebarView, openFile } = usePortfolio();

  const handleSidebarClick = (view: 'explorer' | 'extensions') => {
    if (activeSidebarView === view && explorerVisible) {
       toggleExplorer(); // Toggle off if already active
    } else {
       if (!explorerVisible) toggleExplorer(); // Ensure open
       setActiveSidebarView(view);
    }
  };

  return (
    <div className="w-12 bg-[#333333] flex flex-col items-center py-2 justify-between flex-shrink-0 z-20">
      <div className="flex flex-col gap-4">
        <div 
          className={`p-2 border-l-2 cursor-pointer ${activeSidebarView === 'explorer' && explorerVisible ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
          title="Explorer"
          onClick={() => handleSidebarClick('explorer')}
        >
          <Files className="text-white w-6 h-6" />
        </div>
        <div className="p-2 border-l-2 border-transparent hover:opacity-100 opacity-60 cursor-pointer" title="Search">
          <Search className="text-white w-6 h-6" />
        </div>
        <a 
          href="https://github.com/apaliwal3" 
          target="_blank" 
          rel="noreferrer"
          className="p-2 border-l-2 border-transparent hover:opacity-100 opacity-60 cursor-pointer" 
          title="GitHub"
        >
          <Github className="text-white w-6 h-6" />
        </a>
        <div 
          className={`p-2 border-l-2 cursor-pointer ${activeSidebarView === 'extensions' && explorerVisible ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
          title="Extensions (Skills)"
          onClick={() => handleSidebarClick('extensions')}
        >
          <Puzzle className="text-white w-6 h-6" />
        </div>
        <div 
          className="p-2 border-l-2 border-transparent hover:opacity-100 opacity-60 cursor-pointer" 
          title="Contact"
          onClick={() => openFile('/Contact/contact.json')}
        >
          <Mail className="text-white w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-col gap-4 pb-2">
         <div className="p-2 border-l-2 border-transparent hover:opacity-100 opacity-60 cursor-pointer" title="Account">
          <User className="text-white w-6 h-6" />
        </div>
        <div className="p-2 border-l-2 border-transparent hover:opacity-100 opacity-60 cursor-pointer" title="Settings">
          <Settings className="text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
