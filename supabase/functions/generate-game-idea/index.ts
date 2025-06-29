const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface GameParameters {
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { parameters }: { parameters: GameParameters } = await req.json();

    // Build the AI prompt based on parameters
    const prompt = buildGameIdeaPrompt(parameters);

    // For now, we'll use a sophisticated mock response
    // TODO: Replace with actual AI API call (OpenAI, Anthropic, etc.)
    const gameIdea = await generateMockGameIdea(parameters);

    return new Response(
      JSON.stringify(gameIdea),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  } catch (error) {
    console.error('Error generating game idea:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate game idea' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  }
});

function buildGameIdeaPrompt(parameters: GameParameters): string {
  let prompt = `Generate a realistic, actionable game concept with the following constraints:\n\n`;
  
  if (parameters.genre) prompt += `Genre: ${parameters.genre}\n`;
  if (parameters.platform?.length) prompt += `Platform(s): ${parameters.platform.join(', ')}\n`;
  if (parameters.complexity) prompt += `Complexity: ${parameters.complexity}\n`;
  if (parameters.targetAudience) prompt += `Target Audience: ${parameters.targetAudience}\n`;
  if (parameters.budget) prompt += `Budget: ${parameters.budget}\n`;
  if (parameters.teamSize) prompt += `Team Size: ${parameters.teamSize}\n`;
  if (parameters.timeframe) prompt += `Development Time: ${parameters.timeframe}\n`;
  if (parameters.monetizationPreference) prompt += `Monetization: ${parameters.monetizationPreference}\n`;
  if (parameters.theme) prompt += `Theme/Setting: ${parameters.theme}\n`;
  if (parameters.customPrompt) prompt += `Additional Requirements: ${parameters.customPrompt}\n`;

  prompt += `\nPlease provide a comprehensive game concept that includes:
- Compelling title and core concept
- Detailed gameplay mechanics
- Unique selling points
- Realistic development scope
- Marketing potential
- Risk assessment
- MVP feature breakdown
- Technical requirements

Focus on creating something achievable within the given constraints while still being innovative and marketable.`;

  return prompt;
}

async function generateMockGameIdea(parameters: GameParameters) {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const gameTemplates = [
    {
      title: "Quantum Gardener",
      genre: "Puzzle",
      description: "A mind-bending puzzle game where players manipulate quantum states of plants to solve environmental challenges.",
      coreGameplay: "Use quantum mechanics principles to grow and modify plants across multiple dimensional states.",
      uniqueFeatures: [
        "Quantum superposition mechanics",
        "Reality-shifting puzzles",
        "Procedurally generated ecosystems",
        "Educational quantum physics integration"
      ]
    },
    {
      title: "Neon Courier",
      genre: "Action",
      description: "Fast-paced cyberpunk delivery game where players navigate a vertical city using parkour and hoverboards.",
      coreGameplay: "Time-based delivery missions with dynamic obstacle courses and rival couriers.",
      uniqueFeatures: [
        "Vertical city exploration",
        "Dynamic weather affecting routes",
        "Customizable delivery vehicles",
        "Reputation system affecting available jobs"
      ]
    },
    {
      title: "Stellar Archaeologist",
      genre: "Adventure",
      description: "Explore ancient alien ruins across the galaxy, solving puzzles and uncovering cosmic mysteries.",
      coreGameplay: "Archaeological excavation mechanics combined with space exploration and alien language decoding.",
      uniqueFeatures: [
        "Procedural alien language generation",
        "Archaeological tool simulation",
        "Dynamic story based on discoveries",
        "Collaborative research with other players"
      ]
    }
  ];

  const template = gameTemplates[Math.floor(Math.random() * gameTemplates.length)];
  
  return {
    id: crypto.randomUUID(),
    title: template.title,
    genre: parameters.genre || template.genre,
    platform: parameters.platform || ["PC", "Mobile"],
    complexity: parameters.complexity || "Medium",
    description: template.description,
    coreGameplay: template.coreGameplay,
    uniqueFeatures: template.uniqueFeatures,
    targetAudience: parameters.targetAudience || "Casual Gamers",
    estimatedDevTime: parameters.timeframe || "6-12 months",
    monetization: parameters.monetizationPreference || "Premium with DLC",
    artStyle: "Modern minimalist with vibrant accents",
    technicalRequirements: [
      "Cross-platform game engine (Unity/Godot)",
      "Cloud save synchronization",
      "Analytics integration",
      "Platform-specific optimizations"
    ],
    teamSize: parameters.teamSize || "3-5 people",
    budgetEstimate: parameters.budget || "$25K - $75K",
    marketingHooks: [
      "Unique core mechanic never seen before",
      "Beautiful, Instagram-worthy visuals",
      "Perfect for streaming and social media",
      "Appeals to both casual and hardcore audiences"
    ],
    competitorAnalysis: "Similar to popular indie hits but with unique twist",
    riskFactors: [
      "Market saturation in genre - mitigate with strong unique features",
      "Technical complexity - start with simplified MVP",
      "Marketing reach - focus on influencer partnerships"
    ],
    mvpFeatures: [
      "Core gameplay loop (10-15 levels)",
      "Basic progression system",
      "Essential UI/UX",
      "Save/load functionality",
      "Tutorial system"
    ],
    createdAt: new Date()
  };
}