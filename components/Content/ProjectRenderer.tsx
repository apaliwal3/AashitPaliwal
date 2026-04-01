"use client";

import React, { useState } from 'react';
import { Github } from 'lucide-react';

type FeatureSection = {
  title: string;
  items: string[];
};

type ProjectData = {
  title?: string;
  previewUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  description?: string;
  overview?: string;
  techStack?: string[];
  features?: FeatureSection[];
};

const projectsData: Record<string, ProjectData> = {
  '/Projects/portfolio.tsx': {
    title: 'Portfolio',
    description: "A VS Code inspired developer portfolio website.",
    overview: 'A modern portfolio that mimics a VS Code workflow and presents projects in a developer-first interface.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    features: [
      {
        title: 'UI and Experience',
        items: [
          'VS Code-inspired layout with navigation, editor, and terminal sections.',
          'Focused project pages with clear code and preview tabs.'
        ]
      },
      {
        title: 'Project Presentation',
        items: [
          'Interactive content rendering for bio, contact, and projects.',
          'Syntax highlighted snippets for technical clarity.'
        ]
      }
    ],
    previewUrl: "https://your-portfolio.com",
    githubUrl: 'https://github.com/your-username/portfolio',
    imageUrl: "/placeholder-project.png"
  },
  '/Projects/expense-tracker.tsx': {
    title: 'ExpenseTracker',
    description: 'A full-stack personal and shared finance tracker built with React, Node.js, and PostgreSQL.',
    overview: 'ExpenseTracker helps users control spending with personal and shared expense tracking, debt settlement workflows, financial insights, and secure authentication.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'JWT', 'bcrypt'],
    features: [
      {
        title: 'Authentication',
        items: [
          'Secure email and password login using bcrypt and JWT.',
          'Session-based user state management with AuthContext in React.',
          'Protected API routes through middleware validation.'
        ]
      },
      {
        title: 'My Spending Dashboard',
        items: [
          'Personal and shared expenses visualized in one place.',
          'Top category, money owed, and reimbursable balances shown at a glance.',
          'Interactive Chart.js trends including monthly, category-wise, and anomaly views.'
        ]
      },
      {
        title: 'Group Spending',
        items: [
          'Split purchases among multiple users.',
          'Track who owes who and how much in real time.',
          'Settle-up support with automatic minimum transaction suggestions.'
        ]
      },
      {
        title: 'Smart Categorization',
        items: [
          'NLP-based classifier trained on JSON expense data.',
          'Automatic category assignment for incoming transactions.',
          'Iterative model experimentation with Logistic Regression and MultinomialNB.'
        ]
      }
    ],
    githubUrl: 'https://github.com/your-username/expense-tracker'
  },
  '/Projects/premier-league-predictor.ipynb': {
    title: 'EPL Match Data Analysis (2000-2025)',
    description: 'Data analysis and machine learning on EPL match datasets using pandas, scikit-learn, and kagglehub.',
    overview: 'Automatically downloads EPL datasets from Kaggle, processes season-level and match-level data, and provides reproducible notebooks for trend analysis and predictive modeling from 2000 to 2025.',
    techStack: ['Python', 'pandas', 'scikit-learn', 'kagglehub', 'Jupyter', 'Sports Analytics'],
    features: [
      {
        title: 'Data Pipeline',
        items: [
          'Automatically fetches EPL datasets from Kaggle using kagglehub.',
          'Cleans and standardizes match records across multiple seasons.',
          'Creates reusable notebooks for reproducible analysis workflows.'
        ]
      },
      {
        title: 'Analytics and Modeling',
        items: [
          'Exploratory analysis of match outcomes, goals, and team performance trends.',
          'Feature engineering for predictive tasks using historical match metrics.',
          'Machine learning experiments with scikit-learn for outcome prediction.'
        ]
      }
    ],
    githubUrl: 'https://github.com/your-username/epl-match-data-analysis'
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
          <div className="h-full overflow-auto bg-[#1f1f1f] px-6 py-5">
              <h2 className="text-xl font-semibold text-white mb-2">{project.title || 'Project'} Overview</h2>
              {project.overview && <p className="text-sm text-gray-300 leading-6">{project.overview}</p>}

              {project.githubUrl && (
                <div className="mt-3 mb-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub repository"
                    className="h-10 w-10 rounded border border-[#3e3e42] bg-[#252526] text-gray-200 hover:text-white hover:border-[#6b6b6b] flex items-center justify-center transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded border border-[#3e3e42] bg-[#252526] text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {project.features.map((section) => (
                    <div key={section.title} className="rounded border border-[#3e3e42] bg-[#252526] p-4">
                      <h3 className="text-sm font-semibold text-white mb-2">{section.title}</h3>
                      <ul className="list-disc pl-4 text-sm text-gray-300 space-y-1">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ) : (
          <div className="p-8 text-vscode-text">
            <h2 className="text-2xl font-bold mb-4 text-white">Project Preview</h2>
            <p className="mb-6">{project.description}</p>
            
            <div className="w-full h-64 bg-[#2d2d2d] rounded-lg flex items-center justify-center mb-6">
               <span className="opacity-50">Project Screenshot / Demo</span>
            </div>

            <div className="flex items-center gap-3">
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

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub repository"
                  className="h-10 w-10 rounded border border-[#3e3e42] bg-[#252526] text-gray-200 hover:text-white hover:border-[#6b6b6b] flex items-center justify-center transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRenderer;
