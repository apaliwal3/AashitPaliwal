"use client";

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Code, Mail, Terminal as TerminalIcon, Github, Puzzle } from 'lucide-react';

const StartPage = () => {
  const { openFile, toggleTerminal, setActiveSidebarView, explorerVisible, toggleExplorer } = usePortfolio();

  return (
    <div className="flex flex-col h-full bg-[#1f1f1f] text-[#cccccc] p-10 overflow-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-light mb-2 text-white">Aashit Studio Code</h1>
          <h2 className="text-xl text-[#8e8e8e] font-light">Software Developer / ML Engineer </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Start Section */}
          <div>
            <h3 className="text-xl mb-4 text-white font-normal">Start</h3>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => openFile('/About/bio.md')}
                className="group flex flex-col items-start p-2 -ml-2 rounded hover:bg-[#2a2d2e] transition-colors text-left"
              >
                <div className="flex items-center text-[#3794ff] group-hover:text-[#4daafc]">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>View Bio</span>
                </div>
                <span className="text-xs text-[#8e8e8e] ml-6 group-hover:text-[#cccccc]">Read about my experience & stack</span>
              </button>
              
              <button 
                onClick={() => openFile('/Projects/portfolio.tsx')}
                className="group flex flex-col items-start p-2 -ml-2 rounded hover:bg-[#2a2d2e] transition-colors text-left"
              >
                <div className="flex items-center text-[#3794ff] group-hover:text-[#4daafc]">
                  <Code className="w-4 h-4 mr-2" />
                  <span>Explore Projects</span>
                </div>
                <span className="text-xs text-[#8e8e8e] ml-6 group-hover:text-[#cccccc]">Interactive code & live previews</span>
              </button>

              <button 
                onClick={() => openFile('/Contact/contact.json')}
                className="group flex flex-col items-start p-2 -ml-2 rounded hover:bg-[#2a2d2e] transition-colors text-left"
              >
                <div className="flex items-center text-[#3794ff] group-hover:text-[#4daafc]">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Contact Me</span>
                </div>
                <span className="text-xs text-[#8e8e8e] ml-6 group-hover:text-[#cccccc]">Send a message via JSON form</span>
              </button>

              <button 
                onClick={() => {
                  setActiveSidebarView('extensions');
                  if (!explorerVisible) toggleExplorer();
                }}
                className="group flex flex-col items-start p-2 -ml-2 rounded hover:bg-[#2a2d2e] transition-colors text-left"
              >
                <div className="flex items-center text-[#3794ff] group-hover:text-[#4daafc]">
                  <Puzzle className="w-4 h-4 mr-2" />
                  <span>See installed extensions</span>
                </div>
                <span className="text-xs text-[#8e8e8e] ml-6 group-hover:text-[#cccccc]">Check out the tools and languages I use</span>
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-xl mb-4 text-white font-normal">Quick Access</h3>
            <div className="flex flex-col gap-2">
               <button 
                onClick={toggleTerminal}
                className="group flex items-center p-2 -ml-2 rounded hover:bg-[#2a2d2e] transition-colors text-left"
              >
                 <TerminalIcon className="w-4 h-4 mr-2 text-[#cccccc]" />
                 <span className="text-[#cccccc]">Toggle Terminal</span>
              </button>
              
              <a 
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center p-2 -ml-2 rounded hover:bg-[#2a2d2e] transition-colors text-left"
              >
                 <Github className="w-4 h-4 mr-2 text-[#cccccc]" />
                 <span className="text-[#cccccc]">View Source on GitHub</span>
              </a>
            </div>
            
            <div className="mt-8">
               <h3 className="text-xl mb-4 text-white font-normal">Recent</h3>
               <div className="text-sm text-[#8e8e8e]">
                 <div className="flex justify-between hover:bg-[#2a2d2e] p-1 -ml-1 cursor-pointer" onClick={() => openFile('/Projects/ecommerce-api.ts')}>
                    <span>~/Projects/ecommerce-api.ts</span>
                    <span className="hidden sm:block">src</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
