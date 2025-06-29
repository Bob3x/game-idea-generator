import { GameIdea, GameParameters } from '../types/game';
import { supabase } from '../lib/supabase';
import { analyzeUniqueness, applyUniquenessEnhancements } from './uniquenessService';

/**
 * MAIN AI INTEGRATION POINT
 * 
 * To integrate real AI:
 * 1. Replace the generateMockGameIdea() call with your AI API call
 * 2. Ensure AI response matches the GameIdea interface structure
 * 3. The rest of the pipeline (uniqueness analysis, UI display) will work automatically
 */

// Mock game idea generation with uniqueness checking
export const generateGameIdea = async (parameters: GameParameters): Promise<GameIdea> => {
  try {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    // REPLACE THIS SECTION WITH YOUR AI API CALL
    // ============================================
    // Example integration:
    // const aiResponse = await callYourAIAPI(buildPrompt(parameters));
    // let gameIdea = parseAIResponse(aiResponse);
    
    // For now, using mock data:
    let gameIdea = await generateMockGameIdea(parameters);
    // ============================================

    // Always analyze uniqueness (works with both mock and real AI data)
    const uniquenessAnalysis = await analyzeUniqueness(gameIdea);

    // Apply enhancements if similarity is detected OR for demonstration purposes
    const shouldEnhance = !uniquenessAnalysis.isUnique || Math.random() > 0.3; // 70% chance to show enhancements for demo
    
    if (shouldEnhance && uniquenessAnalysis.suggestedEnhancements.length > 0) {
      gameIdea = applyUniquenessEnhancements(gameIdea, uniquenessAnalysis.suggestedEnhancements);
      
      // Store similarity info for display
      gameIdea.similarityScore = uniquenessAnalysis.similarityScore;
    } else if (shouldEnhance) {
      // Generate some demo enhancements even if analysis didn't find any
      const demoEnhancements = generateDemoEnhancements(gameIdea);
      if (demoEnhancements.length > 0) {
        gameIdea = applyUniquenessEnhancements(gameIdea, demoEnhancements);
        gameIdea.similarityScore = 0.75; // Demo similarity score
      }
    }

    return gameIdea;
  } catch (error) {
    console.error('Error generating game idea:', error);
    throw error;
  }
};

/**
 * AI PROMPT BUILDER
 * 
 * This function converts user parameters into a structured prompt for AI
 * Modify this to match your AI model's expected input format
 */
export const buildAIPrompt = (parameters: GameParameters): string => {
  let prompt = `Generate a comprehensive, realistic game concept with the following specifications:\n\n`;
  
  // Core requirements
  if (parameters.genre) prompt += `Genre: ${parameters.genre}\n`;
  if (parameters.platform?.length) prompt += `Target Platform(s): ${parameters.platform.join(', ')}\n`;
  if (parameters.complexity) prompt += `Complexity Level: ${parameters.complexity}\n`;
  if (parameters.targetAudience) prompt += `Target Audience: ${parameters.targetAudience}\n`;
  
  // Development constraints
  if (parameters.budget) prompt += `Budget Range: ${parameters.budget}\n`;
  if (parameters.teamSize) prompt += `Team Size: ${parameters.teamSize}\n`;
  if (parameters.timeframe) prompt += `Development Timeline: ${parameters.timeframe}\n`;
  if (parameters.monetizationPreference) prompt += `Monetization Model: ${parameters.monetizationPreference}\n`;
  
  // Creative direction
  if (parameters.theme) prompt += `Theme/Setting: ${parameters.theme}\n`;
  if (parameters.customPrompt) prompt += `Additional Requirements: ${parameters.customPrompt}\n`;

  prompt += `\nPlease provide a detailed game concept that includes:

REQUIRED FIELDS (must be included in response):
- title: Compelling game title
- description: 2-3 sentence core concept description
- coreGameplay: Detailed explanation of main gameplay mechanics
- uniqueFeatures: Array of 4-6 unique selling points
- mvpFeatures: Array of 5-8 essential features for minimum viable product
- marketingHooks: Array of 3-5 marketing angles
- riskFactors: Array of 3-5 potential risks and mitigation strategies
- technicalRequirements: Array of key technical needs
- artStyle: Visual style description
- competitorAnalysis: Brief comparison to similar games

CONSTRAINTS:
- Must be achievable within specified budget and timeline
- Should be innovative but realistic
- Focus on market viability
- Include specific, actionable details

Format the response as a structured object that can be easily parsed.`;

  return prompt;
};

/**
 * AI RESPONSE PARSER
 * 
 * This function converts AI response into GameIdea format
 * Modify this based on your AI model's response structure
 */
export const parseAIResponse = (aiResponse: any): GameIdea => {
  // Example parsing logic - adjust based on your AI's response format
  return {
    id: crypto.randomUUID(),
    title: aiResponse.title || 'Generated Game Concept',
    genre: aiResponse.genre || 'Adventure',
    platform: aiResponse.platforms || ['PC'],
    complexity: aiResponse.complexity as 'Simple' | 'Medium' | 'Complex' || 'Medium',
    description: aiResponse.description || '',
    coreGameplay: aiResponse.coreGameplay || '',
    uniqueFeatures: aiResponse.uniqueFeatures || [],
    targetAudience: aiResponse.targetAudience || 'General',
    estimatedDevTime: aiResponse.estimatedDevTime || '6-12 months',
    monetization: aiResponse.monetization || 'Premium',
    artStyle: aiResponse.artStyle || 'Modern',
    technicalRequirements: aiResponse.technicalRequirements || [],
    teamSize: aiResponse.teamSize || '3-5 people',
    budgetEstimate: aiResponse.budgetEstimate || '$25K - $75K',
    marketingHooks: aiResponse.marketingHooks || [],
    competitorAnalysis: aiResponse.competitorAnalysis || '',
    riskFactors: aiResponse.riskFactors || [],
    mvpFeatures: aiResponse.mvpFeatures || [],
    createdAt: new Date()
  };
};

// Generate demo enhancements for showcase
const generateDemoEnhancements = (idea: GameIdea): string[] => {
  const genreEnhancements: Record<string, string[]> = {
    'Puzzle': ['Time manipulation mechanics', 'Collaborative multiplayer solving'],
    'Action': ['Environmental destruction physics', 'Time-dilation combat mechanics'],
    'Adventure': ['Branching narrative with consequences', 'Procedural world generation'],
    'Simulation': ['Realistic economic systems', 'Climate simulation effects'],
    'RPG': ['Classless skill evolution', 'Dynamic world changes'],
    'Strategy': ['Emergent AI behaviors', 'Resource scarcity mechanics'],
    'Racing': ['Dynamic track deformation', 'Weather-based physics'],
    'Sports': ['Injury simulation system', 'Career progression depth'],
    'Horror': ['Psychological profiling system', 'Adaptive scare mechanics']
  };

  return genreEnhancements[idea.genre]?.slice(0, 2) || ['Unique mechanic twist', 'Enhanced player agency'];
};

export const refineGameIdea = async (currentIdea: GameIdea): Promise<GameIdea> => {
  try {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    // REPLACE THIS WITH YOUR AI REFINEMENT CALL
    // =========================================
    // Example: const refinedResponse = await callAIRefinement(currentIdea);
    // const refinedIdea = parseAIResponse(refinedResponse);
    
    // Mock refinement for now:
    const refinedIdea: GameIdea = {
      ...currentIdea,
      description: currentIdea.description + " Enhanced with deeper narrative elements and improved accessibility features.",
      uniqueFeatures: [
        ...currentIdea.uniqueFeatures,
        "Advanced accessibility options",
        "Community-driven content creation tools",
        "Cross-platform progression sync"
      ],
      marketingHooks: [
        ...(currentIdea.marketingHooks || []),
        "Inclusive design for all players",
        "User-generated content potential"
      ],
      riskFactors: [
        ...(currentIdea.riskFactors || []),
        "Feature creep with community tools - maintain focused scope"
      ],
      mvpFeatures: [
        ...(currentIdea.mvpFeatures || []),
        "Basic accessibility settings",
        "Community feedback system"
      ]
    };
    // =========================================

    // Re-analyze uniqueness after refinement
    const uniquenessAnalysis = await analyzeUniqueness(refinedIdea);
    if (!uniquenessAnalysis.isUnique && uniquenessAnalysis.suggestedEnhancements.length > 0) {
      return applyUniquenessEnhancements(refinedIdea, uniquenessAnalysis.suggestedEnhancements);
    }

    return refinedIdea;
  } catch (error) {
    console.error('Error refining game idea:', error);
    throw error;
  }
};

/**
 * MOCK GAME IDEA GENERATOR
 * 
 * This generates realistic mock data that matches the expected AI output format
 * Remove this when integrating real AI
 */
async function generateMockGameIdea(parameters: GameParameters): Promise<GameIdea> {
  const gameTemplates = [
    {
      title: "Quantum Gardener",
      genre: "Puzzle",
      description: "A mind-bending puzzle game where players manipulate quantum states of plants to solve environmental challenges across multiple dimensions.",
      coreGameplay: "Use quantum mechanics principles to grow and modify plants across multiple dimensional states. Players must understand superposition, entanglement, and wave function collapse to progress through increasingly complex botanical puzzles.",
      uniqueFeatures: [
        "Quantum superposition mechanics - plants exist in multiple states simultaneously",
        "Reality-shifting puzzles that change based on observation",
        "Procedurally generated ecosystems with quantum properties",
        "Educational quantum physics integration with real scientific principles"
      ]
    },
    {
      title: "Neon Courier",
      genre: "Action",
      description: "Fast-paced cyberpunk delivery game where players navigate a vertical neon-lit megacity using parkour, hoverboards, and gravity-defying vehicles.",
      coreGameplay: "Time-based delivery missions with dynamic obstacle courses, rival couriers, and environmental hazards. Master momentum-based movement through a living, breathing cyberpunk world.",
      uniqueFeatures: [
        "Vertical city exploration with 50+ story buildings",
        "Dynamic weather affecting routes and vehicle handling",
        "Customizable delivery vehicles with upgrade trees",
        "Reputation system affecting available jobs and story branches"
      ]
    },
    {
      title: "Stellar Archaeologist",
      genre: "Adventure",
      description: "Explore ancient alien ruins across the galaxy, solving puzzles and uncovering cosmic mysteries that reshape our understanding of the universe.",
      coreGameplay: "Archaeological excavation mechanics combined with space exploration and alien language decoding. Each discovery unlocks new tools, locations, and story revelations.",
      uniqueFeatures: [
        "Procedural alien language generation with consistent grammar rules",
        "Realistic archaeological tool simulation and dating techniques",
        "Dynamic story that changes based on discovery order",
        "Collaborative research system with other players"
      ]
    },
    {
      title: "Mystic Merchant",
      genre: "Simulation",
      description: "Run a magical shop in a fantasy world where you craft potions, enchant items, and manage relationships with quirky customers and suppliers.",
      coreGameplay: "Resource management meets crafting simulation. Balance inventory, customer satisfaction, and magical experimentation while uncovering the shop's mysterious history.",
      uniqueFeatures: [
        "Complex potion brewing with real chemistry-inspired mechanics",
        "Customer personality system affecting buying patterns",
        "Seasonal magical events that change available ingredients",
        "Shop customization with functional magical furniture"
      ]
    },
    {
      title: "Echo Chamber",
      genre: "Horror",
      description: "A psychological horror game where sound is your only navigation tool in a world consumed by darkness. Every footstep, heartbeat, and whisper tells a story.",
      coreGameplay: "Navigate using 3D spatial audio in complete darkness. Solve puzzles by listening to environmental cues and avoid threats that hunt by sound.",
      uniqueFeatures: [
        "Complete visual darkness with advanced 3D audio",
        "Binaural recording integration for ultra-realistic sound",
        "Adaptive difficulty based on player's audio sensitivity",
        "Story told entirely through environmental audio cues"
      ]
    }
  ];

  // Select template based on genre preference or random
  let selectedTemplate;
  if (parameters.genre) {
    selectedTemplate = gameTemplates.find(t => t.genre.toLowerCase() === parameters.genre.toLowerCase()) 
                     || gameTemplates[Math.floor(Math.random() * gameTemplates.length)];
  } else {
    selectedTemplate = gameTemplates[Math.floor(Math.random() * gameTemplates.length)];
  }

  // Generate platform-specific considerations
  const platforms = parameters.platform && parameters.platform.length > 0 
    ? parameters.platform 
    : ["PC", "Mobile"];

  // Generate complexity-appropriate features
  const complexity = parameters.complexity || "Medium";
  const complexityMultiplier = complexity === "Simple" ? 0.7 : complexity === "Complex" ? 1.3 : 1.0;

  // Generate budget-appropriate scope
  const budgetTier = getBudgetTier(parameters.budget);
  
  // Generate team-size appropriate technical requirements
  const teamSize = parameters.teamSize || "3-5 people";
  const techRequirements = generateTechRequirements(platforms, teamSize, complexity);

  // Generate timeframe-appropriate MVP
  const timeframe = parameters.timeframe || "6-12 months";
  const mvpFeatures = generateMVPFeatures(selectedTemplate.genre, timeframe, complexity);

  return {
    id: crypto.randomUUID(),
    title: parameters.theme ? `${selectedTemplate.title}: ${parameters.theme}` : selectedTemplate.title,
    genre: parameters.genre || selectedTemplate.genre,
    platform: platforms,
    complexity: complexity as 'Simple' | 'Medium' | 'Complex',
    description: parameters.theme 
      ? `${selectedTemplate.description} Set in a ${parameters.theme.toLowerCase()} world with unique thematic elements.`
      : selectedTemplate.description,
    coreGameplay: selectedTemplate.coreGameplay,
    uniqueFeatures: selectedTemplate.uniqueFeatures,
    targetAudience: parameters.targetAudience || getTargetAudienceForGenre(selectedTemplate.genre),
    estimatedDevTime: timeframe,
    monetization: parameters.monetizationPreference || getMonetizationForBudget(budgetTier),
    artStyle: generateArtStyle(selectedTemplate.genre, parameters.theme),
    technicalRequirements: techRequirements,
    teamSize: teamSize,
    budgetEstimate: parameters.budget || getBudgetEstimate(budgetTier),
    marketingHooks: generateMarketingHooks(selectedTemplate.genre, selectedTemplate.uniqueFeatures),
    competitorAnalysis: generateCompetitorAnalysis(selectedTemplate.genre),
    riskFactors: generateRiskFactors(complexity, budgetTier, teamSize),
    mvpFeatures: mvpFeatures,
    createdAt: new Date()
  };
}

function getBudgetTier(budget?: string): 'low' | 'medium' | 'high' {
  if (!budget) return 'medium';
  if (budget.includes('Under $10K') || budget.includes('Bootstrap')) return 'low';
  if (budget.includes('$1M+')) return 'high';
  return 'medium';
}

function generateTechRequirements(platforms: string[], teamSize: string, complexity: string): string[] {
  const baseRequirements = ["Cross-platform game engine (Unity/Godot)"];
  
  if (platforms.includes('Mobile')) {
    baseRequirements.push("Mobile optimization and touch controls");
  }
  if (platforms.includes('VR')) {
    baseRequirements.push("VR SDK integration and motion tracking");
  }
  if (platforms.includes('Console')) {
    baseRequirements.push("Console certification and platform-specific APIs");
  }
  
  if (complexity !== 'Simple') {
    baseRequirements.push("Cloud save synchronization", "Analytics integration");
  }
  
  if (teamSize.includes('Solo') || teamSize.includes('2-3')) {
    baseRequirements.push("Asset store integration for rapid development");
  } else {
    baseRequirements.push("Version control system", "Automated build pipeline");
  }
  
  return baseRequirements;
}

function generateMVPFeatures(genre: string, timeframe: string, complexity: string): string[] {
  const baseFeatures = [
    "Core gameplay loop",
    "Basic progression system",
    "Essential UI/UX",
    "Save/load functionality"
  ];
  
  const isShortTimeframe = timeframe.includes('1-3') || timeframe.includes('3-6');
  const featureCount = isShortTimeframe ? 5 : complexity === 'Simple' ? 6 : 8;
  
  const genreSpecificFeatures: Record<string, string[]> = {
    'Puzzle': ["Tutorial system", "Level editor basics", "Hint system"],
    'Action': ["Combat system", "Movement mechanics", "Basic AI"],
    'Adventure': ["Dialogue system", "Inventory management", "Quest tracking"],
    'Simulation': ["Resource management", "Basic crafting", "Customer AI"],
    'Horror': ["Atmosphere system", "Audio engine", "Tension mechanics"]
  };
  
  const additionalFeatures = genreSpecificFeatures[genre] || ["Tutorial system", "Basic multiplayer", "Achievement system"];
  
  return [...baseFeatures, ...additionalFeatures.slice(0, featureCount - baseFeatures.length)];
}

function getTargetAudienceForGenre(genre: string): string {
  const audienceMap: Record<string, string> = {
    'Puzzle': 'Casual Gamers',
    'Action': 'Young Adults (18-25)',
    'Adventure': 'Adults (26-40)',
    'Simulation': 'Casual Gamers',
    'Horror': 'Young Adults (18-25)',
    'RPG': 'Hardcore Gamers',
    'Strategy': 'Adults (26-40)'
  };
  return audienceMap[genre] || 'Casual Gamers';
}

function getMonetizationForBudget(budgetTier: 'low' | 'medium' | 'high'): string {
  const monetizationMap = {
    'low': 'Premium/Paid',
    'medium': 'Premium with DLC',
    'high': 'Free-to-Play with Premium Features'
  };
  return monetizationMap[budgetTier];
}

function getBudgetEstimate(budgetTier: 'low' | 'medium' | 'high'): string {
  const budgetMap = {
    'low': '$5K - $25K',
    'medium': '$25K - $100K',
    'high': '$100K - $500K'
  };
  return budgetMap[budgetTier];
}

function generateArtStyle(genre: string, theme?: string): string {
  const baseStyles: Record<string, string> = {
    'Puzzle': 'Clean minimalist with vibrant colors',
    'Action': 'Dynamic cel-shaded with neon accents',
    'Adventure': 'Detailed realistic with painterly textures',
    'Simulation': 'Cozy hand-drawn with warm palettes',
    'Horror': 'Dark atmospheric with selective lighting'
  };
  
  const baseStyle = baseStyles[genre] || 'Modern stylized with balanced aesthetics';
  return theme ? `${baseStyle} adapted for ${theme.toLowerCase()} setting` : baseStyle;
}

function generateMarketingHooks(genre: string, uniqueFeatures: string[]): string[] {
  const baseHooks = [
    "Innovative mechanics never seen before in the genre",
    "Perfect for streaming and social media content",
    "Appeals to both newcomers and genre veterans"
  ];
  
  const genreHooks: Record<string, string[]> = {
    'Puzzle': ["Brain-training benefits with scientific backing", "Perfect for short play sessions"],
    'Action': ["Adrenaline-pumping gameplay moments", "Competitive esports potential"],
    'Adventure': ["Rich storytelling with meaningful choices", "Immersive world-building"],
    'Simulation': ["Relaxing gameplay for stress relief", "Educational value"],
    'Horror': ["Unique psychological horror approach", "Innovative use of audio technology"]
  };
  
  return [...baseHooks, ...(genreHooks[genre] || [])];
}

function generateCompetitorAnalysis(genre: string): string {
  const analyses: Record<string, string> = {
    'Puzzle': 'Similar to Portal and The Witness but with unique quantum mechanics twist',
    'Action': 'Combines Mirror\'s Edge parkour with Cyberpunk 2077 aesthetics',
    'Adventure': 'Draws inspiration from No Man\'s Sky exploration with Outer Wilds mystery',
    'Simulation': 'Like Stardew Valley meets Harry Potter with magical shop management',
    'Horror': 'Innovative approach similar to Blind or A Blind Legend but with psychological elements'
  };
  return analyses[genre] || 'Unique approach in a proven genre with strong market demand';
}

function generateRiskFactors(complexity: string, budgetTier: 'low' | 'medium' | 'high', teamSize: string): string[] {
  const baseRisks = ["Market saturation - mitigate with strong unique selling points"];
  
  if (complexity === 'Complex') {
    baseRisks.push("Technical complexity - start with simplified MVP and iterate");
  }
  
  if (budgetTier === 'low') {
    baseRisks.push("Limited marketing budget - focus on organic growth and influencer partnerships");
  }
  
  if (teamSize.includes('Solo')) {
    baseRisks.push("Single point of failure - establish clear documentation and backup plans");
  }
  
  baseRisks.push("Scope creep - maintain strict feature prioritization");
  
  return baseRisks;
}

export const saveGameIdea = async (gameIdea: GameIdea, isPublic: boolean = false): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to save ideas');
    }

    const { error } = await supabase
      .from('game_ideas')
      .insert({
        title: gameIdea.title,
        genre: gameIdea.genre,
        platform: gameIdea.platform,
        complexity: gameIdea.complexity,
        description: gameIdea.description,
        core_gameplay: gameIdea.coreGameplay,
        unique_features: gameIdea.uniqueFeatures,
        target_audience: gameIdea.targetAudience,
        estimated_dev_time: gameIdea.estimatedDevTime,
        monetization: gameIdea.monetization,
        art_style: gameIdea.artStyle,
        technical_requirements: gameIdea.technicalRequirements || [],
        team_size: gameIdea.teamSize,
        budget_estimate: gameIdea.budgetEstimate,
        marketing_hooks: gameIdea.marketingHooks || [],
        competitor_analysis: gameIdea.competitorAnalysis,
        risk_factors: gameIdea.riskFactors || [],
        mvp_features: gameIdea.mvpFeatures || [],
        user_id: user.id,
        is_public: isPublic
      });

    if (error) {
      console.error('Error saving game idea:', error);
      throw new Error('Failed to save game idea');
    }
  } catch (error) {
    console.error('Error in saveGameIdea:', error);
    throw error;
  }
};

export const getUserGameIdeas = async (): Promise<GameIdea[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to view saved ideas');
    }

    const { data, error } = await supabase
      .from('game_ideas')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user game ideas:', error);
      throw new Error('Failed to fetch saved ideas');
    }

    return data.map(dbIdea => ({
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
  } catch (error) {
    console.error('Error in getUserGameIdeas:', error);
    throw error;
  }
};

export const getPublicGameIdeas = async (): Promise<GameIdea[]> => {
  try {
    const { data, error } = await supabase
      .from('game_ideas')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching public game ideas:', error);
      throw new Error('Failed to fetch public ideas');
    }

    return data.map(dbIdea => ({
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
  } catch (error) {
    console.error('Error in getPublicGameIdeas:', error);
    throw error;
  }
};