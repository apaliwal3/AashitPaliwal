import React from 'react';
import { 
  FileJson, 
  FileCode, 
  FileType, 
  FileText, 
  Code 
} from 'lucide-react';

export const getFileIcon = (name: string, language?: string) => {
  if (name.endsWith('.json')) return <FileJson className="w-4 h-4 text-yellow-400" />;
  if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode className="w-4 h-4 text-blue-400" />;
  if (name.endsWith('.md')) return <FileText className="w-4 h-4 text-purple-400" />;
  if (name.endsWith('.css')) return <FileType className="w-4 h-4 text-blue-300" />;
  
  return <FileText className="w-4 h-4 text-gray-400" />; // Default
};
