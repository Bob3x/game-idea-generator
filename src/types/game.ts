export interface GameIdea {
  id: string;
  title: string;
  genre: string;
  platform: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  description: string;
  coreGameplay: string;
  uniqueFeatures: string[];
  targetAudience: string;
  estimatedDevTime: string;
  monetization?: string;
  artStyle?: string;
  technicalRequirements?: string[];
  teamSize?: string;
  budgetEstimate?: string;
  marketingHooks?: string[];
  competitorAnalysis?: string;
  riskFactors?: string[];
  mvpFeatures?: string[];
  createdAt: Date;
}

export interface GameParameters {
  genre?: string;
  platform?: string[];
  complexity?: string;
  theme?: string;
  targetAudience?: string;
  budget?: string;
  teamSize?: string;
  timeframe?: string;
  monetizationPreference?: string;
  customPrompt?: string;
}