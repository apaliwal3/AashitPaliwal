"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

const Terminal = () => {
  const { terminalVisible, setTerminalVisible, openFile, fileSystem } = usePortfolio();
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    { command: '', output: 'Welcome to the Portfolio Terminal. Type "help" for a list of commands.' }
  ]);
  const [inputStr, setInputStr] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalVisible && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, terminalVisible]);

  if (!terminalVisible) return null;

  // Helper to resolve path
  const resolvePath = (path: string) => {
    if (path === '/') return '/';
    if (path.startsWith('/')) return path; // Absolute
    
    // Relative
    const parts = currentPath.split('/').filter(p => p);
    const pathParts = path.split('/').filter(p => p);
    
    for (const part of pathParts) {
      if (part === '..') {
        parts.pop();
      } else if (part !== '.') {
        parts.push(part);
      }
    }
    
    return '/' + parts.join('/');
  };

  // Helper to get directory contents
  const getDirContents = (path: string) => {
    if (path === '/') return fileSystem; // Root
    
    const parts = path.split('/').filter(p => p);
    let currentItems = fileSystem;
    let foundItem = null;

    for (const part of parts) {
       foundItem = currentItems.find(item => item.name === part);
       if (foundItem && foundItem.type === 'folder' && foundItem.children) {
         currentItems = foundItem.children;
       } else {
         return null; // Path invalid or not a folder
       }
    }
    return currentItems;
  };

  const getItemAtPath = (path: string) => {
    if (path === '/') return { type: 'folder', name: 'root' };
    
    const parts = path.split('/').filter(p => p);
    let currentItems = fileSystem;
    let foundItem = null;

    for (const part of parts) {
       foundItem = currentItems.find(item => item.name === part);
       if (foundItem && foundItem.type === 'folder' && foundItem.children) {
         currentItems = foundItem.children;
       } else if (foundItem && foundItem.name === parts[parts.length - 1]) {
         return foundItem;
       } else {
         return null;
       }
    }
    return foundItem;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCommand = inputStr.trim();
    if (!fullCommand) {
        setHistory([...history, { command: '', output: '' }]);
        setInputStr('');
        return;
    }

    const args = fullCommand.split(' ');
    const cmd = args[0].toLowerCase();
    const arg = args[1]; // First argument

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-gray-300">
            <div>Available commands:</div>
            <div>  <span className="text-yellow-400">ls</span>          - List files in current directory</div>
            <div>  <span className="text-yellow-400">cd &lt;dir&gt;</span>    - Change directory (or open file)</div>
            <div>  <span className="text-yellow-400">clear</span>       - Clear terminal</div>
            <div>  <span className="text-yellow-400">whoami</span>      - Display current user</div>
            <div>  <span className="text-yellow-400">code &lt;file&gt;</span> - Open file in editor</div>
            <div>  <span className="text-yellow-400">npx contact</span> - Open contact form</div>
          </div>
        );
        break;
        
      case 'ls':
        const targetPath = arg ? resolvePath(arg) : currentPath;
        const contents = getDirContents(targetPath);
        
        if (contents) {
          output = (
            <div className="flex gap-4 flex-wrap">
              {contents.map(item => (
                <span key={item.name} className={item.type === 'folder' ? 'text-blue-300 font-bold' : 'text-gray-300'}>
                  {item.name}{item.type === 'folder' ? '/' : ''}
                </span>
              ))}
            </div>
          );
        } else {
          output = `ls: cannot access '${arg}': No such file or directory`;
        }
        break;

      case 'cd':
        if (!arg) {
           setCurrentPath('/');
           break;
        }
        const newPath = resolvePath(arg);
        const item = getItemAtPath(newPath);

        if (!item && newPath !== '/') {
           output = `cd: no such file or directory: ${arg}`;
        } else if (item?.type === 'file') {
           // User tried to "cd" into a file, open it instead
           openFile(item.path);
           output = `Opening ${item.name}...`;
        } else {
           setCurrentPath(newPath);
        }
        break;

      case 'code':
      case 'open':
        if (!arg) {
            output = 'usage: code <filename>';
            break;
        }
        const filePath = resolvePath(arg);
        const fileItem = getItemAtPath(filePath);
        
        if (fileItem && fileItem.type === 'file') {
            openFile(fileItem.path);
            output = `Opening ${fileItem.name}...`;
        } else {
             output = `File not found: ${arg}`;
        }
        break;

      case 'whoami':
        output = 'guest';
        break;
      case 'clear':
        setHistory([]);
        setInputStr('');
        return;
      case 'npx':
        if (arg === 'contact') {
            output = 'Opening Interactive Contact Form...';
            openFile('/Contact/contact.json');
        } else {
            output = `Command not found: npx ${arg || ''}`;
        }
        break;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...history, { command: fullCommand, output }]);
    setInputStr('');
  };

  const pathDisplay = currentPath === '/' ? '~' : `~${currentPath}`;

  return (
    <div className="h-48 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col font-mono text-sm">
      <div className="flex justify-between items-center px-4 py-1 bg-[#252526] border-b border-[#3e3e42] select-none">
        <div className="flex gap-4">
          <span className="underline cursor-pointer">TERMINAL</span>
          <span className="text-gray-500 hover:text-gray-300 cursor-pointer">OUTPUT</span>
          <span className="text-gray-500 hover:text-gray-300 cursor-pointer">DEBUG CONSOLE</span>
        </div>
        <div className="flex gap-2">
           <X 
             className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded" 
             onClick={() => setTerminalVisible(false)} 
           />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-gray-300" onClick={() => inputRef.current?.focus()}>
        {history.map((item, idx) => (
          <div key={idx} className="mb-2">
            {item.command && (
               <div className="flex items-center gap-2">
                 <span className="text-green-400">➜</span>
                 <span className="text-blue-400">{item.command.startsWith('cd') ? '~' : pathDisplay}</span>
                 <span className="text-white">$ {item.command}</span>
               </div>
            )}
            <div className="pl-6 whitespace-pre-wrap">{item.output}</div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2">
           <span className="text-green-400">➜</span>
           <span className="text-blue-400">{pathDisplay}</span>
           <span className="text-gray-400">$</span>
           <input
             ref={inputRef}
             type="text"
             value={inputStr}
             onChange={(e) => setInputStr(e.target.value)}
             className="flex-1 bg-transparent outline-none border-none text-white ml-1"
             autoFocus
             autoComplete="off"
             spellCheck="false"
           />
           <div ref={bottomRef} />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
