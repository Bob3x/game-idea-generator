/**
 * CORE TYPE DEFINITIONS FOR GAMESPARK
 * 
 * This file defines the main data structures used throughout the application.
 * These interfaces ensure type safety and consistent data flow.
 */

/**
 * Main game idea structure - this is the core data model
 * All AI responses must conform to this interface
 */
export interface GameIdea {
  // Core identification
  id: string;
  title: string;
  createdAt: Date;
  
  // Basic game properties
  genre: string;
  platform: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  targetAudience: string;
  estimatedDevTime: string;
  
  // Core content (REQUIRED from AI)
  description: string;           // 2-3 sentence overview
  coreGameplay: string;         // Detailed gameplay mechanics
  uniqueFeatures: string[];     // 4-6 unique selling points
  
  // Development details
  monetization?: string;
  artStyle?: string;
  technicalRequirements?: string[];
  teamSize?: string;
  budgetEstimate?: string;
  
  // Marketing & business
  marketingHooks?: string[];     // 3-5 marketing angles
  competitorAnalysis?: string;   // Brief market comparison
  riskFactors?: string[];        // 3-5 risks with mitigation
  mvpFeatures?: string[];        // 5-8 essential MVP features
  
  // Uniqueness system (auto-generated)
  fingerprint?: string;
  similarityScore?: number;
  uniquenessEnhancements?: string[];
}

/**
 * User input parameters for game generation
 * These are collected from the form and sent to AI
 */
export interface GameParameters {
  // Core requirements
  genre?: string;
  platform?: string[];
  complexity?: string;
  targetAudience?: string;
  
  // Development constraints
  budget?: string;
  teamSize?: string;
  timeframe?: string;
  monetizationPreference?: string;
  
  // Creative direction
  theme?: string;
  customPrompt?: string;
}

/**
 * Uniqueness analysis system types
 * Used for detecting similar concepts and suggesting improvements
 */
export interface IdeaFingerprint {
  id: string;
  genre: string;
  platformHash: string;
  mechanicsHash: string;
  themeHash: string;
  complexityWeight: number;
  createdAt: Date;
}

export interface UniquenessAnalysis {
  isUnique: boolean;
  similarityScore: number;
  similarIdeas: GameIdea[];
  suggestedEnhancements: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
}