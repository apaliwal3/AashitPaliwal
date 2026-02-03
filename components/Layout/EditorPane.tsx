"use client";

import React from 'react';
import { X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getFileIcon } from '../utils/Icons';
import BioRenderer from '../Content/BioRenderer';
import ProjectRenderer from '../Content/ProjectRenderer';
import ContactRenderer from '../Content/ContactRenderer';
import StartPage from '../Content/StartPage';

const ContentRenderer = ({ path }: { path: string }) => {
  if (path === '/About/bio.md') return <BioRenderer />;
  if (path === '/Contact/contact.json') return <ContactRenderer />;
  if (path.startsWith('/Projects/')) return <ProjectRenderer path={path} />;
  if (path === '/README.md') return <div className="p-8 text-vscode-text"><h1>Welcome to my Portfolio</h1><p className="mt-4">Navigation is on the left. Explore the files to learn more about me.</p></div>;
  
  return <div className="p-10 text-center text-gray-500">File content not loading for {path}</div>;
};

const EditorPane = () => {
  const { openFiles, activeFile, closeFile, openFile } = usePortfolio();

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] h-full overflow-hidden">
      {/* Tabs */}
      <div className="flex bg-[#252526] overflow-x-auto no-scrollbar h-9 flex-shrink-0">
        {openFiles.map((file) => {
          const fileName = file.split('/').pop() || '';
          const isActive = activeFile === file;
          
          return (
            <div 
              key={file}
              className={`
                group flex items-center px-3 min-w-fit max-w-[200px] border-r border-[#1e1e1e] cursor-pointer text-sm select-none
                ${isActive ? 'bg-[#1e1e1e] text-white border-t border-t-[#007acc]' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'}
              `}
              onClick={() => openFile(file)}
            >
              <span className="mr-2 flex items-center">{getFileIcon(fileName)}</span>
              <span className="mr-2 truncate">{fileName}</span>
              <span 
                className={`p-0.5 rounded-md hover:bg-[#4a4a4f] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file);
                }}
              >
                <X className="w-3 h-3" />
              </span>
            </div>
          );
        })}
      </div>

      {/* Breadcrumbs / Editor Actions (Optional, skipping for now) */}
      
      {/* Content Area */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        {activeFile ? (
           <ContentRenderer path={activeFile} />
        ) : <StartPage />}
      </div>
    </div>
  );
};

export default EditorPane;
