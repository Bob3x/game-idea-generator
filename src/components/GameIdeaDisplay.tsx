import React from 'react';
import { Download, RefreshCw, Star, Clock, Users, Gamepad2, DollarSign, AlertTriangle, Target, Zap } from 'lucide-react';
import { GameIdea } from '../types/game';

interface GameIdeaDisplayProps {
  gameIdea: GameIdea;
  onRefine: () => void;
  onExportPDF: () => void;
  isRefining: boolean;
}

export const GameIdeaDisplay: React.FC<GameIdeaDisplayProps> = ({ 
  gameIdea, 
  onRefine, 
  onExportPDF, 
  isRefining 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{gameIdea.title}</h2>
            <div className="flex items-center space-x-4 text-purple-100">
              <span className="flex items-center space-x-1">
                <Gamepad2 className="w-4 h-4" />
                <span>{gameIdea.genre}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{gameIdea.targetAudience}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{gameIdea.estimatedDevTime}</span>
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onRefine}
              disabled={isRefining}
              className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefining ? 'animate-spin' : ''}`} />
              <span>Refine</span>
            </button>
            <button
              onClick={onExportPDF}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Budget</span>
            </div>
            <p className="text-blue-700">{gameIdea.budgetEstimate || 'Not specified'}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Team Size</span>
            </div>
            <p className="text-green-700">{gameIdea.teamSize || 'Not specified'}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Complexity</span>
            </div>
            <p className="text-purple-700">{gameIdea.complexity}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-orange-800">Monetization</span>
            </div>
            <p className="text-orange-700">{gameIdea.monetization || 'TBD'}</p>
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Target Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {gameIdea.platform.map(platform => (
              <span
                key={platform}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Game Overview</h3>
          <p className="text-gray-700 leading-relaxed text-lg">{gameIdea.description}</p>
        </div>

        {/* Core Gameplay */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Core Gameplay</h3>
          <p className="text-gray-700 leading-relaxed">{gameIdea.coreGameplay}</p>
        </div>

        {/* MVP Features */}
        {gameIdea.mvpFeatures && gameIdea.mvpFeatures.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>MVP Features (Start Here)</span>
            </h3>
            <ul className="space-y-2">
              {gameIdea.mvpFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Unique Features */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Unique Features</h3>
          <ul className="space-y-2">
            {gameIdea.uniqueFeatures.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Marketing Hooks */}
        {gameIdea.marketingHooks && gameIdea.marketingHooks.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Marketing Hooks</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {gameIdea.marketingHooks.map((hook, index) => (
                <div key={index} className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
                  <p className="text-pink-800 font-medium">"{hook}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {gameIdea.riskFactors && gameIdea.riskFactors.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Risk Factors & Mitigation</span>
            </h3>
            <ul className="space-y-2">
              {gameIdea.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Development Info</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Complexity:</span> {gameIdea.complexity}</p>
              <p><span className="font-semibold">Estimated Time:</span> {gameIdea.estimatedDevTime}</p>
              {gameIdea.teamSize && (
                <p><span className="font-semibold">Recommended Team:</span> {gameIdea.teamSize}</p>
              )}
              {gameIdea.budgetEstimate && (
                <p><span className="font-semibold">Budget Range:</span> {gameIdea.budgetEstimate}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Art & Technical</h3>
            <div className="space-y-2 text-gray-700">
              {gameIdea.artStyle && (
                <p><span className="font-semibold">Art Style:</span> {gameIdea.artStyle}</p>
              )}
              {gameIdea.competitorAnalysis && (
                <p><span className="font-semibold">Similar Games:</span> {gameIdea.competitorAnalysis}</p>
              )}
              {gameIdea.technicalRequirements && (
                <div>
                  <span className="font-semibold">Technical Requirements:</span>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {gameIdea.technicalRequirements.map((req, index) => (
                      <li key={index} className="text-sm">{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};