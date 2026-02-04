"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MoreHorizontal, Filter, RefreshCcw, Puzzle } from 'lucide-react';
import { usePortfolio, FileSystemItem } from '../../context/PortfolioContext';
import { getFileIcon } from '../utils/Icons';
import { motion, AnimatePresence } from 'framer-motion';

const extensions = [
  { name: 'React', category: 'Framework', desc: 'JavaScript library', version: '18.2.0', publisher: 'Meta', icon: '/react.png' },
  { name: 'Next.js', category: 'Framework', desc: 'The React Framework', version: '14.1.0', publisher: 'Vercel', icon: '/next.png' },
  { name: 'TypeScript', category: 'Language', desc: 'Typed JavaScript', version: '5.3.3', publisher: 'Microsoft', icon: '/ts.png' },
  { name: 'SQL', category: 'Language', desc: 'Structured Query Language', version: '2016', publisher: 'ISO', icon: '/sql.png' },
  { name: 'Node.js', category: 'Framework', desc: 'JS Runtime', version: '20.10.0', publisher: 'OpenJS', icon: '/node.png' },
  { name: 'Python', category: 'Language', desc: 'Programming Language', version: '3.12.1', publisher: 'Python', icon: '/python.png' },
  { name: 'Git', category: 'Tool', desc: 'Version Control', version: '2.43.0', publisher: 'The Git Project', icon: '/git.png' },
  { name: 'Docker', category: 'Tool', desc: 'Containerization', version: '24.0.5', publisher: 'Docker, Inc.', icon: '/docker.png' },
  { name: 'JavaScript', category: 'Language', desc: 'Programming Language', version: 'ES2024', publisher: 'ECMA International', icon: '/js.png' },
  { name: 'PyTorch', category: 'Framework', desc: 'Machine Learning', version: '2.1.0', publisher: 'Meta', icon: '/pytorch.png' },
  { name: 'NumPy', category: 'Library', desc: 'Numerical Computing', version: '1.26.4', publisher: 'NumPy Developers', icon: '/numpy.png' },
  { name: 'scikit-learn', category: 'Library', desc: 'Machine Learning', version: '1.2.2', publisher: 'scikit-learn Developers', icon: '/scikit-learn.png' },
  { name: 'R', category: 'Language', desc: 'Statistical Computing', version: '4.3.1', publisher: 'R Core Team', icon: '/r.png' },
];

const SidebarExtensions = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-2 text-[11px] font-bold text-[#bbbbbb] uppercase">Installed</div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {extensions.map((ext) => (
                    <div key={ext.name} className="flex p-3 hover:bg-[#2a2d2e] cursor-pointer group">
                        <div className="w-8 h-8 bg-[#3c3c3c] mr-3 flex items-center justify-center flex-shrink-0">
                           {/* Using a placeholder icon since we don't have real images yet */}
                           <Puzzle className="w-5 h-5 text-[#007acc]" />
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="font-bold text-sm text-[#cccccc] truncate">{ext.name}</span>
                                <span className="text-[10px] text-[#888888]">{ext.version}</span>
                            </div>
                            <div className="text-xs text-[#888888] truncate mb-1">{ext.desc}</div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-[#cccccc]">{ext.publisher}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const FileTreeItem = ({ item, depth = 0 }: { item: FileSystemItem; depth?: number }) => {
  const { openFile, toggleFolder, activeFile } = usePortfolio();
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'folder') {
      toggleFolder(item.path);
    } else {
      openFile(item.path);
    }
  };
  
  const isActive = activeFile === item.path;

  return (
    <div>
      <div 
        className={`flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] ${isActive ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'}`}
        style={{ paddingLeft: `${depth * 12 + 10}px` }}
        onClick={handleClick}
      >
        <span className="mr-1 opacity-80">
          {item.type === 'folder' && (
            item.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          )}
        </span>
        <span className="mr-2">
           {item.type === 'file' && getFileIcon(item.name, item.language)}
        </span>
        <span className="text-sm select-none">{item.name}</span>
      </div>
      
      {item.type === 'folder' && item.isOpen && (
        <div>
          {item.children?.map((child) => (
            <FileTreeItem key={child.path} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


const Sidebar = () => {
  const { fileSystem, explorerVisible, activeSidebarView } = usePortfolio();

  if (!explorerVisible) return null;

  return (
    <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e] h-full flex-shrink-0">
      <div className="p-3 text-xs font-bold uppercase tracking-wider text-[#bbbbbb] flex justify-between items-center group h-9 flex-shrink-0">
        <span>{activeSidebarView === 'extensions' ? 'Extensions' : 'Explorer'}</span>
        {activeSidebarView === 'extensions' && (
           <div className="flex gap-2">
             <Filter className="w-4 h-4 cursor-pointer hover:text-white" />
             <RefreshCcw className="w-4 h-4 cursor-pointer hover:text-white" />
             <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
           </div>
        )}
        {activeSidebarView === 'explorer' && (
           <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white opacity-0 group-hover:opacity-100" />
        )}
      </div>
      
      {activeSidebarView === 'extensions' ? (
        <SidebarExtensions />
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="font-bold text-xs px-4 py-1 flex items-center cursor-pointer text-white">
             <ChevronDown className="w-3 h-3 mr-1" />
             PORTFOLIO
          </div>
          <div>
            {fileSystem.map((item) => (
              <FileTreeItem key={item.path} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
