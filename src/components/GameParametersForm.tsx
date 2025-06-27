import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Craft Your Game Vision</h2>
        <p className="text-gray-600">Tell us about your project constraints and vision - we'll create a realistic, actionable game concept</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Genre Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-4">Genre</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {genres.map(genre => (
              <button
                key={genre}
                type="button"
                onClick={() => setParameters(prev => ({ ...prev, genre }))}
                className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                  parameters.genre === genre
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-4">Target Platform(s)</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {platforms.map(platform => (
              <button
                key={platform}
                type="button"
                onClick={() => handlePlatformChange(platform)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                  parameters.platform?.includes(platform)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Development Constraints Row */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Budget */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">Budget Range</label>
            <div className="space-y-2">
              {budgets.map(budget => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setParameters(prev => ({ ...prev, budget }))}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                    parameters.budget === budget
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">Team Size</label>
            <div className="space-y-2">
              {teamSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setParameters(prev => ({ ...prev, teamSize: size }))}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                    parameters.teamSize === size
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">Development Timeframe</label>
            <div className="space-y-2">
              {timeframes.map(timeframe => (
                <button
                  key={timeframe}
                  type="button"
                  onClick={() => setParameters(prev => ({ ...prev, timeframe }))}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                    parameters.timeframe === timeframe
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-4">Target Audience</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {audiences.map(audience => (
              <button
                key={audience}
                type="button"
                onClick={() => setParameters(prev => ({ ...prev, targetAudience: audience }))}
                className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                  parameters.targetAudience === audience
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                {audience}
              </button>
            ))}
          </div>
        </div>

        {/* Monetization Preference */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-4">Preferred Monetization Model</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {monetizationOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setParameters(prev => ({ ...prev, monetizationPreference: option }))}
                className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                  parameters.monetizationPreference === option
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Theme/Setting */}
        <div>
          <label htmlFor="theme" className="block text-lg font-semibold text-gray-700 mb-4">
            Theme or Setting (Optional)
          </label>
          <input
            type="text"
            id="theme"
            value={parameters.theme}
            onChange={(e) => setParameters(prev => ({ ...prev, theme: e.target.value }))}
            placeholder="e.g., Medieval fantasy, Cyberpunk, Space exploration, Post-apocalyptic..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Custom Prompt */}
        <div>
          <label htmlFor="customPrompt" className="block text-lg font-semibold text-gray-700 mb-4">
            Additional Ideas or Requirements (Optional)
          </label>
          <textarea
            id="customPrompt"
            value={parameters.customPrompt}
            onChange={(e) => setParameters(prev => ({ ...prev, customPrompt: e.target.value }))}
            placeholder="Any specific mechanics, story elements, technical constraints, or unique features you want to include..."
            rows={4}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Generate Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Generating Your Game Idea...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                <span>Generate Realistic Game Concept</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};