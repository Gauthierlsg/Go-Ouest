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

// Duos ne pouvant pas jouer avant un certain créneau (index de slot, 0 = heure de début)
// Mathilde/Victor (19) : pas avant 12h40 → slot 4 (4 × 10 min)
export const DELAYED_STARTS = [
  { teamId: 19, minSlot: 4 },
];

// Duos partageant un joueur : le scheduler les traite comme liés (pas de créneau simultané)
// Sixtine : duos 20 & 23 — Anne-Thaïs : duos 21 & 24
export const SHARED_PLAYERS = [
  [20, 23],
  [21, 24],
];

export const POOLS = [
  // Poules de 4 — chacune contient un duo "Fort"
  { name: "Poule A", color: "#1a5c38", teams: [9,  1,  2,  3]  }, // Fort: 9
  { name: "Poule B", color: "#1a4a7c", teams: [12, 4,  5,  6]  }, // Fort: 12
  { name: "Poule C", color: "#7c1a1a", teams: [16, 7,  8,  10] }, // Fort: 16
  { name: "Poule D", color: "#6b21a8", teams: [25, 11, 13, 14] }, // Fort: 25
  // Poules de 3 — duos à joueur partagé (2 matchs au lieu de 3)
  { name: "Poule E", color: "#92400e", teams: [20, 15, 17]      }, // Sixtine V2
  { name: "Poule F", color: "#0e6b5e", teams: [21, 18, 19]      }, // Anne-Thaïs V2
  { name: "Poule G", color: "#155e75", teams: [23, 24, 22]      }, // Sixtine & Anne-Thaïs
];

export const MATCH_DURATION_MIN = 10;
export const TRANSITION_MIN = 0;
export const SLOT_MIN = MATCH_DURATION_MIN + TRANSITION_MIN;
export const START_HOUR = 12;
export const KNOCKOUT_BREAK_MIN = 15;
