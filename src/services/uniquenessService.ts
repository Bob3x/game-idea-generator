import { GameIdea, GameParameters, IdeaFingerprint, UniquenessAnalysis } from '../types/game';
import { supabase } from '../lib/supabase';

// Create a unique fingerprint for a game idea
export const createIdeaFingerprint = (idea: GameIdea): IdeaFingerprint => {
  // Create hashes for different aspects
  const platformHash = idea.platform.sort().join('-').toLowerCase();
  const mechanicsHash = hashString(idea.uniqueFeatures.join(' ') + idea.coreGameplay);
  const themeHash = hashString(idea.description + (idea.artStyle || ''));
  const complexityWeight = getComplexityWeight(idea.complexity);

  return {
    id: idea.id,
    genre: idea.genre.toLowerCase(),
    platformHash,
    mechanicsHash,
    themeHash,
    complexityWeight,
    createdAt: idea.createdAt
  };
};

// Simple hash function for strings
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

// Get complexity weight for similarity calculations
const getComplexityWeight = (complexity: string): number => {
  const weights = { 'Simple': 1, 'Medium': 2, 'Complex': 3 };
  return weights[complexity as keyof typeof weights] || 2;
};

// Calculate similarity between two ideas
export const calculateSimilarity = (idea1: GameIdea, idea2: GameIdea): number => {
  const fp1 = createIdeaFingerprint(idea1);
  const fp2 = createIdeaFingerprint(idea2);

  let similarity = 0;
  let factors = 0;

  // Genre similarity (40% weight)
  if (fp1.genre === fp2.genre) {
    similarity += 0.4;
  }
  factors += 0.4;

  // Platform similarity (20% weight)
  const platformSimilarity = calculatePlatformSimilarity(idea1.platform, idea2.platform);
  similarity += platformSimilarity * 0.2;
  factors += 0.2;

  // Mechanics similarity (25% weight)
  if (fp1.mechanicsHash === fp2.mechanicsHash) {
    similarity += 0.25;
  }
  factors += 0.25;

  // Theme similarity (15% weight)
  if (fp1.themeHash === fp2.themeHash) {
    similarity += 0.15;
  }
  factors += 0.15;

  return similarity / factors;
};

// Calculate platform overlap
const calculatePlatformSimilarity = (platforms1: string[], platforms2: string[]): number => {
  const set1 = new Set(platforms1.map(p => p.toLowerCase()));
  const set2 = new Set(platforms2.map(p => p.toLowerCase()));
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size; // Jaccard similarity
};

// Mock database of existing ideas for testing
const mockExistingIdeas: GameIdea[] = [
  {
    id: 'mock-1',
    title: 'Match Master',
    genre: 'Puzzle',
    platform: ['Mobile'],
    complexity: 'Simple',
    description: 'A colorful match-3 puzzle game with power-ups and daily challenges.',
    coreGameplay: 'Match three or more gems to clear them from the board and complete objectives.',
    uniqueFeatures: ['Power-up combinations', 'Daily challenges', 'Social leaderboards'],
    targetAudience: 'Casual Gamers',
    estimatedDevTime: '3-6 months',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'mock-2',
    title: 'Cyber Runner',
    genre: 'Action',
    platform: ['PC', 'Console'],
    complexity: 'Medium',
    description: 'Fast-paced cyberpunk parkour game with neon-lit environments.',
    coreGameplay: 'Navigate through vertical city levels using parkour and wall-running.',
    uniqueFeatures: ['Wall-running mechanics', 'Neon visual effects', 'Electronic soundtrack'],
    targetAudience: 'Young Adults (18-25)',
    estimatedDevTime: '6-12 months',
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'mock-3',
    title: 'Space Explorer',
    genre: 'Adventure',
    platform: ['PC'],
    complexity: 'Complex',
    description: 'Explore vast alien worlds and uncover ancient mysteries.',
    coreGameplay: 'Exploration-based gameplay with puzzle-solving and resource management.',
    uniqueFeatures: ['Procedural planet generation', 'Alien language decoding', 'Base building'],
    targetAudience: 'Hardcore Gamers',
    estimatedDevTime: '1-2 years',
    createdAt: new Date('2024-03-05')
  }
];

// Analyze uniqueness of a new idea
export const analyzeUniqueness = async (newIdea: GameIdea): Promise<UniquenessAnalysis> => {
  try {
    // Try to get real data from database first
    let existingIdeas = mockExistingIdeas;
    
    try {
      const { data: recentIdeas, error } = await supabase
        .from('game_ideas')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && recentIdeas && recentIdeas.length > 0) {
        // Convert database format to GameIdea format
        existingIdeas = recentIdeas.map(dbIdea => ({
          id: dbIdea.id,
          title: dbIdea.title,
          genre: dbIdea.genre,
          platform: dbIdea.platform,
          complexity: dbIdea.complexity as 'Simple' | 'Medium' | 'Complex',
          description: dbIdea.description,
          coreGameplay: dbIdea.core_gameplay,
          uniqueFeatures: dbIdea.unique_features,
          targetAudience: dbIdea.target_audience,
          estimatedDevTime: dbIdea.estimated_dev_time,
          monetization: dbIdea.monetization,
          artStyle: dbIdea.art_style,
          technicalRequirements: dbIdea.technical_requirements,
          teamSize: dbIdea.team_size,
          budgetEstimate: dbIdea.budget_estimate,
          marketingHooks: dbIdea.marketing_hooks,
          competitorAnalysis: dbIdea.competitor_analysis,
          riskFactors: dbIdea.risk_factors,
          mvpFeatures: dbIdea.mvp_features,
          createdAt: new Date(dbIdea.created_at)
        }));
      }
    } catch (dbError) {
      console.log('Using mock data for uniqueness analysis');
    }

    // Calculate similarities
    const similarities = existingIdeas.map(idea => ({
      idea,
      similarity: calculateSimilarity(newIdea, idea)
    }));

    // Find most similar ideas (threshold: 0.7)
    const similarIdeas = similarities
      .filter(s => s.similarity >= 0.7)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(s => s.idea);

    const maxSimilarity = similarities.length > 0 
      ? Math.max(...similarities.map(s => s.similarity))
      : 0;

    // Determine uniqueness
    const isUnique = maxSimilarity < 0.7;
    const confidenceLevel = existingIdeas.length >= 50 ? 'high' : existingIdeas.length >= 20 ? 'medium' : 'low';

    // Generate enhancement suggestions if not unique
    const suggestedEnhancements = isUnique ? [] : generateEnhancements(newIdea, similarIdeas);

    return {
      isUnique,
      similarityScore: maxSimilarity,
      similarIdeas,
      suggestedEnhancements,
      confidenceLevel
    };

  } catch (error) {
    console.error('Error analyzing uniqueness:', error);
    return {
      isUnique: true,
      similarityScore: 0,
      similarIdeas: [],
      suggestedEnhancements: [],
      confidenceLevel: 'low'
    };
  }
};

// Generate enhancement suggestions to make an idea more unique
const generateEnhancements = (idea: GameIdea, similarIdeas: GameIdea[]): string[] => {
  const enhancements: string[] = [];
  
  // Genre-specific enhancements
  const genreEnhancements: Record<string, string[]> = {
    'Puzzle': [
      'Add time manipulation mechanics',
      'Include collaborative multiplayer solving',
      'Integrate AR/VR perspective shifts',
      'Add procedural puzzle generation',
      'Include narrative-driven puzzle contexts'
    ],
    'Action': [
      'Add environmental destruction physics',
      'Include time-dilation combat mechanics',
      'Add cooperative AI companion system',
      'Include dynamic weather affecting gameplay',
      'Add parkour with momentum-based movement'
    ],
    'Adventure': [
      'Add branching narrative with consequence tracking',
      'Include procedural world generation',
      'Add companion relationship systems',
      'Include crafting with resource scarcity',
      'Add multiple timeline mechanics'
    ],
    'Simulation': [
      'Add realistic economic systems',
      'Include climate/weather simulation',
      'Add social dynamics modeling',
      'Include procedural event generation',
      'Add cross-generational progression'
    ],
    'RPG': [
      'Add classless skill evolution system',
      'Include dynamic world that changes without player',
      'Add reputation system affecting all interactions',
      'Include procedural quest generation',
      'Add multi-character perspective switching'
    ]
  };

  // Platform-specific enhancements
  const platformEnhancements: Record<string, string[]> = {
    'Mobile': [
      'Add gesture-based controls',
      'Include location-based features',
      'Add social sharing integration',
      'Include offline-first design'
    ],
    'VR': [
      'Add haptic feedback integration',
      'Include room-scale movement',
      'Add hand tracking mechanics',
      'Include spatial audio design'
    ],
    'PC': [
      'Add mod support and community tools',
      'Include advanced graphics options',
      'Add keyboard shortcut customization',
      'Include streaming integration'
    ]
  };

  // Add genre-specific enhancements
  const genreEnhancementList = genreEnhancements[idea.genre] || [];
  enhancements.push(...genreEnhancementList.slice(0, 2));

  // Add platform-specific enhancements
  idea.platform.forEach(platform => {
    const platformEnhancementList = platformEnhancements[platform] || [];
    enhancements.push(...platformEnhancementList.slice(0, 1));
  });

  // Add complexity-based enhancements
  if (idea.complexity === 'Simple') {
    enhancements.push('Add progressive difficulty scaling', 'Include accessibility options');
  } else if (idea.complexity === 'Complex') {
    enhancements.push('Add emergent gameplay systems', 'Include user-generated content tools');
  }

  // Remove duplicates and limit to 4 suggestions
  return [...new Set(enhancements)].slice(0, 4);
};

// Apply uniqueness enhancements to a game idea
export const applyUniquenessEnhancements = (idea: GameIdea, enhancements: string[]): GameIdea => {
  const enhancedIdea = { ...idea };

  // Add enhancements to unique features
  enhancedIdea.uniqueFeatures = [
    ...idea.uniqueFeatures,
    ...enhancements
  ];

  // Update description to mention uniqueness
  enhancedIdea.description = `${idea.description} Enhanced with unique elements: ${enhancements.join(', ')}.`;

  // Add to marketing hooks
  enhancedIdea.marketingHooks = [
    ...(idea.marketingHooks || []),
    'Unique twist on familiar genre',
    'Never-before-seen feature combination'
  ];

  // Track what enhancements were applied
  enhancedIdea.uniquenessEnhancements = enhancements;

  return enhancedIdea;
};