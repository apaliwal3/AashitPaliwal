"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactRenderer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-8 text-vscode-text font-mono text-sm">
      <div className="mb-4 text-gray-400">
        // Fill out the object below to send a message.
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl">
        <span className="text-yellow-400">const</span> <span className="text-blue-400">contact</span> <span className="text-white">=</span> <span className="text-yellow-400">{`{`}</span>
        
        <div className="pl-6 py-2 flex items-center">
            <span className="text-sky-300 w-24">"name"</span>
            <span className="text-white mr-2">:</span>
            <span className="text-orange-300">"</span>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="bg-transparent border-b border-gray-700 focus:border-blue-400 outline-none w-64 text-orange-300" 
              placeholder="Your Name"
            />
            <span className="text-orange-300">",</span>
        </div>

        <div className="pl-6 py-2 flex items-center">
            <span className="text-sky-300 w-24">"email"</span>
            <span className="text-white mr-2">:</span>
            <span className="text-orange-300">"</span>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="bg-transparent border-b border-gray-700 focus:border-blue-400 outline-none w-64 text-orange-300" 
              placeholder="email@example.com"
            />
             <span className="text-orange-300">",</span>
        </div>

        <div className="pl-6 py-2 flex items-start">
            <span className="text-sky-300 w-24">"message"</span>
            <span className="text-white mr-2">:</span>
            <span className="text-orange-300">"</span>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows={4}
              className="bg-transparent border-b border-gray-700 focus:border-blue-400 outline-none w-80 text-orange-300 resize-none" 
              placeholder="Type your message..."
            />
            <span className="text-orange-300">"</span>
        </div>

        <div className="text-yellow-400">{`}`}</div>
        
        <div className="mt-6">
            <button 
                type="submit"
                disabled={submitted}
                className="bg-[#0e639c] text-white px-4 py-2 hover:bg-[#1177bb] transition-colors disabled:opacity-50"
            >
                {submitted ? 'message.sent();' : 'submit(contact);'}
            </button>
            {submitted && <span className="ml-4 text-green-400">// Message sent successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default ContactRenderer;
