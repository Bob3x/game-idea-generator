import React, { useState } from 'react';
import { Download, RefreshCw, Star, Clock, Users, Gamepad2, DollarSign, AlertTriangle, Target, Zap, Save, Share2, Copy, CheckCircle, Lightbulb, TrendingUp, Shield, Rocket, Heart, Eye, Compass, Wrench, Palette, Code, Trophy, Globe, ChevronDown, Sparkles, BookOpen, Calendar, Layers, GitBranch, CheckSquare, DollarSign as MoneyIcon, Calculator, PieChart, BarChart3, TrendingDown, Crown, Lock } from 'lucide-react';
import { GameIdea } from '../types/game';
import { saveGameIdea } from '../services/gameIdeaService';
import { supabase } from '../lib/supabase';
import { UniquenessIndicator } from './UniquenessIndicator';

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
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [uniquenessExpanded, setUniquenessExpanded] = useState(false);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleSaveIdea = async (isPublic: boolean = false) => {
    if (!user) {
      setSaveMessage('Please sign in to save ideas');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setIsSaving(true);
    try {
      await saveGameIdea(gameIdea, isPublic);
      setSaveMessage(isPublic ? 'Idea saved and shared publicly!' : 'Idea saved to your collection!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving idea:', error);
      setSaveMessage('Failed to save idea. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyToClipboard = async () => {
    const gameText = `
# ${gameIdea.title}

**Genre:** ${gameIdea.genre}
**Platforms:** ${gameIdea.platform.join(', ')}
**Complexity:** ${gameIdea.complexity}

## Overview
${gameIdea.description}

## Core Gameplay
${gameIdea.coreGameplay}

## Unique Features
${gameIdea.uniqueFeatures.map(feature => `• ${feature}`).join('\n')}

## Development Details
- **Target Audience:** ${gameIdea.targetAudience}
- **Estimated Time:** ${gameIdea.estimatedDevTime}
- **Team Size:** ${gameIdea.teamSize}
- **Budget:** ${gameIdea.budgetEstimate}
    `.trim();

    try {
      await navigator.clipboard.writeText(gameText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const hasUniquenessData = gameIdea.similarityScore !== undefined || (gameIdea.uniquenessEnhancements && gameIdea.uniquenessEnhancements.length > 0);

  // Check if user is premium (signed in)
  const isPremiumUser = !!user;

  // Generate smart development insights
  const generateDevelopmentInsights = () => {
    const insights = [];
    
    // Budget-based insight
    const budget = gameIdea.budgetEstimate || '';
    if (budget.includes('Under $10K') || budget.includes('Bootstrap')) {
      insights.push('Use free engines (Godot) and asset stores to minimize costs');
    } else if (budget.includes('$1M+')) {
      insights.push('Invest in specialized teams and extensive QA cycles');
    } else {
      insights.push('Balance full-time hires with specialized contractors');
    }

    // Timeline-based insight
    const timeline = gameIdea.estimatedDevTime || '';
    if (timeline.includes('1-3') || timeline.includes('3-6')) {
      insights.push('Focus on proven mechanics over innovation for faster delivery');
    } else if (timeline.includes('2+ Years')) {
      insights.push('Plan extensive prototyping and technology foundation phases');
    } else {
      insights.push('Implement monthly milestone reviews with flexible scope');
    }

    // Team size insight
    const teamSize = gameIdea.teamSize || '';
    if (teamSize.includes('Solo')) {
      insights.push('Leverage your strongest skills, outsource weaknesses');
    } else if (teamSize.includes('25+')) {
      insights.push('Implement agile methodology with clear communication protocols');
    } else {
      insights.push('Maintain detailed documentation and regular team sync meetings');
    }

    // Platform-specific insight
    if (gameIdea.platform.includes('Mobile')) {
      insights.push('Design for touch-first with offline capabilities');
    } else if (gameIdea.platform.includes('VR')) {
      insights.push('Prioritize comfort settings and motion sickness prevention');
    } else if (gameIdea.platform.includes('Console')) {
      insights.push('Plan for certification requirements and platform-specific features');
    }

    return insights.slice(0, 4); // Keep it concise
  };

  // Generate comprehensive development guidance for premium users
  const generateDevelopmentGuidance = () => {
    const guidance = [];
    
    // Budget-based guidance with detailed breakdown
    const budget = gameIdea.budgetEstimate || '';
    if (budget.includes('Under $10K') || budget.includes('Bootstrap')) {
      guidance.push({
        category: 'Bootstrap Strategy',
        icon: Calculator,
        color: 'faa61a',
        items: [
          'Allocate 60% to development tools and assets, 40% to marketing',
          'Use free engines (Godot) and open-source tools (Blender, GIMP)',
          'Consider revenue-share partnerships instead of upfront payments',
          'Focus on single platform launch to minimize porting costs',
          'Plan for 3-6 month development cycle with minimal features'
        ],
        budgetBreakdown: [
          { category: 'Tools & Software', percentage: 20, amount: '$500-2K' },
          { category: 'Assets & Audio', percentage: 40, amount: '$1K-4K' },
          { category: 'Marketing', percentage: 30, amount: '$750-3K' },
          { category: 'Contingency', percentage: 10, amount: '$250-1K' }
        ]
      });
    } else if (budget.includes('$1M+')) {
      guidance.push({
        category: 'Premium Development',
        icon: Trophy,
        color: 'eb459e',
        items: [
          'Invest 70% in development, 20% in marketing, 10% contingency',
          'Hire specialized teams for each discipline (art, audio, programming)',
          'Plan for extensive QA cycles and user research phases',
          'Consider simultaneous multi-platform development',
          'Allocate budget for post-launch content and live operations'
        ],
        budgetBreakdown: [
          { category: 'Development Team', percentage: 50, amount: '$500K+' },
          { category: 'Technology & Tools', percentage: 20, amount: '$200K+' },
          { category: 'Marketing & PR', percentage: 20, amount: '$200K+' },
          { category: 'Operations & Legal', percentage: 10, amount: '$100K+' }
        ]
      });
    } else {
      guidance.push({
        category: 'Balanced Investment',
        icon: PieChart,
        color: '5865f2',
        items: [
          'Split 65% development, 25% marketing, 10% contingency',
          'Mix of full-time hires and specialized contractors',
          'Plan for 2-3 major iteration cycles based on feedback',
          'Target primary platform first, then expand',
          'Reserve budget for post-launch updates and bug fixes'
        ],
        budgetBreakdown: [
          { category: 'Core Development', percentage: 45, amount: '$11K-45K' },
          { category: 'Art & Audio', percentage: 20, amount: '$5K-20K' },
          { category: 'Marketing', percentage: 25, amount: '$6K-25K' },
          { category: 'Tools & Misc', percentage: 10, amount: '$2.5K-10K' }
        ]
      });
    }

    // Timeline-based development phases
    const timeline = gameIdea.estimatedDevTime || '';
    if (timeline.includes('1-3') || timeline.includes('3-6')) {
      guidance.push({
        category: 'Rapid Development Timeline',
        icon: Rocket,
        color: 'faa61a',
        items: [
          'Week 1-2: Core prototype and vertical slice',
          'Week 3-8: MVP development with weekly playtests',
          'Week 9-10: Polish, optimization, and platform integration',
          'Week 11-12: Marketing preparation and launch',
          'Focus on proven mechanics rather than innovation'
        ],
        phases: [
          { phase: 'Prototype', duration: '15%', focus: 'Core mechanics validation' },
          { phase: 'MVP Development', duration: '60%', focus: 'Feature implementation' },
          { phase: 'Polish & Testing', duration: '15%', focus: 'Bug fixes and optimization' },
          { phase: 'Launch Prep', duration: '10%', focus: 'Marketing and distribution' }
        ]
      });
    } else if (timeline.includes('2+ Years')) {
      guidance.push({
        category: 'Long-term Project Planning',
        icon: Calendar,
        color: '5865f2',
        items: [
          'Months 1-6: Extensive prototyping and technical foundation',
          'Months 7-18: Core feature development with quarterly milestones',
          'Months 19-22: Content creation and system integration',
          'Months 23-24: Beta testing, polish, and launch preparation',
          'Plan for technology updates and team scaling'
        ],
        phases: [
          { phase: 'Foundation', duration: '25%', focus: 'Architecture and core systems' },
          { phase: 'Development', duration: '50%', focus: 'Feature implementation' },
          { phase: 'Content & Polish', duration: '15%', focus: 'Assets and optimization' },
          { phase: 'Launch', duration: '10%', focus: 'Testing and marketing' }
        ]
      });
    } else {
      guidance.push({
        category: 'Standard Development Cycle',
        icon: BarChart3,
        color: '57f287',
        items: [
          'Month 1-2: Prototype and technical proof of concept',
          'Month 3-7: Core feature development with monthly reviews',
          'Month 8-9: Content creation and system integration',
          'Month 10-12: Testing, polish, and launch preparation',
          'Maintain flexible scope to adapt to feedback'
        ],
        phases: [
          { phase: 'Prototype', duration: '20%', focus: 'Concept validation' },
          { phase: 'Core Development', duration: '50%', focus: 'Feature implementation' },
          { phase: 'Content & Polish', duration: '20%', focus: 'Assets and refinement' },
          { phase: 'Launch Prep', duration: '10%', focus: 'Final testing and marketing' }
        ]
      });
    }

    // Team size and management guidance
    const teamSize = gameIdea.teamSize || '';
    if (teamSize.includes('Solo')) {
      guidance.push({
        category: 'Solo Development Strategy',
        icon: Users,
        color: '57f287',
        items: [
          'Focus on your strongest skills, outsource weaknesses',
          'Use asset stores and templates to accelerate development',
          'Join indie developer communities for support and feedback',
          'Plan for 20% longer timelines due to context switching',
          'Consider partnering with others for complementary skills'
        ],
        skillPriorities: [
          { skill: 'Programming', importance: 'Critical', recommendation: 'Master one engine thoroughly' },
          { skill: 'Game Design', importance: 'Critical', recommendation: 'Study successful games in your genre' },
          { skill: 'Art/Audio', importance: 'Moderate', recommendation: 'Use assets or hire freelancers' },
          { skill: 'Marketing', importance: 'High', recommendation: 'Start building audience early' }
        ]
      });
    } else if (teamSize.includes('25+')) {
      guidance.push({
        category: 'Large Team Coordination',
        icon: GitBranch,
        color: 'eb459e',
        items: [
          'Implement agile methodology with 2-week sprints',
          'Use project management tools (Jira, Confluence, Slack)',
          'Establish clear communication hierarchies and protocols',
          'Plan for 15-20% overhead due to coordination complexity',
          'Regular cross-team sync meetings and milestone reviews'
        ],
        teamStructure: [
          { role: 'Core Team', size: '8-12', responsibility: 'Architecture and key features' },
          { role: 'Feature Teams', size: '4-6 each', responsibility: 'Specific game systems' },
          { role: 'Support Teams', size: '2-4 each', responsibility: 'QA, DevOps, Community' },
          { role: 'Leadership', size: '3-5', responsibility: 'Vision and coordination' }
        ]
      });
    }

    // Risk mitigation strategies
    guidance.push({
      category: 'Risk Mitigation',
      icon: Shield,
      color: 'faa61a',
      items: [
        'Create playable prototype within first 20% of timeline',
        'Implement weekly builds and automated testing',
        'Maintain detailed documentation and code comments',
        'Plan for 30% scope reduction if needed',
        'Establish clear success metrics and pivot triggers'
      ],
      riskFactors: [
        { risk: 'Scope Creep', mitigation: 'Lock features after prototype phase', severity: 'High' },
        { risk: 'Technical Debt', mitigation: 'Weekly code reviews and refactoring', severity: 'Medium' },
        { risk: 'Market Changes', mitigation: 'Regular competitor analysis', severity: 'Medium' },
        { risk: 'Team Burnout', mitigation: 'Sustainable work practices', severity: 'High' }
      ]
    });

    return guidance;
  };

  const developmentInsights = generateDevelopmentInsights();
  const developmentGuidance = isPremiumUser ? generateDevelopmentGuidance() : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#5865f2] to-[#4752c4] text-white rounded-t-xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="flex-1 mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{gameIdea.title}</h2>
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Ready for Development</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-white/90">
              <span className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                <Gamepad2 className="w-4 h-4" />
                <span>{gameIdea.genre}</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                <Users className="w-4 h-4" />
                <span>{gameIdea.targetAudience}</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                <span>{gameIdea.estimatedDevTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Uniqueness Indicator */}
        {hasUniquenessData && (
          <div className="mb-4">
            <button
              onClick={() => setUniquenessExpanded(!uniquenessExpanded)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 flex items-center justify-between hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Uniqueness Analysis</span>
                {!user && (
                  <span className="bg-[#faa61a]/20 text-[#faa61a] px-2 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </span>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 text-white transition-transform ${uniquenessExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {uniquenessExpanded && (
              <div className="mt-3">
                <UniquenessIndicator
                  similarityScore={gameIdea.similarityScore}
                  uniquenessEnhancements={gameIdea.uniquenessEnhancements}
                  isVisible={true}
                />
              </div>
            )}
          </div>
        )}
        
        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefine}
            disabled={isRefining}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium disabled:cursor-not-allowed backdrop-blur-sm hover:shadow-md group"
          >
            <Sparkles className={`w-4 h-4 ${isRefining ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
            <span>{isRefining ? 'Enhancing...' : 'AI Refine'}</span>
          </button>
          
          <button
            onClick={() => handleSaveIdea(false)}
            disabled={isSaving || !user}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium disabled:cursor-not-allowed backdrop-blur-sm hover:shadow-md group"
          >
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Save</span>
          </button>
          
          <button
            onClick={() => handleSaveIdea(true)}
            disabled={isSaving || !user}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium disabled:cursor-not-allowed backdrop-blur-sm hover:shadow-md group"
          >
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Share</span>
          </button>
          
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm hover:shadow-md group"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          
          <button
            onClick={onExportPDF}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm hover:shadow-md group"
          >
            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Export</span>
          </button>
        </div>
        
        {saveMessage && (
          <div className="mt-4 bg-white/20 text-white px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-[#57f287]" />
            <span>{saveMessage}</span>
          </div>
        )}
      </div>

      {/* Enhanced Content Structure */}
      <div className="bg-white border-x border-b border-[#e3e5e8] rounded-b-xl shadow-lg">
        {/* Key Metrics Dashboard */}
        <div className="p-4 sm:p-6 border-b border-[#e3e5e8] bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-[#faa61a]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-[#faa61a]/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-[#faa61a]" />
                </div>
                <span className="font-bold text-[#2f3136] text-sm">Investment</span>
              </div>
              <p className="text-[#495057] font-semibold text-sm">{gameIdea.budgetEstimate || 'TBD'}</p>
            </div>
            
            <div className="bg-white border-2 border-[#57f287]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-[#57f287]/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#57f287]" />
                </div>
                <span className="font-bold text-[#2f3136] text-sm">Team Size</span>
              </div>
              <p className="text-[#495057] font-semibold text-sm">{gameIdea.teamSize || 'Flexible'}</p>
            </div>
            
            <div className="bg-white border-2 border-[#5865f2]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-[#5865f2]/10 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#5865f2]" />
                </div>
                <span className="font-bold text-[#2f3136] text-sm">Complexity</span>
              </div>
              <p className="text-[#495057] font-semibold text-sm">{gameIdea.complexity}</p>
            </div>
            
            <div className="bg-white border-2 border-[#eb459e]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-[#eb459e]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#eb459e]" />
                </div>
                <span className="font-bold text-[#2f3136] text-sm">Revenue Model</span>
              </div>
              <p className="text-[#495057] font-semibold text-sm">{gameIdea.monetization || 'TBD'}</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-8">
          {/* Platforms Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
              <Compass className="w-6 h-6 text-[#5865f2]" />
              <span>Target Platforms</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {gameIdea.platform.map(platform => (
                <span
                  key={platform}
                  className="bg-[#5865f2]/10 text-[#5865f2] px-4 py-3 rounded-full text-sm font-bold border-2 border-[#5865f2]/20 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{platform}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Core Concept Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Lightbulb className="w-6 h-6 text-[#faa61a]" />
                <span>Game Vision</span>
              </h3>
              <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 rounded-xl border-2 border-[#e3e5e8] shadow-sm">
                <p className="text-[#495057] leading-relaxed text-base sm:text-lg font-medium">{gameIdea.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Wrench className="w-6 h-6 text-[#5865f2]" />
                <span>Core Mechanics</span>
              </h3>
              <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 rounded-xl border-2 border-[#e3e5e8] shadow-sm">
                <p className="text-[#495057] leading-relaxed font-medium">{gameIdea.coreGameplay}</p>
              </div>
            </div>
          </div>

          {/* MVP Features - Priority Section */}
          {gameIdea.mvpFeatures && gameIdea.mvpFeatures.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Rocket className="w-6 h-6 text-[#faa61a]" />
                <span>MVP Roadmap</span>
                <span className="bg-[#faa61a]/10 text-[#faa61a] px-3 py-1 rounded-full text-sm font-bold">Start Here</span>
              </h3>
              <div className="bg-gradient-to-br from-[#faa61a]/5 to-[#faa61a]/10 border-2 border-[#faa61a]/20 rounded-xl p-6 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  {gameIdea.mvpFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-white/60 p-3 rounded-lg">
                      <div className="w-7 h-7 bg-[#faa61a] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0 shadow-sm">
                        {index + 1}
                      </div>
                      <span className="text-[#495057] font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Unique Features */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
              <Star className="w-6 h-6 text-[#57f287]" />
              <span>Unique Selling Points</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {gameIdea.uniqueFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 bg-gradient-to-r from-[#57f287]/5 to-[#57f287]/10 border-2 border-[#57f287]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-[#57f287]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-[#57f287]" />
                  </div>
                  <span className="text-[#495057] font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing Hooks */}
          {gameIdea.marketingHooks && gameIdea.marketingHooks.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-[#eb459e]" />
                <span>Marketing Angles</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {gameIdea.marketingHooks.map((hook, index) => (
                  <div key={index} className="bg-gradient-to-r from-[#eb459e]/5 to-[#eb459e]/10 border-2 border-[#eb459e]/20 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#eb459e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="w-4 h-4 text-[#eb459e]" />
                      </div>
                      <p className="text-[#495057] font-semibold italic">"{hook}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          {gameIdea.riskFactors && gameIdea.riskFactors.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-[#faa61a]" />
                <span>Risk Management</span>
              </h3>
              <div className="space-y-3">
                {gameIdea.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-gradient-to-r from-[#faa61a]/5 to-[#faa61a]/10 border-2 border-[#faa61a]/20 p-4 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-[#faa61a]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-[#faa61a]" />
                    </div>
                    <span className="text-[#495057] font-semibold">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Development Details */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 rounded-xl border-2 border-[#e3e5e8] shadow-sm">
              <h3 className="text-xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5 text-[#5865f2]" />
                <span>Development Specs</span>
              </h3>
              <div className="space-y-4 text-[#495057]">
                <div className="flex justify-between items-center py-2 border-b border-[#dee2e6]">
                  <span className="font-bold">Complexity:</span>
                  <span className="font-semibold">{gameIdea.complexity}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#dee2e6]">
                  <span className="font-bold">Timeline:</span>
                  <span className="font-semibold">{gameIdea.estimatedDevTime}</span>
                </div>
                {gameIdea.teamSize && (
                  <div className="flex justify-between items-center py-2 border-b border-[#dee2e6]">
                    <span className="font-bold">Team Size:</span>
                    <span className="font-semibold">{gameIdea.teamSize}</span>
                  </div>
                )}
                {gameIdea.budgetEstimate && (
                  <div className="flex justify-between items-center py-2 border-b border-[#dee2e6]">
                    <span className="font-bold">Budget:</span>
                    <span className="font-semibold">{gameIdea.budgetEstimate}</span>
                  </div>
                )}
                
                {/* Smart Development Insights */}
                <div className="mt-4 pt-4 border-t border-[#dee2e6]">
                  <h4 className="font-bold text-[#2f3136] mb-2">Smart Insights</h4>
                  <div className="space-y-2 text-sm">
                    {developmentInsights.map((insight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5865f2] rounded-full"></div>
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 rounded-xl border-2 border-[#e3e5e8] shadow-sm">
              <h3 className="text-xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5 text-[#eb459e]" />
                <span>Creative Direction</span>
              </h3>
              <div className="space-y-4 text-[#495057]">
                {gameIdea.artStyle && (
                  <div>
                    <span className="font-bold block mb-1">Art Style:</span>
                    <span className="font-semibold">{gameIdea.artStyle}</span>
                  </div>
                )}
                {gameIdea.competitorAnalysis && (
                  <div>
                    <span className="font-bold block mb-1">Market Position:</span>
                    <span className="font-semibold">{gameIdea.competitorAnalysis}</span>
                  </div>
                )}
                {gameIdea.technicalRequirements && (
                  <div>
                    <span className="font-bold block mb-2">Tech Stack:</span>
                    <ul className="space-y-2">
                      {gameIdea.technicalRequirements.map((req, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <span className="w-2 h-2 bg-[#5865f2] rounded-full mt-2 flex-shrink-0"></span>
                          <span className="font-medium">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Creative Recommendations */}
                <div className="mt-4 pt-4 border-t border-[#dee2e6]">
                  <h4 className="font-bold text-[#2f3136] mb-2">Creative Tips</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#eb459e] rounded-full"></div>
                      <span>Focus on {gameIdea.platform.includes('Mobile') ? 'touch-friendly UI' : 'immersive visuals'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#faa61a] rounded-full"></div>
                      <span>Audio: {gameIdea.genre === 'Horror' ? 'Spatial/3D audio critical' : 'Dynamic soundtrack recommended'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#57f287] rounded-full"></div>
                      <span>Include accessibility and colorblind support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Development Strategy & Guidance Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-[#5865f2]" />
              <span>Development Strategy</span>
              {isPremiumUser ? (
                <span className="bg-[#5865f2]/10 text-[#5865f2] px-3 py-1 rounded-full text-sm font-bold">Premium</span>
              ) : (
                <span className="bg-[#faa61a]/10 text-[#faa61a] px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Crown className="w-3 h-3" />
                  <span>PREMIUM</span>
                </span>
              )}
            </h3>
            
            {isPremiumUser ? (
              // Full comprehensive guidance for premium users
              <div className="space-y-6">
                {developmentGuidance.map((guide, index) => {
                  const IconComponent = guide.icon;
                  return (
                    <div key={index} className={`bg-gradient-to-br from-[#${guide.color}]/5 to-[#${guide.color}]/10 border-2 border-[#${guide.color}]/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-10 h-10 bg-[#${guide.color}]/10 rounded-full flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 text-[#${guide.color}]`} />
                        </div>
                        <h4 className="text-lg font-bold text-[#2f3136]">{guide.category}</h4>
                      </div>
                      
                      {/* Main guidance items */}
                      <ul className="space-y-3 mb-6">
                        {guide.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 bg-[#${guide.color}] rounded-full mt-2 flex-shrink-0`}></div>
                            <span className="text-[#495057] font-medium text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Budget breakdown if available */}
                      {(guide as any).budgetBreakdown && (
                        <div className="bg-white/60 rounded-lg p-4 mb-4">
                          <h5 className="font-bold text-[#2f3136] mb-3 flex items-center space-x-2">
                            <PieChart className="w-4 h-4" />
                            <span>Budget Allocation</span>
                          </h5>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {(guide as any).budgetBreakdown.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="font-medium">{item.category}:</span>
                                <div className="text-right">
                                  <div className="font-bold">{`${item.percentage}%`}</div>
                                  <div className="text-xs text-[#6c757d]">{item.amount}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Development phases if available */}
                      {(guide as any).phases && (
                        <div className="bg-white/60 rounded-lg p-4 mb-4">
                          <h5 className="font-bold text-[#2f3136] mb-3 flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Development Phases</span>
                          </h5>
                          <div className="space-y-2">
                            {(guide as any).phases.map((phase: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="font-medium">{`${phase.phase}:`}</span>
                                <div className="text-right">
                                  <div className="font-bold">{phase.duration}</div>
                                  <div className="text-xs text-[#6c757d]">{phase.focus}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Team structure if available */}
                      {(guide as any).teamStructure && (
                        <div className="bg-white/60 rounded-lg p-4 mb-4">
                          <h5 className="font-bold text-[#2f3136] mb-3 flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Team Structure</span>
                          </h5>
                          <div className="space-y-2">
                            {(guide as any).teamStructure.map((team: any, idx: number) => (
                              <div key={idx} className="text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{`${team.role}:`}</span>
                                  <span className="font-bold">{team.size}</span>
                                </div>
                                <div className="text-xs text-[#6c757d] ml-2">{team.responsibility}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Risk factors if available */}
                      {(guide as any).riskFactors && (
                        <div className="bg-white/60 rounded-lg p-4">
                          <h5 className="font-bold text-[#2f3136] mb-3 flex items-center space-x-2">
                            <Shield className="w-4 h-4" />
                            <span>Risk Mitigation</span>
                          </h5>
                          <div className="space-y-2">
                            {(guide as any).riskFactors.map((risk: any, idx: number) => (
                              <div key={idx} className="text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{`${risk.risk}:`}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    risk.severity === 'High' ? 'bg-[#faa61a]/20 text-[#faa61a]' : 'bg-[#57f287]/20 text-[#57f287]'
                                  }`}>
                                    {risk.severity}
                                  </span>
                                </div>
                                <div className="text-xs text-[#6c757d] ml-2">{risk.mitigation}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              // Simplified premium upsell for free users
              <div className="bg-gradient-to-r from-[#faa61a]/5 to-[#faa61a]/10 border-2 border-[#faa61a]/20 rounded-xl p-6 shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#faa61a]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-[#faa61a]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#2f3136] mb-2">Unlock Advanced Strategy</h4>
                  <p className="text-[#495057] mb-4 text-sm">
                    Get detailed budget breakdowns, development phases, team structure, and risk mitigation strategies.
                  </p>
                  <button className="bg-gradient-to-r from-[#5865f2] to-[#4752c4] hover:from-[#4752c4] hover:to-[#3c4043] text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto text-sm">
                    <Crown className="w-4 h-4" />
                    <span>Sign In for Premium</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Success Metrics & KPIs - Refined and more focused */}
            <div className="mt-6 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] border-2 border-[#e3e5e8] rounded-xl p-6">
              <h4 className="text-lg font-bold text-[#2f3136] mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#5865f2]" />
                <span>Key Success Metrics</span>
              </h4>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/60 p-4 rounded-lg">
                  <h5 className="font-bold text-[#2f3136] mb-2 flex items-center space-x-2">
                    <Code className="w-4 h-4 text-[#5865f2]" />
                    <span>Development</span>
                  </h5>
                  <ul className="space-y-1 text-[#495057]">
                    <li>{'• Weekly build success > 95%'}</li>
                    <li>• On-schedule feature delivery</li>
                    <li>• Code review within 24h</li>
                  </ul>
                </div>
                <div className="bg-white/60 p-4 rounded-lg">
                  <h5 className="font-bold text-[#2f3136] mb-2 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#57f287]" />
                    <span>Player Engagement</span>
                  </h5>
                  <ul className="space-y-1 text-[#495057]">
                    <li>{'• Day 1 retention > 40%'}</li>
                    <li>{'• Session length > 10 min'}</li>
                    <li>{'• Tutorial completion > 80%'}</li>
                  </ul>
                </div>
                <div className="bg-white/60 p-4 rounded-lg">
                  <h5 className="font-bold text-[#2f3136] mb-2 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-[#eb459e]" />
                    <span>Business</span>
                  </h5>
                  <ul className="space-y-1 text-[#495057]">
                    <li>• Budget adherence</li>
                    <li>• Marketing reach targets</li>
                    <li>• Community growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};