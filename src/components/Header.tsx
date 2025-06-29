import React, { useState } from 'react';
import { Gamepad2, Sparkles, Menu, X, BookOpen, Settings } from 'lucide-react';
import { AuthButton } from './AuthButton';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // For hackathon: Remove non-functional buttons or make them functional
  const handleMyIdeas = () => {
    // TODO: Implement saved ideas view
    alert('My Ideas feature coming soon! For now, use the Save button on generated concepts.');
  };

  const handleSettings = () => {
    // TODO: Implement settings panel
    alert('Settings panel coming soon! Current app works with default optimal settings.');
  };

  return (
    <header className="bg-[#2f3136] border-b border-[#40444b] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5865f2] to-[#4752c4] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#faa61a] rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>GameSpark</span>
                <span className="bg-[#57f287]/20 text-[#57f287] px-2 py-1 rounded-full text-xs font-bold">SMART</span>
              </h1>
              <p className="text-xs text-[#b9bbbe]">Intelligent Game Generator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <button 
                onClick={handleMyIdeas}
                className="flex items-center space-x-2 text-[#b9bbbe] hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-[#40444b]"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">My Ideas</span>
              </button>
              <button 
                onClick={handleSettings}
                className="flex items-center space-x-2 text-[#b9bbbe] hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-[#40444b]"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </nav>
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#b9bbbe] hover:text-white transition-colors p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#40444b] space-y-4">
            <nav className="space-y-2">
              <button 
                onClick={handleMyIdeas}
                className="flex items-center space-x-3 text-[#b9bbbe] hover:text-white transition-colors w-full text-left px-3 py-2 rounded-md hover:bg-[#40444b]"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">My Ideas</span>
              </button>
              <button 
                onClick={handleSettings}
                className="flex items-center space-x-3 text-[#b9bbbe] hover:text-white transition-colors w-full text-left px-3 py-2 rounded-md hover:bg-[#40444b]"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </nav>
            <div className="pt-2 border-t border-[#40444b]">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};