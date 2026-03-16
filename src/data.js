export const DUOS = [
  { id: 1,  p1: "Colombe",      p2: "Pierre"     },
  { id: 2,  p1: "Castille",     p2: "Léo D."     },
  { id: 3,  p1: "Eugénie",      p2: "Cyprien"    },
  { id: 4,  p1: "Capucine",     p2: "Henri"      },
  { id: 5,  p1: "Valentine",    p2: "Hugues"     },
  { id: 6,  p1: "Candice",      p2: "Alfred"     },
  { id: 7,  p1: "Charlotte",    p2: "Hippolyte"  },
  { id: 8,  p1: "Clarisse",     p2: "Alban R."   },
  { id: 9,  p1: "Marion",       p2: "Karol"      },
  { id: 10, p1: "Philippine",   p2: "Xavier"     },
  { id: 11, p1: "Paola A.",     p2: "Grégoire"   },
  { id: 12, p1: "Marie D.",     p2: "Alban"      },
  { id: 13, p1: "Louise B.",    p2: "Louis S."   },
  { id: 14, p1: "Charlotte G.", p2: "Amaury"     },
  { id: 15, p1: "Iklil",        p2: "Jean"       },
  { id: 16, p1: "Margaux",      p2: "Donatien"   },
  { id: 17, p1: "Paula",        p2: "Paul"       },
  { id: 18, p1: "Théophile",    p2: "Maylis"     },
  { id: 19, p1: "Eléonore",     p2: "Stan"       },
  { id: 20, p1: "Mathilde",     p2: "Victor"     },
  { id: 25, p1: "Sixtine",      p2: "Gaspard"    },
  { id: 26, p1: "Anne-Thaïs",   p2: "Brieuc"     },
  { id: 27, p1: "Aglaé",        p2: "Gauthier"   },
];

export const POOLS = [
  { name: "Poule A", color: "#1a5c38", teams: [1,  8,  15, 26]     },
  { name: "Poule B", color: "#1a4a7c", teams: [2,  9,  16, 27]     },
  { name: "Poule C", color: "#7c1a1a", teams: [3,  10, 17]         },
  { name: "Poule D", color: "#6b21a8", teams: [4,  11, 18]         },
  { name: "Poule E", color: "#92400e", teams: [5,  12, 19]         },
  { name: "Poule F", color: "#0e6b5e", teams: [6,  13, 20]         },
  { name: "Poule G", color: "#155e75", teams: [7,  14, 25]         },
];

export const MATCH_DURATION_MIN = 15;
export const TRANSITION_MIN = 5;
export const SLOT_MIN = MATCH_DURATION_MIN + TRANSITION_MIN;
export const START_HOUR = 10;
