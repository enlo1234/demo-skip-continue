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
    icon: <Palette size={20} />
  },
  {
    id: 2,
    title: "Music",
    icon: <Music size={20} />
  },
  {
    id: 3,
    title: "Photos",
    icon: <Camera size={20} />
  },
  {
    id: 4,
    title: "Books",
    icon: <Book size={20} />
  },
  {
    id: 5,
    title: "Games",
    icon: <Gamepad2 size={20} />
  },
  {
    id: 6,
    title: "Travel",
    icon: <Plane size={20} />
  }
];

function App() {
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());

  const toggleCard = (cardId: number) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  const hasSelection = selectedCards.size > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Choose Your Interests
          </h1>
          <p className="text-gray-600">
            Select the areas that interest you
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {cards.map((card) => {
            const isSelected = selectedCards.has(card.id);
            return (
              <div
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className={`
                  cursor-pointer p-4 rounded-lg border-2 transition-colors
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    ${isSelected ? 'text-blue-600' : 'text-gray-500'}
                  `}>
                    {card.icon}
                  </div>
                  <span className={`
                    font-medium text-sm
                    ${isSelected ? 'text-blue-900' : 'text-gray-700'}
                  `}>
                    {card.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          {hasSelection && (
            <button 
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              onClick={() => console.log('Skip clicked')}
            >
              Skip
            </button>
          )}
          
          <button 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            onClick={() => console.log('Continue clicked', Array.from(selectedCards))}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;