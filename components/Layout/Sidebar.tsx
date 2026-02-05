"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MoreHorizontal, Filter, RefreshCcw, Puzzle } from 'lucide-react';
import { usePortfolio, FileSystemItem } from '../../context/PortfolioContext';
import { getFileIcon } from '../utils/Icons';
import { SiReact, SiNextdotjs, SiTypescript, SiPostgresql, SiNodedotjs,
  SiPython, SiGit, SiDocker, SiJavascript, SiPytorch, SiNumpy, SiScikitlearn,
  SiR, SiTensorflow, SiCplusplus, SiOpencv, SiJupyter, SiNpm
 } from "react-icons/si";
import { RiJavaFill } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

interface Extension {
  name: string;
  category: string;
  desc: string;
  version: string;
  publisher: string;
  icon: React.ElementType;
  color?: string;
}

const extensions: Extension[] = [
  { name: 'React', category: 'Frameworks & Tools', desc: 'JavaScript library', version: '18.2.0', publisher: 'Meta', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', category: 'Frameworks & Tools', desc: 'The React Framework', version: '14.1.0', publisher: 'Vercel', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TypeScript', category: 'Languages', desc: 'Typed JavaScript', version: '5.3.3', publisher: 'Microsoft', icon: SiTypescript, color: '#3178C6' },
  { name: 'SQL', category: 'Languages', desc: 'Structured Query Language', version: '2016', publisher: 'ISO', icon: SiPostgresql, color: '#336791' },
  { name: 'Node.js', category: 'Frameworks & Tools', desc: 'JS Runtime', version: '20.10.0', publisher: 'OpenJS', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', category: 'Languages', desc: 'Programming Language', version: '3.12.1', publisher: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Git', category: 'Frameworks & Tools', desc: 'Version Control', version: '2.43.0', publisher: 'The Git Project', icon: SiGit, color: '#F05032' },
  { name: 'Docker', category: 'Frameworks & Tools', desc: 'Containerization', version: '24.0.5', publisher: 'Docker, Inc.', icon: SiDocker, color: '#2496ED' },
  { name: 'JavaScript', category: 'Languages', desc: 'Programming Language', version: 'ES2024', publisher: 'ECMA International', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'PyTorch', category: 'Libraries', desc: 'Machine Learning', version: '2.1.0', publisher: 'Meta', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'NumPy', category: 'Libraries', desc: 'Numerical Computing', version: '1.26.4', publisher: 'NumPy Developers', icon: SiNumpy, color: '#4D77CF' },
  { name: 'scikit-learn', category: 'Libraries', desc: 'Machine Learning', version: '1.2.2', publisher: 'scikit-learn Developers', icon: SiScikitlearn, color: '#F7931E' },
  { name: 'R', category: 'Languages', desc: 'Statistical Computing', version: '4.3.1', publisher: 'R Core Team', icon: SiR, color: '#276DC3' },
  { name: 'TensorFlow', category: 'Libraries', desc: 'Machine Learning', version: '2.13.0', publisher: 'Google', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Java', category: 'Languages', desc: 'Programming Language', version: '21', publisher: 'Oracle', icon: RiJavaFill, color: '#007396' },
  { name: 'C++', category: 'Languages', desc: 'Programming Language', version: 'C++20', publisher: 'ISO', icon: SiCplusplus, color: '#00599C' },
  { name: 'OpenCV', category: 'Libraries', desc: 'Computer Vision', version: '4.7.0', publisher: 'OpenCV Team', icon: SiOpencv, color: '#5C3EE8' },
  { name: 'Jupyter', category: 'Frameworks & Tools', desc: 'Interactive Notebooks', version: '1.0.0', publisher: 'Project Jupyter', icon: SiJupyter, color: '#F37626' },
  { name: 'npm', category: 'Frameworks & Tools', desc: 'Node Package Manager', version: '9.5.0', publisher: 'npm, Inc.', icon: SiNpm, color: '#CB3837' },
];

const SidebarExtensions = ({ filterCategory }: { filterCategory: string | null }) => {
    const filteredExtensions = filterCategory 
      ? extensions.filter(ext => ext.category === filterCategory)
      : extensions;

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="px-4 py-2 text-[11px] font-bold text-[#bbbbbb] uppercase">
                {filterCategory ? `Installed - ${filterCategory}` : 'Installed'}
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredExtensions.map((ext) => (
                    <div key={ext.name} className="flex p-3 hover:bg-[#2a2d2e] cursor-pointer group">
                        <div className="w-8 h-8 bg-[#3c3c3c] mr-3 flex items-center justify-center flex-shrink-0">
                           <ext.icon className="w-5 h-5" style={{ color: ext.color || '#cccccc' }} />
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
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const handleFilterClick = () => {
    const categories = ['Languages', 'Libraries', 'Frameworks & Tools'];
    const currentIndex = filterCategory ? categories.indexOf(filterCategory) : -1;
    const nextIndex = currentIndex + 1;
    setFilterCategory(nextIndex < categories.length ? categories[nextIndex] : null);
  };

  if (!explorerVisible) return null;

  return (
    <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e] h-full flex-shrink-0">
      <div className="p-3 text-xs font-bold uppercase tracking-wider text-[#bbbbbb] flex justify-between items-center group h-9 flex-shrink-0">
        <span>{activeSidebarView === 'extensions' ? 'Extensions' : 'Explorer'}</span>
        {activeSidebarView === 'extensions' && (
           <div className="flex gap-2">
             <div title={filterCategory ? `Filter: ${filterCategory}` : "Filter Extensions"}>
               <Filter 
                 className={`w-4 h-4 cursor-pointer hover:text-white ${filterCategory ? 'text-white' : ''}`} 
                 onClick={handleFilterClick}
               />
             </div>
             <div title="Clear Filter">
               <RefreshCcw 
                 className="w-4 h-4 cursor-pointer hover:text-white" 
                 onClick={() => setFilterCategory(null)}
               />
             </div>
             <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
           </div>
        )}
        {activeSidebarView === 'explorer' && (
           <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white opacity-0 group-hover:opacity-100" />
        )}
      </div>
      
      {activeSidebarView === 'extensions' ? (
        <SidebarExtensions filterCategory={filterCategory} />
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
