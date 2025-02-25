import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

type Cocktail = {
  id: number;
  name: string;
  ingredients: { name: string; amount: number }[];
  color: string;
  garnish: string;
  glassware: string;
  method: string;
  description: string;
  preparation: string;
};

const mockCocktails: Cocktail[] = [{
    name: "Manhattan",
    ingredients: [
      { name: "Wild Turkey 101 Rye", amount: 2.0 },
      { name: "Sweet Vermouth", amount: 1.0 },
      { name: "Angostura Bitters", amount: 0.125 },
      { name: "Grand Marnier", amount: 0.25 }
    ],
    color: "#8B0000",
    garnish: "Cherry",
    glassware: "coupe",
    method: "stirred",
    description: "Classic whiskey cocktail with a perfect balance of sweet and bitter.",
    preparation: "Add all ingredients to mixing glass with ice. Stir well until properly chilled and diluted. Strain into a chilled coupe glass. Garnish with a cherry."
  },
  {
    name: "Provençal",
    ingredients: [
      { name: "Lavender-infused Roku Gin", amount: 1.75 },
      { name: "Herbs de Provence Vermouth", amount: 0.75 },
      { name: "Cointreau", amount: 0.5 }
    ],
    color: "#E6E6FA",
    garnish: "Lavender Sprig",
    glassware: "coupe",
    method: "stirred",
    description: "Floral and herbal French-inspired gin cocktail with delicate aromatics.",
    preparation: "Add all ingredients to mixing glass with ice. Stir gently to preserve delicate floral notes. Strain into a chilled coupe glass. Garnish with a fresh lavender sprig."
  },
  {
    name: "Ready Fire Aim",
    ingredients: [
      { name: "Siete Misterios Mezcal", amount: 2.0 },
      { name: "Lime Juice", amount: 0.75 },
      { name: "Honey-Pineapple Syrup", amount: 0.75 },
      { name: "Bittermens Hellfire Bitters", amount: 0.125 }
    ],
    color: "#FFD700",
    garnish: "Lime Wheel",
    glassware: "coupe",
    method: "shaken",
    description: "Smoky mezcal with tropical sweetness and a spicy kick.",
    preparation: "Add all ingredients to shaker with ice. Shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a lime wheel."
  },
  {
    name: "West Side",
    ingredients: [
      { name: "Charbay Meyer Lemon Vodka", amount: 2.0 },
      { name: "Fresh Lemon Juice", amount: 0.75 },
      { name: "Simple Syrup", amount: 0.5 },
      { name: "Fresh Mint", amount: 0.25 },
      { name: "Perrier", amount: 1.0 }
    ],
    color: "#ADFF2F",
    garnish: "Mint Sprig",
    glassware: "highball",
    method: "shaken",
    description: "Bright and refreshing vodka cocktail with vibrant citrus and aromatic mint.",
    preparation: "Gently muddle mint in shaker. Add remaining ingredients except Perrier. Shake with ice. Double strain into highball glass filled with ice. Top with Perrier. Garnish with mint sprig."
  },
  {
    name: "Fraise Sauvage",
    ingredients: [
      { name: "Fords Gin", amount: 1.5 },
      { name: "Wild Strawberries", amount: 0.5 },
      { name: "Tahitian Vanilla", amount: 0.25 },
      { name: "Lemon Juice", amount: 0.5 },
      { name: "EO Prosecco", amount: 1.0 }
    ],
    color: "#FF6B81",
    garnish: "Strawberry",
    glassware: "flute",
    method: "shaken",
    description: "Elegant gin cocktail with fresh strawberries and vanilla, topped with prosecco.",
    preparation: "Muddle strawberries with vanilla. Add gin and lemon juice. Shake with ice. Double strain into a chilled flute. Top with prosecco. Garnish with a fresh strawberry."
  },
  {
    name: "Amelia",
    ingredients: [
      { name: "Haku Vodka", amount: 1.5 },
      { name: "St-Germain", amount: 0.75 },
      { name: "Blackberry Purée", amount: 0.5 },
      { name: "Fresh Lemon Juice", amount: 0.5 }
    ],
    color: "#800080",
    garnish: "Blackberry",
    glassware: "coupe",
    method: "shaken",
    description: "Fruity and floral vodka cocktail with elegant elderflower notes.",
    preparation: "Add all ingredients to shaker with ice. Shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a fresh blackberry."
  },
  {
    name: "Billionaire Cocktail",
    ingredients: [
      { name: "Wild Turkey Rare Breed Bourbon", amount: 2.0 },
      { name: "Fresh Lemon Juice", amount: 0.75 },
      { name: "EO Grenadine", amount: 0.5 },
      { name: "Absinthe Bitters", amount: 0.25 }
    ],
    color: "#CD5C5C",
    garnish: "Lemon Twist",
    glassware: "coupe",
    method: "shaken",
    description: "Rich and complex bourbon cocktail with bright citrus and subtle anise notes.",
    preparation: "Add all ingredients to shaker with ice. Shake vigorously for 10-12 seconds. Double strain into a chilled coupe glass. Express oils from lemon twist and garnish."
  },
  {
    name: "Mata Hari",
    ingredients: [
      { name: "Pierre Ferrand 1840 Cognac", amount: 1.75 },
      { name: "Chai-infused Rouge Vermouth", amount: 0.75 },
      { name: "Lemon Juice", amount: 0.5 },
      { name: "Pomegranate Juice", amount: 0.5 }
    ],
    color: "#C71585",
    garnish: "Orange Peel",
    glassware: "coupe",
    method: "shaken",
    description: "Mysterious and exotic cognac cocktail with spicy chai notes and tart pomegranate.",
    preparation: "Add all ingredients to shaker with ice. Shake well until properly chilled. Double strain into a chilled coupe glass. Express oils from orange peel and garnish."
  },
  {
    name: "Old Fashioned",
    ingredients: [
      { name: "Bourbon", amount: 2.0 },
      { name: "Sugar Cube", amount: 0.25 },
      { name: "Angostura Bitters", amount: 0.125 },
      { name: "Water", amount: 0.125 }
    ],
    color: "#8B4513",
    garnish: "Orange Peel",
    glassware: "rocks",
    method: "built",
    description: "The original cocktail - sweet, aromatic whiskey with depth and character.",
    preparation: "In a rocks glass, muddle sugar cube with bitters and water. Add bourbon and stir. Add large ice cube. Express oils from orange peel, and garnish."
  },
  {
    name: "Negroni",
    ingredients: [
      { name: "Gin", amount: 1.0 },
      { name: "Campari", amount: 1.0 },
      { name: "Sweet Vermouth", amount: 1.0 }
    ],
    color: "#FF4500",
    garnish: "Orange Peel",
    glassware: "rocks",
    method: "stirred",
    description: "Perfectly balanced bitter and herbal Italian classic.",
    preparation: "Add all ingredients to mixing glass with ice. Stir until well-chilled and properly diluted. Strain into rocks glass over fresh ice. Express oils from orange peel and garnish."
  },
  {
    name: "Mezcalita",
    ingredients: [
      { name: "Mezcal", amount: 2.0 },
      { name: "Lime juice", amount: 0.75 },
      { name: "Pineapple juice", amount: 0.5 }
    ],
    color: "#E6B800",
    garnish: "Lime wheel",
    glassware: "rocks",
    method: "shaken",
    description: "Smoky and tropical mezcal cocktail.",
    preparation: "Shake all ingredients with ice. Strain into a rocks glass over fresh ice. Garnish with a lime wheel."
  }
];

const CocktailVisualizer = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>(mockCocktails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/cocktails')
      .then(res => res.json())
      .then(data => {
        setCocktails(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load cocktails');
        setLoading(false);
      });
  }, []);

  const [selectedCocktail, setSelectedCocktail] = useState(cocktails[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('recipe');
  const [showTutorial, setShowTutorial] = useState(false);

  const getCocktailGradient = (color) => {
    return {
      background: `linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, ${color} 30%, ${color} 100%)`,
      boxShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`
    };
  };

  const getMethodIcon = (method) => {
    switch(method) {
      case "shaken":
        return (
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M7 2L17 2L17 6L14 10L14 20L10 20L10 10L7 6L7 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4L14 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 8.5L7 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M17 8.5L19 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Shaken</span>
          </div>
        );
      case "stirred":
        return (
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M7 2L17 2L17 14L7 14L7 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4L14 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 14L12 20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 20L15 20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 9L15 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 7L12 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Stirred</span>
          </div>
        );
      case "built":
        return (
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M7 2L17 2L17 16L7 16L7 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 6L17 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 10L17 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 14L17 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 18L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 18L12 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Built</span>
          </div>
        );
      default:
        return <span>{method}</span>;
    }
  };

  const getGlassShape = () => {
    if (selectedCocktail.glassware === "coupe") {
      return (
        <div className="relative flex flex-col items-center">
          <div className="relative w-48 h-32">
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-40 h-16 rounded-b-full overflow-hidden border-2 border-b-0 border-l-0 border-r-0 border-t-2 border-gray-200 border-opacity-40">
              <div className="w-full h-full rounded-b-full" style={getCocktailGradient(selectedCocktail.color)}></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-48 h-8 rounded-full overflow-hidden border-2 border-b-0 border-l-0 border-r-0 border-t-2 border-gray-200 border-opacity-40">
              <div className="w-full h-full rounded-full" style={getCocktailGradient(selectedCocktail.color)}></div>
            </div>
          </div>
          <div className="w-2 h-16 bg-gradient-to-b from-gray-100 to-gray-300 bg-opacity-80"></div>
          <div className="w-16 h-2 rounded-full bg-gradient-to-b from-gray-200 to-gray-400"></div>
        </div>
      );
    } else if (selectedCocktail.glassware === "highball") {
      return (
        <div className="w-24 h-48 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-gray-200 border-opacity-40 rounded-sm overflow-hidden">
            <div className="w-full h-3/4" style={getCocktailGradient(selectedCocktail.color)}></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 bg-opacity-30"></div>
        </div>
      );
    } else if (selectedCocktail.glassware === "flute") {
      return (
        <div className="relative flex flex-col items-center">
          <div className="relative w-20 h-36">
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-16 h-32 rounded-b-3xl overflow-hidden border-2 border-b-0 border-l-0 border-r-0 border-t-2 border-gray-200 border-opacity-40">
              <div className="w-full h-full rounded-b-3xl" style={getCocktailGradient(selectedCocktail.color)}></div>
            </div>
          </div>
          <div className="w-2 h-16 bg-gradient-to-b from-gray-100 to-gray-300 bg-opacity-80"></div>
          <div className="w-16 h-2 rounded-full bg-gradient-to-b from-gray-200 to-gray-400"></div>
        </div>
      );
    } else {
      return (
        <div className="w-32 h-32 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-gray-200 border-opacity-40 rounded-sm overflow-hidden">
            <div className="w-full h-3/4" style={getCocktailGradient(selectedCocktail.color)}></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 bg-opacity-30"></div>
        </div>
      );
    }
  };

  const renderGarnish = () => {
    if (selectedCocktail.garnish.includes("Cherry")) {
      return (
        <div className="absolute top-16 right-16 w-4 h-4 rounded-full bg-red-600 shadow-lg">
          <div className="absolute -top-3 left-2 w-1 h-3 bg-green-800 rounded-full transform rotate-12"></div>
        </div>
      );
    } else if (selectedCocktail.garnish.includes("Orange")) {
      return (
        <div className="absolute top-12 right-12 transform rotate-45">
          <div className="w-8 h-2 rounded-full bg-orange-500"></div>
        </div>
      );
    } else if (selectedCocktail.garnish.includes("Lime")) {
      return (
        <div className="absolute top-12 right-16 transform -rotate-12">
          <div className="w-8 h-2 rounded-full bg-lime-400"></div>
        </div>
      );
    } else if (selectedCocktail.garnish.includes("Lavender")) {
      return (
        <div className="absolute top-12 right-16 transform -rotate-12">
          <div className="w-1 h-6 bg-green-800">
            <div className="absolute -left-1 top-0 w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="absolute -left-1 top-2 w-3 h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      );
    } else if (selectedCocktail.garnish.includes("Blackberry")) {
      return (
        <div className="absolute top-16 right-16 w-4 h-4 rounded-full bg-purple-900 shadow-lg"></div>
      );
    } else if (selectedCocktail.garnish.includes("Strawberry")) {
      return (
        <div className="absolute top-16 right-16">
          <div className="w-5 h-6 bg-red-500 rounded-b-full"></div>
          <div className="absolute -top-2 left-1 w-3 h-2 bg-green-700"></div>
        </div>
      );
    } else if (selectedCocktail.garnish.includes("Mint")) {
      return (
        <div className="absolute top-8 right-14 transform -rotate-12">
          <div className="w-1 h-8 bg-green-800">
            <div className="absolute -left-2 top-0 w-2 h-4 bg-green-500 rounded-full"></div>
            <div className="absolute left-1 top-0 w-2 h-4 bg-green-500 rounded-full"></div>
            <div className="absolute -left-1 top-3 w-2 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (cocktails.length === 0) return <div className="text-white text-center">No cocktails found</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-950/20 to-black py-8 text-white">
      <h1 className="text-4xl font-bold mb-2 text-center">Liquid Alchemy</h1>
      <p className="text-center text-gray-400 mb-4">Unveiling the sensual artistry behind exquisite libations</p>

      <div className="relative mb-8 z-10 w-64">
        <button 
          className="w-full px-4 py-2 bg-gray-800 bg-opacity-60 border border-gray-600 rounded-md flex items-center justify-between text-white"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>{selectedCocktail.name}</span>
          {showDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {cocktails.map((cocktail, index) => (
              <div 
                key={index}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setSelectedCocktail(cocktail);
                  setShowDropdown(false);
                }}
              >
                {cocktail.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mx-auto relative">
        <div className="flex justify-center items-center mb-6 min-h-60">
          {getGlassShape()}
          {renderGarnish()}
        </div>

        <div className="max-w-md mx-auto bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
          <h2 className="text-2xl font-bold mb-2 text-center">{selectedCocktail.name}</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Ingredients:</h3>
            <div className="space-y-3">
              {selectedCocktail.ingredients.map((ingredient, idx) => {
                const getComponentType = (name) => {
                  const lowerName = name.toLowerCase();

                  if (lowerName.includes('whiskey') || lowerName.includes('bourbon') || 
                      lowerName.includes('vodka') || lowerName.includes('gin') || 
                      lowerName.includes('rum') || lowerName.includes('tequila') || 
                      lowerName.includes('mezcal') || lowerName.includes('brandy') || 
                      lowerName.includes('cognac')) {
                    return { type: 'spirit', label: 'Base Spirit', color: '#FF6B6B' };
                  } else if (lowerName.includes('syrup') || lowerName.includes('honey') || 
                             lowerName.includes('sugar') || lowerName.includes('liqueur') || 
                             lowerName.includes('sweet vermouth') || lowerName.includes('cointreau') || 
                             lowerName.includes('st-germain')) {
                    return { type: 'sweet', label: 'Sweet', color: '#FFD93D' };
                  } else if (lowerName.includes('lemon') || lowerName.includes('lime') || 
                             lowerName.includes('grapefruit') || lowerName.includes('vinegar')) {
                    return { type: 'sour', label: 'Sour', color: '#6BCB77' };
                  } else if (lowerName.includes('bitters') || lowerName.includes('campari') || 
                             lowerName.includes('aperol') || lowerName.includes('fernet') || 
                             lowerName.includes('dry vermouth')) {
                    return { type: 'bitter', label: 'Bitter', color: '#4D96FF' };
                  } else if (lowerName.includes('herb') || lowerName.includes('spice') || 
                             lowerName.includes('mint') || lowerName.includes('cinnamon') || 
                             lowerName.includes('lavender')) {
                    return { type: 'aromatic', label: 'Aromatic', color: '#9D65C9' };
                  } else if (lowerName.includes('egg') || lowerName.includes('cream') || 
                             lowerName.includes('milk') || lowerName.includes('purée')) {
                    return { type: 'texture', label: 'Texture', color: '#F2C1D1' };
                  } else if (lowerName.includes('water') || lowerName.includes('soda') || 
                             lowerName.includes('tonic') || lowerName.includes('ginger beer') || 
                             lowerName.includes('prosecco') || lowerName.includes('champagne')) {
                    return { type: 'dilution', label: 'Dilution', color: '#8BD3E6' };
                  }

                  return { type: 'other', label: 'Other', color: '#ABABAB' };
                };

                const componentInfo = getComponentType(ingredient.name);

                return (
                  <div key={idx} className="relative">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">{ingredient.name}</span>
                        <span 
                          className="ml-2 px-2 py-0.5 text-xs rounded-full" 
                          style={{ 
                            backgroundColor: componentInfo.color,
                            color: ['sweet', 'dilution'].includes(componentInfo.type) ? 'rgba(0,0,0,0.7)' : 'white'
                          }}
                        >
                          {componentInfo.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-300">{ingredient.amount} oz</span>
                    </div>

                    <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${Math.min(100, (ingredient.amount / 2) * 100)}%`,
                          backgroundColor: selectedCocktail.color,
                          opacity: 0.8
                        }}
                      ></div>
                    </div>

                    <div className="w-full flex justify-between mt-1 px-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-1 w-0.5 bg-gray-500"></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Served in:</h3>
              <p className="capitalize">{selectedCocktail.glassware} Glass</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Method:</h3>
              <div>{getMethodIcon(selectedCocktail.method)}</div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Garnish:</h3>
            <p>{selectedCocktail.garnish}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Notes:</h3>
            <p className="italic">{selectedCocktail.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Preparation:</h3>
            <p className="text-sm text-gray-300">{selectedCocktail.preparation}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Cocktail Components:</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FF6B6B' }}></div>
                <span className="text-xs">Base Spirit</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FFD93D' }}></div>
                <span className="text-xs">Sweet</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#6BCB77' }}></div>
                <span className="text-xs">Sour</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#4D96FF' }}></div>
                <span className="text-xs">Bitter</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#9D65C9' }}></div>
                <span className="text-xs">Aromatic</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#F2C1D1' }}></div>
                <span className="text-xs">Texture</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#8BD3E6' }}></div>
                <span className="text-xs">Dilution</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#ABABAB' }}></div>
                <span className="text-xs">Other</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailVisualizer;