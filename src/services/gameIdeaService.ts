import { GameIdea, GameParameters } from '../types/game';

// This will be replaced with actual Supabase Edge Function call
export const generateGameIdea = async (parameters: GameParameters): Promise<GameIdea> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response for now - will be replaced with actual AI generation
  const mockIdea: GameIdea = {
    id: crypto.randomUUID(),
    title: "Quantum Gardener",
    genre: parameters.genre || "Puzzle",
    platform: parameters.platform || ["PC", "Mobile"],
    complexity: (parameters.complexity as any) || "Medium",
    description: "A mind-bending puzzle game where players manipulate quantum states of plants to solve environmental challenges. Each decision creates parallel garden realities that must be carefully balanced to achieve harmony.",
    coreGameplay: "Players use quantum mechanics principles to grow and modify plants across multiple dimensional states. Rotate between different quantum realities to solve increasingly complex environmental puzzles.",
    uniqueFeatures: [
      "Quantum superposition mechanics - plants exist in multiple states simultaneously",
      "Reality-shifting puzzles that require thinking in 4D",
      "Procedurally generated garden ecosystems",
      "Collaborative multiplayer where players share quantum entangled gardens",
      "Educational quantum physics integration"
    ],
    targetAudience: parameters.targetAudience || "Casual Gamers",
    estimatedDevTime: parameters.timeframe || "8-12 months",
    monetization: parameters.monetizationPreference || "Premium with DLC garden packs",
    artStyle: "Minimalist with vibrant quantum particle effects",
    technicalRequirements: [
      "Advanced particle systems for quantum effects",
      "State management for quantum mechanics simulation",
      "Cross-platform multiplayer support",
      "Procedural generation algorithms"
    ],
    teamSize: parameters.teamSize || "4-6 people (2 programmers, 1 artist, 1 designer, 1 sound designer)",
    budgetEstimate: parameters.budget || "$50K - $150K",
    marketingHooks: [
      "First game to gamify quantum physics education",
      "Unique reality-shifting mechanic never seen before",
      "Collaborative puzzle-solving with quantum entanglement",
      "Beautiful zen-like gardening meets mind-bending science"
    ],
    competitorAnalysis: "Monument Valley (visual style), Portal (puzzle mechanics), Flower (zen gardening)",
    riskFactors: [
      "Quantum mechanics concept may be too complex for casual audience - mitigate with excellent tutorials",
      "Multiplayer synchronization complexity - start with single-player MVP",
      "Art style needs to clearly communicate quantum states - invest in UI/UX design"
    ],
    mvpFeatures: [
      "Basic quantum plant growing mechanics",
      "10-15 core puzzle levels",
      "Simple particle effects for quantum states",
      "Tutorial system explaining quantum concepts",
      "Save/load game progress"
    ],
    createdAt: new Date()
  };

  return mockIdea;
};

export const refineGameIdea = async (currentIdea: GameIdea): Promise<GameIdea> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock refinement - will be replaced with actual AI refinement
  return {
    ...currentIdea,
    description: currentIdea.description + " Enhanced with deeper narrative elements exploring the philosophical implications of quantum mechanics and multiple realities.",
    uniqueFeatures: [
      ...currentIdea.uniqueFeatures,
      "Time-loop mechanics that affect plant growth cycles",
      "Emotional AI that responds to garden harmony levels",
      "Player choice consequences that ripple across quantum dimensions"
    ],
    marketingHooks: [
      ...(currentIdea.marketingHooks || []),
      "Philosophical narrative about choice and consequence",
      "Instagram-worthy quantum garden screenshots"
    ],
    riskFactors: [
      ...(currentIdea.riskFactors || []),
      "Scope creep with narrative elements - keep story simple and focused"
    ]
  };
};