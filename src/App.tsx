/**
 * MAIN APPLICATION COMPONENT
 *
 * This is the root component that orchestrates the entire game idea generation flow.
 * It manages the main application state and coordinates between form input and results display.
 */

import { useState } from "react";
import { Header } from "./components/Header";
import { GameParametersForm } from "./components/GameParametersForm";
import { GameIdeaDisplay } from "./components/GameIdeaDisplay";
import { BoltBadge } from "./components/BoltBadge";
import { generateGameIdea, refineGameIdea } from "./services/gameIdeaService";
import { exportGameIdeaToPDF } from "./services/pdfExportService";
import { GameIdea, GameParameters } from "./types/game";

function App() {
    // MAIN APPLICATION STATE
    const [currentGameIdea, setCurrentGameIdea] = useState<GameIdea | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefining, setIsRefining] = useState(false);

    /**
     * CORE FUNCTION: Generate new game idea
     * This is the main entry point for AI generation
     */
    const handleGenerateIdea = async (parameters: GameParameters) => {
        setIsGenerating(true);
        try {
            // This calls the AI service - see gameIdeaService.ts for integration details
            const gameIdea = await generateGameIdea(parameters);
            setCurrentGameIdea(gameIdea);
        } catch (error) {
            console.error("Error generating game idea:", error);
            // TODO: Add proper error handling/toast notification for production
        } finally {
            setIsGenerating(false);
        }
    };

    /**
     * REFINEMENT FUNCTION: Improve existing idea
     * Uses AI to enhance and expand the current concept
     */
    const handleRefineIdea = async () => {
        if (!currentGameIdea) return;

        setIsRefining(true);
        try {
            // This calls the AI refinement service
            const refinedIdea = await refineGameIdea(currentGameIdea);
            setCurrentGameIdea(refinedIdea);
        } catch (error) {
            console.error("Error refining game idea:", error);
            // TODO: Add proper error handling/toast notification for production
        } finally {
            setIsRefining(false);
        }
    };

    /**
     * EXPORT FUNCTION: Generate PDF document
     * Creates a professional PDF of the game concept
     */
    const handleExportPDF = async () => {
        if (!currentGameIdea) return;

        try {
            await exportGameIdeaToPDF(currentGameIdea);
        } catch (error) {
            console.error("Error exporting PDF:", error);
            // TODO: Add proper error handling/toast notification for production
        }
    };

    /**
     * RESET FUNCTION: Start over with new concept
     */
    const handleStartOver = () => {
        setCurrentGameIdea(null);
    };

    return (
        <div className="min-h-screen bg-[#36393f] relative">
            {/* Layout Container with proper positioning */}
            <div className="flex flex-col min-h-screen">
                {/* Header Section */}
                <Header />

                {/* Main Content Section - Flexible and grows */}
                <main className="flex-1 container mx-auto py-8 sm:py-12 relative">
                    {!currentGameIdea ? (
                        // FORM VIEW: Collect user parameters
                        <GameParametersForm
                            onGenerate={handleGenerateIdea}
                            isGenerating={isGenerating}
                        />
                    ) : (
                        // RESULTS VIEW: Display generated concept
                        <div className="space-y-8">
                            <GameIdeaDisplay
                                gameIdea={currentGameIdea}
                                onRefine={handleRefineIdea}
                                onExportPDF={handleExportPDF}
                                isRefining={isRefining}
                            />

                            <div className="text-center px-4 sm:px-6">
                                <button
                                    onClick={handleStartOver}
                                    className="bg-[#4f545c] hover:bg-[#5d6269] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Generate Another Idea
                                </button>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer Section */}
                <footer className="bg-[#2f3136] border-t border-[#40444b] text-[#b9bbbe] py-8">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <p className="text-sm font-medium">
                            Built with ❤️ for the gaming community | Powered by AI creativity
                        </p>
                    </div>
                </footer>
            </div>

            {/* Floating Elements - Positioned absolutely over the layout */}
            <BoltBadge />
        </div>
    );
}

export default App;
