import React from 'react';
import { Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface UniquenessIndicatorProps {
  similarityScore?: number;
  uniquenessEnhancements?: string[];
  isVisible: boolean;
}

export const UniquenessIndicator: React.FC<UniquenessIndicatorProps> = ({
  similarityScore = 0,
  uniquenessEnhancements = [],
  isVisible
}) => {
  if (!isVisible) return null;

  const isUnique = similarityScore < 0.7;
  const uniquenessPercentage = Math.round((1 - similarityScore) * 100);

  const getUniquenessColor = () => {
    if (uniquenessPercentage >= 70) return 'text-[#57f287]';
    if (uniquenessPercentage >= 40) return 'text-[#faa61a]';
    return 'text-[#faa61a]'; // Changed from red to orange
  };

  const getUniquenessIcon = () => {
    if (uniquenessPercentage >= 70) return <CheckCircle className="w-5 h-5" />;
    if (uniquenessPercentage >= 40) return <TrendingUp className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  const getUniquenessLabel = () => {
    if (uniquenessPercentage >= 70) return 'Highly Unique';
    if (uniquenessPercentage >= 40) return 'Moderately Unique';
    return 'Enhanced for Uniqueness';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Uniqueness Analysis</span>
        </div>
        <div className={`flex items-center space-x-2 ${getUniquenessColor()}`}>
          {getUniquenessIcon()}
          <span className="font-bold">{uniquenessPercentage}% {getUniquenessLabel()}</span>
        </div>
      </div>

      {/* Uniqueness Bar */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            uniquenessPercentage >= 70 ? 'bg-[#57f287]' :
            uniquenessPercentage >= 40 ? 'bg-[#faa61a]' : 'bg-[#faa61a]' // Changed from red to orange
          }`}
          style={{ width: `${uniquenessPercentage}%` }}
        />
      </div>

      {/* Enhancements Applied */}
      {uniquenessEnhancements.length > 0 && (
        <div>
          <p className="text-white/90 text-sm mb-2">
            <strong>AI Enhanced:</strong> We detected similar concepts and automatically added unique elements:
          </p>
          <div className="flex flex-wrap gap-2">
            {uniquenessEnhancements.map((enhancement, index) => (
              <span
                key={index}
                className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium"
              >
                + {enhancement}
              </span>
            ))}
          </div>
        </div>
      )}

      {isUnique && uniquenessEnhancements.length === 0 && (
        <p className="text-white/90 text-sm">
          🎉 This concept appears to be highly original! No similar ideas found in our database.
        </p>
      )}
    </div>
  );
};