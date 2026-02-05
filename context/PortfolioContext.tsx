"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FileSystemItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  icon?: string;
  content?: string; // Could be a component key or raw markdown
  children?: FileSystemItem[];
  isOpen?: boolean;
  language?: string;
}

interface PortfolioContextType {
  activeFile: string | null;
  openFiles: string[];
  fileSystem: FileSystemItem[];
  explorerVisible: boolean;
  activeSidebarView: 'explorer' | 'extensions' | null;
  terminalVisible: boolean;
  
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  toggleFolder: (path: string) => void;
  toggleExplorer: () => void;
  setActiveSidebarView: (view: 'explorer' | 'extensions' | null) => void;
  toggleTerminal: () => void;
  setTerminalVisible: (visible: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const initialFileSystem: FileSystemItem[] = [
  {
    name: 'About',
    type: 'folder',
    path: '/About',
    isOpen: true,
    children: [
      {
        name: 'bio.md',
        type: 'file',
        path: '/About/bio.md',
        language: 'markdown',
        content: 'bio'
      }
    ]
  },
  {
    name: 'Projects',
    type: 'folder',
    path: '/Projects',
    isOpen: true,
    children: [
      {
        name: 'portfolio.tsx',
        type: 'file',
        path: '/Projects/portfolio.tsx',
        language: 'typescript',
        content: 'project'
      },
      {
        name: 'ecommerce-api.ts',
        type: 'file',
        path: '/Projects/ecommerce-api.ts',
        language: 'typescript',
        content: 'project'
      }
    ]
  },
  {
    name: 'Contact',
    type: 'folder',
    path: '/Contact',
    isOpen: true,
    children: [
      {
        name: 'contact.json',
        type: 'file',
        path: '/Contact/contact.json',
        language: 'json',
        content: 'contact'
      }
    ]
  },
  {
    name: 'README.md',
    type: 'file',
    path: '/README.md',
    language: 'markdown',
    content: 'readme'
  }
];

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>(initialFileSystem);
  const [explorerVisible, setExplorerVisible] = useState(true);
  const [activeSidebarView, setActiveSidebarView] = useState<'explorer' | 'extensions' | null>('explorer');
  const [terminalVisible, setTerminalVisible] = useState(true);

  // Responsive check
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setExplorerVisible(false);
      setActiveSidebarView(null);
      setTerminalVisible(false);
    }
  }, []);

  const openFile = (path: string) => {
    if (!openFiles.includes(path)) {
      setOpenFiles([...openFiles, path]);
    }
    setActiveFile(path);
  };

  const closeFile = (path: string) => {
    const newOpenFiles = openFiles.filter(f => f !== path);
    setOpenFiles(newOpenFiles);
    
    if (activeFile === path) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
    }
  };

  const toggleFolder = (path: string) => {
    const toggleRecursive = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.map(item => {
        if (item.path === path) {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.children) {
          return { ...item, children: toggleRecursive(item.children) };
        }
        return item;
      });
    };
    setFileSystem(toggleRecursive(fileSystem));
  };

  const toggleExplorer = () => setExplorerVisible(!explorerVisible);
  const toggleTerminal = () => setTerminalVisible(!terminalVisible);

  return (
    <PortfolioContext.Provider value={{
      activeFile,
      openFiles,
      fileSystem,
      explorerVisible,
      activeSidebarView,
      terminalVisible,
      openFile,
      closeFile,
      toggleFolder,
      toggleExplorer,
      setActiveSidebarView,
      toggleTerminal,
      setTerminalVisible
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
