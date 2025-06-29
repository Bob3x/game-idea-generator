import React, { useState } from 'react';
import { Wand2, Loader2, ChevronDown, Target } from 'lucide-react';
import { GameParameters } from '../types/game';

interface GameParametersFormProps {
  onGenerate: (parameters: GameParameters) => void;
  isGenerating: boolean;
}

export const GameParametersForm: React.FC<GameParametersFormProps> = ({ onGenerate, isGenerating }) => {
  const [parameters, setParameters] = useState<GameParameters>({
    genre: '',
    platform: [],
    complexity: '',
    theme: '',
    targetAudience: '',
    budget: '',
    teamSize: '',
    timeframe: '',
    monetizationPreference: '',
    customPrompt: ''
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    constraints: false,
    advanced: false
  });

  const genres = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Puzzle', 'Simulation', 
    'Racing', 'Sports', 'Horror', 'Platformer', 'Fighting', 'Shooter',
    'Idle/Clicker', 'Battle Royale', 'MOBA', 'Card Game', 'Roguelike'
  ];

  const platforms = ['PC', 'Mobile', 'Console', 'VR', 'Web Browser', 'AR', 'Steam Deck'];
  const complexities = ['Simple', 'Medium', 'Complex'];
  const audiences = ['Kids (6-12)', 'Teens (13-17)', 'Young Adults (18-25)', 'Adults (26-40)', 'Seniors (40+)', 'Casual Gamers', 'Hardcore Gamers', 'Competitive Players'];
  const budgets = ['Under $10K', '$10K - $50K', '$50K - $200K', '$200K - $1M', '$1M+', 'Bootstrap/No Budget'];
  const teamSizes = ['Solo Developer', '2-3 People', '4-10 People', '11-25 People', '25+ People'];
  const timeframes = ['1-3 Months', '3-6 Months', '6-12 Months', '1-2 Years', '2+ Years'];
  const monetizationOptions = ['Free-to-Play', 'Premium/Paid', 'Freemium', 'Subscription', 'In-App Purchases', 'Ad-Supported', 'NFT/Blockchain'];

  const handlePlatformChange = (platform: string) => {
    setParameters(prev => ({
      ...prev,
      platform: prev.platform?.includes(platform)
        ? prev.platform.filter(p => p !== platform)
        : [...(prev.platform || []), platform]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(parameters);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <div className="text-center mb-8 lg:mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#5865f2]/10 text-[#5865f2] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#5865f2]/20">
          <Target className="w-4 h-4" />
          <span>Smart Generative System</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Turn Your Vision Into Reality</h2>
        <p className="text-lg text-[#b9bbbe] max-w-3xl mx-auto leading-relaxed mb-6">
          Transform your creative ideas into detailed, actionable game concepts. Our intelligent system ensures 
          every concept is unique, market-ready, and tailored to your specific capabilities.
        </p>
        
        {/* Feature Highlight */}
        <div className="bg-gradient-to-r from-[#57f287]/10 to-[#5865f2]/10 border border-[#57f287]/20 rounded-xl p-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-[#57f287] rounded-full animate-pulse"></div>
            <span className="text-[#57f287] font-bold">Uniqueness Detection Active</span>
          </div>
          <p className="text-[#b9bbbe] text-sm">
            Every concept is automatically analyzed against thousands of existing games to ensure originality and market differentiation.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <div className="bg-white rounded-xl border border-[#e3e5e8] overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('basic')}
            className="w-full flex items-center justify-between p-4 sm:p-6 bg-[#f8f9fa] hover:bg-[#e9ecef] transition-colors border-b border-[#e3e5e8]"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#2f3136]">Basic Settings</h3>
            <ChevronDown className={`w-5 h-5 text-[#6c757d] transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.basic && (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Genre Selection */}
              <div>
                <label className="block text-sm font-bold text-[#2f3136] mb-3">Genre *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setParameters(prev => ({ ...prev, genre }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                        parameters.genre === genre
                          ? 'border-[#5865f2] bg-[#5865f2]/10 text-[#5865f2] shadow-sm'
                          : 'border-[#dee2e6] hover:border-[#5865f2]/50 hover:bg-[#5865f2]/5 text-[#495057] hover:text-[#5865f2]'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-bold text-[#2f3136] mb-3">Target Platform(s) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handlePlatformChange(platform)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                        parameters.platform?.includes(platform)
                          ? 'border-[#00a8fc] bg-[#00a8fc]/10 text-[#00a8fc] shadow-sm'
                          : 'border-[#dee2e6] hover:border-[#00a8fc]/50 hover:bg-[#00a8fc]/5 text-[#495057] hover:text-[#00a8fc]'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity */}
              <div>
                <label className="block text-sm font-bold text-[#2f3136] mb-3">Complexity Level *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {complexities.map(complexity => (
                    <button
                      key={complexity}
                      type="button"
                      onClick={() => setParameters(prev => ({ ...prev, complexity }))}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 font-medium text-left ${
                        parameters.complexity === complexity
                          ? 'border-[#57f287] bg-[#57f287]/10 text-[#57f287] shadow-sm'
                          : 'border-[#dee2e6] hover:border-[#57f287]/50 hover:bg-[#57f287]/5 text-[#495057] hover:text-[#57f287]'
                      }`}
                    >
                      <div className="text-base font-bold">{complexity}</div>
                      <div className="text-sm text-[#6c757d] mt-1">
                        {complexity === 'Simple' && 'Quick to build, focused scope'}
                        {complexity === 'Medium' && 'Balanced features and timeline'}
                        {complexity === 'Complex' && 'Feature-rich, longer development'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Development Constraints */}
        <div className="bg-white rounded-xl border border-[#e3e5e8] overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('constraints')}
            className="w-full flex items-center justify-between p-4 sm:p-6 bg-[#f8f9fa] hover:bg-[#e9ecef] transition-colors border-b border-[#e3e5e8]"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#2f3136]">Development Constraints</h3>
            <ChevronDown className={`w-5 h-5 text-[#6c757d] transition-transform ${expandedSections.constraints ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.constraints && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Budget */}
                <div>
                  <label className="block text-sm font-bold text-[#2f3136] mb-3">Budget Range</label>
                  <div className="space-y-2">
                    {budgets.map(budget => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setParameters(prev => ({ ...prev, budget }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm text-left ${
                          parameters.budget === budget
                            ? 'border-[#faa61a] bg-[#faa61a]/10 text-[#faa61a] shadow-sm'
                            : 'border-[#dee2e6] hover:border-[#faa61a]/50 hover:bg-[#faa61a]/5 text-[#495057] hover:text-[#faa61a]'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-sm font-bold text-[#2f3136] mb-3">Team Size</label>
                  <div className="space-y-2">
                    {teamSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setParameters(prev => ({ ...prev, teamSize: size }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm text-left ${
                          parameters.teamSize === size
                            ? 'border-[#eb459e] bg-[#eb459e]/10 text-[#eb459e] shadow-sm'
                            : 'border-[#dee2e6] hover:border-[#eb459e]/50 hover:bg-[#eb459e]/5 text-[#495057] hover:text-[#eb459e]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeframe */}
                <div>
                  <label className="block text-sm font-bold text-[#2f3136] mb-3">Development Timeframe</label>
                  <div className="space-y-2">
                    {timeframes.map(timeframe => (
                      <button
                        key={timeframe}
                        type="button"
                        onClick={() => setParameters(prev => ({ ...prev, timeframe }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm text-left ${
                          parameters.timeframe === timeframe
                            ? 'border-[#faa61a] bg-[#faa61a]/10 text-[#faa61a] shadow-sm'
                            : 'border-[#dee2e6] hover:border-[#faa61a]/50 hover:bg-[#faa61a]/5 text-[#495057] hover:text-[#faa61a]'
                        }`}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div className="bg-white rounded-xl border border-[#e3e5e8] overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('advanced')}
            className="w-full flex items-center justify-between p-4 sm:p-6 bg-[#f8f9fa] hover:bg-[#e9ecef] transition-colors border-b border-[#e3e5e8]"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#2f3136]">Advanced Options</h3>
            <ChevronDown className={`w-5 h-5 text-[#6c757d] transition-transform ${expandedSections.advanced ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.advanced && (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Target Audience */}
              <div>
                <label className="block text-sm font-bold text-[#2f3136] mb-3">Target Audience</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {audiences.map(audience => (
                    <button
                      key={audience}
                      type="button"
                      onClick={() => setParameters(prev => ({ ...prev, targetAudience: audience }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                        parameters.targetAudience === audience
                          ? 'border-[#5865f2] bg-[#5865f2]/10 text-[#5865f2] shadow-sm'
                          : 'border-[#dee2e6] hover:border-[#5865f2]/50 hover:bg-[#5865f2]/5 text-[#495057] hover:text-[#5865f2]'
                      }`}
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monetization */}
              <div>
                <label className="block text-sm font-bold text-[#2f3136] mb-3">Preferred Monetization Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {monetizationOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setParameters(prev => ({ ...prev, monetizationPreference: option }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                        parameters.monetizationPreference === option
                          ? 'border-[#57f287] bg-[#57f287]/10 text-[#57f287] shadow-sm'
                          : 'border-[#dee2e6] hover:border-[#57f287]/50 hover:bg-[#57f287]/5 text-[#495057] hover:text-[#57f287]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme/Setting */}
              <div>
                <label htmlFor="theme" className="block text-sm font-bold text-[#2f3136] mb-3">
                  Theme or Setting (Optional)
                </label>
                <input
                  type="text"
                  id="theme"
                  value={parameters.theme}
                  onChange={(e) => setParameters(prev => ({ ...prev, theme: e.target.value }))}
                  placeholder="e.g., Medieval fantasy, Cyberpunk, Space exploration, Post-apocalyptic..."
                  className="w-full p-4 border-2 border-[#dee2e6] rounded-lg focus:border-[#5865f2] focus:outline-none transition-colors bg-white text-[#2f3136] placeholder-[#6c757d] font-medium"
                />
              </div>

              {/* Custom Prompt */}
              <div>
                <label htmlFor="customPrompt" className="block text-sm font-bold text-[#2f3136] mb-3">
                  Additional Ideas or Requirements (Optional)
                </label>
                <textarea
                  id="customPrompt"
                  value={parameters.customPrompt}
                  onChange={(e) => setParameters(prev => ({ ...prev, customPrompt: e.target.value }))}
                  placeholder="Any specific mechanics, story elements, technical constraints, or unique features you want to include..."
                  rows={4}
                  className="w-full p-4 border-2 border-[#dee2e6] rounded-lg focus:border-[#5865f2] focus:outline-none transition-colors resize-none bg-white text-[#2f3136] placeholder-[#6c757d] font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="text-center pt-6 pb-8">
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-[#5865f2] hover:bg-[#4752c4] disabled:bg-[#6c757d] text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center space-x-3 mx-auto text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Generating Your Game Concept...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                <span>Generate Game Concept</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};