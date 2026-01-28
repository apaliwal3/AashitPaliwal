"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const projectsData: Record<string, { code: string; previewUrl?: string; imageUrl?: string; description?: string }> = {
  '/Projects/portfolio.tsx': {
    code: `
import React from 'react';
import { NextPage } from 'next';

const Portfolio: NextPage = () => {
  return (
    <div className="portfolio-container">
      <h1>Developer Portfolio</h1>
      <p>Built with Next.js, TypeScript, and Tailwind.</p>
      
      <FeatureList 
        features={['Interactive Terminal', 'VS Code Theme', 'File Navigation']} 
      />
    </div>
  );
};

export default Portfolio;
    `,
    description: "A VS Code inspired developer portfolio website.",
    previewUrl: "https://your-portfolio.com",
    imageUrl: "/placeholder-project.png"
  },
  '/Projects/ecommerce-api.ts': {
    code: `
import express, { Request, Response } from 'express';
import { ProductModel } from './models';

const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
    `,
    description: "Backend API for an e-commerce platform.",
  }
};

const ProjectRenderer = ({ path }: { path: string }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const project = projectsData[path];

  if (!project) {
    return <div className="p-10">Project data not found.</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <div className="flex border-b border-[#3e3e42] bg-[#252526]">
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'code' ? 'text-white border-b-2 border-[#007acc]' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'preview' ? 'text-white border-b-2 border-[#007acc]' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'code' ? (
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '20px', height: '100%', background: '#1e1e1e' }}
            showLineNumbers={true}
          >
            {project.code.trim()}
          </SyntaxHighlighter>
        ) : (
          <div className="p-8 text-vscode-text">
            <h2 className="text-2xl font-bold mb-4 text-white">Project Preview</h2>
            <p className="mb-6">{project.description}</p>
            
            <div className="w-full h-64 bg-[#2d2d2d] rounded-lg flex items-center justify-center mb-6">
               <span className="opacity-50">Project Screenshot / Demo</span>
            </div>

            {project.previewUrl && (
              <a 
                href={project.previewUrl} 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#0e639c] text-white px-4 py-2 hover:bg-[#1177bb] transition-colors inline-block"
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRenderer;
