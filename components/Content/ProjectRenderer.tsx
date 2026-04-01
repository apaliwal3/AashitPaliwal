"use client";

import React, { useState } from 'react';

type FeatureSection = {
  title: string;
  items: string[];
};

type ProjectData = {
  title?: string;
  code: string;
  previewUrl?: string;
  imageUrl?: string;
  description?: string;
  overview?: string;
  techStack?: string[];
  features?: FeatureSection[];
};

const projectsData: Record<string, ProjectData> = {
  '/Projects/portfolio.tsx': {
    title: 'Portfolio',
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
    imageUrl: "/placeholder-project.png"
  },
  '/Projects/expense-tracker.tsx': {
    title: 'ExpenseTracker',
    code: `
// Frontend
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import GroupSpendingPage from './pages/GroupSpendingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/groups" element={<GroupSpendingPage />} />
    </Routes>
  );
}

// Backend
import express from 'express';
import authRoutes from './routes/authRoutes';
import expenseRoutes from './routes/expenseRoutes';

const app = express();
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
    `,
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
    ]
  },
  '/Projects/premier-league-predictor.ipynb': {
    title: 'EPL Match Data Analysis (2000-2025)',
    code: `
import kagglehub
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Download and load EPL data
path = kagglehub.dataset_download("hugomathien/soccer")
matches = pd.read_csv(f"{path}/EPL.csv")

# Basic preprocessing and baseline model
features = ["HomeShots", "AwayShots", "HomeYellow", "AwayYellow"]
target = "Result"

X_train, X_test, y_train, y_test = train_test_split(
    matches[features], matches[target], test_size=0.2, random_state=42
)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)
print("Baseline accuracy:", model.score(X_test, y_test))
    `,
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
    ]
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
