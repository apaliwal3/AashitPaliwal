import React from 'react';
import ReactMarkdown from 'react-markdown';
import { UserCircle } from 'lucide-react';

const bioContent = `
# About Me

Hi, I'm **Aashit Paliwal**! 

I am a **Computer Science** and **Data Science** graduate from the **University of Wisconsin-Madison**. I am passionate about building intelligent, 
data-driven systems that bridge strong engineering with real-world impact. My interests sit at the intersection of software engineering, 
machine learning and applied analytics, with hands-on experience across full-stack development, computer vision and predictive modeling.

Most recently, I was a part of the team at **Wisconsin Autonomous** where I worked on developing computer vision
pipelines for autonomous vehicles. My work spanned object detection, multi-object tracking and deep learning model optimization, 
including deploying YOLO-based models on embedded GPUs for real-time inference. This work contributed to a 2nd place overall finish at the 2025 SAE AutoDrive Challenge II.

Previously, I interned at **Nokia** as a **Software Engineering Intern**, where I helped modernize a large-scale analytics dashboard by migrating it to a React and Node.js stack, 
improving performance and maintainability. I also built data ingestion pipelines and reporting tools to surface telecom KPIs for enterprise clients, 
working in Agile Scrum teams to ship production features.

Outside of work, I enjoy building projects that combine data, modeling and clean design —from a full-stack personal finance tracker to machine learning models for sports outcome prediction. 
I am driven by curiosity and a desire to turn complex data into systems people can actually use.
`;

const BioRenderer = () => {
  // Generate faux line numbers
  const lineNumbers = Array.from({ length: 42 }, (_, i) => i + 1);

  return (
    <div className="flex w-full font-mono text-sm leading-6">
      {/* Line Numbers Gutter */}
      <div className="flex-shrink-0 w-12 text-right pr-4 text-[#6e7681] select-none bg-[#1e1e1e] border-r border-[#1e1e1e] pt-8">
        {lineNumbers.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 pt-4 max-w-full text-[#d4d4d4]">
        
        {/* Profile Picture Placeholder */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-6">
           <div className="flex-1 min-w-[300px]">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl mb-6 text-[#569cd6] font-normal" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl mt-8 mb-4 text-[#c586c0] font-normal" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mt-2 space-y-2 text-[#dcdcaa]" {...props} />,
                    li: ({node, ...props}) => <li className="pl-2" {...props} />,
                    strong: ({node, ...props}) => <span className="text-[#4ec9b0] font-semibold" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 text-[15px] opacity-90 leading-7" {...props} />
                  }}
                >
                  {bioContent}
                </ReactMarkdown>
              </div>
           </div>

           {/* Image Frame */}
           <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-[#3e3e42] relative overflow-hidden shadow-lg bg-[#252526] flex items-center justify-center flex-shrink-0 mt-4 sm:mt-0 mr-8">
              {/* Replace src with your actual image path */}
              <UserCircle className="w-32 h-32 text-gray-500 opacity-50" />
              {/* <img src="/your-photo.jpg" alt="Aashit Paliwal" className="w-full h-full object-cover" /> */}
           </div>
        </div>
      </div>
    </div>
  );
};

export default BioRenderer;
