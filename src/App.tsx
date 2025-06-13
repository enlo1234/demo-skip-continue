import React, { useState } from 'react';
import { 
  Palette, 
  Music, 
  Camera, 
  Book, 
  Gamepad2, 
  Plane
} from 'lucide-react';

interface Card {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const cards: Card[] = [
  {
    id: 1,
    title: "Art",
    icon: <Palette size={16} />
  },
  {
    id: 2,
    title: "Music",
    icon: <Music size={16} />
  },
  {
    id: 3,
    title: "Photos",
    icon: <Camera size={16} />
  },
  {
    id: 4,
    title: "Books",
    icon: <Book size={16} />
  },
  {
    id: 5,
    title: "Games",
    icon: <Gamepad2 size={16} />
  },
  {
    id: 6,
    title: "Travel",
    icon: <Plane size={16} />
  }
];

function App() {
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [showError, setShowError] = useState(false);

  const toggleCard = (cardId: number) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
    
    // Hide error when user selects a card
    if (showError) {
      setShowError(false);
    }
  };

  const handleContinue = () => {
    if (selectedCards.size === 0) {
      setShowError(true);
      return;
    }
    console.log('Continue clicked', Array.from(selectedCards));
  };

  const hasSelection = selectedCards.size > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Choose Your Interests
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {cards.map((card) => {
            const isSelected = selectedCards.has(card.id);
            return (
              <div
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className={`
                  cursor-pointer p-3 rounded border transition-colors
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div className={`
                    ${isSelected ? 'text-blue-600' : 'text-gray-500'}
                  `}>
                    {card.icon}
                  </div>
                  <span className={`
                    text-sm
                    ${isSelected ? 'text-blue-900' : 'text-gray-700'}
                  `}>
                    {card.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Message */}
        {showError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-center">
            <p className="text-red-600 text-sm">Please select at least one interest to continue.</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          {hasSelection && (
            <button 
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={() => console.log('Skip clicked')}
            >
              Skip
            </button>
          )}
          
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;