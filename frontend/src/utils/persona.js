export const PERSONAS = {
  MINISTER_OF_AROMA: {
    id: 'MINISTER_OF_AROMA',
    title: 'MINISTER OF AROMA',
    quote: 'Known for making mouths water before the first bite.',
    superpowers: ['Aroma Magnet', 'Head Turner', 'Hunger Trigger'],
    color: '#B8F568',
  },
  CAMERA_EATS_FIRST: {
    id: 'CAMERA_EATS_FIRST',
    title: 'THE CAMERA EATS FIRST CHEF',
    quote: 'Making every plate worthy of the spotlight.',
    superpowers: ['Plate Artist', 'Food Stylist', 'Show Stopper'],
    color: '#FF9800',
  },
  CREATIVE_GAME_CHANGER: {
    id: 'CREATIVE_GAME_CHANGER',
    title: 'THE CREATIVE GAME CHANGER',
    quote: 'Always cooking up the next big idea.',
    superpowers: ['Trend Setter', 'Recipe Rebel', 'Kitchen Hacker'],
    color: '#9C27B0',
  },
  RECIPE_PLUG: {
    id: 'RECIPE_PLUG',
    title: 'THE RECIPE PLUG',
    quote: 'The source of recipes everyone wants but nobody gets.',
    superpowers: ['Secret Recipes', 'Kitchen Plug', 'Signature Dishes'],
    color: '#2196F3',
  },
  PEOPLES_FAVOURITE: {
    id: 'PEOPLES_FAVOURITE',
    title: "THE PEOPLE'S FAVOURITE",
    quote: 'The chef people recommend before they recommend the food.',
    superpowers: ['Crowd Puller', 'Customer Magnet', 'Repeat Orders'],
    color: '#FF5722',
  },
  CHIEF_OF_FLAVOUR: {
    id: 'CHIEF_OF_FLAVOUR',
    title: 'CHIEF OF FLAVOUR',
    quote: 'Turning good meals into unforgettable ones.',
    superpowers: ['Flavour Boss', 'Taste Legend', 'Pot Commander'],
    color: '#F44336',
  },
}

export function getPersona(q2, q3) {
  if (q2 === 'Aroma' && q3 === 'Great Aroma') return PERSONAS.MINISTER_OF_AROMA
  if (q2 === 'Presentation' && q3 === 'Beautiful Presentation') return PERSONAS.CAMERA_EATS_FIRST
  if (q2 === 'Creativity' && q3 === 'Unique Recipes') return PERSONAS.CREATIVE_GAME_CHANGER
  if (q2 === 'Consistency' && q3 === 'Signature Recipes') return PERSONAS.RECIPE_PLUG
  if ((q2 === 'Taste' || q2 === 'Speed') && q3 === 'Comfort Food') return PERSONAS.PEOPLES_FAVOURITE
  if (q2 === 'Taste' && (q3 === 'Rich Flavour' || q3 === 'Signature Recipes')) return PERSONAS.CHIEF_OF_FLAVOUR
  return PERSONAS.CHIEF_OF_FLAVOUR
}

export function generateChefId() {
  const year = new Date().getFullYear()
  const num = Math.floor(Math.random() * 9000) + 1000
  return `APCN-${year}-${num}`
}
