import jsPDF from 'jspdf';
import { GameIdea } from '../types/game';

export const exportGameIdeaToPDF = async (gameIdea: GameIdea): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Professional color scheme
  const colors = {
    primary: [88, 101, 242],
    secondary: [250, 166, 26], 
    success: [87, 242, 135],
    accent: [235, 69, 158],
    text: [47, 49, 54],
    lightGray: [248, 249, 250],
    mediumGray: [200, 200, 200],
    darkGray: [100, 100, 100]
  };

  let yPosition = 30;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      pdf.addPage();
      yPosition = 30;
      return true;
    }
    return false;
  };

  // Helper function to add a clean section with colored header
  const addSection = (title: string, content: string[], color: number[] = colors.primary) => {
    checkNewPage(20 + content.length * 6);
    
    // Section header with colored background
    pdf.setFillColor(color[0], color[1], color[2]);
    pdf.rect(margin, yPosition, contentWidth, 12, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin + 3, yPosition + 8);
    
    yPosition += 17;
    
    // Content with light background
    const contentHeight = Math.max(content.length * 5 + 8, 20);
    pdf.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    pdf.rect(margin, yPosition, contentWidth, contentHeight, 'F');
    
    pdf.setDrawColor(colors.mediumGray[0], colors.mediumGray[1], colors.mediumGray[2]);
    pdf.setLineWidth(0.3);
    pdf.rect(margin, yPosition, contentWidth, contentHeight);
    
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    let currentY = yPosition + 6;
    content.forEach((line) => {
      const wrappedLines = pdf.splitTextToSize(line, contentWidth - 6);
      wrappedLines.forEach((wrappedLine: string) => {
        if (currentY > yPosition + contentHeight - 4) return; // Prevent overflow
        pdf.text(wrappedLine, margin + 3, currentY);
        currentY += 4;
      });
    });
    
    yPosition += contentHeight + 12;
  };

  // Helper function to add key-value pairs in a clean format
  const addKeyValueSection = (title: string, data: { [key: string]: string }, color: number[] = colors.primary) => {
    const content = Object.entries(data).map(([key, value]) => `${key}: ${value}`);
    addSection(title, content, color);
  };

  // HEADER - Clean and professional
  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  pdf.rect(0, 0, pageWidth, 45, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(gameIdea.title, margin, 22);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${gameIdea.genre} | ${gameIdea.platform.join(', ')} | ${gameIdea.complexity}`, margin, 35);
  
  yPosition = 60;

  // PROJECT OVERVIEW
  const overviewData = {
    'Genre': gameIdea.genre,
    'Platforms': gameIdea.platform.join(', '),
    'Complexity': gameIdea.complexity,
    'Target Audience': gameIdea.targetAudience,
    'Development Time': gameIdea.estimatedDevTime,
    'Team Size': gameIdea.teamSize || 'Flexible',
    'Budget Estimate': gameIdea.budgetEstimate || 'TBD',
    'Revenue Model': gameIdea.monetization || 'TBD'
  };
  
  addKeyValueSection('PROJECT OVERVIEW', overviewData, colors.primary);

  // GAME CONCEPT
  const conceptLines = pdf.splitTextToSize(gameIdea.description, contentWidth - 6);
  addSection('GAME CONCEPT', conceptLines, colors.secondary);

  // CORE GAMEPLAY
  const gameplayLines = pdf.splitTextToSize(gameIdea.coreGameplay, contentWidth - 6);
  addSection('CORE GAMEPLAY', gameplayLines, colors.primary);

  // MVP FEATURES
  if (gameIdea.mvpFeatures && gameIdea.mvpFeatures.length > 0) {
    const mvpContent = gameIdea.mvpFeatures.map((feature, index) => `${index + 1}. ${feature}`);
    addSection('MVP ROADMAP', mvpContent, colors.secondary);
  }

  // UNIQUE FEATURES
  const uniqueContent = gameIdea.uniqueFeatures.map((feature, index) => `${index + 1}. ${feature}`);
  addSection('UNIQUE SELLING POINTS', uniqueContent, colors.success);

  // MARKETING HOOKS
  if (gameIdea.marketingHooks && gameIdea.marketingHooks.length > 0) {
    const marketingContent = gameIdea.marketingHooks.map((hook, index) => `${index + 1}. "${hook}"`);
    addSection('MARKETING ANGLES', marketingContent, colors.accent);
  }

  // TECHNICAL REQUIREMENTS
  if (gameIdea.technicalRequirements && gameIdea.technicalRequirements.length > 0) {
    const techContent = gameIdea.technicalRequirements.map((req, index) => `${index + 1}. ${req}`);
    addSection('TECHNICAL REQUIREMENTS', techContent, colors.primary);
  }

  // RISK FACTORS
  if (gameIdea.riskFactors && gameIdea.riskFactors.length > 0) {
    const riskContent = gameIdea.riskFactors.map((risk, index) => `${index + 1}. ${risk}`);
    addSection('RISK FACTORS & MITIGATION', riskContent, [200, 100, 50]); // Orange-ish color for warnings
  }

  // DEVELOPMENT GUIDANCE
  const guidanceContent = [
    '1. Create playable prototype within first 20% of timeline',
    '2. Plan for 30% scope reduction if needed',
    '3. Implement weekly builds and automated testing',
    '4. Start building community during development',
    '5. Focus on core gameplay loop before adding features',
    '6. Maintain detailed documentation throughout',
    '7. Regular playtesting with target audience',
    '8. Keep marketing materials updated with progress'
  ];
  addSection('DEVELOPMENT GUIDANCE', guidanceContent, colors.primary);

  // SUCCESS METRICS
  const metricsContent = [
    'DEVELOPMENT METRICS:',
    '- Weekly build success rate above 95%',
    '- Feature completion on schedule',
    '- Code review completion within 24 hours',
    '',
    'PLAYER ENGAGEMENT METRICS:',
    '- Day 1 player retention above 40%',
    '- Average session length above 10 minutes',
    '- Tutorial completion rate above 80%',
    '',
    'BUSINESS METRICS:',
    '- Development cost within budget',
    '- Marketing reach targets achieved',
    '- Community engagement growth'
  ];
  addSection('SUCCESS METRICS', metricsContent, colors.success);

  // FOOTER
  const footerY = pageHeight - 15;
  pdf.setDrawColor(colors.mediumGray[0], colors.mediumGray[1], colors.mediumGray[2]);
  pdf.setLineWidth(0.5);
  pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
  pdf.text('GameSpark - AI Game Idea Generator', margin, footerY);
  pdf.text(`Generated: ${gameIdea.createdAt.toLocaleDateString()}`, pageWidth - margin - 40, footerY);

  // Save the PDF
  const filename = `${gameIdea.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_game_concept.pdf`;
  pdf.save(filename);
};