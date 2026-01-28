import React from 'react';
import ReactMarkdown from 'react-markdown';

const bioContent = `
# About Me

Hi, I'm **Aashit Paliwal**. 

I am a **Senior Frontend Engineer** passionate about building intuitive and high-performance web applications.

## Tech Stack
- **Frontend:** React, Next.js, Redux, Tailwind CSS
- **Languages:** TypeScript, JavaScript, HTML5, CSS3
- **Tools:** VS Code, Git, Webpack, Figma

## Experience
I have over 5 years of experience in the industry, working with startups and large enterprises to deliver scalable solutions.

## Education
B.Tech in Computer Science
`;

const BioRenderer = () => {
  return (
    <div className="p-8 max-w-3xl text-vscode-text select-text">
        <div className="prose prose-invert prose-blue max-w-none">
          <ReactMarkdown>{bioContent}</ReactMarkdown>
        </div>
    </div>
  );
};

export default BioRenderer;
