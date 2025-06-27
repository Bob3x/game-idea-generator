import React, { useState } from 'react';
import { Header } from './components/Header';
import { GameParametersForm } from './components/GameParametersForm';
import { GameIdeaDisplay } from './components/GameIdeaDisplay';
import { generateGameIdea, refineGameIdea } from './services/gameIdeaService';
import { exportGameIdeaToPDF } from './services/pdfExportService';
import { GameIdea, GameParameters } from './types/game';

function App() {
  const [currentGameIdea, setCurrentGameIdea] = useState<GameIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);

  const handleGenerateIdea = async (parameters: GameParameters) => {
    setIsGenerating(true);
    try {
      const gameIdea = await generateGameIdea(parameters);
      setCurrentGameIdea(gameIdea);
    } catch (error) {
      console.error('Error generating game idea:', error);
      // TODO: Add proper error handling/toast notification
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefineIdea = async () => {
    if (!currentGameIdea) return;
    
    setIsRefining(true);
    try {
      const refinedIdea = await refineGameIdea(currentGameIdea);
      setCurrentGameIdea(refinedIdea);
    } catch (error) {
      console.error('Error refining game idea:', error);
      // TODO: Add proper error handling/toast notification
    } finally {
      setIsRefining(false);
    }
  };

  const handleExportPDF = async () => {
    if (!currentGameIdea) return;
    
    try {
      await exportGameIdeaToPDF(currentGameIdea);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // TODO: Add proper error handling/toast notification
    }
  };

  const handleStartOver = () => {
    setCurrentGameIdea(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {!currentGameIdea ? (
          <GameParametersForm 
            onGenerate={handleGenerateIdea}
            isGenerating={isGenerating}
          />
        ) : (
          <div className="space-y-8">
            <GameIdeaDisplay
              gameIdea={currentGameIdea}
              onRefine={handleRefineIdea}
              onExportPDF={handleExportPDF}
              isRefining={isRefining}
            />
            
            <div className="text-center">
              <button
                onClick={handleStartOver}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Generate Another Idea
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Built with ❤️ for the gaming community | Powered by AI creativity
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;