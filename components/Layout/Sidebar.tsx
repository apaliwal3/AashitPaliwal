"use client";

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { usePortfolio, FileSystemItem } from '../../context/PortfolioContext';
import { getFileIcon } from '../utils/Icons';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { fileSystem, explorerVisible } = usePortfolio();

  if (!explorerVisible) return null;

  return (
    <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e] h-full flex-shrink-0">
      <div className="p-3 text-xs font-bold uppercase tracking-wider text-[#bbbbbb] flex justify-between items-center group">
        <span>Explorer</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
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
    </div>
  );
};

export default Sidebar;
