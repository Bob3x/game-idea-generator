import React from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <Gamepad2 className="w-10 h-10 text-cyan-400" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            GameSpark
          </h1>
        </div>
        <p className="text-center text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Unleash your creativity with AI-powered game concepts. From indie gems to AAA blockbusters, 
          discover your next gaming masterpiece.
        </p>
      </div>
    </header>
  );
};