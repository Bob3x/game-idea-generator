const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { gameIdea } = await req.json();

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    // Mock refinement - in production, this would call an AI API
    const refinedIdea = {
      ...gameIdea,
      description: gameIdea.description + " Enhanced with deeper narrative elements and improved accessibility features.",
      uniqueFeatures: [
        ...gameIdea.uniqueFeatures,
        "Advanced accessibility options",
        "Community-driven content creation tools",
        "Cross-platform progression sync"
      ],
      marketingHooks: [
        ...(gameIdea.marketingHooks || []),
        "Inclusive design for all players",
        "User-generated content potential"
      ],
      riskFactors: [
        ...(gameIdea.riskFactors || []),
        "Feature creep with community tools - maintain focused scope"
      ],
      mvpFeatures: [
        ...gameIdea.mvpFeatures,
        "Basic accessibility settings",
        "Community feedback system"
      ]
    };

    return new Response(
      JSON.stringify(refinedIdea),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  } catch (error) {
    console.error('Error refining game idea:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to refine game idea' }),
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