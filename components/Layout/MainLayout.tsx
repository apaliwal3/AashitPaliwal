"use client";

import React from 'react';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import EditorPane from './EditorPane';
import StatusBar from './StatusBar';
import Terminal from '../Terminal/Terminal';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-[#1e1e1e] text-[#cccccc] overflow-hidden">
      
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar />
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
           <EditorPane />
           <Terminal />
        </div>
      </div>
      
      <StatusBar />
    </div>
  );
};

export default MainLayout;
