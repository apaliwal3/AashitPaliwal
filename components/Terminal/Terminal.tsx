"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

const Terminal = () => {
  const { terminalVisible, setTerminalVisible, openFile } = usePortfolio();
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    { command: '', output: 'Welcome to the Portfolio Terminal. Type "help" for a list of commands.' }
  ]);
  const [inputStr, setInputStr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalVisible && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, terminalVisible]);

  if (!terminalVisible) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputStr.trim();
    let output: React.ReactNode = '';

    switch (command.toLowerCase()) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-gray-300">
            <div>Available commands:</div>
            <div>  <span className="text-yellow-400">ls</span>          - List files</div>
            <div>  <span className="text-yellow-400">clear</span>       - Clear terminal</div>
            <div>  <span className="text-yellow-400">whoami</span>      - Display current user</div>
            <div>  <span className="text-yellow-400">npx contact</span> - Open contact form</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex gap-4 text-blue-300">
            <span>About/</span>
            <span>Projects/</span>
            <span>Contact/</span>
            <span className="text-gray-300">README.md</span>
          </div>
        );
        break;
      case 'whoami':
        output = 'guest';
        break;
      case 'clear':
        setHistory([]);
        setInputStr('');
        return;
      case 'npx contact':
        output = 'Opening Interactive Contact Form...';
        openFile('/Contact/contact.json');
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory([...history, { command, output }]);
    setInputStr('');
  };

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
                 <span className="text-blue-400">~</span>
                 <span>{item.command}</span>
               </div>
            )}
            <div className="pl-6">{item.output}</div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2">
           <span className="text-green-400">➜</span>
           <span className="text-blue-400">~</span>
           <input
             ref={inputRef}
             type="text"
             value={inputStr}
             onChange={(e) => setInputStr(e.target.value)}
             className="flex-1 bg-transparent outline-none border-none text-gray-300"
             autoFocus
           />
           <div ref={bottomRef} />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
