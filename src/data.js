export const DUOS = [
  { id: 1,  p1: "Colombe",      p2: "Pierre"        },
  { id: 2,  p1: "Castille",     p2: "Léo Delgado"   },
  { id: 3,  p1: "Eugénie",      p2: "Cyprien"       },
  { id: 4,  p1: "Capu",         p2: "Henri"         },
  { id: 5,  p1: "Val",          p2: "Hugues"        },
  { id: 6,  p1: "Candice",      p2: "Alfred"        },
  { id: 7,  p1: "Charlotte",    p2: "Hippolyte"     },
  { id: 8,  p1: "Clarisse",     p2: "Alban R."      },
  { id: 9,  p1: "Marion",       p2: "Karol",        fort: true },
  { id: 10, p1: "Philippine",   p2: "Xavier"        },
  { id: 11, p1: "Paola A.",     p2: "Greg"          },
  { id: 12, p1: "Louise B.",    p2: "Louis S.",     fort: true },
  { id: 13, p1: "Charlotte G.", p2: "Amaury de G."  },
  { id: 14, p1: "Iklil",        p2: "Jean Conseil"  },
  { id: 15, p1: "Margaux",      p2: "Donatien"      },
  { id: 16, p1: "Paula",        p2: "Paul",         fort: true },
  { id: 17, p1: "Maylis",       p2: "Théophile"     },
  { id: 18, p1: "Victoire G.",  p2: "Stan"          },
  { id: 19, p1: "Mathilde",     p2: "Victor"        },
  { id: 20, p1: "Sixtine V2",   p2: "Léo R."        },
  { id: 21, p1: "Anne-Thaïs V2", p2: "Thomas"      },
  { id: 22, p1: "Max",          p2: "Paul"          },
  { id: 23, p1: "Sixtine",      p2: "Gaspard"       },
  { id: 24, p1: "Anne-Thaïs",   p2: "Brieuc"        },
  { id: 25, p1: "Aglaé",        p2: "Gauthier",     fort: true },
];

// Duos partageant un joueur : le scheduler les traite comme liés (pas de créneau simultané)
// Sixtine : duos 20 & 23 — Anne-Thaïs : duos 21 & 24
export const SHARED_PLAYERS = [
  [20, 23],
  [21, 24],
];

export const POOLS = [
  // Poules de 4 — chacune contient un duo "Fort"
  { name: "Poule A", color: "#1a5c38", teams: [9,  20, 1,  2]  }, // Fort: 9  | Anne-Thaïs: 20
  { name: "Poule B", color: "#1a4a7c", teams: [12, 24, 3,  4]  }, // Fort: 12 | Anne-Thaïs: 24
  { name: "Poule C", color: "#7c1a1a", teams: [16, 21, 5,  6]  }, // Fort: 16 | Sixtine: 21
  { name: "Poule D", color: "#6b21a8", teams: [25, 23, 7,  8]  }, // Fort: 25 | Sixtine: 23
  // Poules de 3
  { name: "Poule E", color: "#92400e", teams: [10, 11, 13]      },
  { name: "Poule F", color: "#0e6b5e", teams: [14, 15, 17]      },
  { name: "Poule G", color: "#155e75", teams: [18, 19, 22]      },
];

export const MATCH_DURATION_MIN = 10;
export const TRANSITION_MIN = 5;
export const SLOT_MIN = MATCH_DURATION_MIN + TRANSITION_MIN;
export const START_HOUR = 10;
export const KNOCKOUT_BREAK_MIN = 15;
